import { useState } from 'react';
import './ToDo-list.css';

export function ToDoList() {
    // Variables de estado
    const [inputValue, setInputValue] = useState(''); // Almacena el valor actual del campo de entrada
    const [tasks, setTasks] = useState([]); // Almacena la lista de tareas
    const [editingIndex, setEditingIndex] = useState(null); // Almacena el índice de la tarea que se está editando
    const [editingText, setEditingText] = useState(''); // Almacena el texto de la tarea que se está editando
    const [isStruck, setIsStruck] = useState([]); // Almacena el estado de tachado de cada tarea
   
    // Función para agregar una nueva tarea
    const addTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, inputValue]); // Agrega la nueva tarea al array de tareas
            setIsStruck([...isStruck, false]); // Agrega un nuevo estado de tachado para la nueva tarea
            setInputValue(''); // Limpia el campo de entrada
        }
    };

    // Función para eliminar una tarea
    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index); // Elimina la tarea en el índice especificado
        const newIsStruck = isStruck.filter((_, i) => i !== index); // Elimina el estado de tachado en el índice especificado
        setTasks(newTasks); // Actualiza el array de tareas
        setIsStruck(newIsStruck); // Actualiza el array de estados de tachado
    };

    // Función para comenzar a editar una tarea
    const startEditing = (index) => {
        setEditingIndex(index); // Establece el índice de la tarea que se está editando
        setEditingText(tasks[index]); // Establece el texto de la tarea que se está editando
    };

    // Función para guardar una tarea editada
    const saveTask = (index) => {
        const newTasks = tasks.map((task, i) => (i === index ? editingText : task)); // Actualiza la tarea en el índice especificado
        setTasks(newTasks); // Actualiza el array de tareas
        setEditingIndex(null); // Limpia el índice de edición
        setEditingText(''); // Limpia el texto de edición
    };

    // Función para manejar el clic en una tarea (alternar tachado)
    const handleClick = (index) => {
        const newIsStruck = isStruck.map((struck, i) => (i === index ? !struck : struck)); // Alterna el estado de tachado de la tarea en el índice especificado
        setIsStruck(newIsStruck); // Actualiza el array de estados de tachado
    };

    return (
        <div className="header">
            <h2>TO-DO LIST</h2>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="TextNewTask"
                placeholder="Nueva Tarea"
            />
            <button type="submit" onClick={addTask} className="btn btn-secondary">Agregar</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} onClick={() => handleClick(index)}>
                        <input type="checkbox" checked={isStruck[index]} className="CheckboxList" readOnly />
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                                <button onClick={() => saveTask(index)}>Guardar</button>
                            </>
                        ) : (
                            <>
                                <div className="task-text" style={{ textDecoration: isStruck[index] ? 'line-through' : 'none' }}>
                                    {task}
                                </div>
                                <div className="menu">
                                    <i className="fas fa-edit" onClick={() => startEditing(index)}></i>
                                    <i className="fas fa-trash" onClick={() => deleteTask(index)}></i>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
