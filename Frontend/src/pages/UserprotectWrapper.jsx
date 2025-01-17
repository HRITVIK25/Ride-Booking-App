import React, {useContext,useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'



const UserprotectWrapper = ({
    children
}) => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
      if(!token){
        navigate('/login');
    }
    },[token])
  return (
    <div>
      {children}
    </div>
  )
}

export default UserprotectWrapper;

/*
If the user is logged in  then the children components will be rendered otherwise login page will be displayed
*/
