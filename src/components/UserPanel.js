import classes from '../styles/UserPanel.module.scss';

function UserPanel(props) {
    return (
        <div className={classes.panel}>
            <h1>Welcome back {props.userDetails.username} !</h1>
            <button className={classes.panel__btn + ' ' + classes.panel__btnShow}>Show your projects</button>
            <button className={classes.panel__btn}>Add Project</button><br />
            <button className={classes.panel__btn + ' ' + classes.panel__btnShow}>Show your tasks</button>
            <button className={classes.panel__btn}>Add Task</button>
        </div>
    );
}

export default UserPanel;