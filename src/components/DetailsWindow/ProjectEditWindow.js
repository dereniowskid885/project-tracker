import classes from '../../styles/ItemAdd.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState, useRef, useEffect } from 'react';

library.add(fas, fab);

function ProjectEditWindow(props) {
    const [ userList, setUserList ] = useState([]);

    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();

    function submitHandler(e) {
        e.preventDefault();

        let projectMembers = "";

        userList.forEach(user => {
            if (user.checked === true) {
                projectMembers = projectMembers + user.username + ", ";
            }
        });

        if (projectMembers.length === 0) {
            props.noProjectMembersAlert();
        } else {
            const formData = {
                projectName: projectNameRef.current.value,
                projectDescription: projectDescriptionRef.current.value,
                projectMembers: projectMembers.slice(0, -2)
            };
    
            fetch(
                'http://localhost:8000/api/projects/' + props.projectId + '/',
                {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: { 'Content-type': 'application/json' }
                }
            ).then(() => {
                props.onCloseBtnClick();
                props.closeDetails();
    
                if (props.userPanelInit === true) {
                    props.reloadUserProjects();
                } else {
                    props.reloadProjects();
                }
            });
        }
    }

    function clearForm() {
        document.getElementById('projectName').value = "";
        document.getElementById('projectDescription').value = "";
    }

    useEffect(() => {
        fetch(
          'http://localhost:8000/api/users/'
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
                'http://localhost:8000/api/projects/' + props.projectId
            ).then(response => {
                return response.json();
            }).then(data => {
                const projectMembers = data.projectMembers.split(",");

                projectMembers.forEach((member) => {
                    tempData.forEach((user) => {
                        if (member.trim() === user.username) {
                            user.checked = true;
                        }
                    });
                });

                setUserList(tempData);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.itemAdd}>
            <FontAwesomeIcon className={classes.itemAdd__icon} icon="times-circle" onClick={props.onCloseBtnClick}/>
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
                    <button className={classes.itemAdd__btn} type="submit">Confirm</button>
                    <button className={classes.itemAdd__btn} type="button" onClick={clearForm}>Clear</button>
                    <button className={classes.itemAdd__btn} type="button" onClick={props.onCloseBtnClick}>Back</button>
                </div>
            </form>
        </div>
    );
}

export  default ProjectEditWindow;