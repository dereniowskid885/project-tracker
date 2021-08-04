import classes from '../styles/UserPanel.module.scss';
import ProjectAdd from './ProjectAdd';
import TaskAdd from './TaskAdd';
import { useState } from 'react';

function UserPanel(props) {
    const [ projectAddIsOpen, setProjectAddState ] = useState(false);
    const [ taskAddIsOpen, setTaskAddState ] = useState(false);

    function showProjectAdd() {
        setTaskAddState(false);
        setProjectAddState(true);
    }

    function showTaskAdd() {
        setProjectAddState(false);
        setTaskAddState(true);
    }

    return (
        <div className={classes.panel}>
            <h1>Welcome back {props.userDetails.username} !</h1>
            <button className={classes.panel__btn + ' ' + classes.panel__btnShow}>Show your projects</button>
            <button className={classes.panel__btn} onClick={showProjectAdd}>Add Project</button><br />
            <button className={classes.panel__btn + ' ' + classes.panel__btnShow}>Show your tasks</button>
            <button className={classes.panel__btn} onClick={showTaskAdd}>Add Task</button><br /><br />
            { projectAddIsOpen && <ProjectAdd /> }
            { taskAddIsOpen && <TaskAdd /> }
        </div>
    );
}

export default UserPanel;