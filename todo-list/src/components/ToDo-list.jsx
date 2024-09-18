import { useState } from 'react';
import './ToDo-list.css';

export function ToDoList(){
    const [inputValue,setInputValue]= useState([[]])
    const [tasks,setTasks]= useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [isStruck, setIsStruck] = useState([]);
    const [showCheckbox, setShowCheckbox] = useState(false);

    const addTask=()=>{
        if(inputValue.trim() !== ''){
            setTasks([...tasks, inputValue]);
           
            setIsStruck([...isStruck, false]); // Añadir un nuevo estado de isStruck para la nueva tarea
            setInputValue('');
        }
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        const newIsStruck = isStruck.filter((_, i) => i !== index);
        setTasks(newTasks);
        setIsStruck(newIsStruck);
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditingText(tasks[index]);
    };

   const saveTask = (index) => {
        const newTasks = tasks.map((task, i) => (i === index ? editingText : task));
        setTasks(newTasks);
        setEditingIndex(null);
        setEditingText('');
    };

  const handleClick = (index) => {
    const newIsStruck = isStruck.map((struck, i) => (i === index ? !struck : struck));
        setIsStruck(newIsStruck);
    
  };

    return (
        <div className="header">
            <h2>TO-DO LIST</h2>
            <input type="text" value={inputValue} onChange={(e)=> setInputValue(e.target.value)} className="TextNewTask" placeholder="New Task"/>
            <button type="submit" onClick={addTask} className="btn btn-secondary">Add</button>
            <ul>
            {tasks.map((task, index) => (
                <li key={index} onClick={()=>handleClick(index)}>
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
                                <div className="task-text"  style={{ textDecoration:isStruck[index] ? 'line-through' : 'none'}}>{task}</div>
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
    