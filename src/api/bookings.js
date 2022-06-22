import {
    db
} from '../firebase.js'

import { doc, getDoc, setDoc, collection } from "firebase/firestore";

async function getBookings() {
    // const timeslotsRef = doc(db, "timeslots", "krmpsh");
    // const docSnap = await getDoc(timeslotsRef);

    // if (!docSnap.exists()) {
    //     console.log("No such document!");
    //     return
    // }
    
    // return docSnap.data();
}

async function createBookings(userId, venue, timeslot) {
    const bookingData = {
        userId: userId,
        venue: venue,
        timeslot: timeslot,
    };
    const bookingRef = doc(collection(db, "bookings"));

    await setDoc(bookingRef, bookingData);
    
}

async function deleteBooking(bookingId) {

}

export {
    createBookings
}