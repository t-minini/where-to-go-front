import React from "react";
import style from "./BackTopTop.module.css";
import { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

export function BackToTop() {
  const [backToTopBtn, setBackToTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        setBackToTopBtn(true);
      } else setBackToTopBtn(false);
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopBtn && (
        <button className={style.backToTop} onClick={scrollUp}>
          <ArrowUpOutlined />
        </button>
      )}
    </div>
  );
}
