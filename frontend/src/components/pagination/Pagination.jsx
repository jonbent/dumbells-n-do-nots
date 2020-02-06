import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import NextArrow from '../svg/NextArrow';
import BackButton from '../svg/BackButton'
import DropDownArrow from '../svg/DropDownArrow'
import OutsideClickHandler from './OutsideClickHandler'
import '../../scss/Pagination.scss'

export default class Pagination extends Component {
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
        const { pageSize, itemsAmount, changePage } = this.props;
        console.log(Math.ceil(itemsAmount / pageSize))
        const curPage = Number.parseInt(this.props.curPage);
        const { openDropDown } = this.state;
        return (
            <nav className="pagination">
                <a onClick={() => changePage(curPage < 2 ? curPage : curPage - 1)} disabled={curPage === 1 ? true : false} className="back-button">
                    <BackButton />
                </a>
                <div>
                    <button onMouseUp={this.toggleDropDown}>
                        <span>
                            Page {curPage} of {Math.ceil(itemsAmount / pageSize)}
                        </span>
                        <div>
                            <DropDownArrow />
                        </div>
                    </button>
                    {openDropDown &&
                        <OutsideClickHandler action={this.toggleDropDown} className="drop-down">
                            {[...Array(Math.ceil(itemsAmount / pageSize)).keys()].map(i => {
                                return (
                                        <a key={i} onClick={() => {this.toggleDropDown(); changePage(i + 1)}} className={`${curPage === i + 1 ? "active" : ""}`}>
                                            Page {i + 1} of {Math.ceil(itemsAmount / pageSize)}
                                        </a>
                                )
                            })}
                        </OutsideClickHandler>
                    }
                </div>
                <a onClick={() => changePage(Math.ceil(itemsAmount / pageSize) === curPage ? curPage : curPage + 1)} disabled={curPage === Math.ceil(itemsAmount / pageSize) ? true : false} className="next-button">
                    <NextArrow />
                </a>
            </nav>
        )
    }
}
