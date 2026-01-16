# Apartments - Real Estate Search Platform

A full-stack real estate search platform with AI-powered chat interface and semantic search capabilities. Built with React, TypeScript, Node.js, and MongoDB.

## 🚀 Features

### For Users

- **AI-Powered Chat Interface**: Natural language search for apartments using Hebrew language support
- **Semantic Search**: Vector-based search using embeddings for intelligent property matching
- **Advanced Filtering**: Filter apartments by city, price range, rooms, size, and more
- **Property Details**: Detailed view of each apartment with images and specifications
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components

### For Administrators

- **Admin Dashboard**: Protected route for managing apartments
- **CRUD Operations**: Create, read, update, and delete apartment listings
- **Authentication**: Secure login system with JWT tokens

## 🛠️ Tech Stack

### Backend

- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **@xenova/transformers** for embeddings (multilingual-e5-base model)
- **@langchain/ollama** for AI chat (gemma2 model)
- **express-session** for session management

### Frontend

- **React 18** with **TypeScript**
- **Vite** for build tooling
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Axios** for API calls
- **Embla Carousel** for image carousels

## 📁 Project Structure

```
apartments/
├── back/                    # Backend application
│   ├── src/
│   │   ├── config/         # Configuration constants
│   │   ├── controllers/    # Route controllers
│   │   │   ├── apartments.controller.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── embedding.controller.ts
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # Express routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript type definitions
│   │   └── server.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
│
└── front/                   # Frontend application
    ├── src/
    │   ├── api/            # API client configuration
    │   ├── components/     # React components
    │   │   ├── ui/         # Reusable UI components
    │   │   ├── ChatWidget.tsx
    │   │   ├── FiltersBar.tsx
    │   │   └── ...
    │   ├── contexts/       # React contexts (ChatContext)
    │   ├── hooks/          # Custom React hooks
    │   ├── pages/          # Page components
    │   ├── types/          # TypeScript type definitions
    │   └── main.tsx        # Entry point
    ├── package.json
    └── vite.config.ts
```

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Ollama** (for AI chat functionality - gemma2 model)

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd apartments
   ```

2. **Install backend dependencies**

   ```bash
   cd back
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../front
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `back/` directory:

   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret_key
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Install and configure Ollama** (for AI chat)
   ```bash
   # Install Ollama from https://ollama.ai
   # Then pull the gemma2 model:
   ollama pull gemma2
   ```

## 🚀 Running the Project

### Development Mode

1. **Start the backend server**

   ```bash
   cd back
   npm run dev
   ```

   The backend will run on `http://localhost:4000`

2. **Start the frontend development server**
   ```bash
   cd front
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Build

1. **Build the backend**

   ```bash
   cd back
   npm run build
   npm start
   ```

2. **Build the frontend**
   ```bash
   cd front
   npm run build
   npm run preview
   ```

## 🔌 API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration (if implemented)

### Apartments

- `GET /apartments` - Get paginated list of apartments with filters
  - Query params: `page`, `city`, `min_price`, `max_price`, `rooms`, `type`, `search`
- `GET /apartments/:id` - Get apartment by ID
- `GET /apartments/cities` - Get list of all cities
- `GET /apartments/types` - Get list of all property types
- `POST /apartments` - Create new apartment (admin only)
- `PUT /apartments/:id` - Update apartment (admin only)
- `DELETE /apartments/:id` - Delete apartment (admin only)

### Chat/Embeddings

- `POST /embedding/extract-filters` - Extract search filters from natural language
- `POST /embedding/talk` - Chat with AI assistant

## 🎯 Key Features Explained

### AI Chat Interface

The chat widget uses Ollama's gemma2 model to:

- Understand natural language queries in Hebrew
- Extract search filters (city, price range) from conversations
- Provide friendly, conversational responses
- Switch between search mode and chat mode

### Semantic Search

Properties are embedded using the `Xenova/multilingual-e5-base` model:

- Each apartment is converted to a searchable text representation
- User queries are embedded and matched against property embeddings
- Enables intelligent, context-aware property matching

### Admin Dashboard

Protected route (`/admin`) that requires authentication:

- View all apartments in a table format
- Create, edit, and delete apartment listings
- Manage apartment data with a user-friendly interface

## 🔒 Authentication

The application uses JWT tokens for authentication:

- Tokens are stored in HTTP-only cookies or localStorage
- Protected routes require valid authentication
- Session management via express-session

## 🌐 Supported Languages

- **Hebrew (עברית)**: Primary language for UI and AI chat
- The AI assistant is configured to respond in Hebrew with a friendly, conversational tone

## 📝 Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 4000)
- `MONGO_URI` - MongoDB connection string
- `SESSION_SECRET` - Secret for express-session
- `JWT_SECRET` - Secret for JWT token signing

## 🧪 Development Notes

- The backend uses TypeScript with strict type checking
- Frontend uses Vite for fast HMR (Hot Module Replacement)
- Both projects have separate `tsconfig.json` files
- UI components are built with Radix UI for accessibility

[Add contribution guidelines here]

---

**Note**: Make sure Ollama is running and the gemma2 model is available before using the chat functionality. The embedding models will be downloaded automatically on first use.
