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

import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { LoggedNavigation } from "./components/loggednavigation";
import { Generate } from "./components/generate";
import { GeneratePage } from "./components/generatePage";

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
    <Router>
      <div>
        <Navigation  setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home  data={landingPageData}  />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLogged={setIsLoggedIn} />} />
          <Route path="/complete-signup" element={<CompleteSignUp />} />
          <Route path="/minhas-imagens" element={isLoggedIn ? <Gallery /> : <Navigate to="/login" />} />
          <Route path="/gerar-imagens" element={<GeneratePage data={landingPageData}  />} />
          <Route path="/pagamento" element={isLoggedIn ? <Payment /> : <Navigate to="/login" />} />
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



  );
};

export default App;
