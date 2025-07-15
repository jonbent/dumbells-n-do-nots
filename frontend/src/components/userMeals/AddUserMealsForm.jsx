import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import Pagination from '../pagination/Pagination';
import '../../scss/UserMealsModal.scss';

import MealItem from '../meals/MealItem';
import MagnifyingGlass from '../svg/MagnifyingGlass';

// ACTIONS
import {
  fetchMeals,
  fetchSelectedMeals
} from '../../actions/MealActions';
import { receiveRoutineMeals } from '../../actions/NewRoutineActions';
import { openModal } from '../../actions/ModalActions';
import {
  receiveNumMeals,
  receiveDaySelected
} from '../../actions/RoutineFilterActions';
import {
  receivePageNum,
  receivePageSize
} from '../../actions/FilterActions';
import { openFiltersModal } from '../../actions/FiltersModalActions';
import { updateDaysMeal } from '../../actions/RoutineActions';

const AddUserMealsForm = (props) => {
  const dispatch = useDispatch();

  // === SELECTORS ===
  const daySelect = useSelector(state => state.ui.newRoutineData);
  const meals = useSelector(state => state.entities.meals);
  const allMeals = useSelector(state => state.entities.routineMeals);
  const day = useSelector(state =>
    !props.single
      ? state.ui.routineFilters.daySelected
      : props.day
  );
  const numMeals = useSelector(state => state.ui.routineFilters.numMeals);
  const curUser = useSelector(state => state.session.user);
  const curPage = useSelector(state => state.ui.filters.pageNum);
  const pageSize = useSelector(state => state.ui.filters.pageSize);
  const totalMeals = parseInt(useSelector(state => state.ui.filters.numMeals));
  const minCals = useSelector(state => state.ui.filters.minCals);
  const maxCals = useSelector(state => state.ui.filters.maxCals);

  // === LOCAL STATE ===
  const [toggleShowMeals, setToggleShowMeals] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [mealSearch, setMealSearch] = useState('');
  const [ignoringFilters, setIgnoringFilters] = useState(false);

  const fetchMealsHandler = async () => {
    await dispatch(fetchMeals({
      pageSize,
      pageNum: curPage,
      minCals,
      maxCals
    }));
    setToggleShowMeals(true);
  };

  useEffect(() => {
    let selectedMealIds = [];

    if (props.single) {
      selectedMealIds = props.userMeals?.map(uMeal => uMeal.meal) || [];
    } else {
      Object.values(daySelect || {}).forEach((day) => {
        selectedMealIds = selectedMealIds.concat(Object.keys(day.meals));
      });
    }

    dispatch(fetchSelectedMeals(selectedMealIds));
    fetchMealsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitSearchInputChange = useCallback(async (val) => {
    if (val !== '') {
      await dispatch(receivePageNum(1));
      const fetchOptions = { pageSize, pageNum: 1, searchTerm: val };

      if (!ignoringFilters) {
        fetchOptions.minCals = minCals;
        fetchOptions.maxCals = maxCals;
      }

      await dispatch(fetchMeals(fetchOptions));
    } else {
      fetchMealsHandler();
    }
  }, [dispatch, pageSize, ignoringFilters, minCals, maxCals, fetchMealsHandler]);

  const emitSearchInputChangeDebounce = useMemo(
    () => debounce(emitSearchInputChange, 500),
    [emitSearchInputChange]
  );

  const handleSearchInputChange = (e) => {
    const val = e.target.value;
    setMealSearch(val);
    emitSearchInputChangeDebounce(val);
  };

  const handleFilterIgnore = () => {
    setIgnoringFilters((prev) => {
      const newVal = !prev;
      if (newVal === false && mealSearch) {
        emitSearchInputChange(mealSearch);
      }
      return newVal;
    });
  };

  const handleSetDate = (dayArg, increment = null) => {
    const daySelectKeys = Object.keys(daySelect || {});
    const dayIndex = daySelectKeys.indexOf(day);
    let newDay = dayArg;

    if (increment !== null && !dayArg) {
      newDay = daySelectKeys[dayIndex + increment];
    }

    if (newDay) {
      dispatch(receiveDaySelected(newDay));
    }
  };


  const handlePageChange = async (page) => {
    await dispatch(receivePageNum(page));
    await dispatch(fetchMeals({
      pageSize,
      pageNum: page,
      minCals,
      maxCals
    }));
  };

  const handleSelectMeal = (mealId, num = 0) => {
    if (!props.single) {
      const routine = { ...daySelect };
      let sumMeals = Object.values(routine[day].meals).reduce(
        (acc, el) => acc + el,
        0
      );

      if (num + sumMeals > numMeals) return null;

      if (!routine[day].meals[mealId]) {
        if (num <= 0) return null;
        routine[day].meals[mealId] = num;
      } else {
        if (num + routine[day].meals[mealId] < 0) return null;
        routine[day].meals[mealId] += num;
      }

      dispatch(receiveRoutineMeals(routine));
    } else {
      dispatch(updateDaysMeal(props.dbDay._id, mealId, num));
    }
  };

  const handleSubmitDayMeals = () => {
    props.closeSelector();
  };

  const handleSubmitWeekMeals = () => {
    dispatch(openModal('bodyUI'));
  };

  // COMPUTATIONS
  let calorieCounts;
  let calorieCountClass;
  let daySelectedMealsArray = [];

  if (!props.single) {
    const daySelectKeys = Object.keys(daySelect || {});
    const calorieArray = [];

    let selectedDay = null;
    const daySelectedMeals = new Set();

    daySelectKeys.forEach((dateString, idx) => {
      const mealKeys = Object.keys(daySelect[dateString]?.meals || {});
      if (dateString === day) selectedDay = idx;
      const totalCals = mealKeys.reduce((acc, mealId) => {
        const count = daySelect[dateString]?.meals?.[mealId] || 0;
        if (selectedDay === idx && count > 0) {
          daySelectedMeals.add(mealId);
        }
        return acc + ((allMeals[mealId]?.calories || 0) * count);
      }, 0);

      calorieArray.push(totalCals);
    });

    daySelectedMealsArray = Array.from(daySelectedMeals);

    calorieCountClass =
      calorieArray[selectedDay] < 1800
        ? 'too-low'
        : calorieArray[selectedDay] > 2800
        ? 'too-high'
        : 'just-right';

    calorieCounts = calorieArray;
  } else {
    const totalCals = props.userMeals?.reduce(
      (acc, el) =>
        acc +
        ((allMeals[el.meal]?.calories || 0) * el.quantity),
      0
    );
    calorieCounts = totalCals;
    calorieCountClass =
      totalCals < 1800
        ? 'too-low'
        : totalCals > 2800
        ? 'too-high'
        : 'just-right';

    daySelectedMealsArray = props.userMeals
      ?.filter((m) => m.quantity > 0)
      .map((m) => m.meal);
  }

  let mealList = null;

  if (toggleShowMeals) {
    const mealsArray = Object.values(meals);
    mealList =
      mealsArray.length > 0 ? (
        <div className="meal-list">
          {mealsArray.map((meal) => {
            if (daySelectedMealsArray.includes(meal._id)) return null;
            return (
              <MealItem
                meal={meal}
                key={meal._id}
                daySelect={daySelect}
                handleSelectMeal={handleSelectMeal}
                day={day}
                single={!!props.single}
                dbDay={props.dbDay}
                userMeals={props.userMeals}
              />
            );
          })}
          <div className="pagination-container">
            <Pagination
              changePage={handlePageChange}
              curPage={curPage}
              pageSize={pageSize}
              itemsAmount={totalMeals}
            />
          </div>
          <div className="routine-actions">
            <div
              className="submit-meals"
              onClick={
                !!props.singleDay
                  ? handleSubmitDayMeals
                  : handleSubmitWeekMeals
              }
            >
              {props.singleDay
                ? "Confirm Day's Meals"
                : "Confirm Week's Meals"}
            </div>
          </div>
        </div>
      ) : (
        <div className="not-found">
          <div>Cannot find meals with given filters</div>
          <div onClick={() => dispatch(openFiltersModal('meals'))}>
            Select Filters
          </div>
        </div>
      );
  }

  return (
    <div className="meal-selector">
      <div className="day-select">
        {!props.singleDay && <h1>For each day below, select desired meals</h1>}
        <div className="scheduled-days">
          {!props.singleDay &&
            Object.keys(daySelect || {}).map((date) => (
              <div
                key={date}
                className={day === date ? 'selected' : ''}
                onClick={() => handleSetDate(date)}
              >
                {date}
              </div>
            ))}
          {!!props.singleDay && <div className="selected">{day}</div>}
        </div>
      </div>
      <div className="meal-search">
        <div>Search for meals</div>
        <div className="search-actions-container">
          <div className="search-actions">
            <div
              className={`ignore-filters ${
                ignoringFilters ? 'ignoring' : ''
              }`}
              onClick={handleFilterIgnore}
            >
              {ignoringFilters
                ? 'Enable Filters for Search'
                : 'Disable Filters for Search'}
            </div>
            <div
              className="select-filters"
              onClick={() => dispatch(openFiltersModal('meals'))}
            >
              Select Filters
            </div>
          </div>
          <div className="meal-searchbar">
            <MagnifyingGlass />
            <input
              placeholder="Search by recipe name..."
              value={mealSearch}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>
      <div className={`calorie-count ${calorieCountClass}`}>
        Total Calories for selected day:{' '}
        {!props.single
          ? calorieCounts?.[Object.keys(daySelect || {}).indexOf(day)] || 0
          : calorieCounts || 0}
      </div>
      {!!daySelectedMealsArray.length && (
        <div className="selected-meals">
          <div>Meals Selected</div>
          {daySelectedMealsArray.map((mealId) => {
            if (!allMeals[mealId]) return null;
            return (
              <MealItem
                key={mealId}
                meal={allMeals[mealId]}
                selected={false}
                daySelect={daySelect}
                userMeals={props.userMeals}
                dbDay={props.dbDay}
                day={day}
                handleSelectMeal={handleSelectMeal}
                single={props.single}
              />
            );
          })}
        </div>
      )}
      {mealList}
    </div>
  );
};

export default AddUserMealsForm;
