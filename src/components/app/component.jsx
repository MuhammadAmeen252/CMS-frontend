import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../layout/component";
import Login from "../login/component";
import Signup from "../signup/component";
import Header from "../header/component";
import MySnackbar from "../common/snackbar/component";
import { useSelector } from "react-redux";
import Footer from "../footer/component";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const PrivateRoute = ({ children }) => {
    const authed = currentUser;
    return authed ? children : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <div className="App">
        {/* Snackbar for notifications */}
        <MySnackbar />
        {/* HEADER HERE */}
        <Header/>
        {/* ROUTES HERE */}
        <Routes>
          <Route
            path="/login"
            exact
            element={<Login/>}
          />
          <Route
            path="/signup"
            exact
            element={<Signup/>}
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Layout/>
              </PrivateRoute>
            }
          />
        </Routes>
        {/* FOOTER HERE */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
