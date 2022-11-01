import React from "react";
import style from "./Contact.module.css";
import Github from "./../../assets/images/github-icon.png";
import AvatarTulio from "../../assets/images/tulio-avatar.png";
import AvatarTathy from "../../assets/images/tathy-avatar.png";
import LinkedIn from "./../../assets/images/linkedin-icon.png";
import AvatarAngelo from "../../assets/images/angelo-avatar.png";


export function Contact() {
  return (
    <section className={style.contactContainer} id="contact">
      <h1>Meet the Developers</h1>
      <div className={style.cardsContainer}>
        <div className={style.card}>
          <img src={AvatarTulio} className={style.cardImg} alt="tulio avatar" />
          <div className={style.cardContent}>
            <h2>Tulio Minini</h2>
            <div className={style.icons}>
              <a
                href="https://www.linkedin.com/in/tulio-minini/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={LinkedIn}
                  className={style.linkedin}
                  alt="linkedin icon"
                />
              </a>
              <a
                href="https://github.com/t-minini"
                target="_blank"
                rel="noreferrer"
                style={{ color: "black" }}
              >
                <img
                  src={Github}
                  className={style.github}
                  alt="linkedin icon"
                />
              </a>
            </div>
          </div>
        </div>
        <div className={style.card}>
          <img src={AvatarTathy} className={style.cardImg} alt="tulio avatar" />
          <div className={style.cardContent}>
            <h2>Tathyana Maximiano</h2>
            <div className={style.icons}>
              <a
                href="https://www.linkedin.com/in/tathyanna-maximiano/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={LinkedIn}
                  className={style.linkedin}
                  alt="linkedin icon"
                />
              </a>
              <a
                href="https://github.com/Tathy-Max"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={Github}
                  className={style.github}
                  alt="linkedin icon"
                />{" "}
              </a>
            </div>
          </div>
        </div>
        <div className={style.card}>
          <img
            src={AvatarAngelo}
            className={style.cardImg}
            alt="tulio avatar"
          />
          <div className={style.cardContent}>
            <h2>Angelo Martins</h2>
            <div className={style.icons}>
              <a
                href="https://www.linkedin.com/in/angelo-martins-994ba9245"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={LinkedIn}
                  className={style.linkedin}
                  alt="linkedin icon"
                />
              </a>
              <a
                href="https://github.com/avpm90"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img
                  src={Github}
                  className={style.github}
                  alt="linkedin icon"
                />{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
