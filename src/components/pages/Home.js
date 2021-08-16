import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import UserPanel from '../UserPanel/UserPanel';
import classes from '../../styles/Home.module.scss';
import { useState, useEffect } from 'react';

function Home(props) {
    const [ regFormIsOpen, setFormState ] = useState(false);
    const [ loginError, setErrorState ] = useState(false);
    const [ users, setUsersData ] = useState([]);

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
          setUsersData(tempData);
        });
    }, []);

    function loginUser(userDetails) {
        let userAuth = false;

        users.forEach(user => {
            if (userDetails.username === user.username && userDetails.password === user.password) {
                userAuth = true;
                setErrorState(false);
                props.setUserDetails(userDetails);
            }
        });

        if (!userAuth) {
            setErrorState(true);
            setTimeout(() => { setErrorState(false); }, 3000);
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