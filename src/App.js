import './output.css';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import axios from 'axios';

function App() {

  const { user, setUser } = useState(["true"]);
  console.log(user,'user');

  let serverMessage  = [];

  useEffect(() => {
    axios.get('localhost:5001/api')
    .then((res) => {
      console.log(res.data.message);
      serverMessage = res.data.message;
    })
    .catch((err) => {
      console.log(err);
    })
  },[]);

  console.log(serverMessage,'serverMessage');

  return (
    <>
    {user ? <Login /> : <Header />}
    <Outlet />
    </>
  );
}

export default App;
