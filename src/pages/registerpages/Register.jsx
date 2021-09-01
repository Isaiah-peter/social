import { useRef } from "react";
import axios from "axios";
import "./register.css";
import { useHistory, Link } from "react-router-dom";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("http://Localhost:8000/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
          <h1 className="appname">SocialGround</h1>
          <h4 className="desc">Connect with friends everywhere</h4>
        </div>
        <div className="loginright">
          <form className="registerinput" onSubmit={handleClick}>
            <input
              type="text"
              required
              ref={username}
              className="inputemail"
              placeholder="Username"
            />
            <input
              type="email"
              required
              ref={email}
              className="inputemail"
              placeholder="Email"
            />
            <input
              type="password"
              required
              ref={password}
              className="inputemail"
              placeholder="Password"
              minLength="6"
            />
            <input
              type="password"
              required
              ref={passwordAgain}
              className="inputemail"
              placeholder="Password again"
            />
            <button className="loginbutton" type="submit">
              Sign Up
            </button>

            <button className="register" type="button">
              <Link to="/login" className="link">
                Login
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
