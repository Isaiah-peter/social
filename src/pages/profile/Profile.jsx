import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightbar/Rightbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Topbar from "../../component/topbar/Topbar";
import "./profile.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../component/context/AuthContext";

function Profile() {
  const param = useParams();
  const [users, setUser] = useState([]);
  const [follower, setFollower] = useState([]);
  const [desc, setDesc] = useState("");
  const { user } = useContext(AuthContext);

  const id = param.id;

  useEffect(() => {
    getUser();
    getFollower();
  }, [id]);

  const getUser = async () => {
    const res = await axios.get(`http://Localhost:8000/user/${param.id}`, {
      headers: {
        Authorization: `Bearer ${user.token} `,
      },
    });
    setUser(res.data);
  };

  const getFollower = async () => {
    const res = await axios.get(`http://localhost:8000//follower/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token} `,
      },
    });
    setFollower(res.data);
  };
  console.log(follower);

  const editHandler = async () => {
    const data = {
      description: desc,
    };

    await axios.put(`http://localhost:8000/user/${user.user.ID}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    window.location.href = `http://localhost:3000/profile/${param.id}`;
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileright">
          <div className="profiletop">
            <div className="profilecover">
              <img
                src={users.coverpicture}
                alt="cover"
                className="profileCoverImg"
              />
              <img
                src={users.profilepicture}
                alt="cover"
                className="profileUserImg"
              />
            </div>
            <div className="profileinfo">
              <h4 className="profileinfoname">{users.username}</h4>
              <h6 className="profileinfodesc">{users.description}</h6>
              {user.user.username === users.username && (
                <div className="editpage">
                  <button className="editdesc">edit</button>
                  <div className="covr">
                    <div className="editarea">
                      <textarea
                        className="descinput"
                        maxLength={130}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      ></textarea>
                      <div className="editbuttoncontainer">
                        <button className="save btn" onClick={editHandler}>
                          save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
