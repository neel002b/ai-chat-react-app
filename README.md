# AI Chat React App

A modern, responsive web application for interacting with an AI language model. It features Retrieval-Augmented Generation (RAG) capabilities, allowing users to upload documents and query a custom knowledge base. Built with React, Vite, and Tailwind CSS.

## Features

- **Conversational AI Interface**: A clean, intuitive chat UI for communicating with the AI.
- **Knowledge Base (RAG) Management**: Upload and manage documents to provide custom context for the AI. Supports parsing documents (like `.docx` files via Mammoth).
- **User Authentication**: Secure login and registration flows with JWT token handling, API interceptors, and protected routes.
- **Responsive Design**: Fully responsive user interface built with Tailwind CSS.
- **Fast Development**: Powered by Vite for lightning-fast HMR and building.

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Document Parsing**: [Mammoth](https://github.com/mwilliamson/mammoth.js) (for `.docx` processing)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/neel002b/ai-chat-react-app.git
   cd ai-chat-react-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure your backend API URL (see [Environment Variables](#environment-variables)).

4. Start the development server:

   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory and define the following variables:

```env
# The base URL for your backend API
VITE_API_BASE_URL=http://localhost:5000
```

## Project Structure

```text
src/
├── assets/        # Static assets
├── components/    # Reusable UI components (Navbar, ChatBubble, AuthForm, DocumentList, etc.)
├── context/       # React Context providers for global state
├── hooks/         # Custom React hooks
├── pages/         # Route components (ChatPage, KnowledgeBasePage, LoginPage, RegisterPage)
├── routes/        # Application routing configuration
└── services/      # API communication (api.js, auth.js, chat.js, rag.js)
```

## Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the app for production.
- `npm run lint` - Runs ESLint to catch issues.
- `npm run preview` - Locally preview the production build.
