import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './layouts/Layout';
import Vehicles from './pages/vehicles/Vehicles';
import Deliveries from './pages/deliveries/Deliveries';
import './styles/_index.scss';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DataProvider } from './context/DataContext';
import Home from './pages/home/Home';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />,
    children: [{
      index: true,
      element: <Home />
    }]
  }, {
    element: <Layout />,
    children: [{
      path: "/vehicles",
      element: <Vehicles />
    }, {
      path: "/deliveries",
      element: <Deliveries />
    }]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataProvider>
    <RouterProvider router={router} />
  </DataProvider>
);

// On prod remember to call <React.StrictMode>