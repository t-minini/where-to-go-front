import { LinkedinFilled, GithubFilled } from "@ant-design/icons";
import AvatarTulio from "../../assets/images/tulio-avatar.png";
import AvatarTathy from "../../assets/images/tathy-avatar.png";
import AvatarAngelo from "../../assets/images/angelo-avatar.png";
import style from "./style.module.css";
import React from "react";

export function ContactUs() {
  return (
    <div className={style.contactContainer} id="contact">
      <div className={style.contactH1}>
        <h1>Meet the Developers</h1>
      </div>
      <div className={style.contact}>
        <div className={style.cardsContainer}>
          <div className={style.card}>
            <img src={AvatarTulio} className={style.cardImg} alt="help" />
            <div className={style.cardContent}>
              <h2>Tulio Minini</h2>
              <div className={style.icons}>
                <>
                  <a
                    href="https://www.linkedin.com/in/tulio-minini/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black" }}
                  >
                    <LinkedinFilled style={{ fontSize: 30 }} />
                  </a>
                </>
                <>
                  <a
                    href="https://github.com/t-minini"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black" }}
                  >
                    {" "}
                    <GithubFilled style={{ fontSize: 30 }} />
                  </a>
                </>
              </div>
            </div>
          </div>
          <div className={style.card}>
            <img src={AvatarTathy} className={style.cardImg} alt="help" />
            <div className={style.cardContent}>
              <h2>Tathyana Maximiano</h2>
              <div className={style.icons}>
                <>
                  <a
                    href="https://www.linkedin.com/in/tathyanna-maximiano/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black" }}
                  >
                    <LinkedinFilled style={{ fontSize: 30 }} />
                  </a>
                </>
                <>
                  <a
                    href="https://github.com/Tathy-Max"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black" }}
                  >
                    {" "}
                    <GithubFilled style={{ fontSize: 30 }} />
                  </a>
                </>
              </div>
            </div>
          </div>
          <div className={style.card}>
            <img src={AvatarAngelo} className={style.cardImg} alt="help" />
            <div className={style.cardContent}>
              <h2>Angelo Martins</h2>
              <div className={style.icons}>
                <>
                  <a
                    href="https://www.linkedin.com/in/angelo-martins-994ba9245"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black" }}
                  >
                    <LinkedinFilled style={{ fontSize: 30 }} />
                  </a>
                </>
                <>
                  <a
                    href="https://github.com/avpm90"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black" }}
                  >
                    {" "}
                    <GithubFilled style={{ fontSize: 30 }} />
                  </a>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
