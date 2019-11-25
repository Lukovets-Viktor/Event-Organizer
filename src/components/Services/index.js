import Services from './Services';
import { connect } from 'react-redux';
import { addExtraService, getEvents } from '../../store/index';

const getData = state => ({
  events: getEvents(state),
});

const getMethods = dispatch => ({
  addExtraService: (eventIndex, service) => 
    dispatch(addExtraService(eventIndex, service)),
});

const Enhanced = connect(
  getData, 
  getMethods,
)(Services);

export { Enhanced as Services };
