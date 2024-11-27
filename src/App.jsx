import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Exemplos";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Payment from "./components/Payment";
import Home from "./components/Home";
import CompleteSignUp from "./components/CompleteSignUp";
import { AuthContextProvider } from './context/AuthContext';

import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { LoggedNavigation } from "./components/loggednavigation";
import { Generate } from "./components/generate";
import { GeneratePage } from "./components/generatePage";
import { loadStripe } from '@stripe/stripe-js';
import { Elements,useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import PaymentPage from "./components/page";
import AccountPage from "./account/AccountPage";
import SuccessPage from "./account/SuccessPage";
import ResetPassword from "./components/ResetPassword";

// Chave pública do Stripe
const stripePromise = loadStripe('pk_test_51QKOivJo2zcqfF2q4Vdu1qGrTFiaIQh5YaDNR2MUdNmsnoqlMYAroqt4yZ1ullMRFpzLPQxayRUQQOCIM718xTh700SnhCY6rO');  // Substitua pela sua chave pública


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    alert("Logout realizado com sucesso!");
  };  
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <>
    <AuthContextProvider>
      <Router>
        <div>
          <Navigation  setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
          <Routes>
            <Route path="/" element={<Home  data={landingPageData}  />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/reset-password" element={<ResetPassword  />} />
            <Route path="/complete-signup" element={<CompleteSignUp />} />
            <Route path="/minhas-imagens" element={isLoggedIn ? <Gallery /> : <Navigate to="/login" />} />
            <Route path="/gerar-imagens" element={<GeneratePage data={landingPageData}  />} />
            {/* <Route path="/pagamento" element={<Payment />}  /> */}
            <Route path="/payment/:planId" element={    <Elements stripe={stripePromise}><Payment /></Elements>} />
            <Route path="/payment1/:planId" element={    <PaymentPage/>} />
            <Route path="/account" element={    <AccountPage setIsLoggedIn={setIsLoggedIn}/>} />
            {/* <Route path="/success" element={    <SuccessPage/>} /> */}
            {/* <Route path="/pagamento" element={isLoggedIn ? <Payment /> : <Navigate to="/login" />} /> */}
          </Routes>
          {/* <Gallery /> */}

          {/* <Header data={landingPageData.Header} /> */}
          {/* {!isLoggedIn ? (
            <>
              <Login />
            </>
          ) : (
            <Gallery />
          )} */}

        </div>



      </Router>


   
    </AuthContextProvider>


</>
  );
};

export default App;
