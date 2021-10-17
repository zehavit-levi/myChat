import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    projectId: 'mychat-data', 
    apiKey: 'AIzaSyDvFk3JCnIXtR5CDE7Xj_fMHy76XwWkqEQ',
    databaseURL: 'https://mychat-data-default-rtdb.asia-southeast1.firebasedatabase.app'
  };
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;