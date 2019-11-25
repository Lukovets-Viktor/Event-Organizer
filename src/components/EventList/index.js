import EventList from './EventList';
import { connect } from 'react-redux';
import { getEvents } from '../../store/index';

const getData = state => ({
  events: getEvents(state),
});

const Enhanced = connect(
  getData,
)(EventList);

export { Enhanced as EventList };
