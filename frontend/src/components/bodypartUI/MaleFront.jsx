import React from 'React';
class MaleFront extends React.Component{

    render(){
        return(
            <div className="male-body-selector" onclick="">
                <img id="front-male-muscle-group" src="../../../public/images/maleUI/front/front-male-muscle-group.png" ></img>

                <img id="front-male-abs" src="../../../public/images/maleUI/front/front-abs.png"></img>

                <div className="front-male-arms" onclick="">
                    <img id="front-male-left-arm" src="../../../public/images/maleUI/front/front-left-arm.png"></img>
                    <img id="front-male-right-arm" src="../../../public/images/maleUI/front/front-right-arm.png"></img>
                </div>

                <div className="front-male-chest" onclick="">
                    <img id="front-male-left-chest" src="../../../public/images/maleUI/front/front-left-chest.png"></img>
                    <img id="front-male-right-chest" src="../../../public/images/maleUI/front/front-right-chest.png"></img>
                </div>

                <div className="front-male-shoulder" onclick="">
                    <img id="front-male-top-shoulder" src="../../../public/images/maleUI/front/front-top-shoulder.png"></img>
                    <img id="front-male-left-shoulder" src="../../../public/images/maleUI/front/front-left-shoulder.png"></img>
                    <img id="front-male-right-shoulder" src="../../../public/images/maleUI/front/front-right-shoulder.png"></img>
                </div>

                <div className="front-male-legs" onclick="">
                    <img id="front-male-left-leg" src="../../../public/images/maleUI/front/front-left-leg.png"></img>
                    <img id="front-male-right-leg" src="../../../public/images/maleUI/front/front-right-leg.png"></img>
                </div>        
            </div>
        )
    }

}

export default MaleFront; 