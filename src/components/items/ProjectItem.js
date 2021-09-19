import classes from '../../styles/Item.module.scss';
import ProjectDetailsWindow from '../detailsWindow/ProjectDetailsWindow';
import DetailsBackground from '../detailsWindow/DetailsBackground';
import { useState } from 'react';
import Fade from 'react-reveal/Fade';

function ProjectItem(props) {
    const [ detailsAreOpen, setDetailsState ] = useState(false);
    const [ userNotLoggedIn, setUserNotLoggedInState ] = useState(false);

    function showDetails() {
        setDetailsState(true);
    }

    function closeDetails() {
        setDetailsState(false);
    }

    function deleteProject() {
        if (props.userLoggedIn) {
            setDetailsState(false);
            props.setIsLoading(true);
            
            fetch(
                'http://localhost:8000/api/projects/' + props.projectId + '/',
                {
                    method: 'DELETE'
                }
            ).then(() => {
                fetch(
                    'http://localhost:8000/api/projects/'
                ).then(response => {
                    return response.json();
                }).then(data => {
                    const tempData = [];
            
                    for (const key in data) {
                        data[key].projectMembers = data[key].projectMembers.split(",");

                        const item = {
                            id: key,
                            ...data[key]
                        };
            
                        tempData.push(item);
                    }
            
                    props.setIsLoading(false);

                    if ((tempData.length === 0) && (props.userPanelInit === true)) {
                        props.reloadUserProjects();
                    } else if (tempData.length === 0) {
                        props.setNoProjectsState(true);
                    } else {
                        props.setFetchedData(tempData);
                    }
                });
            });
        } else {
            setUserNotLoggedInState(true);
        }
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
                    projectId={props.projectId}
                    projectName={props.projectName}
                    projectDescription={props.projectDescription}
                    projectMembers={props.projectMembers}
                    onCloseBtnClick={closeDetails}
                    userPanelInit={props.userPanelInit}
                    reloadProjects={props.reloadProjects}
                    reloadUserProjects={props.reloadUserProjects}
                    userLoggedIn={props.userLoggedIn}
                />
            }
            { detailsAreOpen &&
                <DetailsBackground onCloseBtnClick={closeDetails} />
            }
            { userNotLoggedIn &&
                <Fade>
                    <h1 className={classes.item__message}>You must be logged in!</h1>
                </Fade>
            }
        </div>
    );
}

export default ProjectItem;