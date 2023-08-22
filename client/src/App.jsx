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

function App() {
  const {user,userLoading} = useContext(UserContext)
  return (
    <main className="w-full h-screen flex">
      {user && <Sidebar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/account/login" element={<Login user={user} />} />
          <Route path="/account/register" element={<Register user={user} />} />
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
              <ProtectedRoute user={user}>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route path=':username' element={<Profile />}/>

        </Routes>
      </div>
    </main>
  );
}

export default App
