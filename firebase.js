import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyAL7lK4FrLp_-BJu3cHnwjJnmeN4uyKum0",
  authDomain: "examhero-baab9.appspot.com",
  projectId: "examhero-baab9",
  storageBucket: "examhero-baab9.appspot.com",
  messagingSenderId: "52876465545",
  appId: "1:558693615004:web:0e65fe232695f856b0b459"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;