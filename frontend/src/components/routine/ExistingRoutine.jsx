import React, {Component} from 'react';

class ExistingRoutine extends Component {
    componentDidMount() {
        this.props.fetchRoutine(this.props.routine._id);
    }

    render() {
        const {days} = this.props;
        return (
            <div className="existing-days-container">
                {days.map((d, idx)=> {
                    return (
                        <div key={d._id}>
                            <div>Day {idx + 1}</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ExistingRoutine;