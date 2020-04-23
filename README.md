# [Dumbells-N-Donuts Live](http://dumbells-n-donuts.herokuapp.com/#/)

Dumbells-N-Donuts is a mobile friendly fitness website, utilizing MERN stack developed by software devs that hopes to let everyone who joins it to help manage their workouts and meals in a flexible way. A user can decide to choose from already defined exhaustive list of meals and exercises or have their own custom meals and form a routine.

![splash](https://github.com/jonbent/dumbells-n-do-nots/blob/master/frontend/public/readme/mern_gif.gif)

# Getting Started

* Any user of this website can create routines of meals and exercises using the exhaustive list of meals and exercises provided by the app.

* Any user of this website can select from the muscles they are interested in training and select the exercies according to their preferences.

* Any user of this website can add custom meals and custome exercises of their own choice.

* Any user of this website will be able to track the routine they have been following.

# MVP Functionality 

* Splash page with information about website.

* Log-in page.

![login](https://github.com/jonbent/dumbells-n-do-nots/blob/master/frontend/public/readme/login.png)

* Sign-up page.

* Home/Landing page.

![home](https://github.com/jonbent/dumbells-n-do-nots/blob/master/frontend/public/readme/home.png)

* Profile settings page.

* Create new routine.

* Meals and exercise selector.

![mealSelector](https://github.com/jonbent/dumbells-n-do-nots/blob/master/frontend/public/readme/meal_selector.png)

* Custom exercises and meals.

* Muscle Selector

![muscleSelector](https://github.com/jonbent/dumbells-n-do-nots/blob/master/frontend/public/readme/muscle.gif)


# Authors

* [Jonathan Bent](https://github.com/jonbent)

* [Mohammed Mustafa](https://github.com/mmmymustafa)

* [Manraj Singh](https://github.com/mskhokhar)

* [Julius Wu](https://github.com/juliuswuwu)

# Code Snippet:

* Thunk action for Muscle Groups:

```javascript
import * as MuscleGroupsAPIUtil from '../util/MuscleGroupsApiUtil';

export const RECEIVE_MUSCLE_GROUPS = 'RECEIVE_MUSCLE_GROUPS';
export const RESET_SELECTED_MUSCLE_GROUPS = 'RESET_SELECTED_MUSCLE_GROUPS';

const receiveMuscleGroups = (payload) => ({
    type: RECEIVE_MUSCLE_GROUPS,
    payload
});

export const resetSelectedMuscleGroups = () => ({
    type: RESET_SELECTED_MUSCLE_GROUPS,
});

export const fetchMuscleGroups = () => dispatch =>(
    MuscleGroupsAPIUtil.fetchMuscleGroups()
        .then(res =>{
            dispatch(receiveMuscleGroups(res))
        })
        
);
```
* Thunk action for recievin sample routines:

```javascript
import { getSampleRoutines } from '../util/RoutineApiUtil';

export const RECEIVE_SAMPLE_ROUTINES = "RECEIVE_SAMPLE_ROUTINES";

export const receiveSampleRoutines = sampleRoutines => ({
    type: RECEIVE_SAMPLE_ROUTINES,
    sampleRoutines
});

export const fetchSampleRoutines = () => dispatch => (
    getSampleRoutines()
        .then(sampleRoutines => dispatch(receiveSampleRoutines(sampleRoutines)))
        .catch(err => console.log(err))
);
```

# Dynamics 

* Schedule

  * 9am-10pm.
  
* Stand-Up

  * 10am.
  
* Check-in Protocol

  * Previous work.
  
  * Future work.


# Setup and Information

* Dependencies

  * aws-sdk 2.608.0
  
  * axios 0.19.0
  
  * bcryptjs 2.4.3
  
  * body-parser 1.19.0
  
  * concurrently 5.0.2
  
  * cors 2.8.5
  
  * dateformat 3.0.3
  
  * express 4.17.1
  
  * jsonwebtoken 8.5.1
  
  * jwt-decode 2.2.0
  
  * mongoose 5.8.9
  
  * mongoose-beautiful-unique-validation 7.1.1
  
  * mongoose-unique-validation 0.1.0
  
  * multer 1.4.2
  
  * passport 0.4.1
  
  * passport-jwt 4.0.0
  
  * password-validator 5.0.3
  
  * react-date-picker 7.10.0
  
  * react-day-picker 7.4.0
  
  * react-redux 7.1.3
  
  * react-router-dom 5.1.2
  
  * redux 4.0.5
  
  * redux-loger 3.0.6
  
  * redux-thunk 2.3.0
  
  * uuid 3.4.0
  
  * validator 12.1.0

* Configuration

  * General
    * Add keys_dev to config folder.
   
  * Development
    * yarn in root directory.
    * yarn in frontend folder.
    
  * Production
    * Create account on heroku.
    
    * set following config var:
      * AWS_BUCKET_ACCESS_ID
      * AWS_BUCKET_NAME
      * AWS_BUCKET_TOKEN
      * AWS_REGION
      * MONGO_URI
      * SECRET_OR_KEY
      * UPLOAD_FILE_URL
      
   * Database creation
   
     * Development/Production
       * create Atlas clusture.
       * update URL in secret to config vars.
       * setup S3 AWS bucket setup.
       
   * Deployment instructions
     * git push heroku master.
