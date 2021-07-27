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

    return (
        <div>
            <div className={classes.item}>
                <h2>{props.projectName}</h2>
                <h3>{props.taskPriority}</h3>
                <p>{props.taskName}</p>
                <button className={classes.item__btn} onClick={showDetails}>Show more</button>
            </div>
            { detailsAreOpen && 
                <TaskDetailsWindow 
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