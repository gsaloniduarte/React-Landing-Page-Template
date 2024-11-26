import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  getAuth,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [globalData, setGlobalData] = useState({});
  const [modulos, setModulos] = useState(true);
  const [video, setVideo] = useState(false);
  const [material, setMaterial] = useState(false);
  const [manageStudent, setManageStudent] = useState(true);
  const [questoes, setQuestoes] = useState(false);
  const [casos, setCasos] = useState(false);
  const [content, setContent] = useState({});
  const setter = {modulos, setModulos,video, setVideo,material, setMaterial,questoes, setQuestoes, casos, setCasos,content, setContent, manageStudent, setManageStudent}; 
  /* console.log("setter")
  console.log(setter) */





  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(function (error) {
      alert("Verifique seu login ou senha.");
    });
    //signInWithRedirect(auth, provider)
  };

  const googleSignUp = (loginRole) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await updateProfile(auth.currentUser, { displayName: user.displayName})
      var userUid = auth.currentUser.uid;  
      try {
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef,userUid), {
            name: user.displayName, 
            email: user.email, 
            password: "loginPassword",
            role: loginRole,});
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  });
  };

  const commonSignIn = (loginEmail,loginPassword) => {
    /* console.log("Signin") */
      signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      ).catch(function (error) {
        alert("Verifique seu login ou senha.");
      });
    
  };

  const commonSignUp = (loginEmail,loginPassword,loginName,loginRole) => {
    console.log("Aqui")
    console.log(auth)
    console.log(loginEmail)
    console.log(loginPassword)
    console.log("Aqui")
    createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await updateProfile(auth.currentUser, { displayName: loginName })
      var userUid = auth.currentUser.uid;  
      try {
        const usersRef = collection(db, "users");

        await setDoc(doc(usersRef,userUid), {
            name: loginName, 
            email: loginEmail, 
            password: loginPassword,
            role: loginRole,});
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
  });
  };

  const logOut = () => {
      signOut(auth)
  }

  const saveModules = (data,user,modules) => {
    //console.log("Starting")
    const provider = new GoogleAuthProvider();
    var userUid = auth.currentUser.uid;  
    /* console.log(modules)
    console.log(data)
    console.log(user)
    console.log(userUid) */

     try {
      const usersRef = collection(db, "users");

      updateDoc(doc(usersRef,userUid), {modules: modules});
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

const readModules = async (user) => {
  /* console.log("Starting") */

  const provider = new GoogleAuthProvider();
  var userUid = auth.currentUser.uid;  
  /* console.log(user)
  console.log(userUid) */


   try {
    const docRef = doc(db, "users", "modules");
    const docSnap = await getDoc(docRef);
    /* console.log("end")
    console.log(docSnap) */
    setGlobalData(docSnap)
    return docSnap
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const resetUserPassword = (email) => {
  /* console.log("Alterando email")
  console.log(email) */
  const auth = getAuth();
  sendPasswordResetEmail(auth, email).then(() => {
    alert("Senha atualizada, verifique seu e-mail.");
  }).catch((error) => {
    /* console.log(error) */
    alert("Falha no reset, tente novamente.");
  });


}


const deleteModule = (user,modules) => {
    /* console.log("Deleting") */
    const provider = new GoogleAuthProvider();
    var userUid = auth.currentUser.uid;  
    /* console.log(user)
    console.log(userUid) */

     try {
      const usersRef = collection(db, "users");
      updateDoc(doc(usersRef,userUid), {modules: modules});

    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, googleSignUp, commonSignIn, commonSignUp, logOut, user, globalData,setter, setGlobalData, saveModules, readModules, deleteModule, resetUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};