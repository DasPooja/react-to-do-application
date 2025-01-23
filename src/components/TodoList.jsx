import { useState } from 'react';
import TaskForm from './TaskForm';
import './TodoList.css';

function EditedForm() {

}


function TodoList() {
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [deleteTask, setDeleteTask] = useState(false);
    
    const [updateTask, setUpdateTask] = useState("");
    const [updateIndex, setUpdateIndex] = useState(null);
    
    const openForm = () => {
        setOpen((prev) => !prev);
    }

    const title= localStorage.getItem("title");
    const content = localStorage.getItem("content");

    const onDelete = (index) => {
        const newTask = tasks.filter((_, i) => i !== index);
        setTasks(newTask)
        setDeleteTask();
        localStorage.removeItem('title');
        localStorage.removeItem('content');
    } 

    const onUpdate = () => {
        const editedTask = tasks.map((t,index) => index === updateIndex ? updateIndex : t);
        setTasks(editedTask);
        setUpdateIndex(null);
        setUpdateTask("");
    }
    return (
        <><div>
             <button className='add-button' onClick={openForm}>➕Add task</button>
             <button className='add-button' onClick={onDelete}>➖Remove task</button>
             <button className='add-button' onClick={onUpdate}>Update task</button>
              {open && <TaskForm/>}
              {/* {open && <EditedForm/>} */}

            {
                // tasks.map((index))
                <div  className="todo-card" >
                    <h2>{title}</h2>
                    <p>{content}</p>
                </div>
}
            </div>
        </>
    )
}

export default TodoList;