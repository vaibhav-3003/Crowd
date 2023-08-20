import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({user,children}) => {
    if(!user){
        return <Navigate to={'/account/login'}/>
    }
  return (
    children
  )
}

export default ProtectedRoute
