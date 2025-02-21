import { useState, useEffect } from "react";
import { getImagenHeader } from "../../../firebaseUtils";
import "./Header.css";

const Header = () => {
    const [imagenFondo, setImagenFondo] = useState("");

    useEffect(() => {
    const cargarImagen = async () => {
        const url = await getImagenHeader();
        if (url) setImagenFondo(url);
    };

    cargarImagen();
    }, []);

    return (
    <div className="header">
        <div
        className="imagen-header"
        style={{
            backgroundImage: `url(${imagenFondo})`,
        }}
        ></div>
        <div className="texto-header">
        <h1 className="titulo">Pablo Iván Bárcena</h1>
        <h2 className="subtitulo">
            <span>CV online - Desarrollo frontend</span>
        </h2>
        </div>
    </div>
    );
};

export default Header;
