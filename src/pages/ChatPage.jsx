import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import { getMessages, sendMessage } from '../services/chat';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [loadingText, setLoadingText] = useState('Thinking...');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let timer;
    if (sending) {
      timer = setTimeout(() => {
        setLoadingText('Searching context...');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [sending]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data.messages || []);
    } catch (err) {
      setError('Failed to load chat history. Please try refreshing.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        const data = await getMessages();
        if (isMounted) {
          setMessages(data.messages || []);
        }
      } catch {
        if (isMounted) {
          setError('Failed to load chat history. Please try refreshing.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    setSending(true);
    setLoadingText('Thinking...');
    // Optimistic update
    const userMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const data = await sendMessage(content);
      if (data.messages) {
        setMessages(data.messages);
      } else if (data.reply) {
        setMessages((prev) => [...prev, data.reply]);
      }
      setError(''); // Clear any previous errors
    } catch (err) {
      if (err.response?.status === 503) {
        setError('AI is temporarily busy. Please try again in a few seconds.');
      } else {
        setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      }
      console.error('Send error:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-500">
              <Loader2 className="animate-spin text-primary-600" size={32} />
              <p className="animate-pulse font-medium">Loading your conversation...</p>
            </div>
          ) : error && messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
              <div className="bg-red-50 p-4 rounded-full text-red-600">
                <AlertCircle size={32} />
              </div>
              <div>
                <p className="text-slate-900 font-semibold">{error}</p>
                <button 
                  onClick={() => {
                    setLoading(true);
                    setError('');
                    fetchMessages();
                  }}
                  className="mt-4 flex items-center gap-2 mx-auto text-primary-600 hover:text-primary-700 font-medium"
                >
                  <RefreshCw size={16} />
                  Retry Loading
                </button>
              </div>
            </div>
          ) : (
            <>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <div className="bg-primary-50 p-6 rounded-full text-primary-600">
                    <BotIcon size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Start a Conversation</h3>
                    <p className="text-slate-500 mt-1">Send a message to begin chatting with the AI.</p>
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <ChatBubble key={index} message={msg} />
                ))
              )}
              
              {sending && (
                <div className="flex justify-start mb-6 animate-pulse">
                  <div className="bg-primary-50 px-4 py-3 rounded-2xl rounded-tl-none border border-primary-100 flex items-center gap-2 text-primary-600">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm font-medium">{loadingText}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      <ChatInput onSend={handleSendMessage} loading={sending} />
    </div>
  );
};

const BotIcon = ({ size }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export default ChatPage;
