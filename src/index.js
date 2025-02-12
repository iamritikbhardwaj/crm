import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './components/redux/store.js';  // Import the Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} >
      <App />
    </RouterProvider>
    </Provider>
</React.StrictMode>
);
