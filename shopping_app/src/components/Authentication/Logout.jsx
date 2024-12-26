import React, { useEffect } from 'react'
import { logout } from '../../services/userServices'

const Logout = () => {
    useEffect(() => { 
      logout();
      window.location = "/";   // back to home page
    }, [])
  return null;
}

export default Logout;
