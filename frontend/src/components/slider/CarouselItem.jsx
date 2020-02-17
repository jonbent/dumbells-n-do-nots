import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import GivenStars from '../reviews/GivenStars'
export default class CarouselItem extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            shouldRender: this.props.rendered
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.rendered && !this.props.rendered){
            setTimeout(() => {
                this.setState({ shouldRender: false })
            }, 1000)
        }
        if (!prevProps.rendered && this.props.rendered){
            this.setState({ shouldRender: true })
        }
        
    }
    
    render() {
        const { item, onClick, selected } = this.props;
        if (this.state.shouldRender) return (
        <div className={`exercise-item ${selected}`} onClick={() => onClick(item._id)}>
            {item.name}
        </div>
        );
        // <div key={groupExercise._id} className={`exercise-item ${selectedExercises[groupExercise._id] ? 'selected' : ""}`} onClick={() => this.handleExerciseSelect(groupExercise._id)}>
        //     <div className="name">
        //         {groupExercise.name}
        //     </div>
        // </div>
        return null
    }
}
