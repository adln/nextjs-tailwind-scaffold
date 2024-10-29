import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyADNSSI9Naj2lfygdAqV99wZH1S2uZVA9E",
  authDomain: "gh-auth-6a5e1.firebaseapp.com",
  projectId: "gh-auth-6a5e1",
  storageBucket: "gh-auth-6a5e1.appspot.com",
  messagingSenderId: "935934240435",
  appId: "1:935934240435:web:59290d691553ec20f732c6",
  measurementId: "G-SKQ5FGNN3J"
};

const app = initializeApp(firebaseConfig);


export const requestPermission = async () => {
  const messaging = getMessaging(app);
  try {
    const token = await getToken(messaging, {
      vapidKey: "BO3-vNHLbCHELQyw2G7bWDuuRaGx1v1uJ_EqMp3XUS7E9FDr2nsv3u3oayD77rHOGpOgFqpdb1y1BuhOTXu18Js",
    });
    if (token) {
      console.log('FCM Token:', token);
      // Save the token to your server for sending notifications
    } else {
      console.log('No registration token available');
    }
  } catch (err) {
    console.log('Error getting token:', err);
  }
};

export const onMessageListener = (callback) => {
  const messaging = getMessaging(app);

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    callback(payload); // Call the provided callback function with the payload
  });
};
