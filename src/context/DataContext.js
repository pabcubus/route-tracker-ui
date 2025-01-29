import { useContext, useEffect, createContext, useState } from 'react';

import vehiclesJSON from "../sample-data/vehicles.json";
import ordersJSON from "../sample-data/orders.json";
import addressesJSON from "../sample-data/addresses.json";
import axios from 'axios';

const DataContext = createContext({
  vehicles: [],
  setVehicles: () => {},
  orders: [],
  setOrders: () => {}
});

const fetchOrders = async (finishAddress, vehicles, vehiclesOrders) => {
  const payload = {
    order: {
      startAddress: "Cra. 55 #99 - 51, Riomar, Barranquilla, Atlántico",
      finishAddress,
      weight: 2
    },
    vehicles,
    vehiclesOrders
  };

  console.log('order: ', JSON.stringify(payload));

  const res = await axios
    .post(
      'https://tracking-api-6yoqe.ondigitalocean.app/request/2',
      payload,
      {
        withCredentials: false,
        accesscontrolalloworigin: "*",
        accesscontrolallowMethods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      }
    );

  const choosenVehicle = res?.data?.vehicles[0] || null;
  const order = res?.data?.order || null;

  return { choosenVehicle, order };
}

export const DataProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(vehiclesJSON);
  const [orders, setOrders] = useState(ordersJSON);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(async () => {
      if (index >= addressesJSON.length) {
        clearInterval(myInterval);
        return;
      }

      setVehicles(
        (prev) => prev.map(
          (vehicle) => ({
            ...vehicle,
            requestsActive: orders.filter((order) => order.vehicleId === vehicle.id).length || 0,
            requestsTotal: orders.filter((order) => order.vehicleId === vehicle.id).length || 0,
          })
        )
      );

      const delAddress = addressesJSON[index];
      const res = await fetchOrders(delAddress, vehicles, orders)
      const { choosenVehicle, order } = res;
    

      const newOrder = {
        order: orders.length + 1,
        weight: order.weight,
        status: "pendiente",
        startAddress: order.startAddress,
        finishAddress: order.finishAddress,
        startCoords: order.startResolvedCoords,
        finishCoords: order.finishResolvedCoords,
        vehicleId: choosenVehicle.id
      }

      setOrders((prev) => {
        return [...prev, newOrder];
      });

      setIndex((index) => index + 1);
    }, 3000);

    return () => clearInterval(myInterval);
  }, [orders]);

  return (
    <DataContext.Provider value={{ vehicles, setVehicles, orders, setOrders }}>
      {children}
    </DataContext.Provider>
  );
}

export const useVehicles = () => {
  const { setVehicles, vehicles } = useContext(DataContext);
  return { setVehicles, vehicles };
}

export const useOrders = () => {
  const { setOrders, orders } = useContext(DataContext);
  return { setOrders, orders };
}