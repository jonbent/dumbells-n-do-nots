import React from 'react'
import { Redirect } from 'react-router-dom'
import '../../scss/Splash.scss';



const Splash = () => {
    return (
        <Redirect to="/login"/>

        // <div className="Info"> 
        //     <h1>Fitness starts with a plan...</h1>
        //     <p>New Year, New Me! Start taking control of your goals.
        //         Let us find you the perfect meal and your custom exercise routine.
        //     </p>
        //     <button classname="Sign-up-btn">signup for free</button>
        //     <p>aready have an account? 
        //         <a href="/account/login" > Login</a>
        //     </p>
        // </div>

        // <div className="developer-info">
        //     <h3>Meet your developer</h3>
        //     <div className="Jonathan-Bent-profile">
        //         <div className="Jonathan-container">
        //             <div className="Jonathan-photo">
        //                 <img src="/images/Jonathan_Bent.jpg"></img>
        //             </div>
        //             <div className="Info">
        //                 <div className="Jon-name">Jonathan Bent</div>
        //                 <div className="links">
        //                     {/* <img src="/images/linkedin-logo.png"></img>
        //                     <img src="/images/github-logo.png"></img>
        //                     <img src="/images/angellist.png"></img> */}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="Manraj-Singh-profile">
                
        //     </div>
        //     <div className="Muhammed-Mustafa-profile">
                
        //     </div>
        // </div>
    )
}

export default Splash
