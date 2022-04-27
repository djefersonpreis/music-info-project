import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { Music } from '../pages/user'

const AppRouter = () => {

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
            <Switch>
              <Route component={Music} path="/admin/music" />
              <Route component={() => <Redirect to="/" />} />
            </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
