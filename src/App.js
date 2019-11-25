import React from 'react';
import './App.scss';
import {
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import { EventList } from './components/EventList/index';
import { CreateEventForm } from './components/CreateEventForm/index';

function App() {
  return (
    <>
      <header className="header">
        <nav>
          <ul className="menu-list">
            <li className="menu-list__item">
              <NavLink className="menu-list__link" to="/" exact>
                Home
              </NavLink>
            </li>
            <li className="menu-list__item">
              <NavLink className="menu-list__link" to="/events">
                Events
              </NavLink>
            </li>
            <li className="menu-list__item">
              <NavLink className="menu-list__link" to="/new-event">
                Create a new event
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Switch>
        <Route exact path="/" render={() => 
          <h1 style={{ 'textAlign': 'center' }}>Home page</h1>
        }/>
        <Route path="/events" component={EventList} />
        <Route path="/new-event" component={CreateEventForm} />
      </Switch>
    </>
  );
}

export default App;
