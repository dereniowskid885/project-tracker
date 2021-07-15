import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import classes from '../../../styles/Logo.module.scss';

library.add(fas, fab);

function Logo() {
    return (
        <div className={classes.logo}>
            <FontAwesomeIcon className={classes.logo__icon} icon="bug" />
            <FontAwesomeIcon className={classes.logo__icon} icon="binoculars" />
            <h1 className={classes.logo__title}>Project Tracker</h1>
        </div>
    );
}

export default Logo;