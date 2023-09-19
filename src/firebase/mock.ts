// firebase-mock.js
import 'firebase/auth';

// Import the firebase-mock library
import { MockFirebase } from 'firebase-mock';

// Initialize the mock app
const mockApp = new MockFirebase();

mockApp.auth = () => ({
    currentUser : null,
    getProvider : ()=>{}
})

// Export the mock app
export default mockApp;


