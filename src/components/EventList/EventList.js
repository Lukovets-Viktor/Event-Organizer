import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EventItem from '../EventItem/EventItem';
import { useAlert } from 'react-alert';
import { convertStringToDate } from '../EventItem/EventItem';
import { Button, Checkbox, Divider, Input } from 'semantic-ui-react';
import './EventList.scss';

const EventList = ({ events }) => {
  const alert = useAlert();
  const [filterVisible, toggleFilterVisibility] = useState(false);
  const [filteringOrders, togglefilteringOrders] = useState(false);
  const [selectedEventStartDate, setEventStartDate] = useState('');
  const [selectedEventEndDate, setEventEndDate] = useState('');
  let updatedEvents = [...events];
  
  if (filterVisible) {
    if (selectedEventStartDate) {
      updatedEvents = [...updatedEvents].filter(event => 
        convertStringToDate(event.endDatetime) >= convertStringToDate(selectedEventStartDate));
    }
    if (selectedEventEndDate) {
      updatedEvents = [...updatedEvents].filter(event => 
        convertStringToDate(event.startDatetime) <= convertStringToDate(selectedEventEndDate));
    }
    if (filteringOrders) {
      updatedEvents = [...updatedEvents].filter(event => {
        const services = [
          event.securityAssistanceAdded,
          event.medicalAssistanceAdded,
          event.govApprovalAdded
        ];
        return services.some(service => service);
      });
    }
  } else {
    if (selectedEventStartDate) {
      setEventStartDate('');
    }
    if (selectedEventEndDate) {
      setEventEndDate('');
    }
    if (filteringOrders) {
      togglefilteringOrders(!filteringOrders);
    }
  }

  const handleEndDate = (e) => {
    if (e.target.value >= selectedEventStartDate) {
      setEventEndDate(e.target.value)
    } else {
      alert.show("Event cannot end before it was started");
    }
  };

  return (
    <main className="main-content">
      <Divider hidden />
      <Button
        content={!filterVisible ? 'Filter events' : 'Hide filter'}
        onClick={() => toggleFilterVisibility(!filterVisible)}
      />
      <div hidden={!filterVisible}>
        <div className="date-picker">
          <label>
            From: <br /> 
            <Input 
              type="date"
              value={selectedEventStartDate} 
              onChange={(e) => setEventStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            To: <br /> 
            <Input 
              type="date"
              value={selectedEventEndDate} 
              onChange={(e) => handleEndDate(e)}
              required
            />
          </label>
        </div>
        <Checkbox  
          checked={filteringOrders} 
          onChange={() => togglefilteringOrders(!filteringOrders)}
          label={<label>Show events with orders only</label>} 
        /> 
      </div>
      <Divider hidden />
      <ul className="event-list">
        {updatedEvents.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </ul>
    </main>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventList;