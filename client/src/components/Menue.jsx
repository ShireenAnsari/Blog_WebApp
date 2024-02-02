import React from 'react'
import { _useposts } from '../Logic/Datafetch'
const Menue = ({cat}) => {
  const {loading,list}=_useposts(cat,`posts/get-posts?cat=${cat}`);
  return (
    <div className='menue'>
        <h1>Other posts you may like</h1>
     {list?.map((post)=>(
        <div className="post" key={post.id}>
       <img src={post.img} alt="" srcset="" />
       <h2>{post.title}</h2>
       <button>Read More</button>

        </div>
     ))}
    </div>
  )
}

export default Menue