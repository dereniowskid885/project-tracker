import classes from '../../styles/DetailsBackground.module.scss';

function DetailsBackground(props) {
    return (
        <div className={classes.background} onClick={props.onCloseBtnClick} />
    );
}

export default DetailsBackground;