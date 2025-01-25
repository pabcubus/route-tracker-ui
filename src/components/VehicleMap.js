import { useEffect, useImperativeHandle, useRef, useState } from "react";

const VehicleMap = ({ vehicle }) => {
  const internalRef = useRef(null);
  const [map, setMap] = useState(null);

  const drawPoint = ({lat, lng, customMap}) => {
    new window.google.maps.Marker({
      position: {lat, lng},
      map: customMap,
    })
  };

  useEffect(() => {
    let innerMap;
    const point = {
      lat: vehicle.location.lat,
      lng: vehicle.location.long
    };

    if (!map) {
      innerMap = new window.google.maps.Map(internalRef?.current, {
        center: { lat: -25.363, lng: 131.044 },
        zoom: 15,
        mapTypeId: "roadmap",
      });
  
      setMap(() => innerMap);      
    }

    if (vehicle) {
      drawPoint({
        ...point,
        customMap: map ? map : innerMap
      });

      if (map) {
        map.setCenter(point);
      } else {
        innerMap.setCenter(point);
      }
    }
  }, [vehicle]);

  /*
  useEffect(() => {
    if (!map) {
      const innerMap = new window.google.maps.Map(internalRef?.current, {
        center: { lat: -25.363, lng: 131.044 },
        zoom: 15,
        mapTypeId: "roadmap",
      });
  
      setMap(() => innerMap);      
    }
  }, []);
  */

  return (
    <div ref={internalRef} id="map" className='map' />
  )
}

export default VehicleMap;