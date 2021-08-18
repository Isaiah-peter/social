import { useEffect } from 'react'
import axios from 'axios'
import Feed from '../../component/feed/Feed'
import Rightbar from '../../component/rightbar/Rightbar'
import Sidebar from '../../component/sidebar/Sidebar'
import Topbar from '../../component/topbar/Topbar'
import './home.css'

function Home() {
  useEffect(()=>{
    getPost()
   },[])
 
   const getPost = async () => {
     try {
       const res = await axios.get("http://Localhost:9900/timeline", {
         headers: {
           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjUsIklzQWRtaW4iOmZhbHNlLCJleHAiOjE2MzUxNTM2Nzl9.t7EezkAD909hOML9-03KHUIP2Cl2jPJkC8RGNb_SbvM"
         }
       }
       )
 
       console.log(res)
 
     }
     catch (err) {
       console.log(err)
     }
   }
  return (
    <>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}

export default Home
