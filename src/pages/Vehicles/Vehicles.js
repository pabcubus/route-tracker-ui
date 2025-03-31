import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useVehicles } from "../../context/DataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPerson, faPersonRunning, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "@googlemaps/react-wrapper";
import VehicleMap from "../../components/VehicleMap";

const Vehicles = () => {
  const { setVehicles, vehicles } = useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const updateVehicle = (vehicle) => {
    const updatedVehicles = vehicles.map((v) => {
      if (v.id === vehicle.id) {
        return vehicle;
      }
      return v;
    });

    setVehicles(updatedVehicles);
  }

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
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.maxWeight}</td>
                  <td>{vehicle.location.lat}</td>
                  <td>{vehicle.location.long}</td>
                  <td>{vehicle.requestsActive}</td>
                  <td>{vehicle.requestsTotal}</td>
                  <td>{vehicle.status}</td>
                  <td className="table-wrapper__table__actions">
                    {!['reparto', 'offline'].includes(vehicle.status) && (
                      <Button
                        onClick={() => updateVehicle({...vehicle, status: 'reparto'})}
                        variant="primary"
                        size="md"
                        className="table-wrapper__table__actions-action">
                        <FontAwesomeIcon icon={faPersonRunning} size="md" />
                      </Button>
                    )}
                    {!['disponible', 'offline'].includes(vehicle.status) && (
                      <Button
                        onClick={() => updateVehicle({...vehicle, status: 'disponible'})}
                        variant="primary"
                        size="md"
                        className="table-wrapper__table__actions-action">
                        <FontAwesomeIcon icon={faPerson} size="md" />
                      </Button>
                    )}
                    <Button
                      onClick={() => setSelectedVehicle(vehicle)}
                      variant="success"
                      className="table-wrapper__table__actions-action"
                      size="md">
                      <FontAwesomeIcon icon={faLocationDot} size="md" />
                    </Button>
                    {!['offline'].includes(vehicle.status) && (
                      <Button
                        onClick={() => updateVehicle({...vehicle, status: 'offline'})}
                        variant="primary"
                        size="md"
                        className="table-wrapper__table__actions-action">
                        <FontAwesomeIcon icon={faToggleOn} size="md" />
                      </Button>
                    )}
                    {['offline'].includes(vehicle.status) && (
                      <Button
                        onClick={() => updateVehicle({...vehicle, status: 'disponible'})}
                        variant="danger"
                        size="md"
                        className="table-wrapper__table__actions-action">
                        <FontAwesomeIcon icon={faToggleOff} size="md" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
