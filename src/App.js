import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/index";
import { AuthContextComponent } from "./contexts/authContext";
import { HomeUser } from "./pages/HomeUser/index";
import { ErrorPage } from "./pages/ErrorPage";
import { HomeAdmin } from "./pages/HomeAdmin/index";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Store } from "./pages/Store/index";
import { EditTrip } from "./pages/HomeAdmin/EditTrip";
import { ProtectedRouteAdmin } from "./components/ProtectedRouteAdmin";

function App() {
  return (
    <>
      <AuthContextComponent>
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
    </>
  );
}

export default App;
