import React, { Component } from 'react'
import CarouselItem from './CarouselItem'
export default class CarouselItemHolder extends Component {
    render() {
        const {transformX, onClick, rendered, items, selectedItems} = this.props;
        return (
            <div className="carousel-items" style={{transform: transformX}}>
                    {items.map(item => {
                        return <CarouselItem key={item._id} item={item} selected={selectedItems[item._id] ? 'selected' : ""} rendered={rendered} onClick={() => onClick(item._id)}/>
                    })}
            </div>
        )
    }
}
