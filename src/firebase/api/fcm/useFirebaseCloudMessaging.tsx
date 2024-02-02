import { getToken } from "firebase/messaging";
import { messaging } from "../../FirebaseManager";
import { useEffect } from "react";

const useFCM = () => {

    const GetToken = async () => {
        const vapidKey =
           "BOoAirDevtekoK4JliMAbPuDaRKR3wQmx20d7ON9Xu5Ug0K4Tus5Gzi7e_uqVaQCgYpRsILRc-IOcijY1EvUvbo";
  
        return await getToken(messaging, {
           vapidKey,
        })
           .then((currentToken) => {
              // eslint-disable-next-line no-console
              console.log("Token", currentToken);
           })
           .catch((err) => err);
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