import classes from '../../styles/LoginForm.module.scss';
import { useState, useRef } from 'react';

function RegisterForm(props) {
    const [ passwordConfirmError, setPasswordConfirmErrorState ] = useState(false);
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
        
        if (passwordRef.current.value === passwordConfirmRef.current.value) {
            setPasswordConfirmErrorState(false);

            const formData = {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            };

            fetch(
                'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/users.json',
                {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: { 'Content-type': 'application/json' }
                }
            ).then(() => {
                showRegisterCompleteAlert();
            });
        } else {
            setPasswordConfirmErrorState(true);
            setTimeout(() => { setPasswordConfirmErrorState(false); }, 3000);
        }
    }

    return (
        <div className={classes.login}>
            <form className={classes.login__form} onSubmit={submitHandler}>
                <label htmlFor="username">
                    <h2>Username</h2>
                </label>
                <input type="text" name="username" ref={usernameRef} required />
                <label htmlFor="password">
                    <h2>Password</h2>
                </label>
                <input type="password" name="password" ref={passwordRef} required />
                <label htmlFor="confirm_password">
                    <h2>Confirm password</h2>
                </label>
                <input type="password" name="confirm_password" ref={passwordConfirmRef} required />
                <br />
                <button className={classes.login__btn} type="button" onClick={props.onBackBtnClick}>Back</button>
                <button className={classes.login__btn} type="submit">Submit</button>
            </form>
            { passwordConfirmError &&
                <h2>Passwords do not match.</h2>
            }
            { registerComplete &&
                <h1 className={classes.login__message}>Account created !</h1>
            }
        </div>
    );
}

export default RegisterForm;