import classes from '../styles/LoginForm.module.scss';

function LoginForm(props) {
    return (
        <div className={classes.login}>
            <form className={classes.login__form}>
                <h2>Username</h2><input type="text" name="username" />
                <h2>Password</h2><input type="password" name="password" /><br />
                <button className={classes.login__btn}>Login</button>
                <button className={classes.login__btn} onClick={props.regBtnClick}>Register</button>
            </form>
        </div>
    );
}

export default LoginForm;