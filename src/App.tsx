import { useState, useRef, useEffect } from 'react';
import { Message, Tool } from './types/chat';
import { streamChat } from './services/chatApi';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { Sparkles } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsStreaming(true);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      tools: [],
    };

    const toolsMap = new Map<string, Tool>();

    try {
      for await (const chunk of streamChat(content)) {
        if (chunk.type === 'text') {
          assistantMessage.content += chunk.content;
        } else if (chunk.type === 'tool_call' && chunk.tool) {
          toolsMap.set(chunk.tool.id, chunk.tool);
        } else if (chunk.type === 'tool_result' && chunk.tool) {
          toolsMap.set(chunk.tool.id, chunk.tool);
        } else if (chunk.type === 'error') {
          assistantMessage.content += `\n[Error: ${chunk.content}]`;
        }

        assistantMessage.tools = Array.from(toolsMap.values());
        assistantMessage.timestamp = chunk.timestamp;

        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== assistantMessage.id);
          return [...filtered, { ...assistantMessage }];
        });
      }
    } catch (error) {
      console.error('Streaming error:', error);
      assistantMessage.content += '\n[Connection error occurred]';
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== assistantMessage.id);
        return [...filtered, { ...assistantMessage }];
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2.5 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Streaming Assistant</h1>
              <p className="text-sm text-gray-600">Real-time AI responses with tool execution</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-6 mb-6 shadow-lg">
                <Sparkles className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Welcome to AI Assistant
              </h2>
              <p className="text-gray-600 max-w-md mb-8">
                Start a conversation and watch as the AI uses various tools to provide comprehensive answers in real-time.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                {[
                  'What is the weather in Paris?',
                  'Calculate 156 * 23 + 890',
                  'Generate an image of a sunset',
                  'Query users from the database',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSendMessage(suggestion)}
                    disabled={isStreaming}
                    className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isStreaming} />
    </div>
  );
}

export default App;
