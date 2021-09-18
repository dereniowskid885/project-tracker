import classes from '../styles/Items.module.scss';
import ProjectItem from '../components/items/ProjectItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Projects(props) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);
    const [ noProjects, setNoProjectsState ] = useState(false);

    function fetchProjects() {
        setIsLoading(true);
    
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
            <h1 className={classes.alert}>There are no projects yet.</h1>
        );
    }

    return (
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
                    setNoProjectsState={setNoProjectsState}
                    userLoggedIn={props.userLoggedIn}
                    userPanelInit={false}
                />
            ))}
        </div>
    );
}

export default Projects;