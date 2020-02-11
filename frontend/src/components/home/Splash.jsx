import React from 'react'
import { Redirect } from 'react-router-dom'
import '../../scss/Splash.scss';
import NavBar from "../navbar/NavBar";


const Splash = () => {
    return (
        // <Redirect to="/login"/>
        <div className="wrapper">
            <NavBar/>
            <div className="Info">
                <h1>Fitness starts with a plan...</h1>
                <p>New Year, New Me! Start taking control of your goals.
                    Let us find you the perfect meal and your custom exercise routine.
                </p>
                <a href="/#/signup">
                <button className="Sign-up-btn">signup for free</button>
                </a>
                <p>aready have an account?
                    <a href="/#/login" > Login</a>
                </p>
            </div>
             <div className="demo-feature">
                <div className="selector-demo" style={{backgroundImage: "url(/images/meal-selector-demo.png)"}}></div>
                <div className="demo-text">
                    <h2>
                        Select your meals from our Database
                    </h2>
                    <p>
                       What's in your food? Learn about calories, fats, carbs and poteins in your meal.
                    </p>
                </div>
            </div>

            <div className="exercise-demo-feature">
                <img className="exercise-selector-demo" src="/images/exercise-selector-demo.png"></img>
                <div className="exercise-demo-text">
                    <h2>
                        Customize your work-out routine
                    </h2>
                    <p>
                        Select your work-out routine based on your desire muscle groups

                    </p>
                </div>
            </div>
            <div className="developer-info">
                <div className="developer-profile">
                    <div className="developer-photo">
                       <img src="/images/Jonathan_Bent.jpg"></img>
                    </div>

                    <div className="developer-name">Jonathan Bent</div>
                    <p>Project Lead</p>
                     <div className="links">
                         <a href="https://www.linkedin.com/in/jon-bent/">
                            <img src="/images/linkedin-logo.png"></img>
                         </a>
                         <a href="https://github.com/jonbent">
                            <img src="/images/github-logo.png"></img>
                         </a>
                         <a href="https://angel.co/jon-bent-1">
                             <img src="/images/angellist.png"></img>
                         </a>
                    </div>
                </div>
                <div className="developer-profile">
                    <div className="developer-photo">
                       <img src="/images/Muhammed_Mustafa.jpg"></img>
                    </div>

                    <div className="developer-name">Mohammed Mustafa</div>
                     <p>Back-end Lead</p>
                     <div className="links">
                         <a href="https://www.linkedin.com/in/mohammed-mustafa-96469a167/">
                         <img src="/images/linkedin-logo.png"></img>
                         </a>
                         <a href="https://github.com/mmmymustafa">
                         <img src="/images/github-logo.png"></img>
                         </a>
                         <a href="https://angel.co/mohammed-mustafa-9">
                         <img src="/images/angellist.png"></img>
                         </a>
                    </div>
                </div>
                <div className="developer-profile">
                    <div className="developer-photo">
                       <img src="/images/Manraj_Singh.jpg"></img>
                    </div>

                    <div className="developer-name">Manraj Singh</div>
                    <p>Full-stack Lead</p>
                     <div className="links">
                         <a href="https://www.linkedin.com/in/manraj-singh-01366710a/">
                         <img src="/images/linkedin-logo.png"></img>
                         </a>
                         <a href="https://github.com/mmmymustafa">
                         <img src="/images/github-logo.png"></img>
                         </a>
                         <a href="https://angel.co/manraj-singh-10">
                         <img src="/images/angellist.png"></img>
                         </a>
                    </div>
                </div>
                <div className="developer-profile">
                    <div className="developer-photo">
                       <img src="/images/Julius_Wu.jpg"></img>
                    </div>

                    <div className="developer-name">Julius Wu</div>
                    <p>Front-end Lead</p>
                     <div className="links">
                        <a href="https://www.linkedin.com/in/juliuswu/">
                        <img src="/images/linkedin-logo.png"></img>
                        </a>
                        <a href="https://github.com/juliuswuwu">
                        <img src="/images/github-logo.png"></img>
                        </a>
                        <a href="https://angel.co/julius-wu">
                         <img src="/images/angellist.png"></img>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Splash
