import React, {Component} from 'react';

class CarouselStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xValue: props.ownIdx < props.curIdx ? 100 : 0
        };
        this.startTick = this.startTick.bind(this);
    }
    startTick(){
        this.interval = setInterval(() => {
            if (this.state.xValue >= 100) clearInterval(this.interval);
            this.setState({
                xValue: this.state.xValue + 0.183333
            });
        }, 10);
    }
    componentDidMount() {
        if (this.props.ownIdx === this.props.curIdx) this.startTick();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.curIdx === 0 && prevProps.curIdx !== 0) {
            this.setState({xValue: 0});
            clearInterval(this.interval);
        }
        if (this.props.ownIdx === this.props.curIdx && prevProps.ownIdx !== prevProps.curIdx){
            this.startTick();
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <svg viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="8" x2="100" y2="8" stroke="gray" strokeWidth="15" />
                {this.state.xValue !== 0 && <line x1="0" y1="8" x2={this.state.xValue} y2="8" stroke="white" strokeWidth="15"/>}
            </svg>
        );
    }
}

export default CarouselStatus;