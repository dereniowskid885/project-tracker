import classes from '../styles/UserPanel.module.scss';

function UserPanel(props) {
    return (
        <div>
            <h1>Welcome back {props.userDetails.username} !</h1>
        </div>
    );
}

export default UserPanel;