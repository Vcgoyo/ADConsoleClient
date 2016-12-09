import React from 'react';
import { Router, Route } from 'dva/router';
import Users from './routes/Users';
import Login from './routes/Login';

export default function({ history }) {
  return (
    <Router history={history}>
       <Route path="/users" component={Users} />
      {/* <Route path="/" component={IndexPage} >
        <IndexRoute component={Users} />
        <Route path='tag' component={Tag} />
      </Route> */}
      <Route path="/login" component={Login} />
      {/* <Route path="*" component={NotFound} /> */}
    </Router>
  );
};
