import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext.jsx'
import { PostProvider } from './context/PostContext.jsx'
import { ChatProvider } from './context/ChatContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <PostProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </PostProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
