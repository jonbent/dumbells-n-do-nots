import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMealDetails} from "../../actions/MealActions";
import "../../scss/meals/MealDetails.scss"
import {Link} from "react-router-dom";

const MealDetails = () => {
    const dispatch = useDispatch();
    const meal = useSelector(({entities}) => entities.mealDetails);
    useEffect(() => {
        dispatch(fetchMealDetails(meal.spoonacularId));
    }, [meal.spoonacularId]);
    useEffect(() => {
        console.log(meal);
    }, [meal])
    return (
//         {
//     "spoonacularId": 7582,
//     "id": 7582,
//     "image": "https://img.spoonacular.com/recipes/7582-556x370.jpg",
//     "imageType": "jpg",
//     "title": "Seared Tuna with Radish Salad and Wasabi Dressing",
//     "readyInMinutes": 45,
//     "servings": 4,
//     "sourceUrl": "https://www.foodandwine.com/recipes/seared-tuna-with-radish-salad-and-wasabi-dressing",
//     "vegetarian": false,
//     "vegan": false,
//     "glutenFree": true,
//     "dairyFree": true,
//     "veryHealthy": true,
//     "cheap": false,
//     "veryPopular": false,
//     "sustainable": false,
//     "lowFodmap": true,
//     "weightWatcherSmartPoints": 6,
//     "gaps": "no",
//     "preparationMinutes": null,
//     "cookingMinutes": null,
//     "aggregateLikes": 0,
//     "healthScore": 100,
//     "creditsText": "Food and Wine",
//     "license": null,
//     "sourceName": "Food and Wine",
//     "pricePerServing": 765.86,
//     "extendedIngredients": [
//         {
//             "id": 15117,
//             "aisle": "Seafood",
//             "image": "tuna-steak.png",
//             "consistency": "SOLID",
//             "name": "top-quality tuna steaks",
//             "nameClean": "top-quality tuna steaks",
//             "original": "4 6-ounce top-quality tuna steaks, about 3/4 inch thick",
//             "originalName": "top-quality tuna steaks, about 3/4 inch thick",
//             "amount": 24,
//             "unit": "ounce",
//             "meta": [],
//             "measures": {
//                 "us": {
//                     "amount": 24,
//                     "unitShort": "oz",
//                     "unitLong": "ounces"
//                 },
//                 "metric": {
//                     "amount": 680.389,
//                     "unitShort": "g",
//                     "unitLong": "grams"
//                 }
//             }
//         },
//         {
//             "id": 11165,
//             "aisle": "Produce",
//             "image": "cilantro.png",
//             "consistency": "SOLID",
//             "name": "cilantro leaves",
//             "nameClean": "cilantro leaves",
//             "original": "1/4 cup cilantro leaves",
//             "originalName": "cilantro leaves",
//             "amount": 0.25,
//             "unit": "cup",
//             "meta": [],
//             "measures": {
//                 "us": {
//                     "amount": 0.25,
//                     "unitShort": "cups",
//                     "unitLong": "cups"
//                 },
//                 "metric": {
//                     "amount": 4,
//                     "unitShort": "g",
//                     "unitLong": "grams"
//                 }
//             }
//         },
//         {
//             "id": 10011676,
//             "aisle": "Produce",
//             "image": "snow-pea-sprouts-or-pea-shoots.png",
//             "consistency": "SOLID",
//             "name": "daikon sprouts",
//             "nameClean": "daikon sprouts",
//             "original": "1/4 cup daikon sprouts or other peppery sprouts",
//             "originalName": "daikon sprouts or other peppery sprouts",
//             "amount": 0.25,
//             "unit": "cup",
//             "meta": [],
//             "measures": {
//                 "us": {
//                     "amount": 0.25,
//                     "unitShort": "cups",
//                     "unitLong": "cups"
//                 },
//                 "metric": {
//                     "amount": 9.5,
//                     "unitShort": "ml",
//                     "unitLong": "milliliters"
//                 }
//             }
//         },
//         {
//             "id": 2064,
//             "aisle": "Produce",
//             "image": "mint.jpg",
//             "consistency": "SOLID",
//             "name": "mint leaves",
//             "nameClean": "mint leaves",
//             "original": "3 tablespoons mint leaves, torn in half",
//             "originalName": "mint leaves, torn in half",
//             "amount": 3,
//             "unit": "tablespoons",
//             "meta": [],
//             "measures": {
//                 "us": {
//                     "amount": 3,
//                     "unitShort": "Tbsps",
//                     "unitLong": "Tbsps"
//                 },
//                 "metric": {
//                     "amount": 3,
//                     "unitShort": "Tbsps",
//                     "unitLong": "Tbsps"
//                 }
//             }
//         },
//         {
//             "id": 93830,
//             "aisle": "Ethnic Foods",
//             "image": "mirin.jpg",
//             "consistency": "SOLID",
//             "name": "mirin",
//             "nameClean": "mirin",
//             "original": "1/4 cup mirin",
//             "originalName": "mirin",
//             "amount": 0.25,
//             "unit": "cup",
//             "meta": [],
//             "measures": {
//                 "us": {
//                     "amount": 0.25,
//                     "unitShort": "cups",
//                     "unitLong": "cups"
//                 },
//                 "metric": {
//                     "amount": 59,
//                     "unitShort": "g",
//                     "unitLong": "grams"
//                 }
//             }
//         },
//         {
//             "id": 4053,
//             "aisle": "Oil, Vinegar, Salad Dressing",
//             "image": "olive-oil.jpg",
//             "consistency": "LIQUID",
//             "name": "olive oil",
//             "nameClean": "olive oil",
//             "original": "1 tablespoon pure olive oil",
//             "originalName": "pure olive oil",
//             "amount": 1,
//             "unit": "tablespoon",
//             "meta": [
//                 "pure"
//             ],
//             "measures": {
//                 "us": {
//                     "amount": 1,
//                     "unitShort": "Tbsp",
//                     "unitLong": "Tbsp"
//                 },
//                 "metric": {
//                     "amount": 1,
//                     "unitShort": "Tbsp",
//                     "unitLong": "Tbsp"
//                 }
//             }
//         },
//         {
//             "id": 11429,
//             "aisle": "Produce",
//             "image": "radishes.jpg",
//             "consistency": "SOLID",
//             "name": "radishes",
//             "nameClean": "radishes",
//             "original": "1/2 pound radishes, sliced paper thin",
//             "originalName": "radishes, sliced paper thin",
//             "amount": 0.5,
//             "unit": "pound",
//             "meta": [
//                 "paper thin",
//                 "sliced"
//             ],
//             "measures": {
//                 "us": {
//                     "amount": 0.5,
//                     "unitShort": "lb",
//                     "unitLong": "pounds"
//                 },
//                 "metric": {
//                     "amount": 226.796,
//                     "unitShort": "g",
//                     "unitLong": "grams"
//                 }
//             }
//         },
//         {
//             "id": 1022053,
//             "aisle": "Ethnic Foods",
//             "image": "rice-vinegar.png",
//             "consistency": "LIQUID",
//             "name": "rice vinegar",
//             "nameClean": "rice vinegar",
//             "original": "1 tablespoon rice vinegar",
//             "originalName": "rice vinegar",
//             "amount": 1,
//             "unit": "tablespoon",
//             "meta": [],
//             "measures": {
//                 "us": {
//                     "amount": 1,
//                     "unitShort": "Tbsp",
//                     "unitLong": "Tbsp"
//                 },
//                 "metric": {
//                     "amount": 1,
//                     "unitShort": "Tbsp",
//                     "unitLong": "Tbsp"
//                 }
//             }
//         },
//         {
//             "id": 1102047,
//             "aisle": "Spices and Seasonings",
//             "image": "salt-and-pepper.jpg",
//             "consistency": "SOLID",
//             "name": "sea salt and pepper",
//             "nameClean": "sea salt and pepper",
//             "original": "Sea salt and freshly ground pepper",
//             "originalName": "Sea salt and freshly ground pepper",
//             "amount": 4,
//             "unit": "servings",
//             "meta": [
//                 "freshly ground"
//             ],
//             "measures": {
//                 "us": {
//                     "amount": 4,
//                     "unitShort": "servings",
//                     "unitLong": "servings"
//                 },
//                 "metric": {
//                     "amount": 4,
//                     "unitShort": "servings",
//                     "unitLong": "servings"
//                 }
//             }
//         },
//         {
//             "id": 16161,
//             "aisle": "Refrigerated",
//             "image": "tofu.png",
//             "consistency": "SOLID",
//             "name": "silken tofu",
//             "nameClean": "silken tofu",
//             "original": "3 tablespoons silken tofu",
//             "originalName": "silken tofu",
//             "amount": 3,
//             "unit": "tablespoons",
//             "meta": [],
//             "measures": {
//                 "us": {
//                     "amount": 3,
//                     "unitShort": "Tbsps",
//                     "unitLong": "Tbsps"
//                 },
//                 "metric": {
//                     "amount": 3,
//                     "unitShort": "Tbsps",
//                     "unitLong": "Tbsps"
//                 }
//             }
//         },
//         {
//             "id": 10111990,
//             "aisle": "Ethnic Foods",
//             "image": "wasabi-powder.png",
//             "consistency": "SOLID",
//             "name": "wasabi powder",
//             "nameClean": "wasabi powder",
//             "original": "3 tablespoons wasabi powder",
//             "originalName": "wasabi powder",
//             "amount": 3,
//             "unit": "tablespoons",
//             "meta": [],
//             "measures": {
//                 "us": {
//                     "amount": 3,
//                     "unitShort": "Tbsps",
//                     "unitLong": "Tbsps"
//                 },
//                 "metric": {
//                     "amount": 3,
//                     "unitShort": "Tbsps",
//                     "unitLong": "Tbsps"
//                 }
//             }
//         },
//         {
//             "id": 9152,
//             "aisle": "Produce",
//             "image": "lemon-juice.jpg",
//             "consistency": "LIQUID",
//             "name": "yuzu juice",
//             "nameClean": "yuzu juice",
//             "original": "1/4 cup fresh lemon juice or yuzu juice (see Note)",
//             "originalName": "fresh lemon juice or yuzu juice (see Note)",
//             "amount": 0.25,
//             "unit": "cup",
//             "meta": [
//                 "fresh",
//                 "(see Note)"
//             ],
//             "measures": {
//                 "us": {
//                     "amount": 0.25,
//                     "unitShort": "cups",
//                     "unitLong": "cups"
//                 },
//                 "metric": {
//                     "amount": 61,
//                     "unitShort": "ml",
//                     "unitLong": "milliliters"
//                 }
//             }
//         }
//     ],
//     "summary": "Seared Tuna with Radish Salad and Wasabi Dressing might be just the main course you are searching for. One portion of this dish contains approximately <b>41g of protein</b>, <b>12g of fat</b>, and a total of <b>325 calories</b>. This gluten free, dairy free, fodmap friendly, and pescatarian recipe serves 4 and costs <b>$7.66 per serving</b>. 1 person were impressed by this recipe. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. This recipe from Food and Wine requires sea salt and pepper, silken tofu, daikon sprouts, and mirin. All things considered, we decided this recipe <b>deserves a spoonacular score of 90%</b>. This score is super. <a href=\"https://spoonacular.com/recipes/wasabi-ice-cream-wasabi-aisu-664985\">Wasabi Ice Cream (Wasabi Aisu)</a>, <a href=\"https://spoonacular.com/recipes/shrimp-pea-and-radish-salad-with-herb-yogurt-dressing-660024\">Shrimp, Pean and Radish Salad with Herb Yogurt Dressing</a>, and <a href=\"https://spoonacular.com/recipes/seared-ahi-tuna-salad-13073\">Seared Ahi Tuna Salad</a> are very similar to this recipe.",
//     "cuisines": [],
//     "dishTypes": [
//         "lunch",
//         "main course",
//         "main dish",
//         "dinner"
//     ],
//     "diets": [
//         "gluten free",
//         "dairy free",
//         "fodmap friendly",
//         "pescatarian"
//     ],
//     "occasions": [],
//     "instructions": "In a small bowl, whisk the wasabi powder with the tofu, rice vinegar and 1 tablespoon each of the lemon juice and mirin. In a large bowl, toss the radishes with the mint, cilantro and sprouts.                                              Heat a cast-iron grill pan. Brush the tuna steaks with the olive oil and season generously with salt and pepper. Grill the tuna over high heat until seared outside and medium rare within, 2 to 3 minutes per side. Transfer to a platter.                                              Add the remaining 3 tablespoons each of lemon juice and mirin to the radishes and toss to mix. Slice the tuna steaks 1/4 inch thick and serve with the radish salad and wasabi dressing.",
//     "analyzedInstructions": [
//         {
//             "name": "",
//             "steps": [
//                 {
//                     "number": 1,
//                     "step": "In a small bowl, whisk the wasabi powder with the tofu, rice vinegar and 1 tablespoon each of the lemon juice and mirin. In a large bowl, toss the radishes with the mint, cilantro and sprouts.",
//                     "ingredients": [
//                         {
//                             "id": 10111990,
//                             "name": "wasabi powder",
//                             "localizedName": "wasabi powder",
//                             "image": "wasabi-powder.png"
//                         },
//                         {
//                             "id": 1022053,
//                             "name": "rice vinegar",
//                             "localizedName": "rice vinegar",
//                             "image": "rice-vinegar.png"
//                         },
//                         {
//                             "id": 9152,
//                             "name": "lemon juice",
//                             "localizedName": "lemon juice",
//                             "image": "lemon-juice.jpg"
//                         },
//                         {
//                             "id": 11165,
//                             "name": "cilantro",
//                             "localizedName": "cilantro",
//                             "image": "cilantro.png"
//                         },
//                         {
//                             "id": 11429,
//                             "name": "radish",
//                             "localizedName": "radish",
//                             "image": "radishes.jpg"
//                         },
//                         {
//                             "id": 11001,
//                             "name": "sprouts",
//                             "localizedName": "sprouts",
//                             "image": "alfalfa-sprouts.png"
//                         },
//                         {
//                             "id": 93830,
//                             "name": "mirin",
//                             "localizedName": "mirin",
//                             "image": "mirin.jpg"
//                         },
//                         {
//                             "id": 2064,
//                             "name": "mint",
//                             "localizedName": "mint",
//                             "image": "mint.jpg"
//                         },
//                         {
//                             "id": 16213,
//                             "name": "tofu",
//                             "localizedName": "tofu",
//                             "image": "tofu.png"
//                         }
//                     ],
//                     "equipment": [
//                         {
//                             "id": 404661,
//                             "name": "whisk",
//                             "localizedName": "whisk",
//                             "image": "https://spoonacular.com/cdn/equipment_100x100/whisk.png"
//                         },
//                         {
//                             "id": 404783,
//                             "name": "bowl",
//                             "localizedName": "bowl",
//                             "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
//                         }
//                     ]
//                 },
//                 {
//                     "number": 2,
//                     "step": "Heat a cast-iron grill pan.",
//                     "ingredients": [],
//                     "equipment": [
//                         {
//                             "id": 404648,
//                             "name": "grill pan",
//                             "localizedName": "grill pan",
//                             "image": "https://spoonacular.com/cdn/equipment_100x100/grill-pan.jpg"
//                         }
//                     ]
//                 },
//                 {
//                     "number": 3,
//                     "step": "Brush the tuna steaks with the olive oil and season generously with salt and pepper. Grill the tuna over high heat until seared outside and medium rare within, 2 to 3 minutes per side.",
//                     "ingredients": [
//                         {
//                             "id": 1102047,
//                             "name": "salt and pepper",
//                             "localizedName": "salt and pepper",
//                             "image": "salt-and-pepper.jpg"
//                         },
//                         {
//                             "id": 0,
//                             "name": "tuna steak",
//                             "localizedName": "tuna steak",
//                             "image": "tuna-steak.png"
//                         },
//                         {
//                             "id": 4053,
//                             "name": "olive oil",
//                             "localizedName": "olive oil",
//                             "image": "olive-oil.jpg"
//                         },
//                         {
//                             "id": 10015121,
//                             "name": "tuna",
//                             "localizedName": "tuna",
//                             "image": "canned-tuna.png"
//                         }
//                     ],
//                     "equipment": [
//                         {
//                             "id": 404706,
//                             "name": "grill",
//                             "localizedName": "grill",
//                             "image": "https://spoonacular.com/cdn/equipment_100x100/grill.jpg"
//                         }
//                     ],
//                     "length": {
//                         "number": 2,
//                         "unit": "minutes"
//                     }
//                 },
//                 {
//                     "number": 4,
//                     "step": "Transfer to a platter.",
//                     "ingredients": [],
//                     "equipment": []
//                 },
//                 {
//                     "number": 5,
//                     "step": "Add the remaining 3 tablespoons each of lemon juice and mirin to the radishes and toss to mix. Slice the tuna steaks 1/4 inch thick and serve with the radish salad and wasabi dressing.",
//                     "ingredients": [
//                         {
//                             "id": 9152,
//                             "name": "lemon juice",
//                             "localizedName": "lemon juice",
//                             "image": "lemon-juice.jpg"
//                         },
//                         {
//                             "id": 0,
//                             "name": "tuna steak",
//                             "localizedName": "tuna steak",
//                             "image": "tuna-steak.png"
//                         },
//                         {
//                             "id": 11429,
//                             "name": "radish",
//                             "localizedName": "radish",
//                             "image": "radishes.jpg"
//                         },
//                         {
//                             "id": 11990,
//                             "name": "wasabi",
//                             "localizedName": "wasabi",
//                             "image": "wasabi.jpg"
//                         },
//                         {
//                             "id": 93830,
//                             "name": "mirin",
//                             "localizedName": "mirin",
//                             "image": "mirin.jpg"
//                         }
//                     ],
//                     "equipment": []
//                 }
//             ]
//         }
//     ],
//     "spoonacularScore": 90.44680786132812
// }
        <div id="meal-details-container">
        {/*  Meal Image
            Meal name
            Meal description

        */}
            <img src={meal.image} className="meal-image" alt={meal.title}/>
            <div className="meal-title">
                <h3><Link to={meal.sourceUrl}>{meal.title}</Link></h3>
            </div>
            <div className="meal-description">
                <span dangerouslySetInnerHTML={{ __html: meal.summary }}/>
            </div>
            <div className="meal-ingredients-container">
                <h4><strong>Ingredients</strong></h4>
                <div className="meal-ingredients">
                    {meal.extendedIngredients && meal.extendedIngredients.map(ingredient => (
                        <div className="ingredient" key={ingredient.id}>
                            <img className="ingredient-image" src={"https://img.spoonacular.com/ingredients_250x250/" + ingredient.image} alt={ingredient.name} loading="lazy"/>
                            <div className="ingredient-details">
                                <h5 className="ingredient-name">
                                    {ingredient.name.split(" ").map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(" ")}
                                </h5>
                                <span className="ingredient-amount">
                                    Amount: {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {meal.analyzedInstructions && meal.analyzedInstructions.length > 0 && <div className="meal-instructions-container">
                    <h4><strong>Instructions</strong></h4>
                    <div className="meal-instructions">
                        <ol>
                            {meal.analyzedInstructions[0].steps.map((step, idx) => (
                                <li key={idx} className="instruction">
                                    {step.step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>}
                <div className="complete-meal-container">
                    <div
                        className="complete-meal"
                        // onClick={completeMeal}
                    >Complete Meal</div>
                </div>
            </div>
        </div>
    )
}
export default MealDetails;
