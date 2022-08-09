import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { NavBar } from "../../components/HomePage/navBar";
import { ViewOrders } from "../../components/HomeUser/ViewOrders";
import { EditUser } from "../../components/HomeUser/EditUser";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ContactUs } from "../../components/HomePage/contactUs";
import style from "./style.module.css";
import { api } from "../../api/api";

export function HomeUser() {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  console.log(loggedInUser);
  const [user, setUser] = useState({
    name: "",
    email: "",
    proImg: "",
  });

  const [update, setUpdate] = useState(false);

  console.log(user);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [update]);

  async function deleteTrip() {
    await api.delete(`/user/disable-user`);
    navigate("/");
  }

  return (
    <>
      <div>
        <NavBar className={style.userNav} />
        <div className={style.h1Container}>
          <h1>User Details</h1>
        </div>
        <div className={style.userContainer}>
          <div className={style.userCardTextContainer}>
            <h2>Name</h2>
            <p>{user.name}</p>
            <h2 className={style.emailH2}>E-mail</h2>
            <p className={style.emailP}>{user.email}</p>
          </div>
          <div className={style.btns}>
              {<EditUser update={update} setUpdate={setUpdate} />}
              <Button onClick={deleteTrip} shape="round" size="default" type="danger">
                Delete Account
              </Button>
            </div>
          <div className={style.imgDiv}>
            <div>
              <img
                className={style.userImg}
                src={user.proImg}
                alt={user.name}
              />
            </div>
          </div>
        </div>
        <ViewOrders />
      </div>
      <ContactUs />
    </>
  );
}
