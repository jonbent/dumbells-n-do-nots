import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import '../../scss/users/UserHistory.scss';
import Modal from '../modal/Modal';
import DateFormat from 'dateformat';
import FiltersModal from '../modal/FiltersModal';
import Alert from '../alerts/Alert';
import NavBar from '../navbar/NavBar';

import { fetchUserRoutines } from '../../actions/RoutineActions';
import { fetchUser } from '../../actions/UserActions';
import { receiveSelectedRoutine } from '../../actions/RoutineFilterActions';

export default function UserHistory() {
  const dispatch = useDispatch();
  const { username } = useParams();

  // Select all required Redux state
  const user = useSelector(state =>
    state.entities.users[username]
  );

  const routines = useSelector(state => {
    if (!username || !state.entities.users[username]) return [];
    return Object.values(state.entities.routines).filter(
      (r) => r.user === state.entities.users[username]._id
    );
  });

  const days = useSelector(state => {
    const routineDays = {};
    Object.values(state.entities.days).forEach(d => {
      if (!routineDays[d.routine]) {
        routineDays[d.routine] = [];
      }
      routineDays[d.routine].push(d);
    });
    return routineDays;
  });

  const selectedRoutine = useSelector(
    state => state.ui.routineFilters.selectedRoutine
  );

  // Track previous user ID for change detection
  const prevUserIdRef = useRef();

  // Initial load
  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username)).then((action) => {
        const fetchedUser = action?.user;
        if (fetchedUser?._id) {
          dispatch(fetchUserRoutines(fetchedUser._id));
        }
      });
    }
  }, [dispatch, username]);

  // React to user change (equivalent of componentDidUpdate)
  useEffect(() => {
    if (
      user &&
      prevUserIdRef.current &&
      prevUserIdRef.current !== user._id
    ) {
      dispatch(fetchUser(username)).then(() => {
        dispatch(fetchUserRoutines(user._id));
      });
    }

    if (user) {
      prevUserIdRef.current = user._id;
    }
  }, [dispatch, user, username]);

  const handleSelect = (routine) => {
    dispatch(receiveSelectedRoutine(routine));
  };

  return (
    <div className="user-history-container">
      <Modal />
      <Alert />
      <FiltersModal />
      <NavBar />

      <div className="UserHistory">
        <div className="routine-history">
          <div className="history-title">History</div>
          {routines.length === 0 && (
            <div>No Routines Found</div>
          )}
          {routines.map((r) => {
            const startDate = new Date(
              days[r._id]?.[0]?.date
            );
            const endDate = new Date(startDate?.getTime() || 0);
            endDate.setDate(endDate.getDate() + 7);
            return (
              <div
                key={r._id}
                className="routine-item"
                onClick={() => handleSelect(r)}
              >
                <div>
                  {startDate
                    ? DateFormat(startDate, 'mm/dd/yyyy')
                    : 'N/A'}
                </div>
                <div>
                  {startDate
                    ? DateFormat(endDate, 'mm/dd/yyyy')
                    : 'N/A'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/*<BottomNavBar user={user}/>*/}
    </div>
  );
}
