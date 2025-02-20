
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsApp } from "../../../firebaseUtils";
import "./Whatsapp.css";

const Whatsapp = () => {
  const [whatsappLink, setWhatsappLink] = useState("");

  useEffect(() => {
    const fetchWhatsAppLink = async () => {
      const link = await getWhatsApp();
      if (link) {
        setWhatsappLink(link);
      }
    };

    fetchWhatsAppLink();
  }, []);

  return (
    whatsappLink && (
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-boton"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    )
  );
};

export default Whatsapp;
