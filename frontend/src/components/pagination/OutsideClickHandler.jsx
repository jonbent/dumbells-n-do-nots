import React, { Component } from 'react'

export default class OutsideClickHandler extends Component {
    constructor(props) {
        super(props)

        this.setRef = this.setRef.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleOutsideClick);
    }

    setRef(node){
        this.ref = node;
    }

    handleOutsideClick(e, ...options) {
        if (this.ref && !this.ref.contains(e.target)) {
            this.props.action(e, ...options);
        }
    }

    render() {
        const className = this.props.className ? this.props.className : ""
        return (
            <div ref={this.setRef} className={className}>{this.props.children}</div>
        );
    }
}
