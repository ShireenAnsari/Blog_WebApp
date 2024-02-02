import React, { useState } from 'react'
import { useContext } from 'react'
import { Menu, X } from 'react-feather'
import { Link } from 'react-router-dom'
import { Authcontext } from '../context/authContext'
const Navbar = () => {
  const {currentUser,logout}=useContext(Authcontext);
  const [showsidebar,setshowsidebar]=useState(false);
  const showside=()=>{
    if(!showsidebar)
    {
      setshowsidebar(true)
    }
    else
    {
      setshowsidebar(false);
    }
   
  }
  const Navs=[
    {name:'ART',
    pathname:'/?cat=art'
  },
  {name:'SCIENCE',
  pathname:'/?cat=science'
},
{name:'TECHNOLOGY',
pathname:'/?cat=technology'
},
{name:'CINEMA',
pathname:'/?cat=cinema'
}, 
{name:'DESIGN',
pathname:'/?cat=design'
},
{name:'FOOD',
pathname:'/?cat=food'
}

  ]
  return (
    <div className='navbar'>
     <div className="container">
    {!showsidebar&&<div className="logo">
       Shiriscripts
      </div>} 
      <div className="links">
        {Navs.map((x)=>(
        <Link className='Link' to={x.pathname}><h6>{x.name}</h6></Link>
        ))}
        <span>{currentUser?.other.username}</span>
        {currentUser?<span onClick={logout}>Logout</span>:<Link className='Link' to={'/login'} >Login</Link>}
        <span className='write'>
          <Link className='Link' to='/write'>Write</Link>
        </span>
      </div>
     {!showsidebar&&<Menu className='menubar' role='button' onClick={showside} />}
      {showsidebar&& <div className="sidebar">
        <X onClick={showside}/>
        {Navs.map((x)=>(
          <Link className='Link' to={x.pathname}><h6>{x.name}</h6></Link>
        ))}
      </div>}
     </div>
    </div>
  )
}

export default Navbar