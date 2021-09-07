import classes from '../styles/Items.module.scss';
import ProjectItem from '../components/items/ProjectItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import Fade from 'react-reveal/Fade';

function Projects(props) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);
    const [ noProjects, setNoProjectsState ] = useState(false);

    function fetchProjects() {
        setIsLoading(true);
    
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

            setIsLoading(false);

            if(tempData.length === 0) {
                setNoProjectsState(true);
            } else {
                setFetchedData(tempData);
            }
        });
    }

    useEffect(() => { fetchProjects(); }, []);

    if (isLoading) {
        return (
            <div className={classes.alert}>
                <BeatLoader color={'#6b6b83a4'} />
            </div>
        );
    }

    if (noProjects) {
        return (
            <Fade>
                <div className={classes.alert}>
                    <h1>There are no projects yet.</h1>
                </div>
            </Fade>
        );
    }

    return (
        <Fade>
            <div className={classes.content}>
                { fetchedData.map((item) => (
                    <ProjectItem
                        key={item.id}
                        projectId={item.id}
                        projectName={item.projectName}
                        projectDescription={item.projectDescription}
                        projectMembers={item.projectMembers}
                        setIsLoading={setIsLoading}
                        setFetchedData={setFetchedData}
                        reloadProjects={fetchProjects}
                        userLoggedIn={props.userLoggedIn}
                        userPanelInit={false}
                    />
                ))}
            </div>
        </Fade>
    );
}

export default Projects;