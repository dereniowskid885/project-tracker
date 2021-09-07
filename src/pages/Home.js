import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import UserPanel from '../components/userPanel/UserPanel';
import classes from '../styles/Home.module.scss';
import { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

function Home(props) {
    const [ registerFormIsOpen, setRegisterFormState ] = useState(false);
    const [ loginError, setLoginErrorState ] = useState(false);
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        fetch(
            'https://project-tracker-db-4f6dd-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        ).then(response => {
            return response.json();
        }).then(data => {
            const tempData = [];

            for (const key in data) {
                const item = {
                    id: key,
                    ...data[key]
                };

                tempData.push(item);
            }

            setUsers(tempData);
        });
    }, []);

    function loginUser(userDetails) {
        let userAuth = false;

        users.forEach(user => {
            if (userDetails.username === user.username && userDetails.password === user.password) {
                userAuth = true;
                setLoginErrorState(false);
                props.setUserDetails(userDetails);
            }
        });

        if (!userAuth) {
            setLoginErrorState(true);
            setTimeout(() => { setLoginErrorState(false); }, 3000);
        }
    }

    function showRegisterForm() {
        setRegisterFormState(true);
    }

    function showLoginForm() {
        setRegisterFormState(false);
    }

    return (
        <Fade>
            <div className={classes.home}>
                { props.userDetails.loggedIn ?
                    <UserPanel userDetails={props.userDetails} />
                : 
                    <div className={classes.home__form}>
                        <h1>Login, or register your account first.</h1>
                        { registerFormIsOpen ?
                            <RegisterForm onBackBtnClick={showLoginForm} />
                        : 
                            <LoginForm onRegisterBtnClick={showRegisterForm} loginUser={loginUser} />
                        }
                        { loginError &&
                            <Fade>
                                <h2 className={classes.home__message}>Username, or password is incorrect.</h2>
                            </Fade>
                        }
                    </div>
                }
            </div>
        </Fade>
    );
}

export default Home;