import {createBrowserRouter,RouterProvider,Route, Outlet} from 'react-router-dom'
import {Home,Register,Login,Write,Single} from './pages/commonroutes'
import Navbar from './components/Navbar';
import './style.scss'
import Footer from './components/Footer';
const Layout=()=>{
  return(
  <>
   <Navbar/>
   <Outlet/>
  <Footer/>
  </>
  )
}
const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/post/:id',
        element:<Single/>
      },
      {
        path:'/write',
        element:<Write/>
      }
    ]
   
  },
  {
   path:'/register',
   element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
   }
  
])
function App() {
 
  return(
  <div className='app'>
    <div className='container'>
    <RouterProvider router={router}/>
    </div>
    
  </div>
  )
  
}


export default App;
