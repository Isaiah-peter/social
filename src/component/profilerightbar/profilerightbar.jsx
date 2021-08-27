import { Link } from "react-router-dom";

const ProfileRightBar = ({ user, follower }) => {
  return (
    <>
      <h4 className="rightbartitle">User information</h4>
      <div className="info">
        <div className="infoitem">
          <span className="infokey">City:</span>
          <span className="infovalue">{user.city}</span>
        </div>
        <div className="infoitem">
          <span className="infokey">from:</span>
          <span className="infovalue">{user.from}</span>
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
