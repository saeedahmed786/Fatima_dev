import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
import { isAuthenticated } from "../../functions/setLoginInfo";

const AdminRoute = ({ children, ...rest }) => {
  const user = isAuthenticated();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && localStorage.getItem('token')) {
      currentAdmin(localStorage.getItem('token'))
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};



export default AdminRoute;