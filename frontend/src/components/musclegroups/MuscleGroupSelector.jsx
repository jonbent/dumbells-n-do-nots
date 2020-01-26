import React, { Component } from 'react';
import MaleFront from '../bodypartUI/MaleFront'
import MaleBack from '../bodypartUI/MaleBack'
import FemaleBack from '../bodypartUI/FemaleBack'
import FemaleFront from '../bodypartUI/FemaleFront'
class MuscleGroupSelector extends Component {
    render() {
        return (
            <div>
                <MaleFront/>
            </div>
        )
    }
}
export default MuscleGroupSelector;
