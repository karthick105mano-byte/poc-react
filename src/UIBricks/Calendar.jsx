import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div style={{ maxWidth: 350, margin: 'auto' }}>
      <h3>Selected Date: {date.toDateString()}</h3>
      <Calendar
        onChange={onChange}
        value={date}
      />
    </div>
  );
}
