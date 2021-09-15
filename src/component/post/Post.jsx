import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import * as timeago from "timeago.js";
import { AuthContext } from "../context/AuthContext";
import { Comment } from "../comment/Comment";

const Post = ({ p }) => {
  const [users, setUser] = useState([]);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const [comments, setComment] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    getUser();
    getLike();
    getComment();
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

  const getComment = async () => {
    const res = await axios.get(`http://localhost:8000/comment/${p.ID}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setComment(res.data);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const data = {
      comment: text,
      post_id: p.ID,
    };

    if (text !== "") {
      const res = await axios.post(`http://localhost:8000/comment`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setComment([...comments, res.data]);
      setText("");
    }
  };

  return (
    <div className="post">
      <div className="wrappers">
        <div className="posttop">
          <Link to={{ pathname: `/profile/${users.username}` }}>
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
                src="/asset/like.jpg"
                alt=""
                className="likeicon"
              />
            ) : (
              <img
                onClick={() => {
                  dislikePost();
                  setLike((prev) => prev - 1);
                }}
                src="/asset/like.jpg"
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
                src="/asset/heart.jpg"
                alt=""
                className="likeicon"
              />
            ) : (
              <img
                onClick={() => {
                  dislikePost();
                  setLike((prev) => prev - 1);
                }}
                src="/asset/heart.jpg"
                alt=""
                className="likeicon"
              />
            )}
            <div className="likeandcommentcount">
              <span className="peoplethatlike">{like} people like</span>
              <span className="peoplethatcomment">
                {comments.length} comment
              </span>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="comments">
          <div className="commenttop">
            {comments.map((c) => {
              return <Comment c={c} />;
            })}
          </div>

          <form onSubmit={handleComment} className="commentbottom">
            <input
              type="text"
              placeholder={`what you thought ${user.user.name}`}
              className="commentinput"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
