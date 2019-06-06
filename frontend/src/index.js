// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'
import registerServiceWorker from './registerServiceWorker'
import {setCurrentUser} from './user/UserActions'
import rootReducer from './rootReducer'
import Routes from './routes'
import './index.css'
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {SnackbarProvider} from "notistack";

// UI Imports

// Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

// User Authentication
const token = localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
    store.dispatch(setCurrentUser(jwtDecode(token)))
}

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#0098ff',
            main: '#0066ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#f5f5f5',
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
});


// Render App
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <Router>
                    <Routes/>
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>

    ,

    document.getElementById('root')
)

// Service Worker
registerServiceWorker()
