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
       const res = await axios.get("http://Localhost:8080/user", {
         headers: {
           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjIsIklzQWRtaW4iOmZhbHNlLCJleHAiOjE2MzUzMjI2MzV9.DxTSqbAdHQrbSu7Bws1ClJVeyBZ14Z1WEbdnyPMLvQc"
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
