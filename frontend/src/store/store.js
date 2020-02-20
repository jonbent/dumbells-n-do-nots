import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from '../reducers/RootReducer';
// import { createBlacklistFilter } from 'redux-persist-transform-filter';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['entities', 'session']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk];
if (process.env.NODE_ENV === "development") middleware.push(logger);

const configureStore = (preloadedState = {}) => {
    let store = createStore(
        persistedReducer,
        preloadedState,
        applyMiddleware(...middleware)
    )
    let persistor = persistStore(store);
    return {store, persistor}
};

export default configureStore;