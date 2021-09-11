import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../context/AuthContext";

function Feed({ id }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const getPost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/getalltimeline?username=${
          id ? id : user.user.username
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.CreatedAt) - new Date(p1.CreatedAt);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPost();
  }, [id, user.user.ID]);

  return (
    <div className="feed">
      <div className="wrapper">
        <Share />
        {posts.map((post) => {
          return <Post key={post.ID} p={post} />;
        })}
      </div>
    </div>
  );
}

export default Feed;
