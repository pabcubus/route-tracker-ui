import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './layouts/Layout';
import Vehicles from './pages/Vehicles/Vehicles';
import Deliveries from './pages/Deliveries/Deliveries';
import './styles/_index.scss';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DataProvider } from './context/DataContext';

const router = createBrowserRouter([
  {
    path: "/",
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
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
