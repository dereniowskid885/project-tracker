import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import UserPanel from '../UserPanel';
import classes from '../../styles/Home.module.scss';
import { useState } from 'react';

function Home(props) {
    const [ regFormIsOpen, setFormState ] = useState(false);

    const adminUser = {
        username: "adminowsky",
        password: "admin123"
    };
    const [ loginError, setErrorState ] = useState(false);

    function loginUser(userDetails) {
        console.log(userDetails);

        if (userDetails.username === adminUser.username && userDetails.password === adminUser.password) {
            setErrorState(false);
            props.setUserDetails(userDetails);
        } else {
            setErrorState(true);
        }
    }

    function showRegForm() {
        setFormState(true);
    }

    function showLogForm() {
        setFormState(false);
    }

    return (
        <main className={classes.home}>
            { props.userDetails.loggedIn ?
                <UserPanel userDetails={props.userDetails}/>
            : 
                <div>
                    <h1>Login, or register your account first.</h1>
                    { regFormIsOpen ?
                        <RegisterForm backBtnClick={showLogForm} />
                    : 
                        <LoginForm regBtnClick={showRegForm} loginUser={loginUser} />
                    }
                    { loginError && <h2>Username, or password is incorrect.</h2> }
                </div>
            }
        </main>
    );
}

export default Home;