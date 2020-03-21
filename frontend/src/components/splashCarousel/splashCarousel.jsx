import React, { Component } from 'react';
import '../../scss/splashCarousel.scss';

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
        }, 4000 );
    }
    render() {
        
        return (
            <div className="splash-carousel">
                <div className="carousel-items">
                    {this.props.children.map((child, idx) => {
                        return <div style={{ transform: `translateX(-${this.state.currentIndex * 100}%)` }}>{child}</div>
                    })}
                </div>
                <div className="carousel-status">
                    {this.props.children.map((child,idx) => {
                        return (<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="22" x2="24" y2="22" stroke="gray" />
                                <line x1="0" y1="22" x2={(new Date().getTime()-this.state.intervalStart)%24} y2="22" stroke="white" />
                                </svg>)
                    })}
                    
                </div>
            </div>
            
        )
    }
}
