import React, { lazy } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Album from './pages/albuns';

import Home from './pages/home';
import Login from './pages/login';
import Musica from './pages/musicas';
import Usuario from './pages/usuarios';

const Routes = () => {
    const location = useLocation();

    return (
            <Switch>
                <Redirect exact from="/" to="/home" />
                <Switch location={location} key={location.pathname}>
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/musicas" component={Musica} />
                    <Route path="/usuarios" component={Usuario} />
                    <Route path="/albuns" component={Album} />
                </Switch>
            </Switch>
    );
};

export default Routes;
