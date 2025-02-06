import React from "react";

//Componente para mostrar la lista de instantes

//Definimos la estructura de un instante
interface Instante {
    id: number; //ID único
    time: string; // Hora del instante
  }

//Props del componente
interface ItemListProps {
    items: Instante[]; //Array
}

//Componente ItemList - Que muestra la lista de los instantes 
const ItemList: React.FC<ItemListProps> = ({ items }) => {

    return(

        <div>
            <h2>
                Instantes Guardados
            </h2>

            {/*Si no hay elementos, mostramos un mensaje */}

            {items.length === 0 ? (
                <p className="no-items">No hay instantes guardados.</p>
            ) : (
                <ul className="instantes-list">
                    {items.map((item) => (
                        <li key={item.id}>{item.time}</li> //Mostramos cada instante guardado
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ItemList;