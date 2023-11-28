import './App.css'

import {Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from './pages/Home'
import { useContext, useState } from 'react'
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
import EditProfile from './pages/EditProfile'
import Explore from './pages/Explore'
import ForgotPassword from './pages/ForgotPassword'
import Inbox from './pages/Inbox'

function App() {
  const {user,userLoading} = useContext(UserContext)
  const {theme} = useContext(UserContext)
  
  return (
    <main className="w-full flex" data-theme={theme}>
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

          <Route
            path="/p/:id/comments"
            element={
              userLoading ? (
                <LoadingPage />
              ) : (
                <ProtectedRoute user={user}>
                  <PostComments />
                </ProtectedRoute>
              )
            }
          />

          <Route
            path="/:username/edit"
            element={
              <ProtectedRoute user={user}>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/explore"
            element={
              userLoading ? (
                <LoadingPage />
              ) : (
                <ProtectedRoute user={user}>
                  <Explore />
                </ProtectedRoute>
              )
            }
          />

          <Route
            path="/direct/inbox"
            element={
              userLoading ? (
                <LoadingPage />
              ) : (
                <ProtectedRoute user={user}>
                  <Inbox />
                </ProtectedRoute>
              )
            }
          />

          <Route
            path="/direct/t/:chatId"
            element={
              userLoading ? (
                <LoadingPage />
              ) : (
                <ProtectedRoute user={user}>
                  <Inbox />
                </ProtectedRoute>
              )
            }
          />

          <Route path="/account/login" element={<Login user={user} />} />
          <Route path="/account/register" element={<Register user={user} />} />
          <Route
            path="/accounts/password/reset"
            element={<ForgotPassword user={user} />}
          />
          <Route
            path="/accounts/password/reset/:token"
            element={<ForgotPassword user={user} />}
          />

          {/* <Route path="/*" element={<ErrorPage />} /> */}
        </Routes>
      </div>
    </main>
  );
}

export default App
