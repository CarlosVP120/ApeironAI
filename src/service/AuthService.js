import { getApp } from "firebase/app";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "../../firebase/firebaseClient";

class AuthService {
  constructor(firebaseApp) {
    this.auth = getAuth(firebaseApp);
  }

  waitForUser(callback) {
    return onAuthStateChanged(auth, (userCred) => {
      callback(userCred);
    });
  }

  loginWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider())
      .then((userCred) => {
        return {
          user: userCred.user,
        };
      })
      .catch((error) => {
        return {
          error: error.message,
        };
      });
  }

  loginWithGithub() {
    return signInWithPopup(auth, new GithubAuthProvider())
      .then((userCred) => {
        return {
          user: userCred.user,
        };
      })
      .catch((error) => {
        return {
          error: error.message,
        };
      });
  }

  async loginWithCredentials(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        return {
          user: userCred.user,
        };
      })
      .catch((error) => {
        return {
          error: error.message,
        };
      });
  }

  async logout() {
    await signOut(auth);
  }
}

export default new AuthService(app);
