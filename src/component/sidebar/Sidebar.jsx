import './sidebar.css'
import { Chat } from '@material-ui/icons'
import CloseFriend from '../closeFriend/CloseFriend'

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="wrapper">
        <ul className="list">
          <li className="items">
            <Chat className='icon' />
            <span className="text">Chat</span>
          </li>
        </ul>
        <hr className="sidebarhr" />
        <ul className="friendList">
         <CloseFriend /> 
        </ul>
      </div>

    </div>
  )
}

export default Sidebar
