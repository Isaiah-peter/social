import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Conversations.css";
import axios from "axios";

export const Conversations = ({ conversation, follower }) => {
  const [users, setUser] = useState(null);
  const [fe, setF] = useState([]);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    getUser();
    setF(follower);
  }, [conversation, follower]);

  const getUser = async () => {
    const res = await axios.get(
      `http://192.168.88.156:8000/user/${
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

  const handleFollowed = async (users) => {
    const data = {
      follower_id: users.ID,
      user_id: user.user.ID,
    };

    await axios.post("http://192.168.88.156:8000/follower", data, {
      headers: {
        Authorization: `Bearer ${user.token} `,
      },
    });
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

      <button className="followtheuser" onClick={() => handleFollowed(users)}>
        follow
      </button>
    </div>
  );
};
