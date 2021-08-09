import classes from '../../styles/DetailsWindow.module.scss';

function TaskDetailsWindow(props) {
    return (
        <div className={classes.window}>
            <h1>{props.projectName}</h1>
            <h2>{props.taskName}</h2>
            <span>{props.taskPriority}</span>
            <p>{props.taskDescription}</p>
            <div className={classes.window__buttons}>
                <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Edit</button>
                <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Delete</button>
                <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
            </div>
        </div>
    );
}

export default TaskDetailsWindow;