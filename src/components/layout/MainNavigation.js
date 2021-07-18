import classes from '../../styles/MainNavigation.module.scss';
import { Link } from 'react-router-dom';

function MainNavigation() {
    return (
        <nav className={classes.nav}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/tasks">Tasks</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

export default MainNavigation;