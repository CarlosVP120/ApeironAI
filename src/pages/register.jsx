import Head from "next/head";
import Layout from "../layouts/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiFingerPrint, HiAtSymbol, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { register_validate } from "../../lib/validate";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseClient";

export default function Register() {
  const router = useRouter();
  const [show, setShow] = useState({ password: false, cpassword: false });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    validate: register_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already in use, try logging in");
        } else if (error.code === "auth/invalid-email") {
          alert("Invalid email");
        } else if (error.code === "auth/weak-password") {
          alert("Password is too weak");
        }
        return;
      })
      .then((userCredential) => {
        // sign in to next-auth
        signInWithEmailAndPassword(auth, values.email, values.password).then(
          (userCredential) => {
            router.replace("/apeiron");
          }
        );
      });
    formik.resetForm();
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section
        className={`tw-w-3/4 tw-mx-auto tw-flex tw-flex-col tw-gap-7 tw-h-full tw-justify-center`}
      >
        <div className="title">
          <h1
            className="align-self-center"
            style={{ fontSize: "2.5rem", fontFamily: "Poppins" }}
          >
            Apeiron
            <span className={styles.color_font} style={{ fontWeight: "bold" }}>
              AI
            </span>
          </h1>
          <h1 className="tw-text-gray-500 tw-text-2xl tw-font-semi-bold">
            Register
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
            <div className="tw-text-red-500 tw-text-xs tw-font-medium">
              {formik.errors.email}
            </div>
          ) : null}

          <div className={styles.input_group}>
            <input
              className={styles.input_text}
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <span
              className="tw-icon tw-flex tw-items-center tw-px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="tw-text-red-500 tw-text-xs tw-font-medium">
              {formik.errors.password}
            </div>
          ) : null}

          <div className={styles.input_group}>
            <input
              className={styles.input_text}
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="tw-icon tw-flex tw-items-center tw-px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <div className="tw-text-red-500 tw-text-xs tw-font-medium">
              {formik.errors.cpassword}
            </div>
          ) : null}

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>

        <p className="tw-text-center tw-text-gray-400 tw-text-sm">
          Already have an account?{" "}
          <Link href={"/login"}>
            <a className="tw-text-blue-700">Sign In</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
