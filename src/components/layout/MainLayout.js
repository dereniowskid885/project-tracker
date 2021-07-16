import Logo from './Logo';
import MainNavigation from './MainNavigation';
import MainContent from './MainContent';
import classes from '../../styles/MainLayout.module.scss';

function MainLayout() {
    return (
        <div className={classes.container}>
            <Logo />
            <MainNavigation />
            <MainContent />
        </div>
    );
}

export default MainLayout;