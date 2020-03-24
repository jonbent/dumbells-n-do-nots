import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'
import Hamburger from "./modal/Hamburger";

const Root = ({store, persistor}) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <HashRouter>
                    <Route path='/' component={App}/>
                    <Hamburger/>
                </HashRouter>
            </PersistGate>
        </Provider>
    )
}

export default Root
