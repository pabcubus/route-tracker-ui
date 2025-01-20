import { useRef, useState } from 'react';
import axios from 'axios';

import './Home.scss';

import { Content } from '../../components/content';
import { Header } from '../../components/header';
import OrdersMap from '../../components/orders-map';
import { Wrapper } from '@googlemaps/react-wrapper';
import { getRandomHexColor } from '../../helpers/colors';
import DeliveriesTable from '../../components/deliveries-table';

function Home() {
  const [entregasData, setEntregasData] = useState([]);
  const [domicilariosData, setDomicilariosData] = useState([]);
  const [resultadoFinal, setResultadoFinal] = useState([]);
  const mapRef = useRef()
  
  const handleProcessFiles = (event) => {
    let vehicles = domicilariosData;
    let orders = entregasData;

    console.log('vehicles', vehicles);
    console.log('orders', orders);

    let index = 0;
    const interval = setInterval(async () => {
      try {
        const res = await axios
          .post(
            'https://tracking-api-6yoqe.ondigitalocean.app/request/2',
            {
              order: orders[index],
              vehicles
            },
            {
              withCredentials: false,
              accesscontrolalloworigin: "*",
              accesscontrolallowMethods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            }
          );
        const choosenVehicle = res?.data?.vehicles[0] || null;
        const order = res?.data?.order || null;
        vehicles = vehicles.filter(vehicle => vehicle.id !== choosenVehicle.id);

        index++;
        const fillColor = getRandomHexColor();
        mapRef.current?.drawPoints([{
          lat: choosenVehicle.location.lat,
          lng: choosenVehicle.location.long,
          fillColor,
          path: 'bike'
        }, {
          lat: order.startCoords.lat,
          lng: order.startCoords.long,
          fillColor,
          path: 'start'
        }, {
          lat: order.finishCoords.lat,
          lng: order.finishCoords.long,
          fillColor,
          path: 'finish'
        }]);

        setResultadoFinal((r) => [...r, {
          color: fillColor,
          weight: order.weight,
          startAddress: order.startAddress,
          finishAddress: order.finishAddress,
          vehicleId: choosenVehicle.id,
        }])
      } catch (error) {
        console.log('error', error);
      }

      if (index >= orders.length) {
        clearInterval(interval);
      }
    }, 2000);

    event.preventDefault();
  };

  return (
    <div className="Home">      
      <Header />
      <div className="Home-data">
        <div className="Home-data-load">
          <Content
            setEntregasData={setEntregasData}
            setDomicilariosData={setDomicilariosData}
            handleProcessFiles={handleProcessFiles}
          />
        </div>
        <div className="Home-data-map">
          <Wrapper
            apiKey={'AIzaSyAeF3dscb3ebKujFn2M-k83zd_ruESnM2k'}>
            <OrdersMap ref={mapRef}/>
          </Wrapper>
        </div>
      </div>
      <DeliveriesTable rows={resultadoFinal} />
    </div>
  );
}

export default Home;
