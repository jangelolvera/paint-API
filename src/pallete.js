import React, { useState, useEffect } from 'react';
import "./App.js";
import axios from 'axios';
//Arreglo de colores que el usuario podrá seleccionar

function Pallete(props) {

    const [colorOptions, setColorOptions] = useState([]);
    const [load, setLoad] = useState("IDLE_ST");// estado de la paleta

    const handleClick = (event) => {
        props.setSelectedColor(event.target.name);
    }

    //función para llamar a la API y obtener los colores
    function getColors() {

        //Peticion http a la API, regresa 6 colores
        axios.get('https://www.colr.org/json/colors/random/6').then(response => { 
            setLoad("LOADING_ST"); //Pasa el estado de la paleta a "cargando"
            var newColors = [];

            for (let i = 0; i < 6; i++) {
                newColors.push("#" + response.data.colors[i].hex);
            }
            setColorOptions(newColors);
            setLoad("COMPLETE_ST"); //Pasa el estado de la paleta a "completo"
        }

        ).catch(() => {
            alert("Algo salió mal :(");
            setLoad("ERROR_ST"); //Pone la paleta en estado de "error"
        })
    }

    //La función se ejecutará cada que que se reinicie la página
    useEffect(() => {
        getColors();
    }, []);

    //Si la paleta está cargando o en espera
    if (load === "IDLE_ST" || load === "LOADING_ST") {
        return (
            <p id="loadingp"> Loading Pallete</p>
        );
    }

    //Si la paleta genera un error
    else if (load === "ERROR_ST") {
        return (
            <p id="errorp">FATAL ERROR. PLEASE RELAD!</p>

        );

    }

    // Si la paleta se genera sin errores
    else if (load === "COMPLETE_ST") {
        return (

            <div id="genpallete">


                <ul style={{ display: 'flex', listStyle: 'none' }}>

                    {/* función que genera la paleta de colores */}
                    {colorOptions.map((color) => {
                        const isSelected = color === props.selectedColor;
                        const borderStyle = isSelected ? '3px groove #c90bfe' : '1px solid black';
                        return (

                            <div className="App" key={color}>

                                <div id="pallete" key={color}>
                                    <button
                                        className="palletbtns"
                                        type="button"
                                        key={color}
                                        name={color}
                                        onClick={handleClick}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            border: borderStyle,
                                            background: color,
                                        }}>
                                    </button>

                                </div>
                            </div>
                        )

                    })}
                </ul>
            </div>
        );
    }



}

export default Pallete;