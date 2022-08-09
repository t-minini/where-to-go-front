import style from "./style.module.css";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { Link } from "react-scroll";
import Logo from "./../../assets/images/logo.png"
import { SignUpModal } from "../signupModal";
import { LoginModal } from "../loginModal";

export function NavBar() {
  const { loggedInUser } = useContext(AuthContext);
  const redirectAfterLogOut = useNavigate();
  const location = useLocation();
  console.log(location);
  console.log(window.location);

  function logOut() {
    localStorage.removeItem("loggedInUser");
    console.log(localStorage);
    redirectAfterLogOut("/");
    window.location.reload();
  }

  return (
    <div className={style.navComp}>
      <div className={style.textUser}>
        {loggedInUser ? <p>{`Hello, ${loggedInUser.user.name}`}</p> : null}
      </div>
      <div className={style.navRight}>
        <NavLink
          to="/store"
          style={{
            ":hover": {
              color: "black",
            },
          }}
          className={`${style.text} ${style.textStore}`}
        >
          Store
        </NavLink>
        <div>
          {location.pathname === "/" && (
            <Link
              className={`${style.text} ${style.textContact}`}
              to="contact"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              Contact Us
            </Link>
          )}
        </div>
        <div>{loggedInUser ? null : <SignUpModal />}</div>
      </div>
      <div className={style.img}>
        <NavLink to="/">
        <img src={Logo} alt="logo" />
        </NavLink>
      </div>
      <div className={style.navLeft}>
        <div className={style.profileBtn}>
          {loggedInUser ? (
            <div className={style.text}>
              {loggedInUser.user.role === "ADMIN" ? (
                <NavLink
                  to="/admin"
                  className={`${style.text} ${style.textProfile}`}
                >
                  Profile
                </NavLink>
              ) : (
                <NavLink
                  to="/user"
                  className={`${style.text} ${style.textProfile}`}
                >
                  Profile
                </NavLink>
              )}
            </div>
          ) : null}
        </div>
        <div className={style.textOff}>
          {loggedInUser ? (
            <p
              onClick={() => {
                logOut();
              }}
            >
              Log out
            </p>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </div>
  );
}
