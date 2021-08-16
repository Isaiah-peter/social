import './share.css'
import {PermMedia, Label, Room, EmojiEmotions} from '@material-ui/icons'

function Share() {
    return (
        <div className="share">
            <div className="wrapper">
                <div className="top">
                    <img src="/asset/person/1.jpg" alt="" className='userpic' />
                    <input type="text" placeholder='what is in your mind' className='postdescriptions' />
                </div>
                <hr className="shareHr" />
                <div className="button">
                    <div className="optioncontainer">
                        <div className="options">
                            <PermMedia htmlColor='tomato' className='iconshare'/>
                            <span className='optiontext'>Image</span>
                        </div>
                        <div className="options">
                            <Label htmlColor='blue' className='iconshare'/>
                            <span className='optiontext'>tag</span>
                        </div>
                        <div className="options">
                            <Room htmlColor='green' className='iconshare'/>
                            <span className='optiontext'>location</span>
                        </div>
                        <div className="options">
                            <EmojiEmotions htmlColor='goldenrod' className='iconshare'/>
                            <span className='optiontext'>feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">share</button>
                </div>
            </div>
        </div>
    )
}

export default Share
