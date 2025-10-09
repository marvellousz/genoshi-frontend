import { Message } from '../types/chat';
import { User, Bot } from 'lucide-react';
import { ToolCallCard } from './ToolCallCard';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      <div className="flex-shrink-0">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
            : 'bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900'
        }`}>
          {isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-6 h-6 text-white" />
          )}
        </div>
      </div>

      <div className={`flex-1 max-w-4xl ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div
          className={`relative rounded-3xl px-6 py-4 shadow-lg backdrop-blur-sm ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
              : 'bg-white/70 dark:bg-gray-950/90 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
            isUser 
              ? 'bg-gradient-to-br from-white/10 to-transparent' 
              : 'bg-gradient-to-br from-blue-500/5 to-transparent'
          }`}></div>
          
          <p className="whitespace-pre-wrap break-words relative z-10 leading-relaxed">
            {message.content || <span className="italic opacity-50">Thinking...</span>}
          </p>
        </div>

        {message.tools && message.tools.length > 0 && (
          <div className="mt-4 space-y-3 w-full">
            {message.tools.map((tool) => (
              <ToolCallCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        <div className={`mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 ${isUser ? 'text-right' : ''}`}>
          {(() => {
            const date = new Date(message.timestamp);
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            return `${displayHours}:${minutes} ${ampm}`;
          })()}
        </div>
      </div>
    </div>
  );
}
