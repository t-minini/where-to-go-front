import { useContext } from "react";
import style from "./WhereWannaGo.module.css";
import { SignUpModal } from "../SignUpModal/SignUpModal";
import { AuthContext } from "../../../contexts/authContext";

export function WhereWannaGo() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <section className={style.whereContainer}>
      <h1>
        Where do <br /> you wanna go?
      </h1>
      <p>We have a selection of nice and surprising destinations to take you.</p>
      <div>{loggedInUser ? null : <SignUpModal />}</div>
    </section>
  );
}
