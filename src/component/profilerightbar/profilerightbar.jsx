import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Add, Message, Remove } from "@material-ui/icons";
import axios from "axios";

const ProfileRightBar = ({ user, follower, id }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [relationship, setRelationship] = useState("");

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
  const message = async (id) => {
    const data = {
      recieve_id: id,
      sender_id: currentUser.user.ID,
    };
    await axios.post(`http://localhost:8000/addfollowertomessage`, data, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    window.location.href = "http://localhost:3000/messenger";
  };

  const editHandler = async () => {
    const data = {
      city: city,
      town: town,
      relationship: relationship,
    };

    await axios.put(`http://localhost:8000/user/${currentUser.user.ID}`, data, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    window.location.href = `http://localhost:3000/profile/${id}`;
  };

  return (
    <>
      {user.username !== currentUser.user.username && (
        <div className="profilebuttons">
          <button className="rightBarfollowbutton" onClick={followHandler}>
            {followed ? "Follow" : "UnFollow"}
            {followed ? <Add /> : <Remove />}
          </button>
          <div
            className="messagebutton"
            onClick={() => {
              message(user.ID);
            }}
          >
            Messsage
          </div>
        </div>
      )}
      <h4 className="rightbartitle">User information</h4>
      {currentUser.user.username === user.username && (
        <a href="#popup" className="popupedit">
          edit
        </a>
      )}
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
      <div id="popup" className="PopupEditInfo">
        <div className="content">
          <input
            type="text"
            placeholder="city..."
            onChange={(e) => setCity(e.target.value)}
            className="edittextinput"
          />
          <input
            type="text"
            placeholder="town..."
            onChange={(e) => setTown(e.target.value)}
            className="edittextinput"
          />
          <input
            type="text"
            placeholder="relationship..."
            className="edittextinput"
            onChange={(e) => setRelationship(e.target.value)}
          />
          <div className="buttonstoedit">
            <a href={`/profile?username=${id}`} className="cancelbutton">
              cancel
            </a>
            <button className="submitbutton" onClick={editHandler}>
              save
            </button>
          </div>
        </div>
      </div>
      <h4 className="rightbartitle">User Friend</h4>
      <div className="following">
        {follower.map((f) => {
          return (
            <Link to={`/profile/${f.username}`} className="link">
              <div key={f.ID} className="followingdetail">
                <img
                  src={
                    f.profilepicture ? f.profilepicture : "/asset/noAvatar.png"
                  }
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
