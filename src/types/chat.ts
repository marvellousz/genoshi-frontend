export type ToolStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Tool {
  name: string;
  id: string;
  status: ToolStatus;
  result: unknown;
}

export interface StreamResponse {
  type: 'text' | 'tool_call' | 'tool_result' | 'error' | 'done';
  content: string;
  tool?: Tool;
  timestamp: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tools?: Tool[];
}
