import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/registerpages/Register";
import { AuthContext } from "./component/context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user && user.status ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        {user && (
          <Route path="/profile/:id">
            <Profile />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
