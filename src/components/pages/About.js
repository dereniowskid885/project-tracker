import classes from '../../styles/About.module.scss'

function About() {
    return (
        <main className={classes.about}>
            <h1>Project Tracker</h1>
            <h2>is a web application, which can help you with tracking project issues, and bugs in your company.</h2>
            <h2>Created by Daniel Dereniowski, and Wojciech Prągłowski.</h2>
        </main>
    );
}

export default About;