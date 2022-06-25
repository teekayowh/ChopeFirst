import "./UpcomingBooking.css";
// import ReactTimeslotCalendar from "react-timeslot-calendar";
// import moment from "moment";
import {
  getTimeslots, updateTimeslots
} from './api/timeslots'
import{
  createBookings, getBookings, deleteBooking
} from './api/bookings'
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

function UpcomingBooking() {
  const [timeslots, setTimeslots] = useState([])
  const [keys, setKeys] = useState([])

  useEffect(() => {
    getBookings().then((slots) => {
      var temp = []
      for (var slot in slots) {
        if (slots[slot]['userId'] === "test") {
          temp.push(slots[slot]);
          // console.log(Object.keys(slots));
          // console.log(slots[slot]);
          // console.log(slots[slot]['venue']);
          // console.log(slots[slot]['timeslot']['start']);
          // console.log(slots[slot]['timeslot']['end']);
          // console.log(slots[slot]['timeslot']['date']);
          // temp.push([slots[slot]['start'].toString(), slots[slot]['end'].toString()])
        }
      }
      setTimeslots(temp)
      setKeys(Object.keys(slots))
    })
  }, [])

  console.log(timeslots);

  const renderCard = (card, index) => {
    function handleSubmit() {
      console.log(keys[index], keys)
      deleteBooking(keys[index]).then(value => {
        var temp = timeslots.slice();
        temp.splice(index, 1)
        updateTimeslots('krmpsh', 'slot1', true)
        setTimeslots(temp);
      })
    }

    return (
      <Card style={{ width: "18rem" }} key={index} className="box">
        <Card.Body>
          <Card.Title>Booking</Card.Title>
          <Card.Text>Location: {card.venue}</Card.Text>
          <Card.Text>Date: {card.timeslot.date}</Card.Text>
          <Card.Text>Timing: {card.timeslot.start}00 - {card.timeslot.end}00 hours</Card.Text>
          <Button variant="primary" onClick={handleSubmit}>Delete</Button>
        </Card.Body>
      </Card>
    );
  };

  return (
  <div>
    <h1>Upcoming Bookings</h1>
    <h2>Below are your upcoming bookings</h2>
    <div className="grid">{timeslots.map(renderCard)}</div>;
  </div>
  );
};

export default UpcomingBooking;
