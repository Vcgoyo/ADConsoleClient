import React from 'react';
import { Router, Route,IndexRoute  } from 'dva/router';
import Users from './routes/Users';
import Menus from './routes/SysBaseRoutes/Menus';
import Login from './routes/Login';
import IndexPage from './routes/IndexPage'
import MainLayout from './routes/MainLayout';
import Home from './routes/Home';


export default function({ history }) {
  return (
    <Router history={history}>
       {/* <Route path="/users" component={Users} /> */}
      <Route path="/" component={MainLayout} >
        <IndexRoute component={Home}/>
        <Route path='index' component={IndexPage} />
        <Route path='users' component={Users} />
        <Route path='menus' component={Menus} />
        {/* <IndexRoute component={Users} />         */}
      </Route>
      <Route path="/login" component={Login} />
      {/* <Route path="*" component={NotFound} /> */}
    </Router>
  );
};
