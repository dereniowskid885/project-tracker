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
                <ol className={classes.item__members}>
                    { props.projectMembers && props.projectMembers.map((member) => (
                        <li key={member}>{member}</li>
                    ))}
                </ol>
                <div className={classes.item__buttons}>
                    <button className={classes.item__btn} onClick={showDetails}>Show more</button>
                    <button className={classes.item__btn} onClick={showDetails}>Delete</button>
                </div>
            </div>
            { detailsAreOpen && 
                <ProjectDetailsWindow 
                    projectName={props.projectName}
                    projectDescription={props.projectDescription}
                    projectMembers={props.projectMembers}
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