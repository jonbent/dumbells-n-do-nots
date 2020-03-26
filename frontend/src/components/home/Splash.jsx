import React from 'react'
import '../../scss/Splash.scss';
import SplashCarousel from '../splashCarousel/splashCarousel';
import {Link} from 'react-router-dom';
// import NavBar from "../navbar/NavBar";


const Splash = () => {
    return (
        <div className="wrapper">
            {/* <NavBar/> */}
            <div className="Info">
                <h1>Fitness starts with a plan...</h1>
                <p>New Year, New Me! Start taking control of your goals.
                    Let us find you the perfect meal and your custom exercise routine.
                </p>
                <Link to="/signup">
                <button className="Sign-up-btn">signup for free</button>
                </Link>
                <p>Already have an account?
                    <span> <Link to="/login" >Login</Link></span>
                </p>
            </div>

            <div className="separators">
                <SplashCarousel>
                    <div className="demo-text">
                        <h2>
                            Track your progress!
                        </h2>
                        <p>
                            You can track your weight progress & view past, present, and future routines.
                        </p>
                    </div>
                    <div className="demo-text">
                        <h2>
                            Select your meals from an exhaustive list of provided meals.
                        </h2>
                        <p>
                            We take it upon ourselves to add new meals to the database on a regular basis in order for you to have more options for your special routine.
                        </p>
                    </div>
                </SplashCarousel>

            </div>

             <div className="demo-feature">
                <div className="selector-demo" style={{backgroundImage: "url(/images/meal-selector-demo.png)"}}></div>
                {/* <div className="demo-text">
                    <h2>
                        Select your meals from our Database
                    </h2>
                    <p>
                       What's in your food? Learn about calories, fats, carbs and poteins in your meal.
                    </p>
                </div> */}
            </div>

            <div className="separators">
                <SplashCarousel>
                    <div className="demo-text">
                        <h2>
                            Customize your workout routine
                        </h2>
                        <p>
                            Select your workout routine day-to-day based on specific desired muscle groups.
                        </p>
                    </div>
                    <div className="demo-text">
                        <h2>
                            Customize your own exercises
                        </h2>
                        <p>
                            Not only do we allow you to help us expand our meals, but we also allow you to expand the exercise list.
                        </p>
                    </div>
                </SplashCarousel>
            </div>


            <div className="exercise-demo-feature">
                <div className="exercise-selector-demo" style={{backgroundImage: "url(/images/exercise-selector-demo.png)"}}></div>
                {/* <div className="exercise-demo-text">
                    <h2>
                        Customize your work-out routine
                    </h2>
                    <p>
                        Select your work-out routine based on your desire muscle groups

                    </p>
                </div> */}
            </div>

            {/* <div className="separators">

            </div> */}

            <div className="developer-info">
                <div className="developer-profile">
                    <div className="developer-photo">
                       <img src="/images/Jonathan_Bent.jpg" alt="Jon Bent"></img>
                    </div>

                    <div className="developer-name">Jonathan Bent</div>
                    <p>Project Lead</p>
                     <div className="links">
                         <a href="https://www.linkedin.com/in/jon-bent/">
                            <img src="/images/linkedin-logo.png" alt="Jon Bent's LinkedIn"></img>
                         </a>
                         <a href="https://github.com/jonbent">
                            <img src="/images/github-logo.png" alt="Jon Bent's Github"></img>
                         </a>
                         <a href="https://angel.co/jon-bent-1">
                             <img src="/images/angellist.png" alt="Jon Bent's Angelist"></img>
                         </a>
                    </div>
                </div>
                <div className="developer-profile">
                    <div className="developer-photo">
                       <img src="/images/Muhammed_Mustafa.jpg" alt="Mohammed Mustafa"></img>
                    </div>

                    <div className="developer-name">Mohammed Mustafa</div>
                     <p>Back-end Lead</p>
                     <div className="links">
                         <a href="https://www.linkedin.com/in/mohammed-mustafa-96469a167/">
                         <img src="/images/linkedin-logo.png" alt="Mohammed Mustafa's LinkedIn"></img>
                         </a>
                         <a href="https://github.com/mmmymustafa">
                         <img src="/images/github-logo.png" alt="Mohammed Mustafa's Github"></img>
                         </a>
                         <a href="https://angel.co/mohammed-mustafa-9">
                         <img src="/images/angellist.png" alt="Mohammed Mustafa's Angelist"></img>
                         </a>
                    </div>
                </div>
                <div className="developer-profile">
                    <div className="developer-photo">
                       <img src="/images/Manraj_Singh.jpg" alt="Manraj Singh"></img>
                    </div>

                    <div className="developer-name">Manraj Singh</div>
                    <p>Full-stack Lead</p>
                     <div className="links">
                         <a href="https://www.linkedin.com/in/manraj-singh-01366710a/">
                         <img src="/images/linkedin-logo.png" alt="Manraj Singh's LinkedIn"></img>
                         </a>
                         <a href="https://github.com/mskhokhar">
                         <img src="/images/github-logo.png" alt="Manraj Singh's Github"></img>
                         </a>
                         <a href="https://angel.co/manraj-singh-10">
                         <img src="/images/angellist.png" alt="Manraj Singh's Angelist"></img>
                         </a>
                    </div>
                </div>
                <div className="developer-profile">
                    <div className="developer-photo">
                       <img src="/images/Julius_Wu.jpg" alt="Julius Wu"></img>
                    </div>

                    <div className="developer-name">Julius Wu</div>
                    <p>Front-end Lead</p>
                     <div className="links">
                        <a href="https://www.linkedin.com/in/juliuswu/">
                        <img src="/images/linkedin-logo.png" alt="Julius Wu's LinkedIn"></img>
                        </a>
                        <a href="https://github.com/juliuswuwu">
                        <img src="/images/github-logo.png" alt="Julius Wu's Github"></img>
                        </a>
                        <a href="https://angel.co/julius-wu">
                         <img src="/images/angellist.png" alt="Julius Wu's Angelist"></img>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Splash
