import { useRef } from 'react';
import classes from "../styles/ItemAdd.module.scss";

function ProjectAdd(props) {
    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();

    function submitHandler(e) {
        e.preventDefault();

        const formData = {
            projectName: projectNameRef.current.value,
            projectDescription: projectDescriptionRef.current.value
        };

        props.sendData(formData, 'projects');
    }

    return (
        <div className={classes.itemAdd}>
            <h1>Add new project</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="projectName">Project name</label>
                    <input type="text" id="projectName" ref={projectNameRef} required/>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="projectDescription">Project description</label>
                    <textarea id="projectDescription" ref={projectDescriptionRef} rows="5" required/>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="projectMembers">Project members</label>
                    <select id="projectMembers" required>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <button className={classes.itemAdd__btn} type="submit">Add</button>
                <button className={classes.itemAdd__btn} type="reset">Clear</button>
            </form>
        </div>
    );
}

export default ProjectAdd;