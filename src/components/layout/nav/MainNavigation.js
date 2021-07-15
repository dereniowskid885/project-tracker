import classes from '../../../styles/MainNavigation.module.scss';

function MainNavigation() {
    return (
        <nav className={classes.nav}>
            <ul>
                <li><a href="#" title="Home">Home</a></li>
                <li><a href="#" title="Projects">Projects</a></li>
                <li><a href="#" title="Tasks">Tasks</a></li>
                <li><a href="#" title="About">About</a></li>
            </ul>
        </nav>
    );
}

export default MainNavigation;