import './App.css'

import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from './pages/Home'
import { useContext, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import LoadingPage from './pages/LoadingPage'
import Sidebar from './components/Sidebar'
import CreatePost from './pages/CreatePost'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import ErrorPage from './pages/ErrorPage'
import PostPage from './pages/PostPage'
import PostComments from './pages/PostComments'
import { PostContext } from './context/PostContext'

function App() {
  const {user,userLoading} = useContext(UserContext)
  const {loading} = useContext(PostContext)


  return (
    <main className="w-full h-screen flex">
      {user && !userLoading && <Sidebar />}
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              userLoading ? (
                <LoadingPage />
              ) : (
                <ProtectedRoute user={user}>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/p/create"
            element={
              userLoading ? (
                <LoadingPage />
              ) : (
                <ProtectedRoute user={user}>
                  <CreatePost />
                </ProtectedRoute>
              )
            }
          />

          <Route path=":username" element={<Profile />} />

          <Route
            path="/p/:id"
            element={
              userLoading ? (
                <LoadingPage />
              ) : (
                <ProtectedRoute user={user}>
                  <PostPage />
                </ProtectedRoute>
              )
            }
          />

          <Route path="/p/:id/comments" element={<PostComments />} />

          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register user={user} />} />
        </Routes>
      </div>
    </main>
  );
}

export default App
