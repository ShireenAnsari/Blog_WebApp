import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import { category } from '../smallitems/category';
import 'react-quill/dist/quill.snow.css';
import { Authcontext } from '../context/authContext';
import Alertpage from '../components/Alertpage';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
const Write = () => {
  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,'text/html');
    return doc.body.textContent;
  }
  const state=useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title,setTitle]=useState(state?.description || "");
  const [file,setfile]=useState(null);
  const [cat,setcat]=useState(state?.cat || "");
  const {currentUser}=useContext(Authcontext);
  const uid=currentUser?.other.id
const handleClick=async (e)=>{
  e.preventDefault();
 const imgUrl= await upload();
 try {
  state?( await axios.put(`/posts/${state.id}`,{
    title,description:value,cat,img:file?imgUrl:"",uid
  })):(await axios.post(`/posts/`,
  {
    title,description:value,cat,img:file?imgUrl:"",uid,
    date:moment(Date.now()).format('YY-MM-DD HH:mm:ss')}))
 } catch (error) {
  console.log(error);
  
 }


}

const upload=async()=>{
  try {
    const formData=new FormData();
    formData.append("file",file);
    const res=await axios.post('/uploads',formData);
    return res.data;
    // console.log(res.data);
    
  } catch (error) {
    console.log(error)
    
  }
}
  return (
<>
{!currentUser?<Alertpage/>: <div className='add'>
   <div className="content">
     <input type="text" value={getText(value)} placeholder='Title' onChange={e=>setTitle(e.target.value)} />
     <div className="editorcontainer">
     <ReactQuill className='editor' theme="snow" value={title} onChange={setValue} />
     </div>
   </div>
     <div className="menue">
       <div className="item">

         <h1>Publish</h1>
         <span>
           <b>Status:</b>Draft
         </span>
         <span>
           <b>Visibility:</b>Public
         </span>
         <input style={{display:'none'}}  type="file" name="file" id="file" onChange={e=>setfile(e.target.files[0])} />
         <label className='file' style={{cursor:'pointer'}} htmlFor="file" >Upload Image</label>
         <div className="buttons">
           <button>Save as draft</button>
           <button onClick={handleClick}>Publish</button>
         </div>
       </div>
       <div className="item">
         <h1>Category</h1>
         {category.map(itm=>(
           <div className='cat' key={itm.id}>
           <input type="radio" checked={cat===itm.id} name="cat" id={itm.id} value={itm.value} onChange={e=>setcat(e.target.value)} />
         <label htmlFor={itm.value}>{itm.title}</label>
           </div>
         ))}
        
       </div>
     
   </div>
 </div>}
</>
  
  )
}

export default Write