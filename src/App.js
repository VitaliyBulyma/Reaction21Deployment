import React from 'react';
//import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from '@testing-library/react';
import './App.css';
//import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';

import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import AddExercise from './components/AddExercise';
// import ListExercises from './components/ListExercise';
import CreateProfile from './components/CreateProfile';
import ShowWorkouts from './components/ShowWorkouts';
import CreateWorkout from './components/CreateWorkout';
import Nav from './components/Nav';
import Landing from "./components/layout/Landing";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import ShowExercises from './components/ShowExercises';
import EditWorkout from './components/EditWorkout';
import CreateReport from './components/CreateReport';
//add login&register components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
            <Nav />          
            <Switch>
              {/* <Route path="/" exact component={Home} />     */}
              <Route path="/" exact component={Landing} />   
              <Route path="/profiles" exact component={CreateProfile} />          
              <Route path="/exercises" exact component={AddExercise} />
              <Route path="/showexercises" exact component={ShowExercises} />                         
              <Route path="/showworkouts" exact component={ShowWorkouts} />                    
              <Route path="/createworkout" exact component={CreateWorkout} />   
              <Route path="/editworkout/:id" exact component={EditWorkout} />
              <Route path="/reports" component={CreateReport} />
              {/* add login&register components */}
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>     
        </div>
      </Router>
    </Provider>
  );
}



// const Home = () => (
//   <div>
//     <h1>Welcome to Reaction21</h1>
//     <p>Exercise tracker to keep track of time spent exercising</p>
//   </div>
// )

export default App;
