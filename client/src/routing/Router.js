import React from 'react';
import { Route, Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';
import Voting from '../components/Voting';
import Results from '../components/Results';
import Home from '../components/Home';
import VoterRegistration from '../components/VoterRegistration';
import Login  from '../components/Login';

const Routing = () => {
    const register = false;
    return (
    <Router>
        <div>
        {
            register ? <VoterRegistration/> : <Login/>
        } 
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/voting">Voting</NavLink></li>
                <li><NavLink to="/results">Results</NavLink></li>
                <li><NavLink to="/register">Voter Registration</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                
            </ul>
            <Switch>
                <Route exact path="/" component = {Home}/>
                <Route path ="/voting" component = {Voting}/>
                <Route path = "/results" component={Results}/>
                <Router path = "/register" component={VoterRegistration}/>
                <Router path = "/login" component={Login}/>
                
            </Switch>
        </div>
    </Router>);
};

export default Routing;