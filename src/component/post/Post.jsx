import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import * as timeago from "timeago.js";
import { AuthContext } from "../context/AuthContext";

const Post = ({ p }) => {
  const [users, setUser] = useState([]);
  const [like, setLike] = useState(0);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getUser();
    getLike();
  }, [p]);
  const getUser = async () => {
    const res = await axios.get(`http://Localhost:8000/user/${p.user_id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (p.user_id !== "") {
      setUser(res.data);
    }
  };
  const likePost = async () => {
    const postid = {
      post_id: p.ID,
    };
    await axios.post(`http://Localhost:8000/like`, postid, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  const getLike = async () => {
    const res = await axios.get(`http://Localhost:8000/like/${p.ID}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setLike(res.data.length);
  };

  return (
    <div className="post">
      <div className="wrappers">
        <div className="posttop">
          <Link to={{ pathname: `/profile/${p.user_id}` }}>
            <img
              src={
                users.profilepicture !== ""
                  ? users.profilepicture
                  : "/asset/noAvatar.png"
              }
              alt=""
              className="profileimage"
            />
          </Link>
          <span className="username">{users.username}</span>
          <span className="dayposted">{timeago.format(p.CreatedAt)}</span>
        </div>
        <div className="postcenter">
          <span className="posttext">{p.description}</span>
          <img src={p.image} alt="" className="postimage" />
        </div>
        <div className="postbuttom">
          <div className="left">
            <img
              onClick={likePost}
              src="asset/like.jpg"
              alt=""
              className="likeicon"
            />
            <img
              onClick={likePost}
              src="asset/heart.jpg"
              alt=""
              className="likeicon"
            />
            <span className="peoplethatlike">{like} people like</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
