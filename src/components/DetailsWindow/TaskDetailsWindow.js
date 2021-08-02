import classes from '../../styles/DetailsWindow.module.scss';

function TaskDetailsWindow(props) {
    return (
        <div className={classes.window}>
            <h1>{props.projectName}</h1>
            <h2>{props.taskName}</h2>
            <span>{props.taskPriority}</span>
            <p>{props.taskDescription}</p>
            <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
        </div>
    );
}

export default TaskDetailsWindow;