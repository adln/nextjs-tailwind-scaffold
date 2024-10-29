// PWA service worker logic
self.addEventListener('install', function (event) {
  console.log('Service Worker installed');
  // Add caching logic or other PWA-related logic if needed
});

self.addEventListener('fetch', function (event) {
  // Handle fetch requests (for caching or offline access)
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
// Firebase Cloud Messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyADNSSI9Naj2lfygdAqV99wZH1S2uZVA9E",
  authDomain: "gh-auth-6a5e1.firebaseapp.com",
  projectId: "gh-auth-6a5e1",
  storageBucket: "gh-auth-6a5e1.appspot.com",
  messagingSenderId: "935934240435",
  appId: "1:935934240435:web:59290d691553ec20f732c6",
  measurementId: "G-SKQ5FGNN3J"
});

const messaging = firebase.messaging();

// This will display notifications when the app is in the background
// messaging.onBackgroundMessage(function (payload) {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };
//   console.log('Background message received');
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
