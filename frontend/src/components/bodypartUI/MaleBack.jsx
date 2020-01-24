import React from 'React';
class MaleBack extends React.Component {

    render() {
        return (
            <div className="male-back-container">
            <div className="male-back-selector">
                <img id="back-male-muscle-group" src="../../../public/images/maleUI/back/back-male-muscle-group.png"></img>

                <img id="back-male-back" src="../../../public/images/maleUI/back/back-back.png"></img>

                <img id="back-male-calves" src="../../../public/images/maleUI/back/back-calves.png"></img>

            <div className="back-male-arms">
                    <img id="back-male-left-arm" src="../../../public/images/maleUI/back/back-left-arm.png" onClick=""></img>
                    <img id="back-male-right-arm" src="../../../public/images/maleUI/back/back-right-arm.png" onClick=""></img>
            </div>

            <div className="back-male-shoulder">
                    <img id="back-male-top-shoulder" src="../../../public/images/maleUI/back/back-top-shoulder.png" onClick=""></img>
                    <img id="back-male-left-shoulder" src="../../../public/images/maleUI/back/back-left-shoulder.png" onClick=""></img>
                    <img id="back-male-right-shoulder" src="../../../public/images/maleUI/back/back-right-shoulder.png" onClick=""></img>
            </div>

            <img id="back-male-legs" src="images/back-legs.png"></img>
            </div>
            </div>
        )
    }

}

export default MaleBack; 