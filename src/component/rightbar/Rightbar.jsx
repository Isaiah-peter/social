import HomeRightBar from "../homerightbar/homerightbar";
import ProfileRightBar from "../profilerightbar/profilerightbar";
import "./rightbar.css";

function Rightbar({ users, user, follower, currentId }) {
  return (
    <div className="rightbar">
      <div className="rightwrapper">
        {user ? (
          <ProfileRightBar user={user} follower={follower} />
        ) : (
          <HomeRightBar onlineUser={users} home currentId={currentId} />
        )}
      </div>
    </div>
  );
}

export default Rightbar;
