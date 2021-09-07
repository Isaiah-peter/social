import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import * as timeago from "timeago.js";
import { AuthContext } from "../context/AuthContext";

const Post = ({ p }) => {
  const [users, setUser] = useState([]);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getUser();
    getLike();
  }, [p]);
  const getUser = async () => {
    const res = await axios.get(`http://localhost:8000/user/${p.user_id}`, {
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
    await axios.post(`http://localhost:8000/like`, postid, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setIsLiked(true);
  };

  const dislikePost = async () => {
    await axios.delete(`http://localhost:8000/like/${p.ID}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setIsLiked(false);
  };

  const getLike = async () => {
    const res = await axios.get(`http://localhost:8000/like/${p.ID}`, {
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
            {isLiked == false ? (
              <img
                onClick={() => {
                  likePost();
                  setLike((prev) => prev + 1);
                }}
                src="asset/like.jpg"
                alt=""
                className="likeicon"
              />
            ) : (
              <img
                onClick={() => {
                  dislikePost();
                  setLike((prev) => prev - 1);
                }}
                src="asset/like.jpg"
                alt=""
                className="likeicon"
              />
            )}
            {isLiked == false ? (
              <img
                onClick={() => {
                  likePost();
                  setLike((prev) => prev + 1);
                }}
                src="asset/heart.jpg"
                alt=""
                className="likeicon"
              />
            ) : (
              <img
                onClick={() => {
                  dislikePost();
                  setLike((prev) => prev - 1);
                }}
                src="asset/heart.jpg"
                alt=""
                className="likeicon"
              />
            )}
            <span className="peoplethatlike">{like} people like</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
