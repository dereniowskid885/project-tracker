import classes from '../../styles/ItemAdd.module.scss';
import { useState, useRef, useEffect } from 'react';

function ProjectEditWindow(props) {
    const [ userList, setUserList ] = useState([]);

    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();

    function submitHandler(e) {
        e.preventDefault();

        const projectMembers = [];

        userList.forEach(user => {
            if (user.checked === true) {
                projectMembers.push(user.username);
            }
        });

        const formData = {
            projectName: projectNameRef.current.value,
            projectDescription: projectDescriptionRef.current.value,
            projectMembers: projectMembers
        };

        fetch(
            'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/projects/' + props.projectId + '.json',
            {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { 'Content-type': 'application/json' }
            }
        ).then(() => {
            window.location.reload(false);
        });
    }

    function clearForm() {
        document.getElementById('projectName').value = "";
        document.getElementById('projectDescription').value = "";
    }

    useEffect(() => {
        fetch(
          'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        ).then(response => {
            return response.json();
        }).then(data => {
            const tempData = [];

            for (const key in data) {
                const item = {
                    id: key,
                    checked: false,
                    ...data[key]
                };

                tempData.push(item);
            }

            fetch(
                'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/projects/' + props.projectId + '/projectMembers.json'
            ).then(response => {
                return response.json();
            }).then(data => {
                data.forEach((item) => {
                    tempData.forEach((user) => {
                        if (item === user.username) {
                            user.checked = true;
                        }
                    });
                });
            });

            setUserList(tempData);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.itemAdd}>
            <h1>Edit {props.projectName}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="projectName">Project name</label>
                    <input type="text" id="projectName" defaultValue={props.projectName} ref={projectNameRef} required/>
                </div>
                <div className={classes.itemAdd__field}>
                    <label htmlFor="projectDescription">Project description</label>
                    <textarea id="projectDescription" defaultValue={props.projectDescription} ref={projectDescriptionRef} rows="5" required/>
                </div>
                <div className={classes.itemAdd__field}>
                    <fieldset>
                        <legend>Project members</legend>
                        { userList.map((item) => (
                            <div key={item.id} className={classes.itemAdd__checkbox}>
                                <input type="checkbox"
                                    id={item.username} 
                                    name={item.username} 
                                    value={item.username}
                                    checked={item.checked}
                                    onChange={event => {
                                        const checked = event.target.checked;
                                        
                                        setUserList(
                                            userList.map((i) => {
                                                if (item.id === i.id) {
                                                    i.checked = checked;
                                                }
                                                return i;
                                            })
                                        );
                                    }}
                                />
                                <label htmlFor={item.username}>{item.username}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <div className={classes.itemAdd__buttons}>
                    <button className={classes.itemAdd__btn} type="submit">Add</button>
                    <button className={classes.itemAdd__btn} onClick={clearForm}>Clear</button>
                    <button className={classes.itemAdd__btn} onClick={props.onCloseBtnClick}>Back</button>
                </div>
            </form>
        </div>
    );
}

export  default ProjectEditWindow;