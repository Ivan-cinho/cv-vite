import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";


// aside.jsx
export const getImagenPerfil = async () => {
    try {
    const imageRef = ref(storage, "aside/cv1.jpg");
    const url = await getDownloadURL(imageRef);
    return {
        src: url, 
        alt: "Foto de perfil", 
    };
    } catch (error) {
    console.error("Error al obtener la imagen de Firebase Storage:", error);
    return null; 
    }
};

export const getDataContactos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacto"));
      const linksContacto = querySnapshot.docs
        .filter((doc) => doc.id !== "whatsapp") // Excluye el documento con id 'whatsapp'
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      return linksContacto;
    } catch (error) {
      console.error("Error al obtener los datos de contacto:", error);
      return [];
    }
  };


// inicio.jsx
export const getCartaPresentacion = async () => {
    try {

        const docRef = doc(db, "portafolios", "carta de presentacion");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data()["carta de presentacion"]; 
        } else {
            console.error("El documento de carta de presentación no existe.");
            return "";
        }
    } catch (error) {
        console.error("Error al obtener la carta de presentación:", error);
        return "";
    }
};

export const getDataInicio = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "portafolios"));

        const portafolios = await Promise.all(
            querySnapshot.docs
                .filter((doc) => doc.data().imagen)
                .map(async (doc) => {
                    const data = doc.data();

                    try {
                        const imageRef = ref(storage, `inicio/${data.imagen}`);
                        const imageUrl = await getDownloadURL(imageRef);

                        return {
                            ...data,
                            imagen: imageUrl,
                        };
                    } catch (error) {
                        console.error(`Error al obtener la imagen para el documento ${doc.id}:`, error);
                        return {
                            ...data,
                            imagen: null, 
                        };
                    }
                })
        );

        return portafolios;
    } catch (error) {
        console.error("Error al obtener los datos de inicio:", error);
        return [];
    }
};


// formacion.jsx
export const getDataSecundariaSuperior = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "secundaria y superior"));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error al obtener datos de secundaria y superior:", error);
        return [];
    }
};

export const getDataTecnicaturaCursos = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "tecnicaturas y cursos"));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error al obtener datos de tecnicaturas y cursos:", error);
        return [];
    }
};

export const getTitulos = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "titulos y certificaciones"));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error al obtener títulos y certificaciones:", error);
        return [];
    }
};


// referencias.js
export const getDataEmpleadores = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "empleadores"));
        return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
    } catch (error) {
        console.error("Error al obtener datos de empleadores:", error);
        return [];
    }
};


    export const getDataReferencias = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "referencias"));
        return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
    } catch (error) {
        console.error("Error al obtener datos de referencias:", error);
        return [];
    }
};

// whatsapp

export const getWhatsApp = async () => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "contacto", "whatsapp"); // Ruta al documento 'whatsapp'
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return docSnap.data().telefono; // Retorna el campo 'telefono'
      } else {
        console.error("El documento 'whatsapp' no existe.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el enlace de WhatsApp desde Firebase:", error);
      return null;
    }
  };