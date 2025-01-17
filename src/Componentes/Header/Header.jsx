import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="imagen-header"></div>            
            <div className="texto-header">
                <h1 className="titulo">Pablo Iván Bárcena</h1>
                <h2 className="subtitulo">
                    <span>Desarrollo frontend</span>
                </h2>
            </div>
        </div>
    );
};

export default Header;
