import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export const _useposts=(cat,url)=>{
    const [loading,setloading]=useState(false)
    const [list,setlist]=useState([]);
    const fetchpost=async()=>{
        try {
           const res=await axios.get(url);
            console.log(res);
            setlist(res.data);
            setloading(true)
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setloading(false);
        }
    }
    
    useEffect(()=>{
    fetchpost();
    },[cat])
    return{loading,list}
}
export const _usesingle=()=>{
    const [loading,setloading]=useState(false)
    const [post,setpost]=useState({});
    const location=useLocation();
    const route=useNavigate();
    const postid=location.pathname.split("/")[2];
    const fetchsinglepost=async()=>{
        try {
           const res=await axios.get(`posts/${postid}`);
            console.log(res);
            setpost(res.data);
            setloading(true)
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setloading(false);
        }
    }
    const handleDelete=async()=>{
   try {
    const res=await axios.delete(`posts/${postid}`);
    toast.success('Post deleted');
    route('/');
    
    console.log(res);
    
   } catch (error) {
    console.log(error);
    
   }
      
    
    }
    
    useEffect(()=>{
    fetchsinglepost();
    },[postid])
    return{loading,post,handleDelete}
}
