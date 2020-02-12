import React from 'react';

const RoutineDay = ({day, routine}) => {
    return (
        <div className="RoutineDay">
                <h1>{day.date}</h1>
        </div>
    );
};

export default RoutineDay;