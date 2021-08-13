import classes from '../../styles/DetailsWindow.module.scss';

function TaskDetailsWindow(props) {
    return (
        <div className={classes.window}>
            <h2>{props.projectName}</h2>
            <h2 className={(props.taskPriority === "High" && classes.window__priorityHigh) + ' ' +
                               (props.taskPriority === "Medium" && classes.window__priorityMed) + ' ' +
                               (props.taskPriority === "Low" && classes.window__priorityLow)}>{props.taskPriority}</h2>
            <h3>{props.assignedUser}</h3>
            <h3>{props.taskName}</h3>
            <p>{props.taskDescription}</p>
            <div className={classes.window__buttons}>
                <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Edit</button>
                <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
                <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Delete</button>
            </div>
        </div>
    );
}

export default TaskDetailsWindow;