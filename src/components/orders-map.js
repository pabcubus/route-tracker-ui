import { useEffect, useRef, useState } from 'react';
import '../styles/orders-map.scss';

const OrdersMap = ({points}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) {
      const innerMap = new window.google.maps.Map(mapRef.current, {
        center: points[0],
        zoom: 15,
      });
  
      setMap(() => innerMap);
    }
  }, [map, points]);

  useEffect(() => {
    const setPoint = ({lat, lng}) => {
      new window.google.maps.Marker({
        position: {lat, lng},
        map: map,
      })
    };

    if (points.length > 0 && map) {
      setPoint(points[0]);
    }
  }, [map, points]);

  return (
    <div ref={mapRef} id="map" className='map-wrapper' />
  );
};

export default OrdersMap;