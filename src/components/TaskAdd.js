import { useRef } from 'react';
import classes from '../styles/ItemAdd.module.scss';

function TaskAdd(props) {
    const taskNameRef = useRef();
    const taskDescriptionRef = useRef();

    function submitHandler(e) {
        e.preventDefault();

        const formData = {
            taskName: taskNameRef.current.value,
            taskDescription: taskDescriptionRef.current.value
        };

        props.sendData(formData, 'tasks');
    }

    return (
        <div className={classes.itemAdd}>
            <h1>Add new task</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskName">Task name</label>
                    <input type="text" id="taskName" required ref={taskNameRef} />
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskDescription">Task description</label>
                    <input type="text" id="taskDescription" required ref={taskDescriptionRef} />
                </div>
                <button className={classes.itemAdd__btn} type="submit">Add</button>
                <button className={classes.itemAdd__btn} type="reset">Clear</button>
            </form>
        </div>
    );
}

export default TaskAdd;