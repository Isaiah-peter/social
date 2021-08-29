import "./Message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export const Message = ({ own, message }) => {
  const [users, setUser] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(
      `http://Localhost:8000/user/${message.sender}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (message.sender !== "") {
      setUser(res.data);
    }
  };
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={
            users.profilepicture ? users.profilepicture : "/asset/noAvatar.png"
          }
          alt="user"
          className="messageUserImage"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messagebottom">{format(message.CreatedAt)}</div>
    </div>
  );
};
