import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSend, loading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  return (
    <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-end gap-3">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 resize-none max-h-40 bg-slate-50"
          />
          <button
            type="submit"
            disabled={!message.trim() || loading}
            className="absolute right-2 bottom-2 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-40 disabled:hover:bg-primary-600 transition-all duration-200"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </form>
      <p className="text-[10px] text-center text-slate-400 mt-2">
        AI may produce inaccurate information about people, places, or facts.
      </p>
    </div>
  );
};

export default ChatInput;
