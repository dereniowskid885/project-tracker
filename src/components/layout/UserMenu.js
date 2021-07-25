import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';
import classes from '../../styles/UserMenu.module.scss';

library.add(fas, fab);

function UserMenu() {
    return (
        <div className={classes.user}>
            <FontAwesomeIcon className={classes.user__icon} icon="user" />
            <button className={classes.user__btn}><Link to="/">Sign in</Link></button>
        </div>
    );
}

export default UserMenu;