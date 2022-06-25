import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getBookings } from "./api/bookings";
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

        

  );
  }
export default Statistics;