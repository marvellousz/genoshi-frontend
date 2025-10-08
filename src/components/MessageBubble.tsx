import { Message } from '../types/chat';
import { User, Bot } from 'lucide-react';
import { ToolCallCard } from './ToolCallCard';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-700'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      <div className={`flex-1 max-w-3xl ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        {message.tools && message.tools.length > 0 && (
          <div className="mt-3 space-y-2 w-full">
            {message.tools.map((tool) => (
              <ToolCallCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : ''}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
