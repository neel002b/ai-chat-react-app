
import { User, Bot } from 'lucide-react';

const ChatBubble = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex w-full mb-6 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] gap-3 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
          isAssistant ? 'bg-primary-100 text-primary-600' : 'bg-slate-200 text-slate-600'
        }`}>
          {isAssistant ? <Bot size={18} /> : <User size={18} />}
        </div>
        
        <div className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}>
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isAssistant 
              ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none' 
              : 'bg-primary-600 text-white rounded-tr-none shadow-md shadow-primary-200'
          }`}>
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
