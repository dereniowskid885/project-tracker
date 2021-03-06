import classes from '../../styles/ItemAdd.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState, useRef, useEffect } from 'react';

library.add(fas, fab);

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

    function fetchData(table, setList) {
        fetch(
            'http://localhost:8000/api/' + table + '/'
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

            setList(tempData);
        });
    }

    useEffect(() => {
        fetchData('users', setUserList);
        fetchData('projects', setProjectList);
    }, []);

    return (
        <div className={classes.itemAdd}>
            <FontAwesomeIcon className={classes.itemAdd__icon} icon="times-circle" onClick={props.onCloseBtnClick}/>
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
                <button className={classes.itemAdd__btn} type="button" onClick={props.onCloseBtnClick}>Back</button>
            </form>
        </div>
    );
}

export default TaskAdd;