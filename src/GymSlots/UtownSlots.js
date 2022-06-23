import "./UtownSlots.css";
import ReactTimeslotCalendar from "react-timeslot-calendar";
import moment from "moment";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getTimeslots, updateTimeslots, quickPop
} from '../api/timeslots'
import{
  createBookings
} from '../api/bookings'
import { useState, useEffect } from "react";
import { getDoc } from "firebase/firestore";


function UtownSlots() {
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
    getTimeslots("utown").then((slots) => {
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
    createBookings(user.uid, "" , {'start': startDate, 'end': endDate})
    updateTimeslots("utown", startTime);
    alert("Booking has been made")
  }

  function takeNote(s ,e, d) {
    setStart({ startDate: s });
    setEnd({ endDate: e });
    setStarttime({startTime: d});
  }
  return (
    <div className="UtownSlots">
      <h1>University Town Gym</h1>
      <h2>Operating Hours: 7am - 9pm</h2>
      <ReactTimeslotCalendar
        initialDate={moment().format("YYYY-MM-DD")}
        let
        timeslots={timeslots} 
        onSelectTimeslot = {(allTimeslots, lastSelectedTimeslot) => {
          takeNote(lastSelectedTimeslot.startDate.toDate(), lastSelectedTimeslot.endDate.toDate(), lastSelectedTimeslot.startDate.hour());// MomentJS object.
        }}
      />

      <div class="mt-md-4 text-center">
        <button class="btn btn-primary text-uppercase fw-bold" onClick={handleSubmit}>Submit
        </button>
      </div>
    </div>
  );
}

export default UtownSlots;