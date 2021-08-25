import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../component/context/AuthContext";
import { login } from "../../component/context/apicall";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    login(user, dispatch);
  };
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
          <h1 className="appname">SocialGround</h1>
          <h4 className="desc">Connect with friends everywhere</h4>
        </div>
        <div className="loginright">
          <form className="logininput">
            <input
              type="email"
              className="inputemail"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="inputemail"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="loginbutton"
              disabled={isFetching}
              onClick={handleLogin}
            >
              Logins
            </button>
            <Link to="/register" className="link">
              <button
                onClick={() => console.log("working")}
                className="register"
              >
                Create Another account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
