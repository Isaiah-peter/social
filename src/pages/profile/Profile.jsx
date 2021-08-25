import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightbar/Rightbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Topbar from "../../component/topbar/Topbar";
import "./profile.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../component/context/AuthContext";

function Profile() {
  const param = useParams();
  const [users, setUser] = useState([]);
  const [follower, setFollower] = useState([]);
  const { user } = useContext(AuthContext);

  const id = param.id;

  useEffect(() => {
    getUser();
    getFollower();
  }, []);

  const getUser = async () => {
    const res = await axios.get(`http://Localhost:8000/user/${param.id}`, {
      headers: {
        Authorization: `Bearer ${user.token} `,
      },
    });
    setUser(res.data);
  };

  const getFollower = async () => {
    const res = await axios.get(`http://Localhost:8000//follower/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token} `,
      },
    });
    setFollower(res.data);
  };
  console.log(follower);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileright">
          <div className="profiletop">
            <div className="profilecover">
              <img
                src={
                  users.coverpicture ? user.coverpicture : "/asset/post/6.jpg"
                }
                alt="cover"
                className="profileCoverImg"
              />
              <img
                src={
                  users.profilepicture
                    ? user.profilepicture
                    : "/asset/noAvatar.png"
                }
                alt="cover"
                className="profileUserImg"
              />
            </div>
            <div className="profileinfo">
              <h4 className="profileinfoname">{users.username}</h4>
              <h6 className="profileinfodesc">{users.description}</h6>
            </div>
          </div>
          <div className="profilebottom">
            <Feed id={param.id} />
            <Rightbar user={users} follower={follower} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
