import Head from "next/head";
import Layout from "../layouts/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiFingerPrint, HiAtSymbol } from "react-icons/hi";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../../lib/validate";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseClient";
import Guest from "../components/Guest";
import LoadingScreen from "../components/Loading-Screen";

export default function Login() {
  const [loadingLogin, setLoading] = useState(true);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit: onSubmit,
  });

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser = user;
        router.replace("/apeiron");
      } else {
        auth.currentUser = null;
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    const hideloading = document.querySelector(".showX");
    const hideLoadingSVG = document.querySelector(".progress-wrap");
    if (hideloading) {
      hideloading.remove();
      hideLoadingSVG.remove();
    }
    authListener();
  }, []);

  async function onSubmit(values) {
    // const status = await signIn("credentials", {
    //   redirect: false,
    //   email: values.email,
    //   password: values.password,
    //   callbackUrl: "http://localhost:3000/apeiron",
    // });
    // if (status.ok) {
    //   router.push("http://localhost:3000/apeiron");
    // } else {
    //   if (status.status === 401) {
    //     alert("Email or password is incorrect");
    //   } else {
    //     alert("Something went wrong");
    //   }
    // }

    await signInWithEmailAndPassword(auth, values.email, values.password)
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("Invalid email");
        } else if (error.code === "auth/user-not-found") {
          alert("User not found");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong password");
        }
        return;
      })
      .then((userCredential) => {
        formik.resetForm();
        router.replace("/apeiron");
      });
  }

  async function handleGoogleSignIn() {
    // signIn("google", { callbackUrl: "http://localhost:3000/apeiron" });

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(function onSuccess(...args) {
        router.replace("/apeiron");
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          alert("Email already exists, please login with email and password");
        } else if (error.code === "auth/invalid-credential") {
          alert("Invalid credential");
        } else {
          alert("Something went wrong");
        }
      });
  }

  async function handleGithubSignIn() {
    // signIn("github", { callbackUrl: "http://localhost:3000/apeiron" });

    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then(function onSuccess(...args) {
        router.replace("/apeiron");
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          alert("Email already exists, please login with email and password");
        } else {
          alert("Something went wrong");
        }
      });
  }

  return (
    <>
      {loadingLogin ? <Guest /> : null}
      {auth.currentUser === null && loadingLogin === false ? (
        <Layout>
          <Head>
            <title>Login</title>
          </Head>
          <section className="tw-w-3/4 tw-mx-auto tw-flex tw-flex-col tw-gap-9 tw-h-full tw-justify-center">
            <div className="title">
              <h1
                className="align-self-center"
                style={{ fontSize: "2.5rem", fontFamily: "Poppins" }}
              >
                Apeiron
                <span
                  className={styles.color_font}
                  style={{ fontWeight: "bold" }}
                >
                  AI
                </span>
              </h1>
              <h1 className="tw-text-gray-500 tw-text-2xl tw-font-semi-bold">
                Login
              </h1>
            </div>

            <form
              className="tw-flex tw-flex-col tw-gap-3"
              onSubmit={formik.handleSubmit}
            >
              <div className={styles.input_group}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input_text}
                  {...formik.getFieldProps("email")}
                />
                <span className="tw-icon tw-flex tw-items-center tw-px-4">
                  <HiAtSymbol size={25} />
                </span>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <span className="tw-text-red-500 tw-text-xs tw-font-medium">
                  {formik.errors.email}
                </span>
              ) : null}
              <div className={styles.input_group}>
                <input
                  className={styles.input_text}
                  type={`${show ? "text" : "password"}`}
                  name="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className="tw-icon tw-flex tw-items-center tw-px-4"
                  onClick={() => setShow(!show)}
                >
                  <HiFingerPrint size={25} />
                </span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <span className="tw-text-red-500 tw-text-xs tw-font-medium">
                  {formik.errors.password}
                </span>
              ) : null}

              <div className="input-button">
                <button type="submit" className={styles.button}>
                  Login
                </button>
              </div>
              <div className="input-button">
                <button
                  type="button"
                  className={styles.button_custom}
                  onClick={handleGoogleSignIn}
                >
                  Sign In with Google
                  <Image
                    src={"/assets/google.svg"}
                    width="20"
                    height={20}
                  ></Image>
                </button>
              </div>
              <div className="input-button">
                <button
                  type="button"
                  className={styles.button_custom}
                  onClick={handleGithubSignIn}
                >
                  Sign In with Github{" "}
                  <Image
                    src={"/assets/github.svg"}
                    width="25"
                    height={25}
                    className="tw-self-center"
                  ></Image>
                </button>
              </div>
            </form>

            <p className="tw-text-center tw-text-gray-400 tw-text-sm">
              Don&apos;t have an account?
              <Link href={"/register"}>
                <a className="tw-text-blue-700"> Sign Up</a>
              </Link>
            </p>
          </section>
        </Layout>
      ) : (
        <Guest />
      )}
    </>
  );
}
