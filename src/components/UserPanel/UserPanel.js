import classes from '../../styles/UserPanel.module.scss';
import ProjectAdd from './ProjectAdd';
import TaskAdd from './TaskAdd';
import UserTasks from './UserTasks';
import UserProjects from './UserProjects';
import { useState } from 'react';
import DetailsBackground from '../detailsWindow/DetailsBackground';
import Fade from 'react-reveal/Fade';

function UserPanel(props) {
    const [ projectAddIsOpen, setProjectAddState ] = useState(false);
    const [ taskAddIsOpen, setTaskAddState ] = useState(false);
    const [ detailsAreOpen, setDetailsState ] = useState(false);
    const [ userTasksAreOpen, setUserTasksState ] = useState(false);
    const [ userProjectsAreOpen, setUserProjectsState ] = useState(false);
    const [ itemIsAdded, setItemAddState ] = useState(false);
    const [ noProjectMembers, setNoProjectMembersState ] = useState(false);

    function showProjectAdd() {
        setTaskAddState(false);
        setUserTasksState(false);
        setUserProjectsState(false);
        setProjectAddState(true);
        setDetailsState(true);
    }

    function showTaskAdd() {
        setProjectAddState(false);
        setUserTasksState(false);
        setUserProjectsState(false);
        setTaskAddState(true);
        setDetailsState(true);
    }

    function showUserTasks() {
        setProjectAddState(false);
        setTaskAddState(false);
        setDetailsState(false);
        setUserProjectsState(false);
        setUserTasksState(true);
    }

    function showUserProjects() {
        setProjectAddState(false);
        setTaskAddState(false);
        setDetailsState(false);
        setUserTasksState(false);
        setUserProjectsState(true);
    }

    function itemAddAlert() {
        setItemAddState(true);
        setTimeout(() => { setItemAddState(false); }, 2000);
    }

    function noProjectMembersAlert() {
        setNoProjectMembersState(true);
        setTimeout(() => { setNoProjectMembersState(false); }, 2000);
    }

    function closeDetails() {
        setDetailsState(false);
        setTaskAddState(false);
        setProjectAddState(false);
    }

    function reloadUserProjects() {
        setUserProjectsState(false);
        setUserProjectsState(true);
    }

    function reloadUserTasks() {
        setUserTasksState(false);
        setUserTasksState(true);
    }

    function sendData(formData, table) {
        fetch(
            'http://localhost:8000/api/' + table + '/',
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
                <button className={classes.panel__btn} onClick={showUserProjects}>Show your projects</button>
                <button className={classes.panel__btn} onClick={showProjectAdd}>Add Project</button>
                <button className={classes.panel__btn} onClick={showUserTasks}>Show your tasks</button>
                <button className={classes.panel__btn} onClick={showTaskAdd}>Add Task</button>
            </div>
            { projectAddIsOpen && 
                <ProjectAdd 
                    sendData={sendData}
                    noProjectMembersAlert={noProjectMembersAlert}
                    onCloseBtnClick={closeDetails}
                /> 
            }
            { taskAddIsOpen && 
                <TaskAdd 
                    sendData={sendData} 
                    onCloseBtnClick={closeDetails} 
                /> 
            }
            { userTasksAreOpen && 
                <UserTasks 
                    userLoggedIn={props.userDetails.username} 
                    loggedIn={props.userDetails.loggedIn} 
                    reloadUserTasks={reloadUserTasks}
                /> 
            }
            { userProjectsAreOpen &&
                <UserProjects 
                    userLoggedIn={props.userDetails.username} 
                    loggedIn={props.userDetails.loggedIn} 
                    reloadUserProjects={reloadUserProjects}
                /> 
            }
            { itemIsAdded &&
                <Fade>
                    <h1 className={classes.panel__message}>Success !</h1>
                </Fade>
            }
            { noProjectMembers &&
                <Fade>
                    <h1 className={classes.panel__message}>Select project members !</h1>
                </Fade>
            }
            { ((projectAddIsOpen && detailsAreOpen) || (taskAddIsOpen && detailsAreOpen)) && 
                <DetailsBackground 
                    onCloseBtnClick={closeDetails} 
                /> 
            }
        </div>
    );
}

export default UserPanel;