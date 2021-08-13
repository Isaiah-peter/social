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
        <div className="topbarlink">
          <span className="topbarlink">homepage</span>
          <span className="topbarlink">timeline</span>
        </div>
        <div className="topbaricon">
          <div className="topbariconitem">
            <Person />
            <span className="iconBadge">2</span>
          </div>
          <div className="topbariconitem">
            <Chat />
            <span className="iconBadge">2</span>
          </div>
          <div className="topbariconitem">
            <Notifications />
            <span className="iconBadge">2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
