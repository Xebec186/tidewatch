import { createContext, useContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: userData.fullName || firebaseUser.displayName || "User",
              ...userData
            });
          } else {
            // Fallback if doc doesn't exist yet (e.g., during signup process)
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || "User",
            });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || "User",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", firebaseUser.uid), {
      email,
      uid: firebaseUser.uid,
      createdAt: new Date().toISOString(),
      alertsEnabled: false, // Default alerts to off as requested
      ...additionalData
    });

    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (data) => {
    if (!auth.currentUser) return;

    // Update Firebase Auth Display Name
    if (data.fullName) {
      await updateProfile(auth.currentUser, {
        displayName: data.fullName
      });
    }

    // Update Firestore Doc
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userDocRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // Refresh local state
    setUser(prev => ({ ...prev, ...data, displayName: data.fullName || prev.displayName }));
  };

  const updateUserPassword = async (oldPassword, newPassword) => {
    if (!auth.currentUser) return;

    // 1. Re-authenticate first (Required by Firebase for sensitive actions)
    const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);
    
    // 2. Update password
    await updatePassword(auth.currentUser, newPassword);
  };

  const deleteUserAccount = async (password) => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;

    // 1. Re-authenticate first
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    await reauthenticateWithCredential(auth.currentUser, credential);

    // 2. Delete Firestore data
    await deleteDoc(doc(db, "users", uid));

    // 3. Delete Auth account
    await deleteUser(auth.currentUser);
  };

  const value = {
    user,
    signup,
    login,
    logout,
    updateUserProfile,
    updateUserPassword,
    deleteUserAccount,
    loading,
  };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
