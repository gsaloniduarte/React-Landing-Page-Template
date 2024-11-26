/* import { useEffect, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth,app } from '../firebaseConfig';

const usePremiumStatus = (props) => {
  //const [isPremium, setIsPremium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Is premium")


  useEffect(() => {
    const userId = auth.currentUser?.uid;
    console.log(userId)
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const db = getFirestore(app);
    const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
    const q = query(
      subscriptionsRef,
      where("status", "in", ["trialing", "active"])
    );

    console.log("Is premium",q)

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.docs.length === 0) {
          props.setIsPremium(false);
        } else {
          props.setIsPremium(true);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching subscriptions", err);
        setError("Error fetching subscription status");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [app]);

  //return { isPremium, loading, error };
};

export default usePremiumStatus;
 */