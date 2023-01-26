/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import styles from "../../styles/Form.module.css";

const Footer = ({ hideBGCOLOR }) => {
  return (
    <footer className={`${!hideBGCOLOR ? "sub-bg" : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="item md-mb50">
              <div className="title">
                <h5>Contact Us</h5>
              </div>
              <ul>
                <li>
                  <span className="icon pe-7s-mail"></span>
                  <div className="cont">
                    <h6>Email Us</h6>
                    <p>ApeironAICompany@gmail.com</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="item md-mb50">
              <div className="title">
                <h5>Recent News</h5>
              </div>
              <ul>
                <li>
                  <div className="sm-post">
                    <Link href="/pricing">
                      <a>
                        <p>
                          ApeironAI is here! And we want to give you a free 7
                          day trial on every tool we have!
                        </p>
                      </a>
                    </Link>
                    <Link href="/pricing">
                      <a>
                        <span className="date">25 jan 2023</span>
                      </a>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="item md-mb50">
              <div className="title">
                <h5>
                  Apeiron
                  <span className={styles.color_font}>AI</span>
                </h5>
              </div>
              <ul>
                <li>
                  <div className="sm-post">
                    <p>
                      © 2022, Vie Template. Made with passion by
                      <Link href="https://themeforest.net/user/themescamp/portfolio">
                        <a target="_blank">ThemesCamp</a>
                      </Link>
                      .
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tw-flex tw-flex-col">
          <a
            style={{ fontSize: 6, color: "gray" }}
            href="https://es.vecteezy.com/video/2143039-rotar-circuito-ai-azul-brillante-en-microchip-en-placa-madre-de-computadora"
          >
            Gire el circuito ai azul brillante en el microchip de la placa base
            del ordenador Vídeos de stocko por Vecteezy
          </a>
          <a
            style={{ fontSize: 6, color: "gray" }}
            href="https://es.vecteezy.com/video/11992596-red-neuronal-ai-tecnologia-computacion-en-la-nube-bits-internet-5g-fondo-azul-informacion-atras"
          >
            red neuronal ai tecnología computación en la nube bits internet 5g
            fondo azul información atrás Vídeos de stocko por Vecteezy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
