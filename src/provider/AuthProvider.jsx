import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

// import axios from 'axios';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(user);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [])

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         setLoading(false);

    //         if (currentUser) {
    //             const userData = { email: currentUser.email };

    //             axios.post('https://btobridge-server.vercel.app/jwt', userData, {
    //                 withCredentials: true,
    //             })
    //                 .then(res => {
    //                     console.log(res.data)
    //                 })
    //                 .catch(error => console.log(error));
    //         }
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [])

    const authData = {
        user,
        setUser,
        createUser,
        signIn,
        updateUserProfile,
        logOut,
        loading,
        setLoading,
    };

    return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;