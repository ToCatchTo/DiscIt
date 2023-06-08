import {firebase_app} from "./config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import router from "next/router";

const auth = getAuth(firebase_app);
const database = getDatabase(firebase_app);
let isLoggedIn = false;

export const authUtils = {
    login : async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
            console.log("User logged in");
            isLoggedIn = true;
            return true;
        } catch (error : any) {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("User not found");
                    break;
                case "auth/wrong-password":
                    alert("Wrong password");
                    break;
                default:
                    alert("Unexpected error: " + error.message);
            }
            return false;
        }
    },
    logout : async () => {
        try {
            await auth.signOut();
        } catch (error : any) {
            console.error(error);
        }
    },
    register : async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Add user to the Firebase Realtime Database
            if (user) {
                router.push("/login");
                await set(ref(database, `users/${user.uid}`), {
                    email: user.email
                });
            }
        } catch (error : any) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("Email already in use");
                    break;
                default:
                    alert("Unexpected error: " + error.message);
            }
            return false;
        }
    },
    getCurrentUser : ()=>auth.currentUser
};
export default isLoggedIn;