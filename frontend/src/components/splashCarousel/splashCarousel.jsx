import React, { Component } from 'react';
import '../../scss/splashCarousel.scss';
import CarouselStatus from "./CarouselStatus";

export default class SplashCarousel extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex : 0,
            intervalStart : new Date().getTime()
        }
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({currentIndex: (this.state.currentIndex+1)%this.props.children.length,
                intervalStart : new Date().getTime()} )
        }, 6000 );
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="splash-carousel">
                <div className="carousel-items">
                    {this.props.children.map((child, idx) => {
                        return <div key={idx} style={{ transform: `translateX(-${this.state.currentIndex * 100}%)` }}>{child}</div>
                    })}
                </div>
                <div className="carousel-status">
                    {this.props.children.map((child,idx) => {
                        return (
                            <CarouselStatus key={idx} ownIdx={idx} curIdx={this.state.currentIndex}/>
                        )
                    })}
                </div>
            </div>
            
        )
    }
}
