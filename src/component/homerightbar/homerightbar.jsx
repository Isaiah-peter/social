import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const HomeRightBar = ({ onlineUser, currentId, currentChat }) => {
  const [friend, setFriend] = useState([]);
  const [onlineFriend, setOnlineFriend] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getFollower();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriend(friend.filter((f) => onlineUser.includes(f.ID)));
  }, [onlineUser, friend]);

  const getFollower = async () => {
    const res = await axios.get(
      `http://192.168.88.156:8000//follower/${currentId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      }
    );
    setFriend(res.data);
  };

  const handleClick = async (users) => {
    const data = {
      recieve_id: users.ID,
      sender_id: user.user.ID,
    };
    const res = await axios.post(
      `http://192.168.88.156:8000/addfollowertomessage`,
      data,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(res);
    currentChat(res.data);
  };

  return (
    <>
      <h4 className="title">Online Friend</h4>
      {onlineUser && (
        <ul className="list">
          {onlineUser.map((o) => {
            return (
              <li className="items" onClick={() => handleClick(o)}>
                <div className="imageContainer">
                  <img
                    src={o?.profilepicture || "/asset/noAvatar.png"}
                    alt=""
                    className="userimage"
                  />
                  <span className="greenbagde"></span>
                </div>
                <div className="username">{o?.username}</div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default HomeRightBar;
