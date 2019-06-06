// Imports
import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useSelector} from "react-redux";
import DashboardLayout from "./Layout";


const PrivateRoute = ({component : Component, ...rest}) => {

    const {isAuthenticated} = useSelector(state => state.user);
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated
                    ?
                    <DashboardLayout><Component {...props} /></DashboardLayout>
                    :
                    <Redirect
                        to={{pathname: "/user/login", state: {from: props.location}}}
                    />

            }
        />
    );
};


export default PrivateRoute;
