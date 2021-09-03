import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Topbar() {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="topbarContainer">
      <div className="left">
        <span className="logo">
          <Link to="/" className="link">
            SocialGround
          </Link>
        </span>
      </div>
      <div className="center">
        <div className="searchbar">
          <Search />
          <input
            type="text"
            placeholder="search post, friend"
            className="searchinput"
          />
        </div>
      </div>
      <div className="right">
        <div className="topbarlinkContainer">
          <span className="topbarlink">Homepage</span>
          <span className="topbarlink">Timeline</span>
        </div>
        <div className="topbaricon">
          <div className="topbariconitem">
            <Person className="icons" />
            <span className="iconBadge">2</span>
          </div>
          <div className="topbariconitem">
            <Chat className="icons" />
            <span className="iconBadge">2</span>
          </div>
          <div className="topbariconitem">
            <Notifications className="icons" />
            <span className="iconBadge">2</span>
          </div>
        </div>
        <div className="logoutplace">
          <Link to={{ pathname: `profile/${user.user.ID}` }}>
            <img
              src={user.user.profilepicture || "/asset/noAvatar.png"}
              alt="user"
              className="topbarimage"
            />
          </Link>

          <button className="logout" onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
