import React, { useContext }  from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import Photogallery from "../pages/photoGallery";
import {authRouters, publicRoutes } from "../routes";
import { Context } from "../index";

const AppRouter =()=>{
    const {user} = useContext(Context)

    return (
        <Switch>
            {
                user._isAuth && authRouters.map(({path,Component})=>
                <Route key={path} path={path} component={Component} exact/>
            )}

            {
                publicRoutes.map(({path,Component})=>
                <Route key={path} path={path} component={Component} exact/>
            )}

        </Switch>
    );
};

export default AppRouter;