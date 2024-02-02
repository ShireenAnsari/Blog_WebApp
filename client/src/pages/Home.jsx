import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { _useposts } from '../Logic/Datafetch'
import { Loader } from 'react-feather';
const Home = () => {
  const cat=useLocation().search;
  const {loading,list}=_useposts(cat,`posts/get-posts${cat}`);
  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,'text/html');
    return doc.body.textContent;
  }
  return (
    <div className='home'>
      {loading?<Loader/>:  <div className="posts">
        {/* {JSON.stringify(list)} */}
{list?.map(x=>(
  <div className="post" key={x.id}>
    <div className="img">
      <img src={`../upload/${x.img}`} alt="" srcset="" />
    </div>
    <div className="content">
    <Link className='Link' to={`/post/${x.id}`}>
    <h1>{getText(x.title)}</h1>
    </Link>
    <p>{getText(x.description)}</p>
    <button>Read More</button>
    </div>
  </div>
))}
      </div>}
    
    </div>
  )
}

export default Home