import classes from '../../styles/Item.module.scss';
import TaskDetailsWindow from '../detailsWindow/TaskDetailsWindow';
import DetailsBackground from '../detailsWindow/DetailsBackground';
import { useState } from 'react';

function TaskItem(props) {
    const [ detailsAreOpen, setDetailsState ] = useState(false);
    const [ userNotLoggedIn, setUserNotLoggedInState ] = useState(false);

    function showDetails() {
        setDetailsState(true);
    }

    function closeDetails() {
        setDetailsState(false);
    }

    function deleteTask() {
        if (props.userLoggedIn) {
            setDetailsState(false);
            props.setIsLoading(true);

            fetch(
                'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + props.taskId + '.json',
                {
                    method: 'DELETE'
                }
            ).then(() => {
                if (props.detailsWindowInit === true) {
                    props.reloadTasks();
                } else {
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
                
                            tempData.push(item);
                        }
                        
                        props.setIsLoading(false);
                        props.setFetchedData(tempData);
                    });
                }
            });
        } else {
            setUserNotLoggedInState(true);
            setTimeout(() => { setUserNotLoggedInState(false); }, 3000);
        }
    }

    return (
        <div>
            <div className={classes.item}>
                <h2>{props.taskName}</h2>
                <h2 className={(props.taskPriority === "High" && classes.item__priorityHigh) + ' ' +
                               (props.taskPriority === "Medium" && classes.item__priorityMed) + ' ' +
                               (props.taskPriority === "Low" && classes.item__priorityLow)}>{props.taskPriority}</h2>
                <h3>{props.assignedUser}</h3>
                <div className={classes.item__buttons}>
                    <button className={classes.item__btn} onClick={showDetails}>Show more</button>
                    <button className={classes.item__btn} onClick={deleteTask}>Delete</button>
                </div>
            </div>
            { detailsAreOpen && 
                <TaskDetailsWindow
                    taskId={props.taskId}
                    projectName={props.projectName}
                    taskPriority={props.taskPriority}
                    taskName={props.taskName}
                    assignedUser={props.assignedUser}
                    taskDescription={props.taskDescription}
                    onCloseBtnClick={closeDetails}
                    onDeleteBtnClick={deleteTask}
                    userPanelInit={props.userPanelInit}
                    reloadTasks={props.reloadTasks}
                    reloadUserTasks={props.reloadUserTasks}
                    userLoggedIn={props.userLoggedIn}
                />
            }
            { detailsAreOpen && 
                <DetailsBackground onCloseBtnClick={closeDetails} /> 
            }
            { userNotLoggedIn &&
                <h1 className={classes.item__message}>You must be logged in!</h1>
            }
        </div>
    );
}

export default TaskItem;