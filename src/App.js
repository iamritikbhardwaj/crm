import "./output.css";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";

function App() {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;

    return (
      <>
        {isAuthenticated ? <Header /> : <Login />}
        <Outlet />
      </>
    );
}

export default App;
