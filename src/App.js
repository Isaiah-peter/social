import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/registerpages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' >
          <Home />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/:username' >
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
