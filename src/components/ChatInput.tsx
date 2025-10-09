import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-950/90 border-t border-gray-200 dark:border-gray-800 p-6">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className={`relative flex gap-3 transition-all duration-300 ${
          isFocused ? 'scale-[1.02]' : 'scale-100'
        }`}>
          {isFocused && (
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
          )}
          
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me anything..."
              disabled={disabled}
              className="relative w-full rounded-2xl border-2 border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-6 py-4 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 disabled:bg-gray-100 dark:disabled:bg-gray-950 disabled:cursor-not-allowed transition-all shadow-lg font-medium"
            />
          </div>
          
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="relative group rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-4 text-white hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-800 dark:disabled:to-gray-900 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Send className="w-6 h-6 relative z-10" />
          </button>
        </div>
        
        {!disabled && (
          <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400 font-medium">
            Press Enter to send your message
          </p>
        )}
      </form>
    </div>
  );
}
