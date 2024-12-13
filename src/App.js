import './output.css';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';

function App() {

  const { user, setUser } = useState(true);

  return (
    <>
    {/* {user ? <Header /> : <Login />} */}
    <Header />
    <Outlet />
    </>
  );
}

export default App;
