import HomeRightBar from "../homerightbar/homerightbar";
import ProfileRightBar from "../profilerightbar/profilerightbar";
import "./rightbar.css";

function Rightbar({ user, follower }) {
  return (
    <div className="rightbar">
      <div className="rightwrapper">
        {user ? (
          <ProfileRightBar user={user} follower={follower} />
        ) : (
          <HomeRightBar />
        )}
      </div>
    </div>
  );
}

export default Rightbar;
