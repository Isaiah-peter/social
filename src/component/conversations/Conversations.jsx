import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Conversations.css";
import axios from "axios";

export const Conversations = ({ conversation }) => {
  const [users, setUser] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, [conversation]);

  const getUser = async () => {
    const res = await axios.get(
      `http://Localhost:8000/user/${
        user.user.ID !== conversation.recieve_id
          ? conversation.recieve_id
          : conversation.sender_id
      }`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (conversation.recieve_id !== "") {
      setUser(res.data);
    }
  };
  return (
    <div className="conversations">
      {users && (
        <>
          <img
            src={
              users.profilepicture
                ? users.profilepicture
                : "/asset/noAvatar.png"
            }
            className="conversationsImg"
          />
          <span className="conversationsname">{users.username}</span>
        </>
      )}
    </div>
  );
};
