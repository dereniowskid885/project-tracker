import classes from '../../styles/ItemAdd.module.scss';
import { useState, useRef, useEffect } from 'react';

function TaskEditWindow(props) {
    const [ userList, setUserList ] = useState([]);

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

        fetch(
            'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + props.taskId + '.json',
            {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { 'Content-type': 'application/json' }
            }
        ).then(() => {
            props.onCloseBtnClick();
            props.closeDetails();

            if (props.userPanelInit === true) {
                props.reloadUserTasks();
            } else {
                props.reloadTasks();
            }
        });
    }

    function clearForm() {
        document.getElementById('taskName').value = "";
        document.getElementById('taskDescription').value = "";
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

    return (
        <div className={classes.itemAdd}>
            <h1>Edit {props.taskName}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskName">Task name</label>
                    <input type="text" id="taskName" required defaultValue={props.taskName} ref={taskNameRef} />
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskPriority">Task priority</label>
                    <select id="taskPriority" defaultValue={props.taskPriority} required ref={taskPriorityRef}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="selectedProject">Select project</label>
                    <select id="selectedProject" required ref={selectedProjectRef}>
                        <option value={props.projectName}>{props.projectName}</option>
                    </select>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="assignedUser">Assign user</label>
                    <select id="assignedUser" defaultValue={props.assignedUser} required ref={assignedUserRef}>
                        <option value={props.assignedUser} hidden>{props.assignedUser}</option>
                        { userList.map((item) => (
                            <option key={item.id} value={item.username}>{item.username}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskDescription">Task description</label>
                    <textarea id="taskDescription" required ref={taskDescriptionRef} rows="5" defaultValue={props.taskDescription}/>
                </div>
                <div className={classes.itemAdd__buttons}>
                    <button className={classes.itemAdd__btn} type="submit">Confirm</button>
                    <button className={classes.itemAdd__btn} onClick={clearForm}>Clear</button>
                    <button className={classes.itemAdd__btn} onClick={props.onCloseBtnClick}>Back</button>
                </div>
            </form>
        </div>
    );
}

export default TaskEditWindow;