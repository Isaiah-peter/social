import { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'


function Feed() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    getPost()
   },[])
 
   const getPost = async () => {
     try {
       const res = await axios.get("http://Localhost:8000/timeline", {
         headers: {
           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjIsIklzQWRtaW4iOmZhbHNlLCJleHAiOjE2MzUzMjI2MzV9.DxTSqbAdHQrbSu7Bws1ClJVeyBZ14Z1WEbdnyPMLvQc"
         }
       }
       )
       setPosts(res.data)
 
     }
     catch (err) {
       console.log(err)
     }
   }

  return (
    <div className='feed'>
      <div className="wrapper">
        <Share />
        {
          posts.map((post)=>{
           return <Post key={post.ID} p={post} />
          })
        }
      </div>
    </div>
  )
}

export default Feed
