import './App.css'

import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from './pages/Home'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import LoadingPage from './pages/LoadingPage'
import Sidebar from './components/Sidebar'

function App() {

  const {user,userLoading} = useContext(UserContext)

  return (
    <Router>
      <main className="w-full h-screen flex">
        {user && <Sidebar />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={userLoading?<LoadingPage />:user? <Home/>:<Login/>}/>
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App
