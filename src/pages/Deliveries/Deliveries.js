import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useOrders } from "../../context/DataContext";

const Deliveries = () => {
  const { orders, setOrders } = useOrders();

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
                <td>finish address</td>
                <td>{order.vehicleId}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </section>
  )
};

export default Deliveries;