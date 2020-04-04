import React from 'react';
import { Route, Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';
import Election from '../components/Election';
import Results from '../components/Results';
import Home from '../components/Home';
import Registration from '../components/Registration';
import Login  from '../components/Login';
import VoterList from '../components/VoterList';


const Routing = () => {
    return (
    <Router>
        <div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/voting">Voting</NavLink></li>
                <li><NavLink to="/results">Results</NavLink></li>
                <li><NavLink to="/register">Voter Registration</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/voters">Voter List</NavLink></li>                
            </ul>
            <Switch>
                <Route exact path="/" component = {Home}/>
                <Route path ="/voting" component = {Election}/>
                <Route path = "/results" component={Results}/>
                <Route path = "/register" component={Registration}/>
                <Route path = "/login" component={Login}/>
                <Route path = "/voters" component={VoterList}/>
            </Switch>
        </div>
    </Router>);
};

export default Routing;