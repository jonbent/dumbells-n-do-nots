import React, {Component} from 'react';
import '../../scss/meals/CreateMeal.scss';

class CreateMeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            carbs: "",
            protein: "",
            fat: "",
            prepTime: "",
            mealPicFile: null,
            mealPic: "https://spoonacular.com/recipeImages/125276-312x231.png",

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const {title, description, carbs, protein, fat, mealPicFile} = this.state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('carbs', carbs);
        formData.append('protein', protein);
        formData.append('fat', fat);

        if (this.state.mealPicFile) {
            formData.append("photoUrl", mealPicFile);
        }
        this.props.createMeal(formData)
    }
    handleChange(e, field){
        if (isNaN(e.target.value) && e.target.value !== "" && ["calories", "carbs", "protein", "fat"].includes(field)) return null;
        this.setState({
            [field]: e.target.value
        })
    }
    handleFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ mealPicFile: file, mealPic: fileReader.result });
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }
    render() {
        const {title, carbs, protein, fat, mealPic} = this.state;
        const {mealErrors} = this.props;
        return (
            <div className="add-user-meal-form">
                <div className="image-container">
                    <div className="image" style={{ backgroundImage: `url(${mealPic})` }}></div>
                    <label htmlFor="edit-profile-picture">Edit</label>
                    <input
                      id="edit-profile-picture"
                      type="file"
                      onChange={this.handleFile}
                    />
                </div>
                <div className="add-user-meal-input-container">
                    <label htmlFor="add-user-meal-title">
                        <span>Title</span>
                        {!!mealErrors && !!mealErrors["title"] && <span className="meal-errors">{mealErrors["title"]}</span>}
                    </label>
                    <input id="add-user-meal-title" value={title} onChange={(e) => this.handleChange(e, "title")}/>
                </div>

                {/*<label htmlFor="add-user-meal-calories">*/}
                {/*    <span>Calories</span>*/}
                {/*    {!!mealErrors && !!mealErrors["calories"] && <span className="meal-errors">{mealErrors["calories"]}</span>}*/}
                {/*</label>*/}
                {/*<input id="add-user-meal-calories" value={calories} onChange={(e) => this.handleChange(e, "calories")}/>*/}

                <div className="add-user-meal-input-container">
                    <label htmlFor="add-user-meal-carbs">
                        <span>Carbs (grams)</span>
                        {!!mealErrors && !!mealErrors["carbs"] && <span className="meal-errors">{mealErrors["carbs"]}</span>}
                    </label>
                    <input id="add-user-meal-carbs" value={carbs} onChange={(e) => this.handleChange(e, "carbs")}/>
                </div>
                <div className="add-user-meal-input-container">
                    <label htmlFor="add-user-meal-protein">
                        <div>Protein (grams)</div>
                        {!!mealErrors && !!mealErrors["protein"] && <span className="meal-errors">{mealErrors["protein"]}</span>}
                    </label>
                    <input id="add-user-meal-protein" value={protein} onChange={(e) => this.handleChange(e, "protein")}/>
                </div>
                <div className="add-user-meal-input-container">
                    <label htmlFor="add-user-meal-fat">
                        <span>Fat (grams)</span>
                        {(!!mealErrors && !!mealErrors["fat"]) && <span className="meal-errors">{mealErrors["fat"]}</span>}
                    </label>
                    <input id="add-user-meal-fat" value={fat} onChange={(e) => this.handleChange(e, "fat")}/>
                </div>
                <div className="submit-container">
                    <div className="submit" onClick={this.handleSubmit}>Create Meal</div>
                </div>
            </div>
        );
    }
}

export default CreateMeal;