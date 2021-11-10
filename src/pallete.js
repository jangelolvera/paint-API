import React from 'react';
import "./App.js"

//Arreglo de colores que el usuario podrá seleccionar
const colors = ['white', 'black', 'gray', 'red', 'crimson', 'blue', 'cyan', 'magenta', 'gold', 'lightgreen', 'green'];

function Pallete(props) {

    const handleClick = (event) => {
        props.setSelectedColor(event.target.name);
    }


    return (

        <ul style={{ display: 'flex', listStyle: 'none' }}>

            {/* función que genera la paleta de colores */}
            {colors.map((color) => {
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
    );


}

export default Pallete;