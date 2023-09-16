import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { setDoc, doc } from "firebase/firestore"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setisPending] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setisPending(true);

        try {
            const response = await createUserWithEmailAndPassword(projectAuth, email, password);

            if (!response) {
                throw new Error('Could not complete a signup');
            }

            await updateProfile(projectAuth.currentUser, { displayName });
            await sendEmailVerification(projectAuth.currentUser);

            // create a user document
            await setDoc(doc(projectFirestore, 'users', projectAuth.currentUser.uid), { 
                displayName, email, displayNameUpper: displayName.toUpperCase()
              });

            dispatch({ type: 'LOGIN', payload: projectAuth.currentUser })
            if (!isCancelled) {
                setisPending(false);
                setError(null);
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setisPending(false);
            }
        }
    }

    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, []);

    return { error, isPending, signup };
}