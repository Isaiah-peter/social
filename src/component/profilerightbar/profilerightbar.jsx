import { useEffect, useState } from "react";
import axios from "axios";

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
            <div key={f.ID} className="followingdetail">
              <img
                src={f.profilepicture || "/asset/person/6.jpg"}
                alt=""
                className="followingdetailimg"
              />
              <span className="followingdetailname">{f.username}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfileRightBar;
