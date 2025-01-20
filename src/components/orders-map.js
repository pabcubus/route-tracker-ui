import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import '../styles/orders-map.scss';

const OrdersMap = forwardRef((_, ref) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [points, ] = useState([]);

  const r = 15;

  const paths = {
    start: `M${(r/2)} 0 L${r} ${(r/2)} L${r} ${r} L0 ${r} L0 ${(r/2)} L${(r/2)} 0`,
    finish: `M0 ${r} L0 0 L${r} 0 L${r} ${(r/2)} L0 ${(r/2)}`,
    bike: ``
    //bike: `M 0 0 L${r} 0 L${(r-(r/4))} ${(r/2)} L${r} ${r} L0 ${r} L${(r/4)} ${(r/2)} L0 0`,
  }
  
  const svgMarker = {
    path: `M 0 0 L${r} 0 L${(r/2)} ${r} L0 0`,
    fillColor: "blue",
    fillOpacity: 1,
    strokeWeight: 3,
    rotation: 0,
    scale: 2
  };

  /**
   * Draw a SINGLE point in the map
  */
  const drawPoint = ({lat, lng, fillColor, path}) => {
    svgMarker.fillColor = fillColor || svgMarker.fillColor;
    svgMarker.path = paths[path] || svgMarker.path;

    new window.google.maps.Marker({
      position: {lat, lng},
      icon: svgMarker,
      map: map,
    })

  };

  /**
   * Draw MULTIPLE points in the map
  */
  const drawPoints = (points) => {
    if (map && points.length <= 0) {
      return;
    }

    map.setCenter(points[0]);

    points?.forEach(element => {
      drawPoint(element);
    });
  };

  useImperativeHandle(ref, () => ({ drawPoints }));

  useEffect(() => {
    if (!map) {
      const innerMap = new window.google.maps.Map(mapRef.current, {
        center: points[0],
        zoom: 14,
      });
  
      setMap(() => innerMap);
    }
  }, [map]);

  return (
    <div ref={mapRef} id="map" className='map-wrapper' />
  );
});

export default OrdersMap;