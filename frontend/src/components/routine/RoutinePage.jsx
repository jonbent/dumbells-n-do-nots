import React, {Component} from 'react';

import NextArrow from '../svg/NextArrow';
import BackButton from '../svg/BackButton'
import DropDownArrow from '../svg/DropDownArrow'
import OutsideClickHandler from "../pagination/OutsideClickHandler";
import '../../scss/Pagination.scss'

class RoutinePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openDropDown: false
        };
        this.toggleDropDown = this.toggleDropDown.bind(this)
    }
    toggleDropDown(){
        this.setState({
            openDropDown: !this.state.openDropDown
        })
    }
    render() {
        const {changeDay, curDay,dayAmount, dayValues } = this.props;
        const {openDropDown} = this.state;
        if (dayAmount === 0) return null;
        return (
            <nav className="pagination routine-pagination">
                <button onClick={() => changeDay(curDay === 0 ? curDay : curDay - 1)} disabled={curDay === 0 ? true : false} className="back-button">
                    <BackButton />
                </button>
                <div>
                    <button onMouseUp={this.toggleDropDown}>
                        <span>
                            {dayValues[curDay]}
                        </span>
                        <div>
                            <DropDownArrow />
                        </div>
                    </button>
                    {openDropDown &&
                    <OutsideClickHandler action={this.toggleDropDown} className="drop-down">
                        {[...Array(dayAmount).keys()].map(i => {
                            return (
                                <button key={i} onClick={() => {
                                    this.toggleDropDown();
                                    changeDay(i)
                                }} className={`${curDay === i ? "active" : ""}`}>
                                    {dayValues[i]}
                                </button>
                            )
                        })}
                    </OutsideClickHandler>
                    }
                </div>
                <button onClick={() => changeDay(curDay === dayAmount - 1 ? curDay : curDay + 1)} disabled={curDay === dayAmount - 1 ? true : false} className="next-button">
                    <NextArrow />
                </button>
            </nav>
        );
    }
}

export default RoutinePage;