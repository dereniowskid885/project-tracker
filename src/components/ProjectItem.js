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

    function deleteProject() {
        props.setIsLoading(true);
        
        fetch(
            'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/projects/' + props.projectId + '.json',
            {
                method: 'DELETE'
            }
        ).then(() => {
            fetch(
                'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/projects.json'
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
                <h2>{props.projectName}</h2>
                <ol className={classes.item__members}>
                    { props.projectMembers && props.projectMembers.map((member) => (
                        <li key={member}>{member}</li>
                    ))}
                </ol>
                <div className={classes.item__buttons}>
                    <button className={classes.item__btn} onClick={showDetails}>Show more</button>
                    <button className={classes.item__btn} onClick={deleteProject}>Delete</button>
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