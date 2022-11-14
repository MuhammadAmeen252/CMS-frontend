import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";
import Layout from "../layout/component";
import Login from "../login/component";
import Signup from "../signup/component";
import Header from "../header/component";

function App() {
  const PrivateRoute = ({ children }) => {
    const authed = true;
    return authed ? children : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <div className="App">
        {/* HEADER HERE */}
        <Header />
        {/* ROUTES HERE */}
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
