import { useContext } from 'react';
import { createContext, useState } from 'react';

import vehiclesJSON from "../sample-data/vehicles.json";

const DataContext = createContext({
  vehicles: [],
  setVehicles: () => {},
  deliveries: [],
  setDeliveries: () => {}
});

export const DataProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(vehiclesJSON);
  const [deliveries, setDeliveries] = useState([]);

  return (
    <DataContext.Provider value={{ vehicles, setVehicles, deliveries, setDeliveries }}>
      {children}
    </DataContext.Provider>
  );
}

export const useVehicles = (newVehicles) => {
  const { setVehicles, vehicles } = useContext(DataContext);
  return { setVehicles, vehicles };
}

export const useDeliveries = (newDeliveries) => {
  const { setDeliveries, deliveries } = useContext(DataContext);
  return { setDeliveries, deliveries };
}