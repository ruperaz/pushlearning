// Imports
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from './app/PrivateRoute'
import PageNotFound from './app/PageNotFound'
import UserLogin from "./user/UserLogin"
import CategoryView from "./category/CategoryView";
import Home from "./app/Home";
import UserRegister from "./user/UserRegister";


const Routes = () => (
    <React.Fragment>
        <Switch>
            <PrivateRoute exact path='/' component={Home}/>
            <PrivateRoute exact path="/category/:categoryId" component={CategoryView}/>
            {/*            <Route path="/card/:cardId" component={CardViewContainer}/>*/}
            <Route path="/user/login" component={UserLogin}/>
            <Route path="/user/register" component={UserRegister}/>
            {/* <Route path="/about" component={About}/>*/}
            <Route component={PageNotFound}/>
        </Switch>
    </React.Fragment>
)

export default Routes
