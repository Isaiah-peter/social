import { useState, useEffect } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Not } from "./Not";

function Topbar() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [notification, setNotification] = useState([]);
  const [showNot, setShowNot] = useState(false);

  useEffect(() => {
    if (search) {
      searcher();
    }
  }, [search]);

  useEffect(() => {
    getNote();
  }, []);

  const searchBar = (e) => {
    setSearch(e.target.value);
  };

  const getNote = async () => {
    const res = await axios.get(
      `http://Localhost:8000/notification/${user.user.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      }
    );
    setNotification(res.data);
  };

  const searcher = async () => {
    const data = await axios.get("http://localhost:8000/search", {
      params: {
        username: search,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setResult(data.data);
  };

  const renderList = result.map((res) => {
    return (
      <li className="search-list">
        <a href={`/profile/${res.username}`}>
          <div className="search-link">
            <img
              className="topbarimage r"
              src={res.profilepicture || "/asset/noAvatar.png"}
              alt="search"
            />
            <p>{res.name}</p>
          </div>
        </a>
      </li>
    );
  });

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
            placeholder="Search GroundSocial"
            className="searchinput"
            onChange={searchBar}
          />
          {search !== "" ? (
            <div className="search">
              <ul>{renderList}</ul>
            </div>
          ) : null}
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
          <div className="topbariconitem" onClick={() => setShowNot(!showNot)}>
            <Notifications className="icons" />
            {notification.length != 0 && (
              <span className="iconBadge">{notification.length}</span>
            )}
          </div>
        </div>
        <div className="logoutplace">
          <Link to={{ pathname: `/profile/${user.user.username}` }}>
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
        {showNot && (
          <div className="notificationContainer">
            <ul className="notlist">
              {notification.map((n) => {
                return <Not key={n.ID} n={n} />;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
