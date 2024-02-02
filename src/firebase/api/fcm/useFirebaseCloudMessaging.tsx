import { getToken } from "firebase/messaging";
import { messaging } from "../../FirebaseManager";
import { useEffect } from "react";

const useFCM = (path: string) => {


    const GetToken = async () => {
        const serviceWorkerRegistration = await navigator.serviceWorker.register(path);

        const vapidKey =
           "BOoAirDevtekoK4JliMAbPuDaRKR3wQmx20d7ON9Xu5Ug0K4Tus5Gzi7e_uqVaQCgYpRsILRc-IOcijY1EvUvbo";

        const FCM_TOKEN = await getToken(messaging, { 
            vapidKey,
            serviceWorkerRegistration
        })
           .then((currentToken) => {
              // eslint-disable-next-line no-console
              console.log("Token", currentToken);
           })
           .catch((err) => err);
           FCM_TOKEN 
     };
  
     const CheckNotificationPermission = async () => {
        if (!("Notification" in window)) return;
  
        if (Notification.permission === "granted") {
           GetToken();
        } else if (Notification.permission !== "denied") {
           Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                 GetToken();
              }
           });
        }
     };
  
     useEffect(() => {
        CheckNotificationPermission();
     }, []);
}

export default useFCM