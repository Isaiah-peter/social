import './login.css'

function Login() {
    return (
        <div className='login'>
            <div className="loginwrapper">
                <div className="loginleft">
                   <h1 className="appname">SocialGround</h1>
                   <h4 className="desc">Connect with friends everywhere</h4>
                </div>
                <div className="loginright">
                   <div className="logininput">
                   <input type="email" className='inputemail' placeholder='Email' />
                   <input type="password" className='inputemail' placeholder='Password' />
                   <button className='loginbutton'>Login</button>
                   <button className="register">Create Another account</button>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Login
