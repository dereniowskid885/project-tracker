import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import classes from '../../styles/Home.module.scss';
import { useState } from 'react';

function Home() {
    const [ regFormIsOpen, setFormState ] = useState(false);

    function showRegForm() {
        setFormState(true);
    }

    function showLogForm() {
        setFormState(false);
    }

    return (
        <div className={classes.home}>
            <h1>Login, or register your account first.</h1>
            { regFormIsOpen ? <RegisterForm backBtnClick={showLogForm}/> : <LoginForm regBtnClick={showRegForm}/> }
        </div>
    );
}

export default Home;