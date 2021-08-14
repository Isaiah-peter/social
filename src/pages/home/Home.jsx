import Feed from '../../component/feed/Feed'
import Rightbar from '../../component/rightbar/Rightbar'
import Sidebar from '../../component/sidebar/Sidebar'
import Topbar from '../../component/topbar/Topbar'
import './home.css'

function Home() {
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
