import {
    db
} from '../firebase.js'

import { doc, getDoc, setDoc, collection, deleteDoc, getDocs } from "firebase/firestore";

async function getBookings() {
    // const timeslotsRef = doc(db, "bookings");
    // const docSnap = await getDoc(timeslotsRef);

    // if (!docSnap.exists()) {
    //     console.log("No such document!");
    //     return
    // }
    
    // console.log(docSnap.data())
    // return docSnap.data();

    var temp = {};
    const querySnapshot = await getDocs(collection(db, "bookings"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp[doc.id] = doc.data()
        console.log(doc.id, " => ", doc.data());
    });

    return temp;
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
    await deleteDoc(doc(db, "bookings", bookingId));
}

export {
    getBookings,
    createBookings,
    deleteBooking
}