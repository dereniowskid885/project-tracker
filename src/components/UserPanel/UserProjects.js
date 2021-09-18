import classes from '../../styles/Items.module.scss';
import ProjectItem from '../items/ProjectItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import Fade from 'react-reveal/Fade';

function UserProjects(props) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);
    const userProjects = [];

    function reloadUserProjects() {
        setIsLoading(true);
        setIsLoading(false);
        props.reloadUserProjects();
    }

    useEffect(() => {
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
            setFetchedData(tempData);
        });
    }, []);

    if (fetchedData.length !== 0) {
        fetchedData.forEach((project) => {
            project.projectMembers.forEach((member) => {
                if (member.trim() === props.userLoggedIn) {
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
            <Fade>
                <h1>You are not assigned to any project yet.</h1>
            </Fade>
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
                    reloadUserProjects={reloadUserProjects}
                    userPanelInit={true}
                    userLoggedIn={props.loggedIn}
                />
            ))}
        </div>
    );
}

export default UserProjects;