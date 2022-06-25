import "./KrmpshSlots.css";
import ReactTimeslotCalendar from "react-timeslot-calendar";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getTimeslots, updateTimeslots, updateCapacity, checkCapacity
} from '../api/timeslots'
import{
  createBookings
} from '../api/bookings'
import { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, NavDropdown } from "react-bootstrap";



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
              <NavDropdown.Item href="#action/3.1">Upcoming Bookings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/statistics">Statistics</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
    </div>
  );
}

export default KrmpshSlots;