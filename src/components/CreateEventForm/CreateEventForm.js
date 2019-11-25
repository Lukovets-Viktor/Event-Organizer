import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreateEventForm.scss';
import { useAlert } from 'react-alert';
import { Input, Button } from 'semantic-ui-react';

const currentDate = () => {
  const currentDate = new Date();
  let mm = currentDate.getMonth() + 1;
  let dd = currentDate.getDate();
  const yyyy = currentDate.getFullYear();
  return `${yyyy}-${mm.toString().padStart(2, '0')}-${dd.toString().padStart(2, '0')}`;
};

const CreateEventForm = ({ addEvent, events, eventTypes, addEventType }) => {
  const alert = useAlert();
  const [addingNewType, toggleAddingNewType] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventPeopleNumber, setEventPeopleNumber] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [newEventType, setNewEventType] = useState('');

  if (eventType === 'Add new event type' && !addingNewType) {
    toggleAddingNewType(!addingNewType);
  }
  
  const createNewEvent = () => ({
    id: events[events.length - 1].id + 1,
    name: eventName,
    address: eventAddress,
    peopleNumber: +eventPeopleNumber,
    eventType,
    startDatetime: eventStartDate,
    endDatetime: eventEndDate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addingNewType) {
      addEvent(createNewEvent());
      alert.show('Event was added successfully!')
      setEventName('');
      setEventAddress('');
      setEventPeopleNumber('');
      setEventType('');
      setEventStartDate('');
      setEventEndDate('');
    } else {
      if (newEventType) {
        addEventType({ 
          id: eventTypes[eventTypes.length - 1].id + 1, 
          name: newEventType.toLowerCase(),
        });
        setNewEventType('');
        alert.show('Event type was added successfully!');
      }
      toggleAddingNewType(!addingNewType);
      setEventType('');
    }
  };

  const handleStartDate = (e) => {
    if (currentDate() <= e.target.value) {
      setEventStartDate(e.target.value);
    } else {
      alert.show('Choose valid date');
      setEventStartDate('');
    }
  };

  const handleEndDate = (e) => {
    if (e.target.value >= eventStartDate) {
      setEventEndDate(e.target.value)
    } else {
      alert.show("Event cannot end before it was started");
      setEventEndDate('');
    }
  };

  return (
    <main>
      <form className="create-event-form" onSubmit={(e) => handleSubmit(e)}>
        <Input 
          type="text"
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event name"
          disabled={addingNewType}
          required
        />
        <Input 
          type="text"
          value={eventAddress} 
          onChange={(e) => setEventAddress(e.target.value)}
          placeholder="Location"
          disabled={addingNewType}
          required
        />
        {!addingNewType
          ? <select 
              className="types-dropdown" 
              style={{'color': eventType ? '' : '#cdc9c9'}}
              value={eventType}
              onChange={(e) => {
                setEventType(e.target.value);
              }}
              required
            >
              <option value="" hidden>Select event type</option>
              {eventTypes.map(evType => (
                <option 
                  value={evType.name} 
                  className="types-dropdown__option"
                  key={evType.id}
                >
                  {evType.name.charAt(0).toUpperCase() + evType.name.substring(1)}
                </option>
              ))}
              <option className="types-dropdown__option types-dropdown__option_add">
                Add new event type
              </option>
            </select>
          : <Input 
              type="text"
              value={newEventType} 
              onChange={(e) => {
                if (
                  (e.target.value.match(/\b[a-z]+\b/i) || !e.target.value)
                  && e.target.value.length <= 15
                ) {
                  setNewEventType(e.target.value);
                } else {
                  alert.show("Event type must contain one word of no more than 15 letters");
                }
              }}
              placeholder="New type name"
            />
        }
        
        <Input 
          type="number"
          value={eventPeopleNumber} 
          onChange={(e) => {
            if (+e.target.value > 0) {
              return setEventPeopleNumber(e.target.value);
            } else {
              return setEventPeopleNumber('');
            }
          }}
          placeholder="How many people will attend?"
          disabled={addingNewType}
          required
        />
        <div className="date-picker">
          <label>
            Event starts: <br /> 
            <Input 
              type="date"
              value={eventStartDate} 
              onChange={(e) => handleStartDate(e)}
              disabled={addingNewType}
              required
            />
          </label>
          <label>
            Event ends: <br /> 
            <Input 
              type="date"
              value={eventEndDate} 
              onChange={(e) => handleEndDate(e)}
              disabled={addingNewType}
              required
            />
          </label>
        </div>
        <Button 
          type="submit" 
          className="create-event-form__submit-btn"
        >
          Submit
        </Button>
      </form>
    </main>
  );
};

CreateEventForm.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  addEvent: PropTypes.func.isRequired,
};

export default CreateEventForm;