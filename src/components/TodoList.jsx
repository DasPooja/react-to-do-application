import { useState } from 'react';
import TaskForm from './TaskForm';
import './TodoList.css';


function TodoList() {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState([]);
    const [deleteTask, setDeleteTask] = useState(false);
    const [updateTask, setUpdateTask] = useState(false);
    
    const openForm = () => {
        setOpen((prev) => !prev);
    }

    const title= localStorage.getItem("taskDetails");
    const content = localStorage.getItem("taskDetails");

    const onDelete = (index) => {
        const newTask = task.filter((_, i) => i !== index);
        setTask(newTask)
        setDeleteTask();
        localStorage.removeItem('taskDetails');
    } 

    const onUpdate = () => {

    }
    return (
        <><div>
             <button className='add-button' onClick={openForm}>➕Add task</button>
             <button className='add-button' onClick={onDelete}>➕Remove task</button>
             <button className='add-button' onClick={onUpdate}>Update task</button>
              {open && <TaskForm/>}
              {/* {task.map((index) => { */}
                <div  className="todo-card" >
                    <h2>{title && title}</h2><br/>
                    <p>{content}</p>
                </div>
            {/* )} */}
            </div>
        </>
    )
}

export default TodoList;