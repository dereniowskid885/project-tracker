import classes from '../../styles/Items.module.scss';
import ProjectItem from '../ProjectItem';
import { useState, useEffect } from 'react';

function Projects() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);

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

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <main className={classes.content}>
            { fetchedData.map((item) => (
                <ProjectItem
                    key={item.id}
                    projectName={item.projectName}
                    projectDescription={item.projectDescription}
                    projectMembers={item.projectMembers}
                />
            ))}
        </main>
    );
}

export default Projects;