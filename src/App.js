import MainNavigation from './components/layout/MainNavigation';
import Logo from './components/layout/Logo';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import Tasks from './components/pages/Tasks';
import About from './components/pages/About';
import classes from './styles/Projects.module.scss'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className={classes.container}>
      <Logo />
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Home />
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
