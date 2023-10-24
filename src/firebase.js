import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for leaderboard
const firebaseConfig = {
  apiKey: "AIzaSyDT-m4N97bnGzcfdjjodrsvj653PDI_yig",
  authDomain: "space-crusaders.firebaseapp.com",
  projectId: "space-crusaders",
  storageBucket: "space-crusaders.appspot.com",
  messagingSenderId: "449466746676",
  appId: "1:449466746676:web:1ae74fb4327ddc7b07c761",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
