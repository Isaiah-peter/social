import { ThumbsUpDown, ThumbUp } from '@material-ui/icons'
import './Post.css'

function Post() {
  return (
    <div className='post'>
      <div className="wrappers">
        <div className="posttop">
          <img src="/asset/person/1.jpg" alt="" className="profileimage" />
          <span className="username">jane</span>
          <span className="dayposted">16m ago</span>
        </div>
        <div className="postcenter">
          <span className="posttext">goodmorning</span>
          <img src="/asset/post/1.jpg" alt="" className="postimage" />
        </div>
        <div className="postbuttom">
          <div className="left">
            <img src="asset/like.jpg" alt="" className='likeicon' />
            <img src="asset/heart.jpg" alt="" className='likeicon' />
            <span className="peoplethatlike">32 people like</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
