import classes from '../styles/LoginForm.module.scss';
import { useState, useRef } from 'react';

function RegisterForm(props) {
    const [ passwordConfirmError, setErrorState ] = useState(false);
    const [ registerComplete, setRegisterState ] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    function registerAlert() {
        setRegisterState(true);
        setTimeout(() => { setRegisterState(false); window.location.reload(false); }, 3000);
    }

    function submitHandler(e) {
        e.preventDefault();
        
        if (passwordRef.current.value === passwordConfirmRef.current.value)
        {
            setErrorState(false);

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
                registerAlert();
            });
        } else {
            setErrorState(true);
            setTimeout(() => { setErrorState(false); }, 3000);
        }
    }

    return (
        <div className={classes.login}>
            <form className={classes.login__form} onSubmit={submitHandler}>
                <h2>Username</h2><input type="text" name="username" ref={usernameRef} required />
                <h2>Password</h2><input type="password" name="password" ref={passwordRef} required />
                <h2>Confirm password</h2><input type="password" name="confirm_password" ref={passwordConfirmRef} required /><br />
                <button className={classes.login__btn} onClick={props.backBtnClick}>Back</button>
                <button className={classes.login__btn}>Submit</button>
            </form>
            { passwordConfirmError && <h2>Passwords do not match.</h2> }
            { registerComplete && <h1 className={classes.login__message}>Account created !</h1> }
        </div>
    );
}

export default RegisterForm;