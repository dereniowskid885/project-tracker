import classes from '../styles/UserPanel.module.scss';
import ProjectAdd from './ProjectAdd';
import TaskAdd from './TaskAdd';
import { useState } from 'react';

function UserPanel(props) {
    const [ projectAddIsOpen, setProjectAddState ] = useState(false);
    const [ taskAddIsOpen, setTaskAddState ] = useState(false);
    const [ itemIsAdded, setItemAddState ] = useState(false);

    function showProjectAdd() {
        setTaskAddState(false);
        setProjectAddState(true);
    }

    function showTaskAdd() {
        setProjectAddState(false);
        setTaskAddState(true);
    }

    function itemAddAlert() {
        setItemAddState(true);
        setTimeout(() => { setItemAddState(false); }, 3000);
    }

    function sendData(formData, table) {
        fetch(
            'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/' + table + '.json',
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-type': 'application/json' }
            }
        ).then(() => {
            itemAddAlert();
        });
    }

    return (
        <div className={classes.panel}>
            <h1>Welcome back {props.userDetails.username} !</h1>
            <button className={classes.panel__btn + ' ' + classes.panel__btnShow}>Show your projects</button>
            <button className={classes.panel__btn} onClick={showProjectAdd}>Add Project</button>
            <button className={classes.panel__btn + ' ' + classes.panel__btnShow}>Show your tasks</button>
            <button className={classes.panel__btn} onClick={showTaskAdd}>Add Task</button>
            { projectAddIsOpen && <ProjectAdd sendData={sendData} /> }
            { taskAddIsOpen && <TaskAdd sendData={sendData} /> }
            { itemIsAdded && <h1 className={classes.panel__message}>Success !</h1> }
        </div>
    );
}

export default UserPanel;