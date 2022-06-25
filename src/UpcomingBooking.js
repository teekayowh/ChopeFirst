import "./UpcomingBooking.css";
import ReactTimeslotCalendar from "react-timeslot-calendar";
import moment from "moment";
import {
  getTimeslots, updateTimeslots
} from './api/timeslots'
import{
  createBookings , getBookings, deleteBooking
} from './api/bookings'
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { auth, logInWithEmailAndPassword, signInWithGoogle, db, logout } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';


function UpcomingBooking() {
  const [timeslots, setTimeslots] = useState([])
  const [keys, setKeys] = useState([])

  useEffect(() => {
    getBookings().then((slots) => {
      var temp = []
      for (var slot in slots) {
        if (slots[slot]['userId'] === "59jvuZrl5RPGpYDTMoWvrD324cd2") {
          temp.push(slots[slot]);
          console.log(Object.keys(slots));
          console.log(slots[slot]);
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

    console.log(card.timeslot.start.startDate.toString());

    return (
      
      <Card style={{ width: "18rem" }} key={index} className="box">
        <Card.Body>
          <Card.Title>Booking</Card.Title>
          <Card.Text>Location: {card.venue}</Card.Text>
          <Card.Text>Start: {card.timeslot.start.startDate.toString()}</Card.Text>
          <Card.Text>End: {card.timeslot.end.endDate.toString()} </Card.Text>
          <Button variant="primary" onClick={handleSubmit}>Delete</Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">ChopeFirst</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Facilities</Nav.Link>
            <Nav.Link href="#link">Announcements</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/upcomingBooking">Upcoming Bookings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/statistics">Statistics</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  <div>
    <h1>Upcoming Bookings</h1>
    <h2>Below are your upcoming bookings</h2>
    <div className="grid">{timeslots.map(renderCard)}</div>;
  </div>
  </div>
  );
};

export default UpcomingBooking;