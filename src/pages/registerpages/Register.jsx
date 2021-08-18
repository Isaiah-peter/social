import './register.css'

function Register() {
  return (
    <div className='login'>
      <div className="loginwrapper">
        <div className="loginleft">
          <h1 className="appname">SocialGround</h1>
          <h4 className="desc">Connect with friends everywhere</h4>
        </div>
        <div className="loginright">
          <div className="registerinput">
            <input type="text" className='inputemail' placeholder='Username' />
            <input type="email" className='inputemail' placeholder='Email' />
            <input type="password" className='inputemail' placeholder='Password' />
            <input type="password" className='inputemail' placeholder='Password again' />
            <button className='loginbutton'>Sign Up</button>
            <button className="register">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register