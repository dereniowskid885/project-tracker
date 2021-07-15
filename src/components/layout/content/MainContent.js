import classes from '../../../styles/MainContent.module.scss';
import TaskItem from '../../taskItem/TaskItem';

function MainContent() {
    return (
        <main className={classes.content}>
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
        </main>
    );
}

export default MainContent;