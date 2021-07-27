import classes from '../../styles/Tasks.module.scss';
import ProjectItem from '../ProjectItem';

function Projects() {
    return (
        <main className={classes.content}>
            <ProjectItem 
                projectName="Projekcik fajnej strony"
                projectMembers="Members - 3"
                projectTasks="Tasks - 10"
                projectDescription="Bardzo fajna strona polecam, może ją kiedys zrobimy."
            />
            <ProjectItem 
                projectName="Music app"
                projectMembers="Members - 2"
                projectTasks="Tasks - 5"
                projectDescription="Spotify wannabe app."
            />
            <ProjectItem 
                projectName="Magda Gessler Website"
                projectMembers="Members - 5"
                projectTasks="Tasks - 33"
                projectDescription="Strona dla pani Magdy Gessler, jurorki master szesza."
            />
            <ProjectItem 
                projectName="Zdzislaw Website"
                projectMembers="Members - 1"
                projectTasks="Tasks - 2"
                projectDescription="Strona dla pana zdzislawa mechanika."
            />
        </main>
    );
}

export default Projects;