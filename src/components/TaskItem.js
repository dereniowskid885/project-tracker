import classes from '../styles/TaskItem.module.scss';
import DetailsWindow from './taskDetailsWindow/DetailsWindow';
import DetailsBackground from './taskDetailsWindow/DetailsBackground';
import { useState } from 'react';

function TaskItem(props) {
    const [ detailsAreOpen, setDetailsState ] = useState(false);

    function showDetails() {
        setDetailsState(true);
    }

    function closeDetails() {
        setDetailsState(false);
    }

    return (
        <div>
            <div className={classes.task}>
                <h2>{props.projectName}</h2>
                <span className={classes.task__priority}>{props.taskPriority}</span>
                <p>{props.taskName}</p>
                <button className={classes.task__btn} onClick={showDetails}>Show more</button>
            </div>
            { detailsAreOpen && 
                <DetailsWindow 
                    projectName={props.projectName}
                    taskPriority={props.taskPriority}
                    taskName={props.taskName}
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