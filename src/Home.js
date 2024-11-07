import { useState } from 'react';
import './Home.scss';
import { Content } from './components/content';
import { Header } from './components/header';
import OrdersMap from './components/orders-map';
import { Wrapper } from '@googlemaps/react-wrapper';

function Home() {
  const [, setEntregasData] = useState([]);
  const [, setDomicilariosData] = useState([]);
  const points = [{ lat: 11.002240360966676, lng: -74.82451858292323 }]
  const handleProcessFiles = (event) => {
    console.log('Submitted!');
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
            <OrdersMap points={points}/>
          </Wrapper>
        </div>
      </div>
    </div>
  );
}

export default Home;
