import React from 'react'
import { Navigate } from 'react-router-dom'

const Register = ({user}) => {
    if(user){
      return <Navigate to={'/'}/>
    }
  return (
    <div>
      Register
    </div>
  )
}

export default Register
