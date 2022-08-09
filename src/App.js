import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/index";
import { AuthContextComponent } from "./contexts/authContext";
import { HomeUser } from "./pages/HomeUser/index";
import { ErrorPage } from "./pages/ErrorPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Store } from "./pages/Store/index";
import { EditTrip } from "./components/HomeAdmin/EditTrip";
import { ProtectedRouteAdmin } from "./components/ProtectedRouteAdmin";
import { HomeAdmin } from "./pages/HomeAdmin";
import { NavBar } from "./components/HomePage/navBar";
import { ContactUs } from "./components/HomePage/contactUs";

function App() {
  return (
    <>
      <AuthContextComponent>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<Store />} />
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/admin/trip/:id"
            element={<ProtectedRouteAdmin component={EditTrip} />}
          />
          <Route
            path="/admin"
            element={<ProtectedRouteAdmin component={HomeAdmin} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute component={HomeUser} />}
          />
        </Routes>
      </AuthContextComponent>
      <ContactUs/>
    </>
  );
}

export default App;
