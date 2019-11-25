import React from 'react';
import PropTypes from 'prop-types';
import { Services } from '../Services/index';
import './EventItem.scss';

export const convertStringToDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day);
};

const rearrangeDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
}

const EventItem = ({ event }) => { 
  const eventStartDate = rearrangeDate(event.startDatetime);
  const eventEndDate = rearrangeDate(event.endDatetime);

  return (
    <li className="event-item">
      <div className="event-item__head">
        <h2 className="event-item__heading">{event.name}</h2>
        <span>{new Date() < convertStringToDate(event.endDatetime)
          ? 'Open' 
          : 'Closed'}
        </span>
      </div>
      <p><strong>Event type:</strong> {event.eventType}</p>
      <pre>{eventStartDate} - {eventEndDate}  •  {event.address}</pre>
      <p className="event-item__attendees-info">
        {event.peopleNumber} people are going 
      </p>
      <Services event={event} />
    </li>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    peopleNumber: PropTypes.number,
    eventType: PropTypes.string,
    startDatetime: PropTypes.string,
    endDatetime: PropTypes.string,
  }).isRequired,
};

export default EventItem;