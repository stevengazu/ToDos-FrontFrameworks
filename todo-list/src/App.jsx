import './App.css'
import {ToDoList} from './components/ToDo-list';

export function App() {
  return (
    <main  className="App">
      <div className="todo-container">
          <ToDoList />
      </div>
    </main>
  );
}