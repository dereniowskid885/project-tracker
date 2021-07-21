import classes from '../styles/LoginForm.module.scss';

function RegisterForm(props) {
    return (
        <div className={classes.login}>
            <form className={classes.login__form}>
                <h2>Username</h2><input type="text" name="username" />
                <h2>Password</h2><input type="password" name="password" />
                <h2>Confirm password</h2><input type="password" name="confirm_password" /><br />
                <button className={classes.login__btn} onClick={props.backBtnClick}>Back</button>
                <button className={classes.login__btn}>Submit</button>
            </form>
        </div>
    );
}

export default RegisterForm;