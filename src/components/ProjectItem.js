import classes from '../styles/Item.module.scss';
import ProjectDetailsWindow from './DetailsWindow/ProjectDetailsWindow';
import DetailsBackground from './DetailsWindow/DetailsBackground';
import { useState } from 'react';

function ProjectItem(props) {
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
                <h3>{props.projectMembers}</h3>
                <h3>{props.projectTasks}</h3>
                <button className={classes.item__btn} onClick={showDetails}>Show more</button>
            </div>
            { detailsAreOpen && 
                <ProjectDetailsWindow 
                    projectName={props.projectName}
                    projectDescription={props.projectDescription}
                    onCloseBtnClick={closeDetails}
                />
            }
            { detailsAreOpen && 
                <DetailsBackground onCloseBtnClick={closeDetails} /> 
            }
        </div>
    );
}

export default ProjectItem;