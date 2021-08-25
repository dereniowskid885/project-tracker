import classes from '../../styles/DetailsWindow.module.scss';
import tasks from '../../styles/Items.module.scss';
import TaskItem from '../TaskItem';
import ProjectEditWindow from './ProjectEditWindow';
import { useState, useEffect } from 'react';

function ProjectDetailsWindow(props) {
    const [ tasksAreOpen, setTasksState ] = useState(false);
    const [ fetchedData, setFetchedData ] = useState([]);
    const [ noTasks, setNoTasksState ] = useState(false);
    const [ projectEditIsOpen, setProjectEditState ] = useState(false);

    function showProjectEdit() {
        setProjectEditState(true);
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

    useEffect(() => {
        fetch(
          'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
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
                setNoTasksState(true);
            } else {
                setFetchedData(tempData);
            }
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.window + ' ' + [tasksAreOpen && classes.window__tasksDetails]}>
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
                                    setFetchedData={setFetchedData}
                                />
                            ))}
                        </div>
                    :
                        <div className={classes.tasks}>
                            <h2>There are no tasks in this project yet.</h2>
                        </div>
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
                    onEditComplete={props.onEditComplete}
                />
            }
        </div>
    );
}

export default ProjectDetailsWindow;