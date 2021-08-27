import classes from '../../styles/Items.module.scss';
import ProjectItem from '../ProjectItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

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
            <div className={classes.alert}>
                <h1>There are no projects yet.</h1>
            </div>
        );
    }

    return (
        <main className={classes.content}>
            { fetchedData.map((item) => (
                <ProjectItem
                    key={item.id}
                    projectId={item.id}
                    projectName={item.projectName}
                    projectDescription={item.projectDescription}
                    projectMembers={item.projectMembers}
                    setIsLoading={setIsLoading}
                    setFetchedData={setFetchedData}
                    userLoggedIn={props.userLoggedIn}
                    reloadProjects={fetchProjects}
                    userPanelInit={false}
                />
            ))}
        </main>
    );
}

export default Projects;