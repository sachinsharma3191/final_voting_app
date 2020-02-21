import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Voting from '../components/Voting';
import Results from '../components/Results';
import Home from '../components/Home';

const Routing = () => {
    return (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/voting">Voting</Link></li>
                <li><Link to="/results">Results</Link></li>
            </ul>
            <Route exact path="/" component = {Home}/>
            <Route path ="/voting" component = {Voting}/>
            <Route path = "/results" component={Results}/>
        </div>
    </Router>);
};

export default Routing;