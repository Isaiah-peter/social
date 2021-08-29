import { useContext, useRef, useState } from "react";
import "./share.css";
import { AuthContext } from "../context/AuthContext";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import storage from "../../base";

function Share() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [uploaded, setUpload] = useState(0);
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState(null);

  const desc = useRef();

  const handleUpload = (e) => {
    e.preventDefault();
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = storage.ref(
      storage.getStorage(),
      "images/" + Date.now() + file.name
    );
    const uploadTask = storage.uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setLevel(Math.floor(progress));
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage.getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUpload(uploaded + 1);
          setImage(downloadURL);
        });
      }
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      user_id: user.user.ID,
      description: desc.current.value,
      image: image,
    };
    setImage(null);
    setUpload(0);
    desc.current.value = "";

    try {
      await axios.post("http://Localhost:8000/post", newPost, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="wrapper">
        <div className="top">
          <Link to={`profile/${user.user.ID}`}>
            <img
              src={user.user.profilepicture || "/asset/noAvatar.png"}
              alt=""
              className="userpic"
            />
          </Link>
          <input
            type="text"
            placeholder={
              "what is in your mind" + " " + user.user.username + "?"
            }
            ref={desc}
            className="postdescriptions"
          />
        </div>
        <hr className="shareHr" />
        <form className="button">
          <div className="optioncontainer">
            <label htmlFor="file" className="options">
              <PermMedia htmlColor="tomato" className="iconshare" />
              <span className="optiontext">Image</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="options">
              <Label htmlColor="blue" className="iconshare" />
              <span className="optiontext">tag</span>
            </div>
            <div className="options">
              <Room htmlColor="green" className="iconshare" />
              <span className="optiontext">location</span>
            </div>
            <div className="options">
              <EmojiEmotions htmlColor="goldenrod" className="iconshare" />
              <span className="optiontext">feelings</span>
            </div>
          </div>
          {uploaded === 1 ? (
            <button
              className="shareButton"
              onClick={submitHandler}
              type="submit"
            >
              share
            </button>
          ) : (
            <button className="shareButton" onClick={handleUpload}>
              {level === null ? "uplaod" : `${level}%`}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Share;
