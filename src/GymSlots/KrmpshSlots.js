import "./KrmpshSlots.css";
import ReactTimeslotCalendar from "react-timeslot-calendar";
import moment from "moment";
import {
  getTimeslots
} from '../api/timeslots'
import{
  createBookings
} from '../api/bookings'
import { useState, useEffect } from "react";

function KrmpshSlots() {
  const [timeslots, setTimeslots] = useState([])

  useEffect(() => {
    getTimeslots().then((slots) => {
      var temp = []
      for (var slot in slots) {
        if (slots[slot]['capacity'] > 0) {
          console.log(slots[slot]['capacity']);
          temp.push([slots[slot]['start'].toString(), slots[slot]['end'].toString()])
        }
      }
      setTimeslots(temp)
    })
  }, [])

  function handleSubmit() {
    createBookings('test', 'testVenue', {'start': '7', 'end': '9'})
  }

  return (
    <div className="KrmpshSlots">

      <button onClick={handleSubmit}>Book</button>
      <h1>Kent Ridge MPSH Gym</h1>
      <h2>Operating Hours: 7am - 9pm</h2>
      <ReactTimeslotCalendar
        initialDate={moment().format("YYYY-MM-DD")}
        let
        timeslots={timeslots} 
        onSelectTimeslot = {(allTimeslots, lastSelectedTimeslot) => {
          console.log(lastSelectedTimeslot.startDate);  // MomentJS object.
 
        }}
      />
    </div>
  );
}

export default KrmpshSlots;