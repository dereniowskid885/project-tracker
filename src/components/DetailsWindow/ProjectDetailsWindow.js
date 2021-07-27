import classes from '../../styles/DetailsWindow.module.scss';

function ProjectDetailsWindow(props) {
    return (
        <div className={classes.window}>
            <h1>{props.projectName}</h1>
            <ul>
                <li>XD</li>
                <li>XDXDXD</li>
            </ul>
            <p>{props.projectDescription}</p>
            <button className={classes.window__btn} onClick={props.onCloseBtnClick}>Close</button>
        </div>
    );
}

export default ProjectDetailsWindow;