import classes from '../../styles/TaskItem.module.scss';

function TaskItem() {
    return (
        <div className={classes.task}>
            <h1>Task 1</h1>
            <h2>Description</h2>
            <p>lorem ipsum xdxdgsdafgdfsgdfghdfghdfghf</p>
        </div>
    );
}

export default TaskItem;