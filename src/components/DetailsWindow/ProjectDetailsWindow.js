import classes from '../../styles/DetailsWindow.module.scss';
import Tasks from '../pages/Tasks';
import { useState } from 'react';

function ProjectDetailsWindow(props) {
    const [ tasksAreOpen, setTasksState ] = useState(false);

    function showTasks() {
        setTasksState(true);
    }

    function hideTasks() {
        setTasksState(false);
    }

    return (
        <div className={classes.window + ' ' + [tasksAreOpen && classes.window__tasksDetails]}>
            <h1>{props.projectName}</h1>
            <ul>
                <li>XD</li>
                <li>XDXDXD</li>
            </ul>
            <p>{props.projectDescription}</p>
            { tasksAreOpen ?
                <div className={classes.tasks}>
                    <Tasks detailsContent={classes.detailsContent}/>
                    <div className={classes.window__buttons + ' ' + classes.window__buttonsDetails}>
                        <button className={classes.window__btn} onClick={hideTasks}>Hide Tasks</button>
                        <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
                        <button className={classes.window__btn}>Delete</button>
                    </div>
                </div>
                :
                <div className={classes.window__buttons}>
                    <button className={classes.window__btn} onClick={showTasks}>Show Tasks</button>
                    <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
                    <button className={classes.window__btn}>Delete</button>
                </div>
            }
        </div>
    );
}

export default ProjectDetailsWindow;