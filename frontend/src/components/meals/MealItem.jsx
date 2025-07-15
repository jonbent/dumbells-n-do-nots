import React from 'react';
import NextArrow from "../svg/NextArrow";
import '../../scss/meals/MealItem.scss';
const MealItem = ({ meal, daySelect, handleSelectMeal, day, handleMealCheck = null, openModal = null, selected= false, single=false, dbDay, userMeals}) => {
    let actions;
    const daySelectKeys = daySelect ? Object.keys(daySelect) : null;
    if (!single && daySelect && daySelectKeys.length){
        actions = (
            <div className="actions">
                <button onClick={() => handleSelectMeal(meal?._id, -1)}><span><NextArrow/></span><span>Remove</span></button>
                <span>{daySelect[day]?.meals[meal?._id] ? daySelect[day]?.meals[meal?._id] : 0 }</span>
                <button onClick={() => handleSelectMeal(meal?._id, 1)}><span><NextArrow/></span><span>Add</span></button>
            </div>
        )
    } else if (single) {
        const userMeal = userMeals.find(uM => uM.meal === meal._id);
        actions = (
            <div className="actions">
                <button onClick={() => handleSelectMeal(meal._id, -1)}><span><NextArrow/></span><span>Remove</span></button>
                <span>{!!userMeal ? userMeal.quantity : 0 }</span>
                <button onClick={() => handleSelectMeal(meal._id, 1)}><span><NextArrow/></span><span>Add</span></button>
            </div>
        )
    }
    return (
        <div className="meal-item" onClick={openModal}>
            <div className="meal-image-and-quantity">
                <div className="meal-image" style={{backgroundImage: `url(${meal.photoUrl})`}}></div>
                {/*actions*/}
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
                    {!!selected ?
                        (
                            <div className="check"></div>
                        ) : (!single && daySelect && daySelectKeys.length) || single ? (
                            actions
                        ) : <div></div>
                    }

                </div>
            </div>
        </div>
    );
};

export default MealItem;
