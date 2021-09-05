function CloseFriend({ f }) {
  return (
    <>
      <li className="friend">
        <img
          src={f.profilepicture || "/asset/noAvatar.png"}
          alt=""
          className="profilepicture"
        />
        <span className="username">{f.username}</span>
      </li>
    </>
  );
}

export default CloseFriend;
