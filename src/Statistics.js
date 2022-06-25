import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getBookings } from "./api/bookings";
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, NavDropdown } from "react-bootstrap";
import "./Statistics.css";
function Statistics() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/statistics");
  }, [user, loading]);

  const [postData, setPostData] = useState("");
  

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
    <div class="container">
    <div class="row">   
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <div class="card-header">
              <h2 class="card-title text-center align-baseline mb-5 fw-light fs-5">Recent Activities</h2>
            </div>
            <div class="card-body no-padding">
              <div class="item">
                <div class="row">
                  <div class="col-4 date-holder text-right">
                    <div class="icon"><i class="fa fa-clock-o"></i></div>
                    <div class="date"> <span>6:00 am</span><br></br><span class="text-info">6 hours ago</span></div>
                  </div>
                  <div class="col-8 content">
                    <h5>Meeting</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="row">
                  <div class="col-4 date-holder text-right">
                    <div class="icon"><i class="fa fa-clock-o"></i></div>
                    <div class="date"> <span>6:00 am</span><br></br><span class="text-info">6 hours ago</span></div>
                  </div>
                  <div class="col-8 content">
                    <h5>Meeting</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="row">
                  <div class="col-4 date-holder text-right">
                    <div class="icon"><i class="fa fa-clock-o"></i></div>
                    <div class="date"> <span>6:00 am</span><br></br><span class="text-info">6 hours ago</span></div>
                  </div>
                  <div class="col-8 content">
                    <h5>Meeting</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>

        

  );
  }
export default Statistics;