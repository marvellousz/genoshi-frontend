import { useState, useRef, useEffect } from 'react';
import { Message, Tool } from './types/chat';
import { streamChat, getTools } from './services/chatApi';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './hooks/useTheme';

interface AvailableTool {
  name: string;
  description: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [availableTools, setAvailableTools] = useState<AvailableTool[]>([]);
  const [showTools, setShowTools] = useState(false);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isNearBottom = () => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    
    const threshold = 150;
    const position = container.scrollHeight - container.scrollTop - container.clientHeight;
    return position < threshold;
  };

  const handleScroll = () => {
    setShouldAutoScroll(isNearBottom());
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll]);

  useEffect(() => {
    getTools()
      .then((response) => {
        console.log('Tools API response:', response);
        const toolsArray = Array.isArray(response) ? response : (response.tools || []);
        setAvailableTools(toolsArray);
      })
      .catch((error) => {
        console.error('Failed to fetch tools:', error);
        setAvailableTools([
          { name: 'weather', description: 'Get current weather for any city' },
          { name: 'calculator', description: 'Perform mathematical calculations' },
          { name: 'image_generator', description: 'Generate images from text descriptions' },
          { name: 'database_query', description: 'Query a mock database' },
          { name: 'file_operations', description: 'Read/write mock files' },
        ]);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
        setShowTools(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsStreaming(true);
    setShouldAutoScroll(true);

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
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10"
        style={{
          backgroundImage: 'url(/grid.png)',
          backgroundSize: '100px 100px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <header className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-950/90 border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="px-4 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src="/grid.png" alt="Logo" className="w-10 h-10 object-contain" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marv Chat</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative" ref={toolsDropdownRef}>
                <button
                  onClick={() => setShowTools(!showTools)}
                  className="group relative px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-900 hover:scale-105 transition-all shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-800"
                  aria-label="View available tools"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 rounded-2xl transition-all"></div>
                  <span className="relative z-10 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tools ({availableTools.length})
                  </span>
                </button>

                {showTools && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Available Tools</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {availableTools.length > 0 ? (
                        availableTools.map((tool) => (
                          <div
                            key={tool.name}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                          >
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white capitalize mb-1">
                              {tool.name.replace(/_/g, ' ')}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {tool.description}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                          No tools available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={toggleTheme}
                className="group relative p-3 rounded-2xl bg-gray-100 dark:bg-gray-900 hover:scale-105 transition-all shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-800"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 rounded-2xl transition-all"></div>
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 relative z-10" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-300 relative z-10" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto relative"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center px-6">
          </div>
        ) : (
          <div className="w-full">
              <div className="max-w-6xl mx-auto px-6 pt-8 pb-4 space-y-8">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <MessageBubble message={message} />
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
        )}
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isStreaming} />
    </div>
  );
}

export default App;
