import Feed from '../../component/feed/Feed'
import Rightbar from '../../component/rightbar/Rightbar'
import Sidebar from '../../component/sidebar/Sidebar'
import Topbar from '../../component/topbar/Topbar'
import './profile.css'

function Profile() {
    return (
        <>
        <Topbar />
        <div className='rofile'>
          <Sidebar />
          <Feed />
          <Rightbar />
        </div>
      </>
    )
}

export default Profile
