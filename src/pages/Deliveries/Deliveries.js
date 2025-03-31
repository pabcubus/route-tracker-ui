import { useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { useOrders } from "../../context/DataContext";
import VehicleModal from "../../components/VehicleModal";
import { faCheck, faHourglassHalf, faPersonBiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Deliveries = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { orders, setOrders } = useOrders();

  const handleVehicleClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setShowModal(true);
  };

  const updateOrders = (order) => {
    const updatedOrders = orders.map((v) => {
      if (v.id === order.id) {
        return order;
      }
      return v;
    });

    setOrders(updatedOrders);
  }

  const drawStatus = (order) => {
    const statusOptions = [{
      status: 'reparto',
      icon: faPersonBiking,
      bg: 'primary'
    }, {
      status: 'pendiente',
      icon: faHourglassHalf,
      bg: 'warning'
    }, {
      status: 'terminada',
      icon: faCheck,
      bg: 'success'
    }];

    const status = statusOptions.find(s => s.status === order.status)

    return (
      <h4>
        <Badge pill bg={status.bg} className="vehicles__table__status">
          <span>{order.status}</span>         
          <FontAwesomeIcon icon={status.icon} size="md" />
        </Badge>
      </h4>
    )
  }

  return (
    <section className="vehicles content__panel">
      <h1>Ordenes</h1>
      <div>
        <Table bordered hover className="table-wrapper__table vehicles__table">
          <thead>
            <tr>
              <th>Peso</th>
              <th>Destino</th>
              <th>Peso</th>
              <th>Estado</th>
              <th>Estado 2</th>
              <th>Vehiculo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.weight}</td>
                <td>{order.finishAddress}</td>
                <td>{order.weight}</td>
                <td>{order.status}</td>
                <td>
                  {drawStatus(order)}
                </td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleVehicleClick(order.vehicleId)}>
                      {order.vehicleId}
                  </Button>
                </td>
                <td>
                  {order.status === 'reparto' && (
                    <Button
                      onClick={() => updateOrders({...order, status : "terminada"})}
                      variant="success"
                      size="md"
                      className="table-wrapper__table__actions-action">
                      <FontAwesomeIcon icon={faCheck} size="md" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <VehicleModal
        show={showModal}
        setShow={setShowModal}
        vehicleId={selectedVehicleId}
      />
    </section>
  )
};

export default Deliveries;