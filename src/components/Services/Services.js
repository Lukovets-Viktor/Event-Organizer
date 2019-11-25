import React from 'react';
import PropTypes from 'prop-types';
import ExtraServices from '../ExtraServices/ExtraServices';
import './Services.scss';
import { convertStringToDate } from '../EventItem/EventItem';

function isWeekday(startDate, endDate) {
  let days = [startDate.getDay(), endDate.getDay()];
  if (days.every(day => day === 0 || day === 6)) {
    return false;
  }

  return true;
}

const Services = ({ event, events, addExtraService }) => {
  const currentEventIndex = events.findIndex(ev => ev.id === event.id);
  
  if (
    (event.eventType === 'public' || event.peopleNumber > 20)
    && !event.securityAssistanceAdded
  ) {
    addExtraService(currentEventIndex, 'securityAssistance');
  }

  if (
    (event.eventType === 'public' || event.peopleNumber > 50)
    && !event.medicalAssistanceAdded
  ) {
    addExtraService(currentEventIndex, 'medicalAssistance');
  }

  if (
    (event.eventType === 'public' 
      || isWeekday(
        convertStringToDate(event.startDatetime), 
        convertStringToDate(event.endDatetime)
      ) 
    )
    && !event.govApprovalAdded
  ) {
    addExtraService(currentEventIndex, 'govApproval');
  }

  return (
    <div className="orders">
      {event.securityAssistanceAdded &&
        <pre><span className="checkmark">&#10003;</span> Security assistance</pre> 
      }
      {event.medicalAssistanceAdded &&
        <pre><span className="checkmark">&#10003;</span> Medical assistance</pre> 
      }
      {event.govApprovalAdded &&
        <pre><span className="checkmark">&#10003;</span> Gov approval</pre> 
      }
      {!event.securityAssistanceAdded 
          || !event.medicalAssistanceAdded 
          || !event.govApprovalAdded
        ? <ExtraServices 
            events={events} 
            event={event} 
            addExtraService={addExtraService}
            currentEventIndex={currentEventIndex}
          />
        : null
      }
    </div>
  );
};

Services.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    peopleNumber: PropTypes.number,
    eventType: PropTypes.string,
    startDatetime: PropTypes.string,
    endDatetime: PropTypes.string,
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  addExtraService: PropTypes.func.isRequired,
};

export default Services;