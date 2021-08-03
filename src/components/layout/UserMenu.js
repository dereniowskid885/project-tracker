import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';
import classes from '../../styles/UserMenu.module.scss';

library.add(fas, fab);

function UserMenu(props) {
    return (
        <div className={classes.user}>
            <FontAwesomeIcon className={classes.user__icon} icon="user" />
            { props.userDetails.loggedIn ? 
                <div className={classes.user__info}>
                    <span>{props.userDetails.username}</span><br />
                    <button className={classes.user__btn} onClick={props.logoutUser}><Link to="/">Log out</Link></button>
                </div>
            :
                <button className={classes.user__btn}><Link to="/">Sign in</Link></button>
            }
        </div>
    );
}

export default UserMenu;