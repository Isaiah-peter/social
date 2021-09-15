import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Comment = ({ c }) => {
  const [users, setUser] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    CommentedUser();
  }, [c]);

  const CommentedUser = async () => {
    const res = await axios.get(`http://localhost:8000/user/${c.user_id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setUser(res.data);
  };
  return (
    <div className="message ">
      <div className="messageTop">
        <img
          src={
            users.profilepicture ? users.profilepicture : "/asset/noAvatar.png"
          }
          alt="user"
          className="messageUserImage"
        />
        <div className="messageText commenttext">
          <h6 className="messageusername">{users.username}</h6>
          <p>{c.comment}</p>
        </div>
      </div>
    </div>
  );
};
