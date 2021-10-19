import firebase from 'firebase';
import firestore from '@firebase/firestore';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue }from 'firebase-admin/firestore';

const config = {
    projectId: 'mychat-data', 
    apiKey: 'AIzaSyDvFk3JCnIXtR5CDE7Xj_fMHy76XwWkqEQ',
    databaseURL: 'https://mychat-data-default-rtdb.asia-southeast1.firebasedatabase.app'
  };
firebase.initializeApp(config);



async function getRoomsList(db) {
  const roomsCol = collection(db, 'rooms');
  const roomsSnapshot = await getDocs(roomsCol);
  const roomsList = roomsSnapshot.docs.map(doc => doc.data());
  return roomsList;
}

async function setDocument(db,data) {
  const res = await db.collection('users').doc('nickname').set(data.userName);
}

export default firebase;