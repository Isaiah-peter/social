import Feed from '../../component/feed/Feed'
import Rightbar from '../../component/rightbar/Rightbar'
import Sidebar from '../../component/sidebar/Sidebar'
import Topbar from '../../component/topbar/Topbar'
import './profile.css'
import axios from 'axios'
import { useEffect } from 'react'

function Profile() {

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
      <div className='profile'>
        <Sidebar />
        <div className="profileright">
          <div className="profiletop">
            <div className="profilecover">
              <img src="/asset/post/10.jpg" alt="cover" className='profileCoverImg' />
              <img src="/asset/person/1.jpg" alt="cover" className='profileUserImg' />
            </div>
            <div className="profileinfo">
              <h4 className="profileinfoname">jane smith</h4>
              <h6 className="profileinfodesc">welcome</h6>
            </div>
          </div>
          <div className="profilebottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
