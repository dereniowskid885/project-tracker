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

    function handleDelete(id) {
        deleteTask(id);
    }

    function deleteTask(id) {
        fetch(
            'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + id + '.json',
            {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' }
            }
        ).then(() => {
            console.log("udalo sie");
        });
    }

    return (
        <div>
            <div className={classes.item}>
                <h2>{props.projectName}</h2>
                <h2 className={(props.taskPriority === "High" && classes.item__priorityHigh) + ' ' +
                               (props.taskPriority === "Medium" && classes.item__priorityMed) + ' ' +
                               (props.taskPriority === "Low" && classes.item__priorityLow)}>{props.taskPriority}</h2>
                <h3><i>{props.assignedUser}</i></h3>
                <p>{props.taskName}</p>
                <div className={classes.item__buttons}>
                    <button className={classes.item__btn} onClick={showDetails}>Show more</button>
                    <button className={classes.item__btn}>Delete</button>
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
                />
            }
            { detailsAreOpen && 
                <DetailsBackground onCloseBtnClick={closeDetails} /> 
            }
        </div>
    );
}

export default TaskItem;