import { useState, useEffect } from "react";
import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, onSnapshot, getDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth,app } from '../firebaseConfig';

export const getCheckoutUrl = async (priceId) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(db, "customers", userId, "checkout_sessions");

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: `${window.location.origin}/success`,
    cancel_url: `${window.location.origin}/cancel`,
  });
  console.log("Documento criado:", docRef.id);
  // Verifique imediatamente o conteúdo do documento
  const snapshot = await getDoc(docRef);
  console.log("Conteúdo inicial do documento:", snapshot.data());


  console.log("Checkour -------","customers", userId, "checkout_sessions",{
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  },checkoutSessionRef,docRef)

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      console.log("Snapshot triggered:", snap.exists());
      /* if (!snap.exists()) {
        console.error("Document does not exist.");
        unsubscribe();
        reject(new Error("Document not found."));
        return;
      } */
      const { error, url } = snap.data() || {};  // Make sure snap.data() is valid
      if (error) {
        console.log("Stripe Checkout URL:", docRef, error);
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async () => {
  const user = auth.currentUser;
  console.log("Usuario")
  console.log("Usuario",user)
  try {
    const functions = getFunctions(app, "southamerica-east1");
    const functionRef = httpsCallable(functions, "ext-firestore-stripe-payments-createPortalLink");
    const { data } = await functionRef({
      customerId: user?.uid,
      returnUrl: window.location.origin,
    });

    const dataWithUrl = data; // Removed TypeScript assertion, assuming `data` has the expected shape
    console.log("Reroute to Stripe portal: ", dataWithUrl.url);
    return dataWithUrl.url;  // Return the URL directly
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving portal URL");
  }
};