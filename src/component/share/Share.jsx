import { useContext, useRef, useState } from "react";
import "./share.css";
import { AuthContext } from "../context/AuthContext";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import storage from "../../firebase";

function Share() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [uploaded, setUpload] = useState(0);
  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      user_id: user.user.ID,
      description: desc.current.value,
    };

    const upload = (items) => {
      items.forEach((item) => {
        const uploadTask = storage.ref(`/items/${item.file.name}`).put(item);
        uploadTask.on(
          "state_changes",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is" + " " + progress);
          },
          (err) => {
            console.log(err);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              setFile({ [label.item]: url });
              setUpload((prev) => prev + 1);
            });
          }
        );
      });
    };

    const handleUpload = (e) => {
      e.preventDefault();
      upload([{ file: file, label: "image" }]);
    };

    try {
      await axios.post("http://Localhost:9900/post", newPost, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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
        <form className="button" onSubmit={submitHandler}>
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
            <button className="shareButton" type="submit">
              share
            </button>
          ) : (
            <button className="shareButton" onClick={handleUpload}>
              uplaod
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Share;
