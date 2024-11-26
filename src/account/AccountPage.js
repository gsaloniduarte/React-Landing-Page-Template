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
import { useState,useEffect } from "react";
import getPremiumStatus from "./getPremiumStatus";

const AccountPage = () => {
  const {  user,app } = UserAuth();
  console.log( user)
  const navigate = useNavigate();

  //const { checkoutUrl, getCheckoutUrl } = getCheckoutUrl();
  //const { portalUrl, getPortalUrl } = getPortalUrl();
  //const isPremium = usePremiumStatus();
  const [isPremium, setIsPremium] = useState(null);
  //usePremiumStatus(isPremium, setIsPremium);


  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);


  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;


  const upgradeToPremium = async () => {
    const priceId = "price_1QP9D1Jo2zcqfF2qkMyKcffB";
    try {
      const checkoutUrl = await getCheckoutUrl(priceId);
      if (checkoutUrl) {
        // Navega para a URL completa retornada
        window.location.href = checkoutUrl;
        console.log("Upgrade to Premium");
        
      }
    } catch (error) {
      console.error("Failed to upgrade to premium:", error);
    }
  };
  

  const manageSubscription = async () => {
    //console.log("Manage Subscription");
    //console.log("vai Subscription",getPortalUrl());
    //console.log("Foi Subscription");

    /* if (getPortalUrl()) {
      //console.log("Foi Subscription",getPortalUrl());
      navigate(await getPortalUrl());
      
      console.log("Manage Subscription");
    } */

    try {
      const manageURL = await getPortalUrl();
      if (manageURL) {
        // Navega para a URL completa retornada
        window.location.href = manageURL;
        console.log("Manage Subscription");
        
      }
    } catch (error) {
      console.error("Failed to Manage Subscription:", error);
    }




  };

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  const upgradeToPremiumButton = (
    <button
      onClick={upgradeToPremium}
      className="bg-blue-600 p-4 px-6 text-lg rounded-lg hover:bg-blue-700 shadow-lg"
    >
      <div className="flex gap-2 items-center align-middle justify-center">
        Upgrade To Premium
      </div>
    </button>
  );

  const managePortalButton = (
    <button
      onClick={manageSubscription}
    >
        Manage Subscription
    </button>
  );

  const signOutButton = (
    <button
      onClick={signOut}
      className="hover:underline text-slate-500 hover:text-slate-300 text-lg text-center"
    >
      <div className="flex gap-2 items-center align-middle justify-center">
        Sign Out
      </div>
    </button>
  );

  const accountSummary = (
    <div>
      <div className="text-slate-500 mb-1">Signed in as {userName}</div>
      <div className="text-slate-300 text-xl">{email}</div>
    </div>
  );

  const statusPanel = isPremium ? <PremiumPanel /> : <StandardPanel />;
  const memberButton = isPremium ? managePortalButton : upgradeToPremiumButton;

  return (
    <div   >
      <div className="text-center p-8">
        <h1>asdasdasdasd</h1>
        <h1>asdasdasdasd</h1>
        <div className="text-5xl md:text-6xl font-bold mb-4">
            {accountSummary}
            {statusPanel}
            {memberButton}
            {signOutButton}
          </div>
        </div>
    </div>


  );
};

export default AccountPage;
