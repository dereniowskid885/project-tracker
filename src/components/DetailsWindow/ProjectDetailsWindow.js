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
            { tasksAreOpen &&
                <div className={classes.tasks}>
                    <Tasks detailsContent={classes.detailsContent}/>
                </div>
            }
            { tasksAreOpen &&
                <button className={classes.window__btn + ' ' + classes.window__btnDouble} onClick={hideTasks}>Hide Tasks</button>
            }
            { tasksAreOpen ||
                <button className={classes.window__btn + ' ' + classes.window__btnDouble} onClick={showTasks}>Show Tasks</button>
            }
            <button className={classes.window__btn + ' ' + classes.window__btnDouble} onClick={props.onCloseBtnClick}>Close</button>
        </div>
    );
}

export default ProjectDetailsWindow;