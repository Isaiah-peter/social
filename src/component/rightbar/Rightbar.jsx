
import HomeRightBar from '../homerightbar/homerightbar'
import ProfileRightBar from '../profilerightbar/profilerightbar'
import './rightbar.css'

function Rightbar({profile}) {

  return (
    <div className='rightbar'>
      <div className="rightwrapper">
        {profile ? <ProfileRightBar />: <HomeRightBar />}
      </div>
    </div>
  )
}

export default Rightbar
