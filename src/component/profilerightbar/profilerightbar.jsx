import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import axios from "axios";

const ProfileRightBar = ({ user, follower }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(follower.includes(user?.ID));
  }, [follower]);

  console.log(followed, user.ID);

  const followHandler = async () => {
    try {
      const data = {
        follower_id: user.ID,
      };
      if (followed) {
        await axios.delete(`http://Localhost:8000/follower/${user.ID}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token} `,
          },
        });
      } else {
        await axios.post("http://Localhost:8000/follower", data, {
          headers: {
            Authorization: `Bearer ${currentUser.token} `,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    setFollowed(!followed);
  };
  return (
    <>
      {user.username !== currentUser.user.username && (
        <button className="rightBarfollowbutton" onClick={followHandler}>
          {followed ? "Follow" : "UnFollow"}
          {followed ? <Add /> : <Remove />}
        </button>
      )}
      <h4 className="rightbartitle">User information</h4>
      <div className="info">
        <div className="infoitem">
          <span className="infokey">City:</span>
          <span className="infovalue">{user.city}</span>
        </div>
        <div className="infoitem">
          <span className="infokey">from:</span>
          <span className="infovalue">{user.town}</span>
        </div>
        <div className="infoitem">
          <span className="infokey">Relationship:</span>
          <span className="infovalue">{user.relationship}</span>
        </div>
      </div>
      <h4 className="rightbartitle">User Friend</h4>
      <div className="following">
        {follower.map((f) => {
          return (
            <Link to={`/profile/${f.ID}`} className="link">
              <div key={f.ID} className="followingdetail">
                <img
                  src={f.profilepicture || "/asset/person/6.jpg"}
                  alt=""
                  className="followingdetailimg"
                />
                <span className="followingdetailname">{f.username}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ProfileRightBar;
