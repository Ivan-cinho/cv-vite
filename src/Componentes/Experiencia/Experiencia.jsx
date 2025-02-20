
import { useState, useEffect } from "react";
import { getDataEmpleadores, getDataReferencias } from "../../../firebaseUtils";
import { SlArrowDown } from "react-icons/sl";
import { FaLinkedinIn } from "react-icons/fa6";

const Experiencia = () => {
  const [activeSections, setActiveSections] = useState([]);
  const [empleadores, setEmpleadores] = useState([]);
  const [referencias, setReferencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const empleadoresData = await getDataEmpleadores();
      const referenciasData = await getDataReferencias();

      setEmpleadores(empleadoresData);
      setReferencias(referenciasData);
    };
    fetchData();
  }, []);

  const toggleSection = (sectionType, index) => {
    const sectionId = `${sectionType}-${index}`;
    setActiveSections((prevSections) => {
      if (prevSections.includes(sectionId)) {
        return prevSections.filter((section) => section !== sectionId);
      } else {
        return [...prevSections, sectionId];
      }
    });
  };

  return (
    <div className="experiencia contenedor-componentes">
      <section className="contenedor-acordeon">
        <h3>Empleadores</h3>
        {empleadores.map((empleador, index) => (
          <div key={index} className="acordeon-section">
            <h4 onClick={() => toggleSection("empleador", index)}>
              {empleador.nombre}
              <SlArrowDown
                className={`chevron ${
                  activeSections.includes(`empleador-${index}`) ? "rotado" : ""
                }`}
              />
            </h4>
            <div
              className={`contenido ${
                activeSections.includes(`empleador-${index}`) ? "expandido" : ""
              }`}
            >
              <h4>{empleador.titulo}</h4>
              <p>{empleador.descripcion}</p>
            </div>
          </div>
        ))}
      </section>

        <h3>Referencias</h3>
      <div className="referencias">
        {referencias.map((ref, index) => (
          <div key={index} className="card">
            <h4>{ref.nombre}</h4>
            {ref.telefono && (
              <p>
                {ref.telefono}
              </p>
            )}
            {ref.email && (
              <p>
                {ref.email}
              </p>
            )}
            {ref.linkedin && (
              <p>
                <a href={ref.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiencia;
