import {FaTrash, FaEdit} from 'react-icons/fa';
import TaskForm from './TaskForm';
import { useTaskContext } from '../contexts/TaskContext';
import './TaskList.css';


function TaskList() {
    const {tasks, deleteTask, generateColor, openModal} = useTaskContext();

    return (
        <>
            <div className='todo'>
                <h1>To-Do List</h1>
                <div className='task-container'>
                    {tasks.map((task, index) => (
                        <div key={index} className='task-card' style={{ backgroundColor: generateColor(index)}}>
                            <h3>{task.title}</h3>
                            <p>
                            <strong>Priority:</strong> {task.priority}
                            </p>
                            <p>
                            <strong>Deadline:</strong> {task.deadline || "N/A"}
                            </p>
                            <p>
                            <strong>Comment:</strong> {task.comment || "None"}
                            </p>
                            <div className="card-actions">
                            <button onClick={() => openModal(task)}><FaEdit /></button>
                            <button onClick={() => deleteTask(task)}><FaTrash/></button>
                            </div>
                        </div>
                    ))}
                    <div className="add-card" onClick={() => openModal()}>
                        <p>+</p>
                    </div>
                </div>
                <TaskForm />
            </div>
        </>
    )
}

export default TaskList;