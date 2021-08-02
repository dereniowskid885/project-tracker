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
  const [ user, setUser ] = useState({ username: "", loggedIn: false });

  function userDetails(obj) {
    setUser({ username: obj.username, loggedIn: true });
  }

  return (
    <div className={classes.container}>
      <Logo />
      <UserMenu />
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Home userDetails={user} setUserDetails={userDetails}/>
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
