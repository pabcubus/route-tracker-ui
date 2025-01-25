import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useVehicles } from "../../context/DataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "@googlemaps/react-wrapper";
import VehicleMap from "../../components/VehicleMap";

const Vehicles = () => {
  const { vehicles } = useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <section className="vehicles content__panel">
      <h1 className="content__panel__title">Vehículos</h1>
      <div className="vehicles__wrapper">
        <div className="table-wrapper">
          <Table bordered hover className="table-wrapper__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Peso Maximo</th>
                <th>Lat</th>
                <th>Long</th>
                <th>Pedidos Activos</th>
                <th>Pedidos Totales</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} onClick={() => setSelectedVehicle(vehicle)}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.maxWeight}</td>
                  <td>{vehicle.location.lat}</td>
                  <td>{vehicle.location.long}</td>
                  <td>{vehicle.requestsActive}</td>
                  <td>{vehicle.requestsTotal}</td>
                  <td>{vehicle.status}</td>
                  <td className="table-wrapper__table__actions">
                    {vehicle.status === "disponible" && (
                      <Button variant="primary" size="sm" className="table-wrapper__table__actions-action">
                        <FontAwesomeIcon icon={faPersonRunning} />
                      </Button>
                    )}
                    {vehicle.status === "reparto" && (
                      <Button variant="primary" size="sm" className="table-wrapper__table__actions-action">
                        <FontAwesomeIcon icon={faExclamation} />
                      </Button>
                    )}           
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary">Primary</Button>
        </div>
        {selectedVehicle && (
          <div className="vehicles-info">
            <Wrapper
              apiKey={'AIzaSyAeF3dscb3ebKujFn2M-k83zd_ruESnM2k'}>
              <VehicleMap vehicle={selectedVehicle} />
            </Wrapper>
          </div>
        )}
      </div>
    </section>
  );
}

export default Vehicles;
