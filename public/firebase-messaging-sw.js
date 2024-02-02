/* eslint-disable no-undef */
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup

// importScripts("/__/firebase/9.2.0/firebase-app-compat.js");
// importScripts("/__/firebase/9.2.0/firebase-messaging-compat.js");
// importScripts("/__/firebase/init.js");

// const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.

 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: 'api-key',
   authDomain: 'project-id.firebaseapp.com',
   databaseURL: 'https://project-id.firebaseio.com',
   projectId: 'project-id',
   storageBucket: 'project-id.appspot.com',
   messagingSenderId: 'sender-id',
   appId: 'app-id',
   measurementId: 'G-measurement-id',
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 **/

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options

importScripts(
    "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
 );
 importScripts(
    "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
 );
 
 firebase.initializeApp({
    apiKey: "AIzaSyDuAvryBaQJYywk15edQJ23AIBMJTZDYdo",
    authDomain: "my-manager-b8113.firebaseapp.com",
    projectId: "my-manager-b8113",
    storageBucket: "my-manager-b8113.appspot.com",
    messagingSenderId: "403497365648",
    appId: "1:403497365648:web:05f22a2c004029b2a16815",
 });
 
 firebase.messaging();
 
 // messaging.onBackgroundMessage(function (payload) {
 //    console.log(
 //       "[firebase-messaging-sw.js] Received background message ",
 //       payload.notificationOptions
 //    );
 
 //    const notificationTitle = "Background Message Title";
 //    const notificationOptions = {
 //       body: "Background Message body.",
 //       icon: "/firebase-logo.png",
 //    };
 
 //    self.registration.showNotification(notificationTitle, notificationOptions);
 // });
 
 self.addEventListener("push", (event) => {
    // Extract the unread count from the push message data.
    const message = event.data.json();
    const unreadCount = message.unreadCount;
 
    console.log(message, unreadCount);
 
    // Set or clear the badge.
    if (navigator.setAppBadge) {
       if (unreadCount && unreadCount > 0) {
          navigator.setAppBadge(5);
       } else {
          navigator.clearAppBadge();
       }
    }
 });
 