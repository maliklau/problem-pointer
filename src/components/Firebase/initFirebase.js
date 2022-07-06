import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const config = {
  apiKey: "AIzaSyDYYVBK8gldJD66uDYvBiKi0FDgQ4QLSTU",
  authDomain: "problem-pointer.firebaseapp.com",
  projectId: "problem-pointer",
  storageBucket: "problem-pointer.appspot.com",
  databaseURL: "https://problem-pointer-default-rtdb.firebaseio.com/",
  messagingSenderId: "554807281859",
  appId: "1:554807281859:web:e595fa78dcae2141a33a76",
  measurementId: "G-DRHHQ36833"
};

const app = initializeApp(config);

const db = getDatabase(app);

export { initializeApp, db, app };
