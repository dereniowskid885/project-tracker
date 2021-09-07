import classes from '../../styles/DetailsBackground.module.scss';
import Fade from 'react-reveal/Fade';

function DetailsBackground(props) {
    return (
        <Fade>
            <div className={classes.background} onClick={props.onCloseBtnClick} />
        </Fade>
    );
}

export default DetailsBackground;