import React, {Component, useCallback, useEffect, useMemo, useState} from 'react';
import RoutineDay from "./RoutineDay";
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import "../../scss/routines/ExistingRoutine.scss";
import EditWorkout from "../days/EditWorkout";
import EditMeals from "../days/EditMeals";
import dateFormat from 'dateformat'
import {useDispatch, useSelector} from "react-redux";
import {fetchDaysAfterToday} from "../../actions/DayActions";
import {fetchRoutineById} from "../../actions/RoutineActions";
import {receiveDaySelected} from "../../actions/RoutineFilterActions";
import {
    receiveNewRoutineStartDateWithData,
    receiveRoutineErrors,
    submitEdit,
    submitRoutine
} from "../../actions/NewRoutineActions";
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";

// const mapStateToProps = ({ui, entities, errors, session}) => {

//
//     return {
//         routine: routineEdit ? entities.routines[routineEdit] : ui.routineFilters.selectedRoutine,/
//         routineId: routineEdit ? routineEdit : ui.routineFilters.selectedRoutine._id,
//         existingDaysAfterToday, /
//         days, /
//         dayKeys: Object.keys(ui.newRoutineData), /
//         meals: entities.meals, /
//         userMeals: userMeals, /
//         workouts: entities.workouts, /
//         exercises: entities.exercises, /
//         submitableRoutine: ui.newRoutineData, /
//         daySelected: ui.routineFilters.daySelected, /
//         routineError: errors.routine /
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchRoutine: id => dispatch(fetchRoutineById(id)),
//         receiveNewRoutineStartDateWithData: (day, data) => dispatch(receiveNewRoutineStartDateWithData({date: day ? dateFormat(day, 'mm/dd/yyyy') : null, data})),
//         submitRoutine: (routine) => {return dispatch(submitRoutine(routine))},
//         fetchRoutineByStartDate: (date, cb) => fetchRoutineByStartDate(date).then((res) => cb(date, res)).catch(err => {
//             cb(date);
//             dispatch(receiveRoutineErrors(err.response.data))
//         }),
//         submitEdit: (day, routineDay) => dispatch(submitEdit(day, routineDay)),
//         receiveDaySelected: day => dispatch(receiveDaySelected(day)),
//         fetchDaysAfterToday: () => dispatch(fetchDaysAfterToday())
//     }
// };
//
//     callback(date){
//         const {days, userMeals, workouts} = this.props;
//         this.props.receiveNewRoutineStartDateWithData(date, {days, userMeals, workouts});
//     }
// export default connect(mapStateToProps, mapDispatchToProps)(ExistingRoutine)

const ExistingRoutine = (props) => {
    const curDate = new Date();
    curDate.setHours(0,0,0,0);
    const routineEdit = localStorage.getItem('routineEdit');
    const dispatch = useDispatch();
    const [shouldAllowEdit, setShouldAllowEdit] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedWorkoutDay, setSelectedWorkoutDay] = useState(null);
    const [selectedMealsDay, setSelectedMealsDay] = useState(null);
    const [editable, setEditable] = useState(!!routineEdit);
    const routine = useSelector(({ui, entities}) => routineEdit ? entities.routines[routineEdit] : ui.routineFilters.selectedRoutine);
    const routineId = useSelector(({ui, entities}) => routineEdit ? routineEdit : ui.routineFilters.selectedRoutine._id);
    const daySelected = useSelector(state => state.ui.routineFilters.daySelected);
    const routineError = useSelector(({errors}) => errors.routine);
    const workouts = useSelector(state => state.entities.workouts);
    const submitableRoutine = useSelector(state => state.ui.newRoutineData);
    const allDays = useSelector((state) => state.entities.days);

    const days = useMemo(() => {
      return Object.values(allDays).filter(
        (day) => day.routine === routineId
      );
    }, [allDays, routineId]);
    // const days = useSelector(({entities, ui}) => Object.values(entities.days).filter(day => day.routine === (routineEdit ? routineEdit : ui.routineFilters.selectedRoutine._id)));
    const userMeals = useSelector(({ui}) =>
      ui.newRoutineData?.userMeals || {}
    );
    const existingDaysAfterToday = useSelector(({entities, session}) => {
        const resultSet = new Set();
        Object.values(entities.days).filter(day => day.user === session.user.id).forEach((day) => {
            day = new Date(day.date);
            resultSet.add(`${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`);
        })
        return resultSet;
    });
    const dayKeys = useSelector(({ui}) => Object.keys(ui.newRoutineData));
    const handleDayWorkoutSelect = (day, idx) => {
        dispatch(receiveDaySelected(dayKeys[idx]));
        setSelectedWorkoutDay(day);
    }
    const handleDayMealsSelect = (day, idx) =>{
        dispatch(receiveDaySelected(dayKeys[idx]));
        setSelectedMealsDay(day)
    }
    const handleStartDate = useCallback((date) => {
        setStartDate(date);
        dispatch(fetchRoutineById(routineId));
        return fetchRoutineByStartDate(date)
          .then((res) => {
              console.log(res)
            return dispatch(receiveNewRoutineStartDateWithData({date: date ? dateFormat(date, 'mm/dd/yyyy') : null, data: res}));
          })
          .catch((err) => {
            dispatch(receiveNewRoutineStartDateWithData({date, data: { days, userMeals, workouts }}));
            dispatch(receiveRoutineErrors(err.response.data));
          });
    }, [dispatch, routineId, days, userMeals, workouts]);

    const closeSelector = () => {
        if (selectedWorkoutDay) dispatch(submitEdit(selectedWorkoutDay, submitableRoutine[daySelected]));
        if (selectedMealsDay) dispatch(submitEdit(selectedMealsDay, submitableRoutine[daySelected]));
        setSelectedMealsDay(null);
        setSelectedWorkoutDay(null);
    }
    const constructNewRoutine = () => {
        if (routineError.message || !daySelected) return null;
        return dispatch(submitRoutine(submitableRoutine)).then(() => {
            return setEditable(true)
        })
    }

    const firstDay = useMemo(() => {
        if (days.length === 0) return null;
        const d = new Date(days[0].date);
        d.setHours(0, 0, 0, 0);
        return d;
    }, [days]);

    useEffect(() => {
        if (!firstDay) return;
        setShouldAllowEdit(curDate.getTime() <= firstDay.getTime());
    }, [firstDay]);

    useEffect(() => {
        if (!firstDay) {
            setShouldAllowEdit(false);
            return;
        }
        setShouldAllowEdit(curDate.getTime() <= firstDay.getTime());
    }, [firstDay]);

    useEffect(() => {
        submitableRoutine && setEditable(true);
    }, [submitableRoutine])

    useEffect(() => {
      dispatch(fetchDaysAfterToday());
    }, [dispatch]);

    useEffect(() => {
        if (days.length === 0) return;
        let setDate = new Date(daySelected);
        if (daySelected) {
            handleStartDate(setDate);
        } else {
            handleStartDate(new Date(days[0].date));
        }
    }, [routineId]);

    if (!!selectedWorkoutDay) {

        return (
            <EditWorkout
                closeSelector={closeSelector}
            />
        );
    }
    if (!!selectedMealsDay){
        const dayUserMeals = selectedMealsDay.meals.map(mealId => userMeals[mealId]);
        return (
            <EditMeals
                userMeals={dayUserMeals}
                closeSelector={closeSelector}
            />
        );
    }
    return (
        <div className="existing-days-container">
            {!editable &&
                <div>
                    <div className="title">Restart Routine</div>
                    <div className="description">If you would like to restart this routine, please select a valid date from below. with a span of at least a week of available days after the selected date</div>
                     <DatePicker
                      tileDisabled={(day) => existingDaysAfterToday.has(`${day.date.getDate()}-${day.date.getMonth()}-${day.date.getFullYear()}`)}
                      minDate={new Date()}
                      onChange={handleStartDate}
                      value={startDate}
                    />
                    <div className="date-error">
                        {daySelected ? routineError.message : "Select A Day"}
                    </div>

                    <div className={`submit ${routineError.message || !daySelected ? 'disabled' : ""}`}
                         onClick={constructNewRoutine}>
                        Restart Routine
                    </div>
                    {shouldAllowEdit &&
                        <div className='or-container'>
                            <div></div>
                            <div>OR</div>
                            <div></div>
                        </div>
                    }
                    {shouldAllowEdit &&
                        <div className="edit-routine-container">
                            <div className="edit-routine" onClick={() => setEditable(true)}>
                                Edit Routine
                            </div>
                            <div>{dateFormat(days[0].date, 'mm/dd/yyyy')} - {dateFormat(days[6].date, 'mm/dd/yyyy')}</div>
                        </div>
                    }
                </div>
            }
            {!editable && <div className="summary">Summary</div>}
            {days.map((d, idx)=> {
                return (
                    <div key={d._id}>
                        <RoutineDay
                            history={true}
                            idx={idx}
                            day={d}
                            modal={true}
                            editDayWorkout={(day) => handleDayWorkoutSelect(day, idx)}
                            editDayMeals={(day) => handleDayMealsSelect(day, idx)}
                            editable={editable}/>
                    </div>
                )
            })}
            {editable && <div className="submit" onClick={props.closeModal}>Confirm Routine</div>}
        </div>
    );
}

export default ExistingRoutine;
