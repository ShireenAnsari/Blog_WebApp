import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import {Toaster} from 'react-hot-toast'
import { useContext } from 'react';
import { Authcontext } from '../context/authContext.jsx';
const Login = () => {
  const {login,currentUser}=useContext(Authcontext);
  const path=useNavigate();
const [inputs,Setinputs]=useState({
  username:"",email:"",password:""
});
useEffect(()=>{
if(currentUser)
{
  path('/');
}
},[currentUser])
const handlechage = (e) => {
  Setinputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
}
const [loading,setloading]=useState(false);
const [err,seterr]=useState(null);
const handleSubmit = async (e) => {
  setloading(true);
  e.preventDefault();

  try {
    const res = await login(inputs);
   path('/');
    
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 404) {
      seterr(error.response.data);
    } else {
      toast.error('Error creating user');
    }
  } finally {
    setloading(false);
  }
};
  return (
    <>
    <Toaster/>
     <div className='auth'>
        <h1>Login</h1>
        <form action="">
            <input onChange={handlechage}  required type="text" name="username" id="" placeholder='username' />
            <input onChange={handlechage} required type="password"  name="password" id="" placeholder='password'/>
            <button onClick={handleSubmit}>{loading?'...':'Login'}</button>
           {err&&<p>{err}</p>} 
            <span>Dont't have account? Go to <Link to={'/register'}>Register Page</Link></span>
        </form>
    </div>
    </>
   
  )
}

export default Login