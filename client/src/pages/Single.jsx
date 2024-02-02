import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {Edit2, Loader, Trash} from 'react-feather'
import Menue from '../components/Menue'
import { _usesingle } from '../Logic/Datafetch'
import moment from 'moment'
import { Authcontext } from '../context/authContext'
const Single = () => {
  const {loading,post,handleDelete}=_usesingle();
  const {currentUser}=useContext(Authcontext);
  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,'text/html');
    return doc.body.textContent;
  }
  return (
    <>
     {loading?<Loader/>:<div className='single'>
    <div className="content">
      <img src={`../upload/${post?.img}`}alt="" srcset="" />
       <div className="user">
      {post.userimg&&<img src={post?.userimg}  alt="" srcset="" />}  
        <div className="info">
        <span>{post?.username}</span>
        <p>Posted {moment(post.date).fromNow}</p>
       </div>
       {/* {console.log ("current user is",currentUser.other.username," and ", post?.username)} */}
       
       {currentUser?.other.username===post.username&&  <div className="edit">
       <Link to={`/write?.edit=2`} state={post}>
          
          {/* any icon */}
      <Edit2 size={'20px'} color='teal' />
          </Link>
          {/* any delete icon */}
          <Trash onClick={handleDelete} size={'20px'} color='Red'/>
       </div> }  
      
       </div>
       <h1>{getText(post.title)}</h1>
       <p>{post.description}</p>
    </div>
    <div className="menue">
      <Menue cat={post.cat}/>
      {/* {console.log(post.cat)} */}
    </div>
  </div>}
    </>
   
    
  )
}

export default Single