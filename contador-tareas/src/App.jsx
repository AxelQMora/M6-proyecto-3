import { useState, useEffect, useMemo } from 'react';
import './App.css'

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');

  //Cálculo del tiempo total
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  //Efecto secundario: Actualizar tiempo total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]);


  //Agregar tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion)
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  //Eliminar tarea
  const eliminarTarea = (index) => {
    setTareas(tareas.filter((_, i) => i !== index))
  };

  return (
    <>
      <div id='main-container'>
        <h1>Contador de tareas</h1>
        <div id='inputs'>
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)} //Esto actualiza la tarea nueva cada que se presiona una tecla
            placeholder="Nombre de la tarea"
          />

          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            placeholder='Duración en minutos'
          />
          <button onClick={agregarTarea}>Agregar Tarea</button>
        </div>

        <h2>Tareas</h2>
        <ul id='list'>
          {tareas.map((tarea, index) => (
            <li key={index}>
              {tarea.nombre} ({tarea.duracion} minutos)
              <button id='done' onClick= {() => eliminarTarea(index)} >Done</button>
            </li>
          ))}
        </ul>

        <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
      </div>
    </>
  )
}

export default App;
