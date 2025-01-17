
import { useEffect, useState } from "react";
import { getCartaPresentacion, getDataInicio } from "../../../firebaseUtils";
import "./Inicio.css";

const Inicio = () => {
  const [data, setData] = useState({ cartaPresentacion: "", portafolios: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la carta de presentación
        const carta = await getCartaPresentacion();

        // Obtener los portafolios
        const portafolios = await getDataInicio();

        // Actualizar el estado
        setData({ cartaPresentacion: carta, portafolios });
      } catch (error) {
        console.error("Error al cargar los datos de inicio:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="Inicio contenedor-secundario">
      <div className="contenedor-subseccion">
        <h3>Sobre mi</h3>
        <div className="Carta">
          <p>{data.cartaPresentacion}</p>
        </div>
      </div>

      <div className="contenedor-subseccion">
        <h3>Portafolios</h3>
        <div className="Portafolios contTarjetas">
          {data.portafolios.map((portfolio, index) => (
            <div key={index} className="card">
              <h4>{portfolio.titulo}</h4>
              <p>{portfolio.descripcion}</p>
              {portfolio.enlace && portfolio.imagen ? (
                <a href={portfolio.enlace} target="_blank" rel="noopener noreferrer">
                  <img src={portfolio.imagen} alt={portfolio.titulo} className="card-image" />
                </a>
              ) : (
                portfolio.imagen && <img src={portfolio.imagen} alt={portfolio.titulo} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inicio;
