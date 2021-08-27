import MainNavigation from './components/layout/MainNavigation';
import Logo from './components/layout/Logo';
import UserMenu from './components/layout/UserMenu';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import Tasks from './components/pages/Tasks';
import About from './components/pages/About';
import classes from './styles/App.module.scss'
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [ userDetails, setUserDetails ] = useState({ username: "", loggedIn: false });

  function setUser(obj) {
    setUserDetails({ username: obj.username, loggedIn: true });
  }

  function logoutUser() {
    setUserDetails({ username: "", loggedIn: false });
  }

  return (
    <main className={classes.container}>
      <Logo />
      <UserMenu userDetails={userDetails} logoutUser={logoutUser} />
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Home userDetails={userDetails} setUserDetails={setUser} />
        </Route>
        <Route path="/projects">
          <Projects userLoggedIn={userDetails.loggedIn} />
        </Route>
        <Route path="/tasks">
          <Tasks userLoggedIn={userDetails.loggedIn} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
