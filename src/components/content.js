import { useInputEvent } from "../hooks/useInputEvent";
import '../styles/content.scss';

export const Content = ({
  setEntregasData,
  setDomicilariosData,
  handleProcessFiles
}) => {
  const entregasRef = useInputEvent("change", () => {
    if (entregasRef.current?.files.length === 1) {
      const file = entregasRef.current?.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const data = lines.map(line => {
          const [ weight, startAddress, finishAddress ] = line.split(',');

          return {
            weight: parseInt(weight),
            startAddress,
            finishAddress
          };
        });

        setEntregasData(() => data);
      };
      reader.readAsText(file);
      }
  });

  const domicilariosRef = useInputEvent("change", () => {
    if (domicilariosRef.current?.files.length === 1) {
      const file = domicilariosRef.current?.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const data = lines.map(line => {
          const [ id, maxWeight, lat, long, requestsActive, requestsTotal ] = line.split(',');

          return {
            id,
            maxWeight: parseInt(maxWeight),
            location: { lat: parseFloat(lat), long: parseFloat(long) },
            lat: parseFloat(lat),
            long: parseFloat(long),
            requestsActive: parseInt(requestsActive),
            requestsTotal: parseInt(requestsTotal)
          };
        });

        setDomicilariosData(() => data);
      };
      reader.readAsText(file);
      }
  });

  return (
    <section className="content">
      <form className="content-form" onSubmit={handleProcessFiles}>
        <div className="content-form-wrapper">
          <label htmlFor="entregasFile">Archivo de entregas: </label>
          <input ref={entregasRef} type="file" id="entregasFile" required title="Need this"/>
        </div>
        <div className="content-form-wrapper">
          <label htmlFor="domicilariosFile">Archivo de domicilarios: </label>
          <input ref={domicilariosRef} type="file" id="domicilariosFile" required title="Need this"/>
        </div>
        <button type="submit" className="btn-submit">Search</button>
      </form>
    </section>
  );
};