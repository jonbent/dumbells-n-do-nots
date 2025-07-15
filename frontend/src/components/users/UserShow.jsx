import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../../scss/users/UserShow.scss';
import UserShowCard from './UserShowCard';
import Modal from "../modal/Modal";
import RoutineShow from "../routine/RoutineShowContainer";
import FiltersModal from "../modal/FiltersModal";
import Alert from "../alerts/Alert";
import NavBar from "../navbar/NavBar";

import { fetchUser } from '../../actions/UserActions';
import { fetchUserRoutine } from '../../actions/RoutineActions';

export default function UserShow() {
  const { username } = useParams();
  const dispatch = useDispatch();

  // Get the current user
  const user = useSelector(state => {
    if (username) {
      return state.entities.users[username];
    } else {
      return state.session.user;
    }
  });

  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchUserRoutine(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className="user-show-container">
      <Modal />
      <Alert />
      <FiltersModal />
      <NavBar />

      <div className="user-show-content">
        <UserShowCard user={user} />
        <div className="routine-info-container">
          <RoutineShow />
        </div>
      </div>
      {/*<BottomNavBar user={user}/>*/}
    </div>
  );
}
