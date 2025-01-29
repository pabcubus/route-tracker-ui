import { useEffect, useRef, useState } from "react";

const VehicleMap = ({ vehicle }) => {
  const internalRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const drawPoint = ({lat, lng, customMap}) => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    const marker = new window.google.maps.Marker({
      position: {lat, lng},
      map: customMap,
    });

    setMarkers((prev) => [marker]);
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

  return (
    <div ref={internalRef} id="map" className='map' />
  )
}

export default VehicleMap;