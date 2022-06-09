import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">ChopeFirst</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#link">Facilities</Nav.Link>
            <Nav.Link href="#link">Announcements</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Upcoming Bookings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Statistics</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <MDBContainer>

      <MDBRow>
        <MDBCol md='3'>
          {/* usc gym card */}
          <MDBCard style={{ maxWidth: '22rem', height: "30rem" }}>
            <MDBCardImage src='https://uci.nus.edu.sg/suu/wp-content/uploads/sites/5/2021/07/USC-GYM.1-1024x768.jpg' position='top' alt='...' />
            <MDBCardBody>
              <MDBCardTitle>USC Gym</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </MDBCardText>
              <MDBBtn href='#'>Button</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md='3'>
          {/* utown gym card */}
          <MDBCard style={{ maxWidth: '22rem', height: "30rem" }}>
            <MDBCardImage src='https://uci.nus.edu.sg/suu/wp-content/uploads/sites/5/2021/09/Utown-Gym-4-1024x768.jpg' position='top' alt='...' />
            <MDBCardBody>
              <MDBCardTitle>U Town Gym</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </MDBCardText>
              <MDBBtn href='#'>Button</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md='3'>
          {/* wellness outreach gym card */}
          <MDBCard style={{ maxWidth: '22rem', height: "30rem" }}>
            <MDBCardImage src='https://www.nuss.org.sg/nuss_admin/uploads/1462343328_gym_overview_2.jpg' position='top' alt='...'/>
            <MDBCardBody>
              <MDBCardTitle>Wellness Outreach Gym</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </MDBCardText>
              <MDBBtn href='#'>Button</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md='3'>
          {/* kr mpsh 3 card */}
          <MDBCard style={{ maxWidth: '22rem', height: "30rem" }}>
            <MDBCardImage src='https://uci.nus.edu.sg/suu/wp-content/uploads/sites/5/2021/07/MPSH3-Gym.4-1024x768.jpg' position='top' alt='...' />
            <MDBCardBody>
              <MDBCardTitle>Kent Ridge Fitness Gym @ MPSH 3</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </MDBCardText>
              <MDBBtn href='#'>Button</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
      
    </>

  );
}

export default Home;