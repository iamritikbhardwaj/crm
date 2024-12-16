import './output.css';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';

function App() {

  const { user, setUser } = useState(["true"]);
  console.log(user,'user');

  return (
    <>
    {user ? <Login /> : <Header />}
    <Outlet />
    </>
  );
}

export default App;
