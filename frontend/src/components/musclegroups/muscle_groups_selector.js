// import * as SessionApiUtil from '../util';
import jwt_decode from 'jwt-decode';
import React from 'react'


class MuscleGroupsSelector extends React.Component{

render(){
    return(
        <div>
            <div>
                <MaleFront />
                <MaleBack />
                <FemaleFront />
                <FemaleBack />
            </div>
            <div></div>
            <div>
                Submit
            </div>
        </div>
    );
}

}


export default MuscleGroupsSelector;