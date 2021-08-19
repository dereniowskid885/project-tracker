import classes from '../../styles/Items.module.scss';
import TaskItem from '../TaskItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Tasks(props) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);
    const [ noTasks, setNoTasksState ] = useState(false);

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

            if(tempData.length === 0) {
                setNoTasksState(true);
            } else {
                setFetchedData(tempData);
            }
        });
    }, []);

    if (isLoading) {
        return (
            <div className={classes.alert}>
                <BeatLoader color={'#6b6b83a4'} />
            </div>
        );
    }

    if (noTasks) {
        return (
            <div className={classes.alert}>
                <h1>There are no tasks yet.</h1>
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
                    userLoggedIn={props.userDetails.loggedIn}
                />
            ))}
        </main>
    );
}

export default Tasks;