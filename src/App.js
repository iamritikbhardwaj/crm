import './output.css';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import Login from './pages/Login';
import { useState, useContext, createContext } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const userContext = createContext();
  const UserProvider = userContext.Provider;

  return (
    <UserProvider value={user}>
        <Header />
      <Outlet />
    </UserProvider>
  );
}

export default App;