import "./output.css";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import { useEffect } from "react";

function App() {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

    return (
      <>
        {isAuthenticated ? <Header /> : <Login />}
        <Outlet />
      </>
    );
}

export default App;
