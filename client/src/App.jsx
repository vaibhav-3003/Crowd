import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Actions/User'
import Home from './pages/Home'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const { isAuthenticated } = useSelector((state)=>state.user)
  

  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/" element={isAuthenticated ?<Home/> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App
