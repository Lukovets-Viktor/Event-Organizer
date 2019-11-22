import CreateEventForm from './CreateEventForm';
import { connect } from 'react-redux';
import { addEvent, getEvents, getEventTypes, addEventType } from '../../store/index';

const getData = state => ({
  events: getEvents(state),
  eventTypes: getEventTypes(state),
});

const getMethods = dispatch => ({
  addEvent: (value) => dispatch(addEvent(value)),
  addEventType: (value) => dispatch(addEventType(value)),
});

const Enhanced = connect(
  getData, 
  getMethods,
)(CreateEventForm);

export { Enhanced as CreateEventForm };
