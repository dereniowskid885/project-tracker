import classes from '../../styles/Projects.module.scss';
import TaskItem from '../TaskItem';

function Projects() {
    return (
        <main className={classes.content}>
            <TaskItem 
                projectName="Project 1"
                taskPriority="High"
                taskName="Implement mobile version of pdp"
                taskDescription="Please do it very very fast."
            />
            <TaskItem 
                projectName="Project 2"
                taskPriority="Medium"
                taskName="Restyle the button"
                taskDescription="Lubie Placki z dzemorem"
            />
            <TaskItem 
                projectName="Project 3"
                taskPriority="Low"
                taskName="Change bgcolor"
                taskDescription="XDxdxDXD"
            />
        </main>
    );
}

export default Projects;