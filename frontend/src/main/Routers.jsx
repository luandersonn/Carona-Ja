import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import LoginPage from '../components/LoginPage'
import DashboardPage from '../components/DashboardPage'
import SingupPage from '../components/SignupPage'
import AddRide from '../components/AddRidePage'


export default props =>
        <Switch>                
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/dashboard" component={DashboardPage}  />
                <Route exact path="/signup" component={SingupPage}  />
                <Route exact path="/add_ride" component={AddRide} />
                <Redirect from="/" to="/login" />
        </Switch>        