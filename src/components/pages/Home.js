import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import UserPanel from '../UserPanel';
import classes from '../../styles/Home.module.scss';
import { useState } from 'react';

function Home(props) {
    const [ regFormIsOpen, setFormState ] = useState(false);

    const adminUser = {
        username: "admin",
        password: "admin123"
    };
    const [ error, setError] = useState("");

    const Login = userDetails => {
        console.log(userDetails);

        if (userDetails.username === adminUser.username && userDetails.password === adminUser.password) {
            props.setUserDetails(userDetails);
        } else {
            console.log("Wrong username or password.");
        }
    }

    const Logout = () => {
        console.log("logged out");
    }

    function showRegForm() {
        setFormState(true);
    }

    function showLogForm() {
        setFormState(false);
    }

    return (
        <main className={classes.home}>
            { props.userDetails.loggedIn ? <UserPanel userDetails={props.userDetails}/> : 
                <div>
                    <h1>Login, or register your account first.</h1>
                    { regFormIsOpen ? <RegisterForm backBtnClick={showLogForm}/> : <LoginForm regBtnClick={showRegForm} login={Login} error={error}/> }
                </div>
            }
        </main>
    );
}

export default Home;