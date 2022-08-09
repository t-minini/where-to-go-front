import style from "./style.module.css";
import { Link } from "react-router-dom";

export function Hello() {
  return (
    <div>
    
      <div className={style.helloContainer}>
        <h1 className={style.helloH1}>Where do You</h1>
        <h1 className={style.helloH1b}>Wanna Go?</h1>
        <h3 className={style.helloH3}>
          We have a selection of nice and surprising destinations to take you
        </h3>
        <div className={style.helloBtn}>
          <Link to={"/store"} style={{ color: "black" }}>
            See All Trips
          </Link>
        </div>
      </div>
    </div>
  );
}
