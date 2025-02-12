import './output.css';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './components/redux/store';

function App() {

  return (
   <>
        <Header />
      <Outlet />
   </>
  );
}

export default App;