# marv chat

A real-time AI chat interface with streaming responses and tool execution visualization.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

Marv Chat provides a modern, real-time chat interface for interacting with AI assistants. It features streaming responses, tool execution visualization, and a beautiful user interface built with React and TypeScript.

**Who it's for:** Developers building AI chat interfaces, users who need real-time AI interactions, and applications requiring tool execution visualization.

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend Integration**: Supabase client
- **Deployment**: Vercel-ready

## Features

- **Real-Time Streaming**: Stream chat responses as they're generated
- **Tool Execution Visualization**: See tools being executed in real-time
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Auto-Scroll**: Intelligent auto-scrolling during conversations
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/marvellousz/genoshi.git
   cd genoshi/genoshi-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env.local` file in the root directory:

   ```env
   VITE_API_BASE_URL=https://intern-test-frontend-mbcr.onrender.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to use the application.

## Usage

### Starting a Chat

1. **Open the application** in your browser
2. **Type your message** in the input field at the bottom
3. **Press Enter** or click send to submit
4. **Watch the response stream** in real-time as it's generated
5. **View tool executions** if the AI uses any tools

### Features

- **Streaming Responses**: Responses appear word-by-word as they're generated
- **Tool Visualization**: See which tools are being executed and their results
- **Theme Toggle**: Click the sun/moon icon to switch between light and dark themes
- **Auto-Scroll**: The chat automatically scrolls to show new messages
- **Manual Scroll**: Scroll up to view previous messages without auto-scroll

### API Integration

The frontend connects to the backend API:

- **Base URL**: `https://intern-test-frontend-mbcr.onrender.com`
- `POST /chat` - Stream chat responses
- `GET /tools` - Get available tools

## Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel

2. **Add environment variables** in Vercel dashboard:

   - `VITE_API_BASE_URL`: Your backend API URL

3. **Deploy** - Vercel handles the build automatically

### Manual Deployment

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The `dist` folder contains the production-ready files that can be served by any static file server.

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:

- `VITE_API_BASE_URL` (required) - Your backend API base URL

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: pranavmurali024@gmail.com
- **GitHub**: [https://github.com/marvellousz/genoshi](https://github.com/marvellousz/genoshi)

---

Built with ❤️ for AI interactions
