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
                case "auth/invalid-email":
                    alert("Špatně zadaný email. Email musí být v tomto formátu: jan@novotny.cz");
                    break;
                case "auth/user-not-found":
                    alert("Uživatel nenalezen.");
                    break;
                case "auth/wrong-password":
                    alert("Nesprávné heslo.");
                    break;
                case "auth/network-request-failed":
                    alert("Chyba v síti. Prosím zkuste to znovu později.");
                    break;
                default:
                    alert("Nečekaný error :c : " + error.message);
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
            
            if (user) {
                set(ref(database, `users/${user.uid}`), {
                    email: user.email
                })

                await new Promise(resolve => setTimeout(resolve, 2000));
                return true;  
            }
        } catch (error : any) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("Tento email je už používaný někým jiným.");
                    break;
                case "auth/invalid-email":
                    alert("Špatně zadaný email. Email musí být v tomto formátu: jan@novotny.cz");
                    break;
                case "auth/weak-password":
                    alert("Slabé heslo. Vyber si silnější heslo.");
                    break;
                case "auth/network-request-failed":
                    alert("Chyba v síti. Prosím zkuste to znovu později.");
                    break;
                default:
                    alert("Nečekaný error :c : " + error.message);
            }
            return false;
        }
    },
    getCurrentUser : ()=>auth.currentUser
};
export default isLoggedIn;