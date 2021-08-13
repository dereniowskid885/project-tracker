import classes from '../styles/UserPanel.module.scss';
import ProjectAdd from './ProjectAdd';
import TaskAdd from './TaskAdd';
import { useState } from 'react';
import DetailsBackground from './DetailsWindow/DetailsBackground';

function UserPanel(props) {
    const [ projectAddIsOpen, setProjectAddState ] = useState(false);
    const [ taskAddIsOpen, setTaskAddState ] = useState(false);
    const [ itemIsAdded, setItemAddState ] = useState(false);
    const [ detailsAreOpen, setDetailsState ] = useState(false);

    function showProjectAdd() {
        setTaskAddState(false);
        setProjectAddState(true);
        setDetailsState(true);
    }

    function showTaskAdd() {
        setProjectAddState(false);
        setTaskAddState(true);
        setDetailsState(true);
    }

    function itemAddAlert() {
        setItemAddState(true);
        setTimeout(() => { setItemAddState(false); }, 3000);
    }

    function closeDetails() {
        setDetailsState(false);
        setTaskAddState(false);
        setProjectAddState(false);
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
            <div className={classes.panel__buttons}>
                <button className={classes.panel__btn}>Show your projects</button>
                <button className={classes.panel__btn} onClick={showProjectAdd}>Add Project</button>
                <button className={classes.panel__btn}>Show your tasks</button>
                <button className={classes.panel__btn} onClick={showTaskAdd}>Add Task</button>
            </div>
            { projectAddIsOpen && <ProjectAdd sendData={sendData} onCloseBtnClick={closeDetails} /> }
            { taskAddIsOpen && <TaskAdd sendData={sendData} onCloseBtnClick={closeDetails} /> }
            { ((projectAddIsOpen && detailsAreOpen) || (taskAddIsOpen && detailsAreOpen)) && <DetailsBackground onCloseBtnClick={closeDetails} /> }
            { itemIsAdded && <h1 className={classes.panel__message}>Success !</h1> }
        </div>
    );
}

export default UserPanel;