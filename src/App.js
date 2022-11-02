import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { AuthContextComponent } from "./contexts/authContext";
import { HomeUser } from "./pages/HomeUser/index";
import { ErrorPage } from "./pages/ErrorPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StorePage } from "./pages/StorePage/StorePage";
import { EditTrip } from "./components/HomeAdmin/EditTrip";
import { ProtectedRouteAdmin } from "./components/ProtectedRouteAdmin";
import { HomeAdmin } from "./pages/HomeAdmin";
import { Navbar } from "./components/HomePage/Navbar/Navbar";
import { Contact } from "./components/HomePage/Contact/Contact";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
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
      <Contact />
    </>
  );
}

export default App;
