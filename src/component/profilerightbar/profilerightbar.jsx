const ProfileRightBar = () => {
    return (
      <>
        <h4 className="rightbartitle">User information</h4>
        <div className="info">
        <div className="infoitem">
          <span className="infokey">City:</span>
          <span className="infovalue">new york</span>
        </div>
        <div className="infoitem">
          <span className="infokey">from:</span>
          <span className="infovalue">Nigeria</span>
        </div>
        <div className="infoitem">
          <span className="infokey">Relationship:</span>
          <span className="infovalue">single</span>
        </div>
        </div>
        <h4 className="rightbartitle">User Friend</h4>
        <div className="following">
          <div className="followingdetail">
            <img src="/asset/person/6.jpg" alt="" className="followingdetailimg" />
            <span className="followingdetailname">paul</span>
          </div>
          <div className="followingdetail">
            <img src="/asset/person/6.jpg" alt="" className="followingdetailimg" />
            <span className="followingdetailname">paul</span>
          </div>
          <div className="followingdetail">
            <img src="/asset/person/6.jpg" alt="" className="followingdetailimg" />
            <span className="followingdetailname">paul</span>
          </div>
          <div className="followingdetail">
            <img src="/asset/person/6.jpg" alt="" className="followingdetailimg" />
            <span className="followingdetailname">paul</span>
          </div>
          <div className="followingdetail">
            <img src="/asset/person/6.jpg" alt="" className="followingdetailimg" />
            <span className="followingdetailname">paul</span>
          </div>
          <div className="followingdetail">
            <img src="/asset/person/6.jpg" alt="" className="followingdetailimg" />
            <span className="followingdetailname">paul</span>
          </div>
        </div>
      </>
    )
  }

  export default ProfileRightBar