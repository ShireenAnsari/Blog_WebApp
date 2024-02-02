import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import {Toaster} from 'react-hot-toast'
const Register = () => {
  const [inputs,Setinputs]=useState({
    username:"",email:"",password:""
  });
  const route=useNavigate();
  const handlechage = e => {
    Setinputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  
  // console.log(inputs);
  const [loading,setloading]=useState(false);
  const [err,seterr]=useState(null);
  const handlesubmit=async e=>{
    setloading(true)
    e.preventDefault();
    // console.log(inputs);
    try {
      const res=await axios.post('http://localhost:8800/api/auth/register',inputs);
      console.log(res);
      console.log(inputs);
      if(res.status===200)
      {
        toast.success('User successfully created');
        route('/login');
      }
      
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
          seterr(error.response.data);
      } else {
        toast.error('Error creating user');
      }
      
    }
    finally{
      setloading(false)
    }
  }
  return (
    <>
     <Toaster/>
    <div className='auth'>
        <h1>Register</h1>
        <form action="">
            <input onChange={handlechage} required type="text" name="username"  placeholder='username'  />
            <input onChange={handlechage} required type="email" name="email"  placeholder='email' />
            <input onChange={handlechage} required type="password" name="password"  placeholder='password' />
            <button onClick={handlesubmit}>{loading?'....':'Register'}</button>
           {err&&<p>{err}</p>} 
            <span>Do you have account? Go to <Link to={'/login'}>Login Page</Link></span>
        </form>
    </div>
    </>
  )
}

export default Register