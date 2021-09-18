import classes from '../../styles/Items.module.scss';
import TaskItem from '../items/TaskItem';
import { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import Fade from 'react-reveal/Fade';

function UserTasks(props) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedData, setFetchedData ] = useState([]);
    const userTasks = [];

    function reloadUserTasks() {
        setIsLoading(true);
        setIsLoading(false);
        props.reloadUserTasks();
    }

    useEffect(() => {
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
            setFetchedData(tempData);
        });
    }, []);

    if (fetchedData.length !== 0) {
        fetchedData.forEach((task) => {
            if (task.assignedUser === props.userLoggedIn) {
                userTasks.push(task);
            }
        });
    }

    if (isLoading) {
        return (
            <div className={classes.loader}>
                <BeatLoader color={'#6b6b83a4'} />
            </div>
        );
    }

    if (userTasks.length === 0) {
        return (
            <Fade>
                <h1>You have no tasks assigned yet.</h1>
            </Fade>
        );
    }

    return (
        <div className={classes.content + ' ' + classes.panel}>
            { userTasks.map((item) => (
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
                    reloadUserTasks={reloadUserTasks}
                    userPanelInit={true}
                    userLoggedIn={props.loggedIn}
                />
            ))}
        </div>
    );
}

export default UserTasks;