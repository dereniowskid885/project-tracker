import { useState, useRef, useEffect } from 'react';
import classes from '../styles/ItemAdd.module.scss';

function TaskAdd(props) {
    const [ userList, setUserList ] = useState([]);
    const [ projectList, setProjectList ] = useState([]);

    const taskNameRef = useRef();
    const taskDescriptionRef = useRef();
    const taskPriorityRef = useRef();
    const assignedUserRef = useRef();
    const selectedProjectRef = useRef();

    function submitHandler(e) {
        e.preventDefault();

        const formData = {
            taskName: taskNameRef.current.value,
            projectName: selectedProjectRef.current.value,
            taskPriority: taskPriorityRef.current.value,
            assignedUser: assignedUserRef.current.value,
            taskDescription: taskDescriptionRef.current.value
        };

        props.sendData(formData, 'tasks');
    }

    useEffect(() => {
        fetch(
          'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/users.json'
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

          setUserList(tempData);
        });
    }, []);

    useEffect(() => {
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
          
          setProjectList(tempData);
        });
    }, []);

    return (
        <div className={classes.itemAdd}>
            <h1>Add new task</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskName">Task name</label>
                    <input type="text" id="taskName" required ref={taskNameRef} />
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskPriority">Task priority</label>
                    <select id="taskPriority" required ref={taskPriorityRef}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="selectedProject">Select project</label>
                    <select id="selectedProject" required ref={selectedProjectRef}>
                        { projectList.map((item) => (
                            <option key={item.id} value={item.projectName}>{item.projectName}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="assignedUser">Assign user</label>
                    <select id="assignedUser" required ref={assignedUserRef}>
                        { userList.map((item) => (
                            <option key={item.id} value={item.username}>{item.username}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskDescription">Task description</label>
                    <textarea id="taskDescription" required ref={taskDescriptionRef} rows="5" />
                </div>
                <button className={classes.itemAdd__btn} type="submit">Add</button>
                <button className={classes.itemAdd__btn} type="reset">Clear</button>
                <button className={classes.itemAdd__btn} onClick={props.onCloseBtnClick}>Back</button>
            </form>
        </div>
    );
}

export default TaskAdd;