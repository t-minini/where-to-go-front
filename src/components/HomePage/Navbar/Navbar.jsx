import { useContext } from "react";
import { Link } from "react-scroll";
import style from "./Navbar.module.css";
import { LoginModal } from "../LoginModal/LoginModal";
import Logo from "./../../assets/images/logo.png";
import { AuthContext } from "../../../contexts/authContext";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

export function Navbar() {
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
    <section className={style.navbarContainer}>
      <NavLink to="/">
        <img src={Logo} alt="logo" className={style.logoImg} />
      </NavLink>
      <div className={style.navbarContent}>
        <NavLink to="/store" className={style.navbarText}>
          Store
        </NavLink>
        {location.pathname === "/" && (
          <Link
            className={style.navbarText}
            to="howWorks"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            About
          </Link>
        )}

        {location.pathname === "/" && (
          <Link
            className={style.navbarText}
            to="places"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Places
          </Link>
        )}

        {location.pathname === "/" && (
          <Link
            className={style.navbarText}
            to="contact"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            Contact
          </Link>
        )}

        {loggedInUser ? (
          <div className={style.text}>
            {loggedInUser.user.role === "ADMIN" ? (
              <NavLink to="/admin" className={style.navbarText}>
                Profile
              </NavLink>
            ) : (
              <NavLink to="/user" className={style.navbarText}>
                Profile
              </NavLink>
            )}
          </div>
        ) : null}

        {loggedInUser ? (
          <p
            onClick={() => {
              logOut();
            }}
            className={style.logOutText}
          >
            Log out
          </p>
        ) : (
          <LoginModal />
        )}
      </div>
    </section>
  );
}
