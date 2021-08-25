import classes from '../../styles/DetailsWindow.module.scss';
import TaskEditWindow from './TaskEditWindow';
import { useState } from 'react';

function TaskDetailsWindow(props) {
    const [ taskEditIsOpen, setTaskEditState ] = useState(false);

    function showTaskEdit() {
        setTaskEditState(true);
    }

    function hideTaskEdit() {
        setTaskEditState(false);
    }

    return (
        <div className={classes.window}>
            <h2>{props.projectName}</h2>
            <h2 className={(props.taskPriority === "High" && classes.window__priorityHigh) + ' ' +
                               (props.taskPriority === "Medium" && classes.window__priorityMed) + ' ' +
                               (props.taskPriority === "Low" && classes.window__priorityLow)}>{props.taskPriority}</h2>
            <h2>{props.assignedUser}</h2>
            <h2 className={classes.window__taskName}>{props.taskName}</h2>
            <p>{props.taskDescription}</p>
            <div className={classes.window__buttons}>
                <button className={classes.window__btn} onClick={showTaskEdit}>Edit</button>
                <button className={classes.window__btn} onClick={props.onDeleteBtnClick}>Delete</button>
                <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
            </div>
            { taskEditIsOpen &&
                <TaskEditWindow
                    taskId={props.taskId}
                    taskName={props.taskName}
                    projectName={props.projectName}
                    taskPriority={props.taskPriority}
                    assignedUser={props.assignedUser}
                    taskDescription={props.taskDescription}
                    onCloseBtnClick={hideTaskEdit}
                    closeDetails={props.onCloseBtnClick}
                    onEditComplete={props.onEditComplete}
                /> 
            }
        </div>
    );
}

export default TaskDetailsWindow;