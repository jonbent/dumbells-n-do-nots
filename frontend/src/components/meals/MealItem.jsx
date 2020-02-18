import React from 'react';
import NextArrow from "../svg/NextArrow";
import '../../scss/meals/MealItem.scss';
const MealItem = ({meal, daySelect, handleSelectMeal, day, handleMealCheck}) => {
    return (
        <div className="meal-item" onClick={() => handleMealCheck()}>
                            {/*<img src={meal.photoUrl}/>*/}
            <div className="meal-image-and-quantity">
                <div className="meal-image" style={{backgroundImage: `url(${meal.photoUrl})`}}></div>
                {daySelect && <div className="actions">
                    <NextArrow onClick={() => handleSelectMeal(meal._id, -1)}/>
                    {daySelect[day].meals[meal._id] ? daySelect[day].meals[meal._id] : 0 }
                    <NextArrow onClick={() => handleSelectMeal(meal._id, 1)}/>
                </div>}

            </div>
            <div className="meal-info">
                <div>{meal.title}</div>
                <div className="meal-nutrients">
                    <div>cals: {meal.calories}</div>
                    <div>fat: {meal.fat}</div>
                    <div>carbs: {meal.carbs}</div>
                    <div>protein: {meal.protein}</div>
                </div>
            </div>
        </div>
    );
};

export default MealItem;