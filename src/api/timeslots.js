import {
    db
} from '../firebase.js'

import { doc, getDoc } from "firebase/firestore";

async function getTimeslots() {
    const timeslotsRef = doc(db, "timeslots", "krmpsh");
    const docSnap = await getDoc(timeslotsRef);

    if (!docSnap.exists()) {
        console.log("No such document!");
        return
    }
    
    return docSnap.data();
}

function updateTimeslots() {

}

export {
    getTimeslots
}