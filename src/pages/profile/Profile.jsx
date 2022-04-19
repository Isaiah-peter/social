import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightbar/Rightbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Topbar from "../../component/topbar/Topbar";
import "./profile.css";
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../component/context/AuthContext";
import { Camera, Update } from "@material-ui/icons";
import storage from "../../base";

function Profile() {
  const param = useParams();
  const [users, setUser] = useState([]);
  const [follower, setFollower] = useState([]);
  const [desc, setDesc] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const [coverphoto, setCoverPhoto] = useState("");
  const { user } = useContext(AuthContext);
  const [model, setModel] = useState(false);

  const id = param.id;

  useEffect(() => {
    getUser();
  }, [id]);

  useEffect(() => {
    getFollower(users.ID);
  }, [users]);

  useEffect(() => {
    if (profilepic != "") {
      handleUpload();
    }
  }, [profilepic]);

  useEffect(() => {
    if (coverphoto != "") {
      handleUploadC();
    }
  }, [coverphoto]);

  const getUser = async () => {
    const res = await axios.get(
      `http://Localhost:8000/userdata?username=${param.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      }
    );
    setUser(res.data[0]);
  };

  const getFollower = async (id) => {
    const res = await axios.get(`http://localhost:8000/follower/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token} `,
      },
    });
    setFollower(res.data);
  };

  const handleUpload = () => {
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = storage.ref(
      storage.getStorage(),
      "images/" + Date.now() + profilepic.name
    );
    const uploadTask = storage.uploadBytesResumable(
      storageRef,
      profilepic,
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            const data = {
              profilepicture: downloadURL,
            };

            await axios.put(
              `http://localhost:8000/user/${user.user.ID}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );

            window.location.href = `/profile/${users.username}`;
          });
      }
    );
  };

  const handleUploadC = () => {
    const metadata = {
      contentType: "image/jpeg" || "image/jpg" || "image/png",
    };

    const storageRef = storage.ref(
      storage.getStorage(),
      "images/" + Date.now() + coverphoto
    );
    const uploadTask = storage.uploadBytesResumable(
      storageRef,
      coverphoto,
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            const data = {
              coverpicture: downloadURL,
            };

            await axios.put(
              `http://localhost:8000/user/${user.user.ID}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );

            window.location.href = `/profile/${users.username}`;
          });
      }
    );
  };

  const editHandler = async () => {
    const data = {
      description: desc,
    };

    await axios.put(`http://localhost:8000/user/${user.user.ID}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setModel(!model);
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
                src={users.coverpicture || "/asset/noAvatar.png"}
                alt="cover"
                className="profileCoverImg"
              />
              <img
                src={users.profilepicture || "/asset/noAvatar.png"}
                alt="cover"
                className="profileUserImg"
              />
              {user.user.ID === users.ID && (
                <>
                  <label htmlFor="profilepicture" className="profilepic">
                    <Camera />
                  </label>
                  <input
                    type="file"
                    id="profilepicture"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    hidden
                  />
                  <label htmlFor="coverphoto" className="cover">
                    <Update /> Cover Photo
                  </label>
                  <input
                    type="file"
                    id="coverphoto"
                    hidden
                    onChange={(e) => setCoverPhoto(e.target.files[0])}
                  />
                </>
              )}
            </div>
            <div className="profileinfo">
              <h4 className="profileinfoname">{users.name}</h4>
              <h6 className="profileinfodesc">{users.description}</h6>
              {user.user.username === users.username && (
                <div className="editpage">
                  <button
                    className="editdesc"
                    onClick={() => {
                      setModel(!model);
                    }}
                  >
                    edit
                  </button>
                  {model && (
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
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="profilebottom">
            <Feed id={param.id} />
            <Rightbar id={id} user={users} follower={follower} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
