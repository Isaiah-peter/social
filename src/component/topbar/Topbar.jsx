import "./topbar.css"
import { Search, Person, Chat, Notifications } from '@material-ui/icons'

function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="left">
        <span className="logo">SocialGround</span>
      </div>
      <div className="center">
        <div className="searchbar">
          <Search />
          <input type="text" placeholder='search post, friend' className="searchinput" />
        </div>
      </div>
      <div className="right">
        <div className="topbarlinkContainer">
          <span className="topbarlink">Homepage</span>
          <span className="topbarlink">Timeline</span>
        </div>
        <div className="topbaricon">
          <div className="topbariconitem">
            <Person className='icons' />
            <span className="iconBadge">2</span>
          </div>
          <div className="topbariconitem">
            <Chat className='icons' />
            <span className="iconBadge">2</span>
          </div>
          <div className="topbariconitem">
            <Notifications className='icons' />
            <span className="iconBadge">2</span>
          </div>
        </div>
        <img src='./asset/person/1.jpg' alt='user' className='topbarimage' />
      </div>
    </div>
  )
}

export default Topbar
