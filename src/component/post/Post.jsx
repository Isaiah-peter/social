import { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'
import './Post.css'
import * as timeago from 'timeago.js'

const Post = ({p}) => {
  const [user, setUser] = useState([])
  const [like, setLike] = useState(0)
  const l = useLocation()
  console.log(l)
  useEffect(()=>{
    getUser()
    getLike()
  },[])
  const getUser = async() => {
    const res = await axios.get(`http://Localhost:8000/user/${l.pathname !="/"  ? l.pathname : p.user_id}`, {
         headers: {
           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjIsIklzQWRtaW4iOmZhbHNlLCJleHAiOjE2MzUzMjI2MzV9.DxTSqbAdHQrbSu7Bws1ClJVeyBZ14Z1WEbdnyPMLvQc"
         }
       }
       )
       if (p.user_id !== '') {
         setUser(res.data)
      }
  }
  // const likePost = async() => {
  //   const res = await axios.post(`http://Localhost:8000/like`, {
  //        headers: {
  //          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjIsIklzQWRtaW4iOmZhbHNlLCJleHAiOjE2MzUzMjI2MzV9.DxTSqbAdHQrbSu7Bws1ClJVeyBZ14Z1WEbdnyPMLvQc"
  //        }
  //      }
  //      )
      
  // } 

  const getLike = async() => {
    const res = await axios.get(`http://Localhost:8000/like/${p.ID}`, {
         headers: {
           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjIsIklzQWRtaW4iOmZhbHNlLCJleHAiOjE2MzUzMjI2MzV9.DxTSqbAdHQrbSu7Bws1ClJVeyBZ14Z1WEbdnyPMLvQc"
         }
       }
       )
       setLike(res.data.length)
  }

  return (
    <div className='post'>
      <div className="wrappers">
        <div className="posttop">
          <Link to={`/${user.ID}`} >
          <img src={user.profilepicture !== '' ? user.profilepicture: '/asset/noAvatar.png'}
           alt="" className="profileimage" />
          </Link>
          <span className="username">{user.username}</span>
          <span className="dayposted">{timeago.format(p.CreatedAt)}</span>
        </div>
        <div className="postcenter">
          <span className="posttext">{p.description}</span>
          <img src={p.image} alt="" className="postimage" />
        </div>
        <div className="postbuttom">
          <div className="left">
            <img src="asset/like.jpg" alt="" className='likeicon' />
            <img src="asset/heart.jpg" alt="" className='likeicon' />
            <span className="peoplethatlike">{like} people like</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
