import classes from '../styles/Items.module.scss';
import TaskItem from '../components/items/TaskItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Tasks(props) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);
    const [ noTasks, setNoTasksState ] = useState(false);

    function fetchTasks() {
        setIsLoading(true);
  
        fetch(
            'http://localhost:8000/api/tasks/'
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
    }

    useEffect(() => { fetchTasks(); }, []);

    if (isLoading) {
        return (
            <div className={classes.alert}>
                <BeatLoader color={'#6b6b83a4'} />
            </div>
        );
    }

    if (noTasks) {
        return (
            <h1 className={classes.alert}>There are no tasks yet.</h1>
        );
    }

    return (
        <div className={classes.content}>
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
                    reloadTasks={fetchTasks}
                    setNoTasksState={setNoTasksState}
                    userLoggedIn={props.userLoggedIn}
                    detailsWindowInit={false}
                />
            ))}
        </div>
    );
}

export default Tasks;