import React, { Component } from 'react';
class FemaleFront extends React.Component {

    render() {
        return (
            <div className="female-front-container">
            <div className="female-front-selector">
                <img id="front-female-muscle-group" src="../../../public/images/femaleUI/front/front-female-muscle-group.png" ></img>

                <img id="front-female-abs" src="images/female/front-female-abs.png"></img>

                <div className="front-female-arms">
                    <img id="front-female-left-arm" src="../../../public/images/femaleUI/front/front-female-left-arm.png" onClick=""></img>
                    <img id="front-female-right-arm" src="../../../public/images/femaleUI/front/front-female-right-arm.png" onClick=""></img>
                </div>

                <img id="front-female-chest" src="../../../public/images/femaleUI/front/front-female-chest.png"></img>

                <div className="front-female-shoulder">
                    <img id="front-female-top-shoulder" src="../../../public/images/femaleUI/front/front-female-front-shoulder.png" onClick=""></img>
                    <img id="front-female-left-shoulder" src="../../../public/images/femaleUI/front/front-female-left-shoulder.png" onClick=""></img>
                    <img id="front-female-right-shoulder" src="../../../public/images/femaleUI/front/front-female-right-shoulder.png" onClick=""></img>
                </div>

                <div className="front-female-legs">
                    <img id="front-female-left-leg" src="../../../public/images/femaleUI/front/front-female-left-leg.png" onClick=""></img>
                    <img id="front-female-right-leg" src="../../../public/images/femaleUI/front/front-female-right-leg.png" onClick=""></img>
                </div> 
            </div>
            </div>
        )
    }

}

export default FemaleFront; 