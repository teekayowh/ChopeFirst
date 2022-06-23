import "./KrmpshSlots.css";
import ReactTimeslotCalendar from "react-timeslot-calendar";
import moment from "moment";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getTimeslots, updateTimeslots
} from '../api/timeslots'
import{
  createBookings
} from '../api/bookings'
import { useState, useEffect } from "react";



function KrmpshSlots() {
  const [timeslots, setTimeslots] = useState([])

  function compare(a,b) {
  
    if (parseInt(a[0]) <parseInt( b[0])) {
      return -1;
    }

    else if (parseInt(a[0]) >parseInt( b[0])) {
      return 1;
    }

    else {
      return 0;
    }

  }

  useEffect(() => {
    getTimeslots("krmpsh").then((slots) => {
      var temp = []
      for (var slot in slots) {
        if (slots[slot]['capacity'] > 0) {
          console.log(slots[slot]['capacity']);
          temp.push([slots[slot]['start'].toString(), slots[slot]['end'].toString()])
        }
      }


      temp.sort(compare)
      setTimeslots(temp)
    })
  }, [])

const [user] = useAuthState(auth);
 
const [startDate, setStart] = useState(0);
const [endDate, setEnd] = useState(0);
const [startTime, setStarttime] = useState(0);


  function handleSubmit() {
    createBookings(user.uid, "Krmpsh" , {'start': startDate, 'end': endDate})
    updateTimeslots("krmpsh", startTime);
    alert("Booking has been made")
  }

  function takeNote(s ,e, d) {
    setStart({ startDate: s });
    setEnd({ endDate: e });
    setStarttime({startTime: d});
  }

  return (
    <div className="KrmpshSlots">
      <h1>Kent Ridge MPSH Gym</h1>
      <h2>Operating Hours: 7am - 9pm</h2>
      <ReactTimeslotCalendar
        initialDate={moment().format("YYYY-MM-DD")}
        let
        timeslots={timeslots} 
        onSelectTimeslot = {(allTimeslots, lastSelectedTimeslot) => {
          takeNote(lastSelectedTimeslot.startDate.toDate(), lastSelectedTimeslot.endDate.toDate(), lastSelectedTimeslot.startDate.hour());// MomentJS object.
        }}
        disabledTimeslots = {[
    {
        startDate: 'June 30th 2022, 7:00:00 AM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },

]}
      />

      <div class="mt-md-4 text-center">
        <button class="btn btn-primary text-uppercase fw-bold" onClick={handleSubmit} >Submit
        </button>
      </div>
    </div>
  );
}

export default KrmpshSlots;