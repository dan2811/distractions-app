import React, {useState} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import {useGlobalState} from '../state/initialState';
import {ClientEvent} from '../types';
import EventList from '../components/events/EventList';
import Event from '../components/events/Event';

export const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<null | ClientEvent>(null);
  let {clientEvent} = useGlobalState();

  //TODO: Refactor this to actually pull all client events. Could then possibly be re-used for musician user type too.
  const events = [clientEvent] as ClientEvent[];

  if (clientEvent !== null) {
    return !selectedEvent ? (
      <EventList events={events} setSelectedEvent={setSelectedEvent} />
    ) : (
      <Event event={selectedEvent} setSelectedEvent={setSelectedEvent} />
    );
  } else {
    return <LoadingSpinner text="Loading your event data..." />;
  }
};
