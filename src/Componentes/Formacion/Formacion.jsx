
import { useState, useEffect } from "react";
import { getDataSecundariaSuperior, getDataTecnicaturaCursos, getTitulos } from "../../../firebaseUtils";
import Swal from "sweetalert2";
import { SlArrowDown } from "react-icons/sl";
import "./Formacion.css";

const Formacion = () => {
    const [activeSections, setActiveSections] = useState([]); // Estado para secciones activas
    const [secundariaSuperior, setSecundariaSuperior] = useState([]); // Datos de secundaria y superior
    const [tecnicaturaCursos, setTecnicaturaCursos] = useState([]); // Datos de cursos y tecnicaturas
    const [titulos, setTitulos] = useState([]); // Datos de títulos y certificaciones

    useEffect(() => {
        const fetchData = async () => {
            try {
                const secundariaData = await getDataSecundariaSuperior();
                const tecnicaturaData = await getDataTecnicaturaCursos();
                const titulosData = await getTitulos();

                setSecundariaSuperior(secundariaData);
                setTecnicaturaCursos(tecnicaturaData);
                setTitulos(titulosData);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        fetchData();
    }, []);

    const toggleSection = (sectionType, index) => {
        const sectionId = `${sectionType}-${index}`; // Crear un identificador único para cada sección
        setActiveSections(prevSections => {
            if (prevSections.includes(sectionId)) {
                return prevSections.filter(section => section !== sectionId);
            } else {
                return [...prevSections, sectionId];
            }
        });
    };

    const handleImageClick = (imageUrl, title) => {
        Swal.fire({
            title: title,
            imageUrl: imageUrl,
            imageWidth: 600,
            imageAlt: title,
            confirmButtonText: "Cerrar",
        });
    };

    return (
        <div className="contenedor-secundario">
            <section className="contenedor-subseccion">
                <h3>Educación secundaria y superior</h3>
                {secundariaSuperior.map((item, index) => (
                    <div key={item.id} className="acordeon-section acordeon-formacion">
                        <h4 onClick={() => toggleSection("sec", index)}>
                            {item.titulo}
                            <SlArrowDown className={`chevron ${activeSections.includes(`sec-${index}`) ? "rotado" : ""}`} />
                        </h4>
                        <div className={`contenido ${activeSections.includes(`sec-${index}`) ? "expandido" : ""}`}>
                            <p>{item.descripcion}</p>
                        </div>
                    </div>
                ))}
            </section>

            <section className="contenedor-subseccion">
                <h3>Tecnicaturas y cursos</h3>
                {tecnicaturaCursos.map((item, index) => (
                    <div key={item.id} className="acordeon-section acordeon-formacion">
                        <h4 onClick={() => toggleSection("tec", index)}>
                            {item.titulo}
                            <SlArrowDown className={`chevron ${activeSections.includes(`tec-${index}`) ? "rotado" : ""}`} />
                        </h4>
                        <div className={`contenido ${activeSections.includes(`tec-${index}`) ? "expandido" : ""}`}>
                            <p>{item.descripcion}</p>
                        </div>
                    </div>
                ))}
            </section>

            <section className="contenedor-subseccion">
                <h3>Títulos y certificaciones</h3>
                <div className="certificacion-card">
                    {titulos.map((cert) => (
                        <div key={cert.id} className="card">
                            <h4>{cert.titulo}</h4>
                            <img
                                src={cert.imagen}
                                alt={cert.titulo}
                                onClick={() => handleImageClick(cert.imagen, cert.titulo)}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Formacion;
