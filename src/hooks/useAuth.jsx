import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export function useAuth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setLoggedIn(true);
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnapshot = await getDoc(userDocRef);
                    
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        setUserRole(userData.role);
                    } else {
                        setUserRole(null);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                setLoggedIn(false);
                setUserRole(null);
            }
            setCheckingStatus(false);
        });

        return unsubscribe;
    }, []);

    return {
        loggedIn,
        userRole,
        checkingStatus
    };
}
