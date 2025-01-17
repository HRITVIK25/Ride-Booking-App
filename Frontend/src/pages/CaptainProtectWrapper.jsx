import React, {useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainProtectWrapper = ({
    children
}) => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const {captain, setCaptain} = useContext(CaptainDataContext)

    useEffect(()=>{
      if(!token){
        navigate('/captain-login');
    }
    },[token])
  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectWrapper;

/*
If the user is logged in  then the children components will be rendered otherwise login page will be displayed
*/
