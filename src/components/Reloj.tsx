import React from "react";
import { useState, useEffect } from "react"; 
import ItemList from "./ItemList"; // Importamos componente de ItemList
import "../styles/Reloj.css";      // Importamos los estilos de Reloj

//Definimos la estructura de un instante guardado

interface Instante {
    id: number; // ID que se guarda para cada fecha actual
    time: string; // Hora guardada HH:MM:SS
}

// Componente principal

const Reloj: React.FC = () => {

    //Estado que almacenará la hora actual
    const [hora, setHora] = useState(new Date());

    //Estado que almacena la lista de instantes guardados
    // ANTES const [instantes, setInstantes] = useState<Instante[]>([]);

    //Con función diferida para inicializar la lista de instantes desde LocalStorag
    const [instantes, setInstantes] = useState<Instante[]>(() => {
      const saved = localStorage.getItem("instants");
      return saved ? JSON.parse(saved) : [];
    });


    //Actualiza la hora cada seg
    useEffect(() => {
        const interval = setInterval(() => {
          setHora(new Date()); //Actualizamos el estado con la hora actual
        }, 1000);

        return () => clearInterval(interval); // Limpiamos el intervalo
    }, []);


    // Guardamos el localStorage cuando cambian los instantes
    useEffect(() => {
      localStorage.setItem("instants", JSON.stringify(instantes));
    }, [instantes]);

  
    //Guardamos el instante actual
    const guardarInstante = () => {
      const nuevoInstante: Instante = {
        id: Date.now(), //Usamos la fecha como ID único
        time: hora.toLocaleTimeString(), //Guardamos la hora en formato legible
      };
      setInstantes([...instantes, nuevoInstante]); //ACtualizamos el listado de instantes
    };
    

    //Borramos tods los instantes guardados
    const borrarInstantes = () => {
      setInstantes([]); //Vacíamos la lista
    };
  

    return (
      <div className="container">
        <h1>🕒</h1>
        <h2 className="hora">{hora.toLocaleTimeString()}</h2>
        
        {/*Botones para guardar y borrar instantes */}
        <div className="buttons">
          <button onClick={guardarInstante} className="guardar">Guardar Instante</button>
          <button onClick={borrarInstantes} className="borrar">Borrar Lista</button>
        </div>
  
        {/*Pasamos los instantes al componente ItemList como prop */}
        <ItemList items={instantes} />
      </div>
    );
  };
  
  export default Reloj;