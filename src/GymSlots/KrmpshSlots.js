import "./KrmpshSlots.css";
import ReactTimeslotCalendar from "react-timeslot-calendar";
import moment from "moment";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getTimeslots, updateTimeslots, updateCapacity, checkCapacity
} from '../api/timeslots'
import{
  createBookings
} from '../api/bookings'
import { useState, useEffect } from "react";



function KrmpshSlots() {
  const [timeslots, setTimeslots] = useState([])
  const [disabled, setDisabled] = useState([])

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
          //console.log(slots[slot]['capacity']);
          temp.push([slots[slot]['start'].toString(), slots[slot]['end'].toString()])
        }
      }


      temp.sort(compare)
      setTimeslots(temp)
    })
  }, [])

  useEffect(() => {
    checkCapacity("krmpsh").then((detail) => {
      var temp = []
      for (const item in detail) {
        if (detail[item]["capacity"] === 0) {
            delete detail[item]['capacity']
           temp.push(detail[item]);
        }
      }
      setDisabled(temp)
    })
  }, [])

  


const [user] = useAuthState(auth);
 
const [startDate, setStart] = useState(0);
const [endDate, setEnd] = useState(0);
const [startTime, setStarttime] = useState(0);
const [day, setDay] = useState(0);
const [double, setDouble] = useState(undefined)

  function handleSubmit() {
    if (double === undefined || double !== day["day"]) {
      updateCapacity("krmpsh", day, {'startDate': day["day"], 'format': 'MMMM Do YYYY, h:mm:ss A'})
      createBookings(user.uid, "Krmpsh" , {'start': startDate, 'end': endDate})
      updateTimeslots("krmpsh", startTime);
      setDouble(day["day"])
      console.log(double)
      alert("Booking has been made")
    }

    else {
        alert("Please only book one slot only once")
    }
  }

  function takeNote(s ,e, d, f) {
    setStart({ startDate: s });
    setEnd({ endDate: e });
    setStarttime({startTime: d});
    setDay({day: f});
  }

  var test = 'June 30th 2022, 9:00:00 AM';
  const test2 = [{
    startDate: test,
    format: 'MMMM Do YYYY, h:mm:ss A',
}]


  

  return (
    <div className="KrmpshSlots">
      <h1>Kent Ridge MPSH Gym</h1>
      <h2>Operating Hours: 7am - 9pm</h2>
      <ReactTimeslotCalendar
        initialDate={moment().format("YYYY-MM-DD")}
        let
        timeslots={timeslots} 
        onSelectTimeslot = {(allTimeslots, lastSelectedTimeslot) => {
          takeNote(lastSelectedTimeslot.startDate.format('MMMM Do YYYY, h:mm:ss A'), lastSelectedTimeslot.endDate.format('MMMM Do YYYY, h:mm:ss A'), lastSelectedTimeslot.startDate.hour(), lastSelectedTimeslot.startDate.format('MMMM Do YYYY, h:mm:ss A'));
          // MomentJS object.
          console.log(disabled)
        }}
        disabledTimeslots = {disabled}
      />

      <div class="mt-md-4 text-center">
        <button class="btn btn-primary text-uppercase fw-bold" onClick={handleSubmit} >Submit
        </button>
      </div>
    </div>
  );
}

export default KrmpshSlots;