import React from "react";
import style from "./Envelopes.module.css";
import Envelope1 from "../../assets/images/envelope1.jpg";
import Envelope2 from "../../assets/images/envelope2.jpg";

export function Envelopes() {
  return (
    <section className={style.envelopesContainer}>
      <img src={Envelope1} alt="envelop" className={style.img1} />
      <div className={style.secondImgContainer}>
        <p className={style.text}>
          "You will receive a series of beautiful sealed envelopes that contain
          the next exciting steps of your way journey. The package came with
          four surprise stops."
        </p>
        <img src={Envelope2} alt="envelop" className={style.img2} />
      </div>
    </section>
  );
}
