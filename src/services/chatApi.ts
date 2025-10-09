import { StreamResponse } from '../types/chat';

const API_BASE_URL = 'https://intern-test-frontend-mbcr.onrender.com';

export async function getTools() {
  const response = await fetch(`${API_BASE_URL}/tools`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function* streamChat(message: string): AsyncGenerator<StreamResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error('Failed to get response reader');
  }

  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.trim()) {
        try {
          const parsed: StreamResponse = JSON.parse(line);
          yield parsed;
        } catch (e) {
          console.error('Failed to parse line:', line, e);
        }
      }
    }
  }

  if (buffer.trim()) {
    try {
      const parsed: StreamResponse = JSON.parse(buffer);
      yield parsed;
    } catch (e) {
      console.error('Failed to parse remaining buffer:', buffer, e);
    }
  }
}
