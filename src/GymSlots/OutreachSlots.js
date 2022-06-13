import "./OutreachSlots.css";
import ReactTimeslotCalendar from "react-timeslot-calendar";
import moment from "moment";

function OutreachSlots() {
 
  return (
    <div className="OutreachSlots">
      <h1>Outreach Wellness Centre Gym</h1>
      <h2>Operating Hours: 7am - 9pm</h2>
      <ReactTimeslotCalendar
        initialDate={moment().format("YYYY-MM-DD")}
        let
        timeslots={[
          ["7", "9"], // 1:00 AM - 2:00 AM
          ["9", "11"],
          ["11", "13"],
          ["13","15"],
          ["15","17"],
          ["17","19"],
          ["19","21"]
        ]}
        onSelectTimeslot = { (timeslots, lastSelected) => {
            console.log('All Timeslots:');
            console.log(timeslots);

            console.log('Last selected timeslot:');
            console.log(lastSelected);
        }}
      />
    </div>
  );
}

export default OutreachSlots;