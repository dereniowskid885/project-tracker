import classes from '../styles/ItemAdd.module.scss';

function TaskAdd() {
    return (
        <div className={classes.itemAdd}>
            <h1>Add new task</h1>
            <form>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskName">Task name</label>
                    <input type="text" id="taskName" required />
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="taskDescription">Task description</label>
                    <input type="text" id="taskDescription" required />
                </div>
                <button className={classes.itemAdd__btn} type="submit">Add</button>
                <button className={classes.itemAdd__btn} type="reset">Clear</button>
            </form>
        </div>
    );
}

export default TaskAdd;