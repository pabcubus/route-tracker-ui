import '../styles/deliveries-table.scss';

function DeliveriesTable({ rows }) {
  if (typeof rows !== 'object' || !rows.length) {
    return null;
  }

  return (
    <table className="Deliveries-table">
      <tr>
        <th>Color</th>
        <th>ID Vehiculo</th>
        <th>Dirección Salida</th>
        <th>Dirección Llegada</th>
        <th>Peso</th>
      </tr>
      {rows.map(row => (
        <tr>
          <td style={{backgroundColor: row.color}}></td>
          <td>{row.vehicleId}</td>
          <td>{row.startAddress}</td>
          <td>{row.finishAddress}</td>
          <td>{row.weight}</td>
        </tr>
      ))}
    </table>
  );
}

export default DeliveriesTable;