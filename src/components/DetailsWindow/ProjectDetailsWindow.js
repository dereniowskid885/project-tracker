import classes from '../../styles/DetailsWindow.module.scss';
import tasks from '../../styles/Items.module.scss';
import TaskItem from '../items/TaskItem';
import ProjectEditWindow from './ProjectEditWindow';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import Fade from 'react-reveal/Fade';

library.add(fas, fab);

function ProjectDetailsWindow(props) {
    const [ tasksAreOpen, setTasksState ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);
    const [ noTasks, setNoTasksState ] = useState(false);
    const [ userNotLoggedIn, setUserNotLoggedInState ] = useState(false);
    const [ projectEditIsOpen, setProjectEditState ] = useState(false);

    function showProjectEdit() {
        if (props.userLoggedIn) {
            setProjectEditState(true);
        } else {
            setUserNotLoggedInState(true);
            setTimeout(() => { setUserNotLoggedInState(false); }, 3000);
        }
    }

    function hideProjectEdit() {
        setProjectEditState(false);
    }

    function showTasks() {
        setTasksState(true);
    }

    function hideTasks() {
        setTasksState(false);
    }

    function fetchTasks() {
        setIsLoading(true);

        fetch(
            'http://localhost:8000/api/tasks/'
        ).then(response => {
            return response.json();
        }).then(data => {
            const tempData = [];

            for (const key in data) {
                const item = {
                    id: key,
                    ...data[key]
                };

                if (item.projectName === props.projectName) {
                    tempData.push(item);
                }
            }

            if (tempData.length === 0) {
                setIsLoading(false);
                setNoTasksState(true);
            } else {
                setIsLoading(false);
                setFetchedData(tempData);
            }
        });
    }

    useEffect(() => { 
        fetchTasks();
        // eslint-disable-next-line
    }, []);

    return (
        <Fade>
            <div className={classes.window + ' ' + [tasksAreOpen && classes.window__tasksDetails]}>
                <FontAwesomeIcon className={classes.window__icon} icon="times-circle" onClick={props.onCloseBtnClick}/>
                <h1>{props.projectName}</h1>
                <ol>
                    { props.projectMembers && props.projectMembers.map((member) => (
                        <li key={member}>{member}</li>
                    ))}
                </ol>
                <p className={classes.window__projectDescription}>{props.projectDescription}</p>
                { tasksAreOpen ?
                    <div className={classes.tasks}>
                        <div className={classes.window__buttons + ' ' + classes.window__buttonsDetails}>
                            <button className={classes.window__btn} onClick={hideTasks}>Hide Tasks</button>
                            <button className={classes.window__btn} onClick={showProjectEdit}>Edit</button>
                            <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
                        </div>
                        { isLoading &&
                            <div className={classes.alert}>
                                <BeatLoader color={'#6b6b83a4'} />
                            </div>
                        }
                        { !noTasks ?
                            <div className={tasks.content + ' ' + tasks.detailsContent}>
                                { fetchedData.map((item) => (
                                    <TaskItem
                                        key={item.id}
                                        taskId={item.id}
                                        projectName={item.projectName}
                                        taskPriority={item.taskPriority}
                                        taskName={item.taskName}
                                        assignedUser={item.assignedUser}
                                        taskDescription={item.taskDescription}
                                        setIsLoading={setIsLoading}
                                        reloadTasks={fetchTasks}
                                        userLoggedIn={props.userLoggedIn}
                                        detailsWindowInit={true}
                                    />
                                ))}
                            </div>
                        :
                            <h2 className={classes.tasks}>There are no tasks in this project yet.</h2>
                        }
                    </div>
                :
                    <div className={classes.window__buttons}>
                        <button className={classes.window__btn} onClick={showTasks}>Show Tasks</button>
                        <button className={classes.window__btn} onClick={showProjectEdit}>Edit</button>
                        <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
                    </div>
                }
                { projectEditIsOpen &&
                    <ProjectEditWindow 
                        projectId={props.projectId}
                        projectName={props.projectName}
                        projectDescription={props.projectDescription}
                        projectMembers={props.projectMembers}
                        onCloseBtnClick={hideProjectEdit}
                        closeDetails={props.onCloseBtnClick}
                        reloadUserProjects={props.reloadUserProjects}
                        userPanelInit={props.userPanelInit}
                        reloadProjects={props.reloadProjects}
                        userLoggedIn={props.userLoggedIn}
                    />
                }
                { userNotLoggedIn &&
                    <Fade>
                        <h1 className={classes.window__message}>You must be logged in!</h1>
                    </Fade>
                }
            </div>
        </Fade>
    );
}

export default ProjectDetailsWindow;