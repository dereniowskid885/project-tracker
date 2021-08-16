import classes from '../styles/Item.module.scss';
import TaskDetailsWindow from './DetailsWindow/TaskDetailsWindow';
import DetailsBackground from './DetailsWindow/DetailsBackground';
import { useState } from 'react';

function TaskItem(props) {
    const [ detailsAreOpen, setDetailsState ] = useState(false);

    function showDetails() {
        setDetailsState(true);
    }

    function closeDetails() {
        setDetailsState(false);
    }

    function deleteTask() {
        setDetailsState(false);
        props.setIsLoading(true);

        fetch(
            'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + props.taskId + '.json',
            {
                method: 'DELETE'
            }
        ).then(() => {
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
        });
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
                    projectName={props.projectName}
                    taskPriority={props.taskPriority}
                    taskName={props.taskName}
                    assignedUser={props.assignedUser}
                    taskDescription={props.taskDescription}
                    onCloseBtnClick={closeDetails}
                    onDeleteBtnClick={deleteTask}
                />
            }
            { detailsAreOpen && 
                <DetailsBackground onCloseBtnClick={closeDetails} /> 
            }
        </div>
    );
}

export default TaskItem;