import React from "react";
import usePremiumStatus from "./usePremiumStatus"; // Import the hook
import { initFirebase } from "../firebaseConfig"; // Assuming you have this function
import { UserAuth } from '../context/AuthContext';

import { useNavigate } from "react-router-dom";
import { PremiumPanel } from "./PremiumPanel";
import { StandardPanel } from "./StandardPanel";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "./stripePayment";
//import { usePortalUrl, useCheckoutUrl } from "./stripePayment";
import { auth } from '../firebaseConfig';
import { useState } from "react";

const SuccessPage = () => {
  const {  user } = UserAuth();
  console.log( user)
  const navigate = useNavigate();

  //const { checkoutUrl, getCheckoutUrl } = getCheckoutUrl();
  //const { portalUrl, getPortalUrl } = getPortalUrl();
  //const isPremium = usePremiumStatus();
  const [isPremium, setIsPremium] = useState(null);
  usePremiumStatus(isPremium, setIsPremium);

  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  console.log("Success",user,userName,email,isPremium)

  return (
    <div   >
      <div className="text-center p-8">
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        
        
        </div>
    </div>


  );
};

export default SuccessPage;
