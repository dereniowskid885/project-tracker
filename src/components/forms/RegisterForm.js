import classes from '../../styles/LoginForm.module.scss';
import { useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';

function RegisterForm(props) {
    const [ passwordConfirmError, setPasswordConfirmErrorState ] = useState(false);
    const [ userExistError, setUserExistErrorState ] = useState(false);
    const [ registerComplete, setRegisterCompleteState ] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    function showRegisterCompleteAlert() {
        setRegisterCompleteState(true);
        setTimeout(() => { setRegisterCompleteState(false); window.location.reload(false); }, 3000);
    }

    function submitHandler(e) {
        e.preventDefault();
        let userExist = false;
        
        fetch(
            'http://localhost:8000/api/users/'
        ).then(response => {
            return response.json();
        }).then(data => {
            data.forEach(user => {
                if (user.username === usernameRef.current.value) {
                    userExist = true;
                }
            });

            if ((!userExist) && (passwordRef.current.value === passwordConfirmRef.current.value)) {
                const formData = {
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                };
    
                fetch(
                    'http://localhost:8000/api/users/',
                    {
                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: { 'Content-type': 'application/json' }
                    }
                ).then(() => {
                    showRegisterCompleteAlert();
                });
            } else if (userExist) {
                setUserExistErrorState(true);
                setTimeout(() => { setUserExistErrorState(false); }, 3000);
            } else {
                setPasswordConfirmErrorState(true);
                setTimeout(() => { setPasswordConfirmErrorState(false); }, 3000);
            }
        });
    }

    return (
        <div className={classes.login}>
            <form className={classes.login__form} onSubmit={submitHandler}>
                <label htmlFor="username">
                    <h2>Username</h2>
                </label>
                <input type="text" name="username" ref={usernameRef} minlength="3" maxlength="20" required />
                <label htmlFor="password">
                    <h2>Password</h2>
                </label>
                <input type="password" name="password" ref={passwordRef} minlength="3" maxlength="20" required />
                <label htmlFor="confirm_password">
                    <h2>Confirm password</h2>
                </label>
                <input type="password" name="confirm_password" ref={passwordConfirmRef} minlength="3" maxlength="20" required />
                <br />
                <button className={classes.login__btn} type="button" onClick={props.onBackBtnClick}>Back</button>
                <button className={classes.login__btn} type="submit">Submit</button>
            </form>
            { passwordConfirmError &&
                <Fade>
                    <h2 className={classes.login__message}>Passwords do not match.</h2>
                </Fade>
            }
            { userExistError &&
                <Fade>
                    <h2 className={classes.login__message}>User already exist.</h2>
                </Fade>
            }
            { registerComplete &&
                <Fade>
                    <h2 className={classes.login__message}>Account created !</h2>
                </Fade>
            }
        </div>
    );
}

export default RegisterForm;