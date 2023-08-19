import './App.css'

import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from './pages/Home'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import LoadingPage from './pages/LoadingPage'
import Sidebar from './components/Sidebar'
import CreatePost from './pages/CreatePost'

function App() {

  const {user,userLoading} = useContext(UserContext)

  return (
    <Router>
      <main className="w-full h-screen flex">
        {user && <Sidebar />}
        <div className="flex-grow">
          <Routes>
            <Route
              path={user ? "/" : "/account/login"}
              element={
                userLoading ? <LoadingPage /> : user ? <Home /> : <Login />
              }
            />
            <Route
              path={user ? "/p/create" : "/account/login"}
              element={user ? <CreatePost /> : <Login />}
            />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App
