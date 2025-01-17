import "../Aside/Aside.css"
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { LuBook } from "react-icons/lu";
import { GoFile } from "react-icons/go";
import { useEffect, useState } from "react";
import { getDataContactos } from "../../../firebaseUtils"; 
import { getImagenPerfil } from "../../../firebaseUtils";

const Aside = ({ scrolltoSection, refs, activeSection }) => {

    const [linksContacto, setLinksContacto] = useState([]);
    const [imagenPerfil, setImagenPerfil] = useState(null);

    useEffect(() => {
      const fetchLinksContacto = async () => {
        const data = await getDataContactos();
        setLinksContacto(data)
      }
        fetchLinksContacto();
    }, []);

      useEffect(() => {
        const fetchimagenPerfil = async () => {
          const data = await getImagenPerfil();
          setImagenPerfil(data);
        };
    
        fetchimagenPerfil();
      }, []);


    return (
        <aside>
            <section className="contenedor-imagen">
        {imagenPerfil ? (
          <img
            className="imagen"
            src={imagenPerfil.src}
            alt={imagenPerfil.alt}
          />
        ) : (
          <p>cargando imagen...</p>
        )}
      </section>
            <section>
            <ul className="contacto">
          {linksContacto.map((link, index) => (
            <li key={index} className="iconos">
              <a href={link.enlace} target="_blank" rel="noopener noreferrer">
                {link.tipo === "LinkedIn" && <FaLinkedinIn />}
                {link.tipo === "GitHub" && <FiGithub />}
                {link.tipo === "Mail" && <MdMailOutline />}
              </a>
            </li>
          ))}
        </ul>
            </section>
            <section className="nav">
                <ul>
                    <li  className={activeSection === "inicio" ? "active" : ""}
                        onClick={() => scrolltoSection(refs.inicioRef)}><AiOutlineHome/> Inicio</li>
                    <li className={activeSection === "formacion" ? "active" : ""}
                        onClick={() => scrolltoSection(refs.formacionRef)}><LuBook /> Formacion</li>
                    <li className={activeSection === "experiencia" ? "active" : ""}
                        onClick={() => scrolltoSection(refs.experienciaRef)}><GoFile /> Experiencia</li>
                </ul>
            </section>
        </aside>
    )
}

export default Aside;
