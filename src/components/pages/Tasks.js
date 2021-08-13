import classes from '../../styles/Items.module.scss';
import TaskItem from '../TaskItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Tasks() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);

    useEffect(() => {
        setIsLoading(true);
  
        fetch(
          'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
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
            <div className={classes.loader}>
                <BeatLoader color={'#6b6b83a4'} />
            </div>
        );
    }

    return (
        <main className={classes.content}>
            { fetchedData.map((item) => (
                <TaskItem
                    key={item.id}
                    taskId={item.id}
                    projectName={item.projectName}
                    taskPriority={item.taskPriority}
                    taskName={item.taskName}
                    assignedUser={item.assignedUser}
                    taskDescription={item.taskDescription}
                    setIsLoading={setIsLoading}
                    setFetchedData={setFetchedData}
                />
            ))}
        </main>
    );
}

export default Tasks;