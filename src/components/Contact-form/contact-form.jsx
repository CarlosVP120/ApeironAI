import React from "react";
import ContactFromDate from "../../data/sections/form-info.json";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";

const ContactForm = () => {
  const messageRef = React.useRef(null);
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const [inputs, setInputs] = useState({
    companyName: "",
    email: "",
    message: "",
  });

  const handleOnChange = useCallback((e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  }, []);

  const handleServerResponse = useCallback((ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg },
      });
      setInputs({
        companyName: "",
        email: "",
        message: "",
      });
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg },
      });
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
      axios({
        method: "POST",
        url: "https://formspree.io/f/xdovaozp",
        data: inputs,
      }).then((_response) => {
        handleServerResponse(
          true,
          "Thank you, your message has been submitted :)"
        );
      });
    },
    [inputs, handleServerResponse]
  );

  const sendMessage = (ms) => new Promise((r) => setTimeout(r, ms));
  return (
    <section className="contact section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="form md-mb50">
              <h4 className="fw-700 color-font mb-50">Get In Touch.</h4>

              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="messages" ref={messageRef}></div>
                <div className="controls">
                  <div className="form-group">
                    <input
                      onChange={handleOnChange}
                      value={inputs.companyName}
                      required
                      maxLength={128}
                      type="text"
                      name="companyName"
                      id="companyName"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={handleOnChange}
                      value={inputs.email}
                      required
                      maxLength={128}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Correo Electrónico"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    onChange={handleOnChange}
                    value={inputs.message}
                    required
                    maxLength={1048576}
                    name="message"
                    id="message"
                    placeholder="Message"
                  ></textarea>
                </div>

                <button type="submit" className="butn bord">
                  {!status.submitting ? (
                    !status.submitted ? (
                      <span>Send Message</span>
                    ) : (
                      <span>Submitted</span>
                    )
                  ) : (
                    <span>Submitting...</span>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="cont-info">
              <h4 className="fw-700 color-font mb-50">Contact Info.</h4>
              <h3 className="wow" data-splitting>
                {ContactFromDate.title}
              </h3>
              <div className="item mb-40">
                <h5>
                  <a href="#0">{ContactFromDate.email}</a>
                </h5>
              </div>
              <h3 className="wow" data-splitting>
                Visit Us.
              </h3>
              <div className="item">
                <h6>
                  {ContactFromDate.location.first}
                  <br />
                  {ContactFromDate.location.second}
                </h6>
              </div>
              {/*
              <div className="social mt-50">
                <a href="#0" className="icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#0" className="icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#0" className="icon">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="#0" className="icon">
                  <i className="fab fa-behance"></i>
                </a>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
