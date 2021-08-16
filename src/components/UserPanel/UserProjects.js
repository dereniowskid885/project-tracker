import classes from '../../styles/Items.module.scss';
import ProjectItem from '../ProjectItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function UserProjects(props) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);
    const userProjects = [];

    useEffect(() => {
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
            setFetchedData(tempData);
        });
    }, []);

    if (fetchedData.length !== 0) {
        fetchedData.forEach((project) => {
            project.projectMembers.forEach((member) => {
                if (member === props.userLoggedIn) {
                    userProjects.push(project);
                }
            });
        });
    }

    if (isLoading) {
        return (
            <div className={classes.loader}>
                <BeatLoader color={'#6b6b83a4'} />
            </div>
        );
    }

    if (userProjects.length === 0) {
        return (
            <div>
                <h1>You are not assigned to any project yet.</h1>
            </div>
        );
    }

    return (
        <div className={classes.content + ' ' + classes.panel}>
            { userProjects.map((item) => (
                <ProjectItem
                    key={item.id}
                    projectId={item.id}
                    projectName={item.projectName}
                    projectDescription={item.projectDescription}
                    projectMembers={item.projectMembers}
                    setIsLoading={setIsLoading}
                    setFetchedData={setFetchedData}
                />
            ))}
        </div>
    );
}

export default UserProjects;