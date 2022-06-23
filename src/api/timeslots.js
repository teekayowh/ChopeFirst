import {
    db
} from '../firebase.js'

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";

async function getTimeslots(name) {
    const timeslotsRef = doc(db, "timeslots", name);
    const docSnap = await getDoc(timeslotsRef);

    if (!docSnap.exists()) {
        console.log("No such document!");
        return
    }
    
    return docSnap.data();
}


async function updateTimeslots(name, start) {
    const data = doc(db, "timeslots", name);
    getDoc(data).then(
        async function update(doc) {
            const detail = doc.data();
            for (const item in detail) {
                console.log(detail[item]["start"]);
                if (detail[item]["start"] === start["startTime"]) {
                    detail[item]["capacity"] = detail[item]["capacity"] -1;
                    console.log(detail[item]);
                    setDoc(data, detail);
                }
            }
        }
        
    )
}

async function quickPop(name) {
    const data = doc(db, "timeslots", "krmpsh");
    const data2 = doc(db, "timeslots", name);
    getDoc(data).then((doc) => updateDoc(data2, doc.data()));
}

export {
    getTimeslots,
    updateTimeslots,
    quickPop
}