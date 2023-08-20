import './App.css'

import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from './pages/Home'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import LoadingPage from './pages/LoadingPage'
import Sidebar from './components/Sidebar'
import CreatePost from './pages/CreatePost'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const {user,userLoading} = useContext(UserContext)

  return (
    <main className="w-full h-screen flex">
      {user && <Sidebar />}
      <div className="flex-grow">
        <Routes>
          <Route path='/account/login' element={<Login user={user}/>}/>
          <Route
            path={user ? "/" : "/account/login"}
            element={
              userLoading ? <LoadingPage /> : user ? <Home /> : <Login user={user}/>
            }
          />
          <Route
            path='/p/create'
            element={
              <ProtectedRoute user={user}>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path='/account/register'
            element={<Register user={user}/>}
          />
        </Routes>
      </div>
    </main>
  );
}

export default App
