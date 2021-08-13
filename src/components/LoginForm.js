import classes from '../styles/LoginForm.module.scss';
import { useState } from 'react';

function LoginForm(props) {
    const [ userDetails, setUserDetails ] = useState({ username: "", password: "" });

    function submitHandler(e) {
        e.preventDefault();

        props.loginUser(userDetails);
    }

    return (
        <div className={classes.login}>
            <form className={classes.login__form} onSubmit={submitHandler}>
                <label htmlFor="username"><h2>Username</h2></label>
                <input type="text" name="username" id="username" onChange={e => setUserDetails({...userDetails, username: e.target.value})} value={userDetails.username} required />
                <label htmlFor="password"><h2>Password</h2></label>
                <input type="password" name="password" id="password" onChange={e => setUserDetails({...userDetails, password: e.target.value})} value={userDetails.password} required /><br />
                <button className={classes.login__btn} type="submit">Login</button>
                <button className={classes.login__btn} onClick={props.regBtnClick}>Register</button>
            </form>
        </div>
    );
}

export default LoginForm;