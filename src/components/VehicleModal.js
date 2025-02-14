import { useEffect } from "react";
import { useState } from "react";
import { Button, InputGroup, Modal, Form } from "react-bootstrap";
import { useVehicles } from "../context/DataContext";

const VehicleModal = ({ show, setShow, vehicleId }) => {
  const [vehicle, setVehicle] = useState(null);
  const { vehicles } = useVehicles();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVehicle(vehicles.find((vehicle) => vehicle.id === vehicleId));
    }, 500);

    return () => clearTimeout(timeout);
  }, [vehicleId])

  useEffect(() => {
    if (!show) {
      setVehicle(null);
    }
  }, [show])

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!vehicle && (<>Loading...</>)}
          {vehicle && (<>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="input-id">Id</InputGroup.Text>
              <Form.Control
                value={vehicle.id}
                aria-label="Small"
                aria-describedby="input-id"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="input-requestsActive">Pedidos Activos</InputGroup.Text>
              <Form.Control
                value={vehicle.requestsActive}
                aria-label="Small"
                aria-describedby="input-requestsActive"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="input-requestsTotal">Pedidos Totales</InputGroup.Text>
              <Form.Control
                value={vehicle.requestsTotal}
                aria-label="Small"
                aria-describedby="input-requestsTotal"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="input-status">Estado</InputGroup.Text>
              <Form.Control
                value={vehicle.status}
                aria-label="Small"
                aria-describedby="input-status"
              />
            </InputGroup>
          </>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VehicleModal;