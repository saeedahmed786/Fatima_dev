import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from './LoadingToRedirect';
import { isAuthenticated } from "../../functions/setLoginInfo";

const UserRoute = ({ children, ...rest }) => {
    // const { user } = useSelector((state) => ({ ...state }));

    return isAuthenticated() && localStorage.getItem('token') ? <Route {...rest} /> : <LoadingToRedirect />;
    
};

export default UserRoute;