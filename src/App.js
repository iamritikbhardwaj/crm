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
  }, [isAuthenticated]);

    return (
      <div className="h-screen w-full  bg-gradient-to-b from-slate-100 to-slate-300 shadow-inner">
        {isAuthenticated ? <Header /> : <Login />}
        <Outlet />
      </div>
    );
}

export default App;
