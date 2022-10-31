import { Carousel } from "antd";
import style from "./TripsSlider.module.css";

const contentStyle = {
  height: "800px",
  lineHeight: "200px",
  textAlign: "center",
  fontSize: "100px",
  marginBottom: "0px",
};

export function TripSlider() {
  return (
    <section id="slider">
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle} className={style.img1}>
            NEW YORK
          </h3>
        </div>
        <div>
          <h3 style={contentStyle} className={style.img2}>
            MARRAKESH
          </h3>
        </div>
        <div>
          <h3 style={contentStyle} className={style.img3}>
            ROME
          </h3>
        </div>
        <div>
          <h3 style={contentStyle} className={style.img4}>
            BRUSSELS
          </h3>
        </div>
        <div>
          <h3 style={contentStyle} className={style.img5}>
            CALIFORNIA
          </h3>
        </div>
        <div>
          <h3 style={contentStyle} className={style.img6}>
            HAITI
          </h3>
        </div>
      </Carousel>
    </section>
  );
}
