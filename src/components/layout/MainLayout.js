import Logo from './logo/Logo';
import MainNavigation from './nav/MainNavigation';
import MainContent from './content/MainContent';
import classes from './MainLayout.module.scss';

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