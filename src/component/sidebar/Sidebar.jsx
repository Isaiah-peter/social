import './sidebar.css'
import { Chat } from '@material-ui/icons'

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
          <li className="friend">
            <img src="/asset/person/2.jpg" alt="" className="profilepicture" />
            <span className="username">jane</span>
          </li>
          <li className="friend">
            <img src="/asset/person/3.jpg" alt="" className="profilepicture" />
            <span className="username">jane</span>
          </li>
          <li className="friend">
            <img src="/asset/person/4.jpg" alt="" className="profilepicture" />
            <span className="username">jane</span>
          </li>
          <li className="friend">
            <img src="/asset/person/5.jpg" alt="" className="profilepicture" />
            <span className="username">jane</span>
          </li>
          <li className="friend">
            <img src="/asset/person/6.jpg" alt="" className="profilepicture" />
            <span className="username">jane</span>
          </li>
          <li className="friend">
            <img src="/asset/person/2.jpg" alt="" className="profilepicture" />
            <span className="username">jane</span>
          </li>
          <li className="friend">
            <img src="/asset/person/2.jpg" alt="" className="profilepicture" />
            <span className="username">jane</span>
          </li>
          
        </ul>
      </div>

    </div>
  )
}

export default Sidebar
