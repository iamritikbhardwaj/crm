import "./output.css";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const selector = useSelector((state) => state.auth || {});
  const user = selector.user;
  console.log(user, "user");

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
