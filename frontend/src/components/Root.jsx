import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'

const Root = ({store, persistor}) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <HashRouter>
                    <Route path='/' component={App}/>
                </HashRouter>
            </PersistGate>
        </Provider>
    )
}

export default Root
