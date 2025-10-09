# AI Streaming Assistant - Frontend Application

A real-time AI chat interface built with React, TypeScript, and Tailwind CSS that visualizes streaming responses and tool execution from an AI assistant API.

## Assignment Requirements

This project fulfills the Genoshi AI+Frontend Engineer hiring assignment, implementing:

- **Streaming Chat Interface** with real-time message display
- **Tool Call Visualization** with status indicators and creative UI
- **API Integration** with both `/chat` (streaming) and `/tools` endpoints
- **Modern Tech Stack**: React + TypeScript + Vite + Tailwind CSS
- **Clean Architecture** with proper component separation

## Features

### Core Functionality
- **Real-time Streaming**: Messages and tool calls stream in real-time as the AI processes them
- **Tool Execution Visualization**: 
  - 4 status states: Pending, Running, Completed, Failed
  - Icon-based tool type identification (Weather, Calculator, Image, Database, File Operations)
  - Color-coded status indicators with animations
  - JSON-formatted tool results display
- **Responsive Design**: Clean, modern UI that works across devices
- **Auto-scroll**: Automatically scrolls to latest messages
- **Suggested Prompts**: Quick-start examples on empty state
- **Error Handling**: Graceful error messages for connection issues

### UI/UX Highlights
- Gradient backgrounds with smooth animations
- User/Assistant avatars with distinct styling
- Loading states during streaming
- Disabled inputs to prevent concurrent requests
- Timestamps on all messages
- Smooth transitions and hover effects

## Tech Stack

- **Framework**: React 18.3
- **Language**: TypeScript 5.5
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API
- **Backend API**: Genoshi Streaming API (Render.com)

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles (Tailwind)
├── components/
│   ├── ChatInput.tsx      # Message input component
│   ├── MessageBubble.tsx  # Message display component
│   └── ToolCallCard.tsx   # Tool execution visualization
├── services/
│   └── chatApi.ts         # API integration (streaming + tools)
└── types/
    └── chat.ts            # TypeScript interfaces
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## API Integration

### Base URL
```
https://intern-test-frontend-mbcr.onrender.com
```

### Endpoints Used

#### 1. POST /chat
Sends user messages and receives streaming responses.

**Request:**
```json
{
  "message": "What is the weather in Paris?"
}
```

**Response:** Newline-delimited JSON (NDJSON) stream
```json
{"type": "text", "content": "Let me check...", "timestamp": "2025-10-08T..."}
{"type": "tool_call", "tool": {"name": "weather", "id": "...", "status": "running"}, ...}
{"type": "tool_result", "tool": {"name": "weather", "id": "...", "status": "completed", "result": {...}}, ...}
{"type": "text", "content": "The weather in Paris is...", "timestamp": "2025-10-08T..."}
{"type": "done", "content": "", "timestamp": "2025-10-08T..."}
```

#### 2. GET /tools
Retrieves available tools metadata (fetched on app initialization).

## Supported Tools

The application visualizes the following tool types:

| Tool | Description | Example Query |
|------|-------------|---------------|
| **Weather** | Get current weather for any city | "What's the weather in Paris?" |
| **Calculator** | Perform mathematical calculations | "Calculate 156 * 23 + 890" |
| **Image Generator** | Generate images from text | "Generate an image of a sunset" |
| **Database Query** | Query mock database | "Query users from the database" |
| **File Operations** | Read/write mock files | "Read config.txt" |

## Key Implementation Details

### Streaming Architecture
- Uses JavaScript async generators for handling streaming responses
- Implements newline-delimited JSON (NDJSON) parsing
- Maintains tool state via Map to handle updates efficiently
- Real-time UI updates on every chunk received

### State Management
- React hooks (useState, useEffect, useRef)
- Tool state deduplication using Map with tool IDs
- Immutable message updates for predictable re-renders

### Error Handling
- Try-catch blocks for network errors
- Graceful degradation with error messages in chat
- Console logging for debugging

### Performance Optimizations
- Auto-scroll only when messages change
- Proper cleanup in useEffect hooks
- Efficient re-renders via filtered state updates

## Code Quality

- **TypeScript**: Full type safety with interfaces
- **Component Structure**: Single Responsibility Principle
- **Separation of Concerns**: Services, Types, Components clearly separated
- **Modern React**: Functional components with hooks
- **Clean Code**: Readable, well-commented, consistent formatting

## Learning Highlights

This project demonstrates proficiency in:
- Frontend development with modern React
- TypeScript for type-safe applications
- Real-time data streaming and visualization
- RESTful API integration
- Responsive UI/UX design
- Component-based architecture
- State management in complex UIs
- Error handling and edge cases

## Contact

For questions or feedback: support@genoshi.io

---

**Built for the Genoshi AI+Frontend Engineer position**
