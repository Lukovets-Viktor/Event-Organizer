import { createStore } from 'redux';

const events = [
  {
    id: 1,
    name: "Business conference",
    address: 'Richmond, VA',
    peopleNumber: 18,
    eventType: 'private',
    startDatetime: '2019-11-30',
    endDatetime: '2019-12-01',
  },
  {
    id: 2,
    name: "Business conference",
    address: 'Richmond, VA',
    peopleNumber: 18,
    eventType: 'public',
    startDatetime: '2019-10-30',
    endDatetime: '2019-11-03',
  },
  {
    id: 3,
    name: "Family reunion",
    address: 'New York, NY',
    peopleNumber: 21,
    eventType: 'private',
    startDatetime: '2019-11-27',
    endDatetime: '2019-11-28',
  },
  {
    id: 4,
    name: "Family reunion",
    address: 'New York, NY',
    peopleNumber: 51,
    eventType: 'private',
    startDatetime: '2019-11-30',
    endDatetime: '2019-12-01',
  },
  {
    id: 5,
    name: "Family reunion",
    address: 'New York, NY',
    peopleNumber: 19,
    eventType: 'private',
    startDatetime: '2019-11-29',
    endDatetime: '2019-12-01',
  }
];

let initialState = {
  events: JSON.parse(localStorage.getItem('events')) || events,
  eventTypes: JSON.parse(localStorage.getItem('eventTypes')) 
    || [
      { id: 1, name: 'public' }, 
      { id: 2, name: 'private' },
    ],
};

const ADD_EVENT = 'ADD_EVENT';
const ADD_EXTRA_SERVICE = 'ADD-EXTRA-SERVICE';
const ADD_EVENT_TYPE = 'ADD_EVENT_TYPE';

export const addEvent = (newEvent) => ({ type: ADD_EVENT, newEvent, });
export const getEvents = state => state.events;
export const getEventTypes = state => state.eventTypes;
export const addEventType = (newEventType) => ({ type: ADD_EVENT_TYPE, newEventType });
export const addExtraService = (eventIndex, service) => ({
  type: ADD_EXTRA_SERVICE,
  eventIndex,
  service,
});

function reducer(state, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.newEvent],
      };
    case ADD_EVENT_TYPE:
      return {
        ...state,
        eventTypes: [...state.eventTypes, action.newEventType],
      };
    case ADD_EXTRA_SERVICE:
      let updatedEvents = [...state.events];
      updatedEvents[action.eventIndex][`${action.service}Added`] = true;
      return {
        ...state,
        events: updatedEvents,
      };
    default:
      return state;
  }
}

const store = createStore(reducer, initialState);
store.subscribe(() => {
  const { events, eventTypes } = store.getState();
  localStorage.setItem('events', JSON.stringify(events));
  localStorage.setItem('eventTypes', JSON.stringify(eventTypes));
});

export default store;
