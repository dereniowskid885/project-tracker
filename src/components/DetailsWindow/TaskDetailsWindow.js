import classes from '../../styles/DetailsWindow.module.scss';
import TaskEditWindow from './TaskEditWindow';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState } from 'react';
import Fade from 'react-reveal/Fade';

library.add(fas, fab);

function TaskDetailsWindow(props) {
    const [ taskEditIsOpen, setTaskEditState ] = useState(false);
    const [ userNotLoggedIn, setUserNotLoggedInState ] = useState(false);

    function showTaskEdit() {
        if (props.userLoggedIn) {
            setTaskEditState(true);
        } else {
            setUserNotLoggedInState(true);
            setTimeout(() => { setUserNotLoggedInState(false); }, 3000);
        }
    }

    function hideTaskEdit() {
        setTaskEditState(false);
    }

    return (
        <div className={classes.window}>
            <FontAwesomeIcon className={classes.window__icon} icon="times-circle" onClick={props.onCloseBtnClick}/>
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
                    reloadUserTasks={props.reloadUserTasks}
                    reloadTasks={props.reloadTasks}
                    userPanelInit={props.userPanelInit}
                /> 
            }
            { userNotLoggedIn &&
                <Fade>
                    <h1 className={classes.window__message}>You must be logged in!</h1>
                </Fade>
            }
        </div>
    );
}

export default TaskDetailsWindow;