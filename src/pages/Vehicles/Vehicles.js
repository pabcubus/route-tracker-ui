import { Button, Table } from "react-bootstrap";
import { useVehicles } from "../../context/DataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";

import "./Vehicles.scss";

const Vehicles = () => {
  const { vehicles } = useVehicles();

  return (
    <section className="home">
      <div className="table-wrapper">
        <Table striped bordered hover className="table-wrapper__table">
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
                  <Button variant="primary" size="sm">
                    <FontAwesomeIcon icon={faPersonRunning} />
                  </Button> 
                  <Button variant="primary" size="sm">
                    <FontAwesomeIcon icon={faPersonRunning} />
                  </Button>                
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Primary</Button>
      </div>
      <div className="delivery-info"></div>
    </section>
  );
}

export default Vehicles;
