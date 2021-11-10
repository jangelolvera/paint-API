import React, { useState } from 'react';
import "./App.js";
import './App.css';
import emptyicon from './web.png';

function Canva(props) {

    const [pressed, setPressed] = useState(false);

    //Pinta cada cuadro cada que se haga click
    function paintIndex(event) {
        //Cambia el estado para identificar que hay un dibujo
        props.setDraw('filled');
        //Cambia el color del pixel al color seleccionado
        props.setSgrid(
            props.sgrid.map(
                (pixel) => {
                    if (pixel.id === Number(event.target.name))
                        pixel.pxcolor = props.selectedColor;
                    return pixel;

                }
            )
        );
    }

    //Funcion para que se siga pintando al movel el mouse
    function paintALot(event) {
        if (!pressed) return
        paintIndex(event);
    }

    //Se ejecuta al presionar y mantener click
    function startPainting(event) {
        setPressed(true);
        paintIndex(event);
    }

    //Se ejecuta cuando se deja de presionar el mouse
    function stopIt() {
        setPressed(false);
    }

    return (
        <div id="drawcont">
            <div id="drawingPanel" ref={props.captImg}>
                <div id="pixels"
                    //Se manda a llamar paintIndex al dar click
                    onClick={paintIndex}
                    onMouseDown={startPainting}
                    onMouseUp={stopIt}
                >
                    {props.sgrid.map(
                        (pixel) => {
                            return (
                                <button
                                    name={pixel.id}
                                    key={pixel.id}
                                    onMouseOver={paintALot}
                                    disabled={props.unclick}
                                    style={{
                                        width: pixel.width,
                                        height: pixel.height,
                                        border: props.borders === true ? '1px groove #565859' : '0',
                                        backgroundColor: pixel.pxcolor,
                                        margin: '0px',
                                        padding: '0px'
                                    }}
                                ></button>
                            )
                        }
                    )}
                </div>
            </div>

            <div id="resultImg">
                <div ref={props.pic}>
                    <img id="emptyimg" alt="emptyimg" src={emptyicon}></img>
                    <p id="welcometxt">Select a color and start painting!</p>
                </div>
            </div>
        </div>
    );

}


export default Canva;