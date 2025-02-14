import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useOrders } from "../../context/DataContext";
import VehicleModal from "../../components/VehicleModal";

const Deliveries = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { orders,  } = useOrders();

  const handleVehicleClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setShowModal(true);
  };

  return (
    <section className="vehicles content__panel">
      <h1>Deliveries</h1>
      <div>
        <Table bordered hover className="table-wrapper__table">
          <thead>
            <tr>
              <th>Peso</th>
              <th>Destino</th>
              <th>Vehiculo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.weight}</td>
                <td>{order.finishAddress}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => handleVehicleClick(order.vehicleId)}>
                      {order.vehicleId}
                  </Button>
                </td>
                <td></td>
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