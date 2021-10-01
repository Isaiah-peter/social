import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../component/context/AuthContext";
import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightbar/Rightbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Topbar from "../../component/topbar/Topbar";
import { io } from "socket.io-client";
import "./home.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [follower, setFollower] = useState([]);

  const socket = useRef();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getFollower();
    socket.current = io("https://social-ground-chat.herokuapp.com/");
  }, []);
  const getFollower = async () => {
    const res = await axios.get(
      `http://localhost:8000//follower/${user.user.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      }
    );
    setFollower(res.data);
  };

  useEffect(() => {
    socket.current.emit("addUser", user.user.ID);
    socket.current.on("getUsers", (users) => {
      setUsers(follower.filter((f) => users.some((u) => u.userId === f.ID)));
    });
  }, [follower]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Feed />
        <Rightbar users={users} currentId={user.user.ID} />
      </div>
    </>
  );
}

export default Home;
