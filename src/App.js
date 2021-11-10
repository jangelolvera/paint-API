import React, { useState, useRef } from 'react';
import './App.css';
import Pallete from './pallete.js';
import Canva from './canva'
import html2canvas from 'html2canvas';

function App() {

  let grid = [];//Arreglo con los botones de la cuadricula
  const pic = useRef();
  const captImg = useRef();

  const [sgrid, setSgrid] = useState(grid);//estado de la cuadricula
  const [borders, setBorders] = useState(true);//Quita los bordes de la cuadricula al presionar Print
  const [selectedColor, setSelectedColor] = useState('white'); //Color seleccionado de la paleta
  const [draw, setDraw] = useState('empty'); //Se cambia a 'filled' cuando el usuario pinta 
  const [unclick, setUnclick] = useState(false);//Hace que ya no se pueda dibujar despues de presionar Print


  //Genera la cuadricula de 10x10
  for (let i = 1; i <= 100; i++) {

    grid.push({ id: i, pxcolor: '#FFFF', height: '40px', width: '40px' });

  }

  //Función para imprimir el dibujo
  function printDraw() {
    //Verifica que haya un dibujo
    if (draw === 'filled') {

      setBorders(false);//Quita los bordes
      setUnclick(true);//Ya no se pueden presionar los pixeles
      setTimeout(() => {
        html2canvas(captImg.current).then(canvas => {
          pic.current.innerHTML = "";
          pic.current.appendChild(canvas);
        });
      }, 10)

    } else {

      alert("You have nothing to print");

    }

  }

  //Función para generar un tablero nuevo
  function resetGame(event) {
    setSgrid(grid); //Devuelve el grid al estado inicial
    setDraw('empty');//Pone el estado del dibujo en vacio
    setBorders(true);//Vuelve a colocar los bordes
    setUnclick(false); //Se puede volver a pintar
  }


  return (
    
    <div className="App">

      <div className="header">

        {/* botón para resetear el juego */}
        <button type="reset" id="newgamebtn" onClick={resetGame}> New game </button>
        {/* botón para imprimir el dibujo */}
        <button type="button" id="printbtn" onClick={printDraw}> Print </button>
        <p id="choosetxt">Choose a color to start painting: </p>

        {/* Componente de la paleta para seleccionar un color */}
        <Pallete
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          pic={pic}
        />

      </div>

      {/* Componente que tiene la cuaricula y el espacio en el que se imprime el dibujo  */}
      <Canva
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        draw={draw}
        setDraw={setDraw}
        sgrid={sgrid}
        setSgrid={setSgrid}
        pic={pic}
        captImg={captImg}
        borders={borders}
        setBorders={setBorders}
        unclick={unclick}
        setUnclick={setUnclick} />

    </div>
  );
}

export default App;
