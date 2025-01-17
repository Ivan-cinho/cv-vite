import './App.css'
import { useRef, useState, useEffect } from 'react'
import Aside from './Componentes/Aside/Aside'
import Header from './Componentes/Header/Header'
import Inicio from './Componentes/Inicio/Inicio'
import Formacion from './Componentes/Formacion/Formacion'
import Experiencia from './Componentes/Experiencia/Experiencia'
import Whatsapp from './Componentes/Whatsapp/Whatsapp'



function App() { 

  const [activeSection, setActiveSection] = useState("inicio")

  const inicioRef = useRef(null);
  const formacionRef = useRef(null);
  const experienciaRef = useRef(null);

  const scrolltoSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "inicio", ref: inicioRef },
        { id: "formacion", ref: formacionRef },
        { id: "experiencia", ref: experienciaRef },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2; 
      const currentSection = sections.find(
        (section) =>
          section.ref.current.offsetTop <= scrollPosition &&
          section.ref.current.offsetTop + section.ref.current.offsetHeight > scrollPosition
      );

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <>
      <Header/>
      <Aside
        scrolltoSection={scrolltoSection}
        refs={{ inicioRef, formacionRef, experienciaRef }}
        activeSection={activeSection}
        />
      <div className='contenedor-principal'>
        <section ref={inicioRef}>
          <Inicio/>
        </section>
        <section ref={formacionRef} className='contraste'>
          <Formacion/>
        </section>
        <section ref={experienciaRef}>
          <Experiencia/>          
        </section>
      </div>
      <Whatsapp/>
    </>
  )
}

export default App