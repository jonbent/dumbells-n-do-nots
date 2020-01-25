import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../scss/bodyUI/maleFront.scss';
class MaleFront extends React.Component{

    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div className= "male-front-container">
            <div className="male-front-selector">
                
                <img id="front-male-muscle-group" src="/images/maleUI/front/front-male-muscle-group.png"></img>

                <img id="front-male-abs" src="/images/maleUI/front/front-abs.png"></img>

                <div className="front-male-arms">
                    <img id="front-male-left-arm" src="/images/maleUI/front/front-left-arm.png"></img>
                    <img id="front-male-right-arm" src="/images/maleUI/front/front-right-arm.png"></img>
                </div>

                <div className="front-male-chest">
                    <img id="front-male-left-chest" src="/images/maleUI/front/front-left-chest.png"></img>
                    <img id="front-male-right-chest" src="/images/maleUI/front/front-right-chest.png"></img>
                </div>

                <div className="front-male-shoulder">
                    <img id="front-male-top-shoulder" src="/images/maleUI/front/front-top-shoulder.png"></img>
                    <img id="front-male-left-shoulder" src="/images/maleUI/front/front-left-shoulder.png"></img>
                    <img id="front-male-right-shoulder" src="/images/maleUI/front/front-right-shoulder.png"></img>
                </div>

                <div className="front-male-legs">
                    <img id="front-male-left-leg" src="/images/maleUI/front/front-left-leg.png"></img>
                    <img id="front-male-right-leg" src="/images/maleUI/front/front-right-leg.png"></img>
                </div>        
            </div>
            </div>
        )
    }

}

export default MaleFront; 


const mSTP = (state) => ({
    
})

const mDTP = dispatch =>({
    
})

connect(mSTP, mDTP)(MuscleGroupSelector);