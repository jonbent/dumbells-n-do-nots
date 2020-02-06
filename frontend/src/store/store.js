import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from '../reducers/RootReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (preloadedState = {}) => {
    let store = createStore(
        persistedReducer,
        preloadedState,
        applyMiddleware(thunk, logger)
    )
    let persistor = persistStore(store);
    return {store, persistor}
};

export default configureStore;