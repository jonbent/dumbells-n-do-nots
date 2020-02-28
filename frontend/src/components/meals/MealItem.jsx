import React from 'react';
import NextArrow from "../svg/NextArrow";
import '../../scss/meals/MealItem.scss';
const MealItem = ({ meal, daySelect, handleSelectMeal, day, handleMealCheck = null, selected= false, single=false, dbDay, userMeals}) => {
    let actions;
    if (!single && daySelect && Object.keys(daySelect).length){
        actions = (
            <div className="actions">
                <NextArrow onClick={() => handleSelectMeal(meal._id, -1)}/>
                {daySelect[day].meals[meal._id] ? daySelect[day].meals[meal._id] : 0 }
                <NextArrow onClick={() => handleSelectMeal(meal._id, 1)}/>
            </div>
        )
    } else if (single) {
        const userMeal = userMeals.find(uM => uM.meal === meal._id);
        actions = (
            <div className="actions">
                <NextArrow onClick={() => handleSelectMeal(meal._id, -1)}/>
                {!!userMeal ? userMeal.quantity : 0 }
                <NextArrow onClick={() => handleSelectMeal(meal._id, 1)}/>
            </div>
        )
    }
    return (
        <div className="meal-item" onClick={handleMealCheck}>
            <div className="meal-image-and-quantity">
                <div className="meal-image" style={{backgroundImage: `url(${meal.photoUrl})`}}></div>
                {actions}
            </div>
            <div className="meal-info">
                <div>{meal.title}</div>
                <div className="meal-content">
                    <div className="meal-nutrients">
                        <div>cals: {meal.calories}</div>
                        <div>fat: {meal.fat}</div>
                        <div>carbs: {meal.carbs}</div>
                        <div>protein: {meal.protein}</div>
                    </div>
                    <div className={!!selected ? "check" : ""}></div>
                </div>
            </div>
        </div>
    );
};

export default MealItem;