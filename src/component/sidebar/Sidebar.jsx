import "./sidebar.css";
import { Chat } from "@material-ui/icons";
import CloseFriend from "../closeFriend/CloseFriend";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const [friend, setFriend] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getFollower();
  }, []);
  const getFollower = async () => {
    const res = await axios.get(
      `http://localhost:8000/follower/${user.user.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      }
    );
    setFriend(res.data);
  };
  return (
    <div className="sidebar">
      <div className="wrapper">
        <ul className="list">
          <li className="items">
            <Chat className="icon" />
            <Link to="/messenger" className="link">
              <span className="text">Chat</span>
            </Link>
          </li>
        </ul>
        <hr className="sidebarhr" />
        <ul className="friendList">
          {friend.map((f) => (
            <CloseFriend key={f.ID} f={f} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
