import { useEffect, useState } from 'react';
import {FaTrash, FaEdit} from 'react-icons/fa'
import './TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [taskDetails, setTaskDetails] = useState({
        title: "",
        priority: "Low",
        deadline: "",
        comment: "",
    });

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            try {

                const parsedTasks = JSON.parse(storedTasks);
                if (Array.isArray(parsedTasks)) {
                    setTasks(parsedTasks);
                } else {
                    console.warn("Invalid tasks format in localStorage.");
                    setTasks([]);
                }
            } catch(error) {
                console.error("Error parsing localStorage data:", error);
                setTasks([]);
            };
        } else {
            setTasks([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
     
    const generateColor = (index) => {
        const hue = (index * 137) % 360; // Generate a unique hue value
        return `hsl(${hue}, 70%, 80%)`; // Soft pastel-like colors
      };

    const openModal= (task = null) => {
        setCurrentTask(task);
        setTaskDetails(task || { 
            title: "",
            priority: "Low",
            deadline: "",
            comment: "", });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    const saveTask = (e) => {
        e.preventDefault();

        if (!taskDetails.title.trim()) {
            alert("This is required");
            return;
        }

        if (currentTask) {
            // Update existing task
            setTasks(
              tasks.map((task) =>
                task === currentTask ? { ...task, ...taskDetails } : task
              )
            );
          } else {
            // Add new task
            setTasks([...tasks, { ...taskDetails }]);
          }

          closeModal();
    }
   
    const deleteTask = (taskToDelete) => {
        setTasks(tasks.filter((task) => task !== taskToDelete));
    }

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
                
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>{currentTask ? "Edit Task" : "Add Task"}</h2>
                            <form onSubmit={saveTask}>
                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    value={taskDetails.title}
                                    onChange={(e) =>
                                    setTaskDetails({ ...taskDetails, title: e.target.value })
                                    }
                                    required
                                />
                                <select
                                    value={taskDetails.priority}
                                    onChange={(e) =>
                                    setTaskDetails({ ...taskDetails, priority: e.target.value })
                                    }
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <input
                                    type="date"
                                    value={taskDetails.deadline}
                                    onChange={(e) =>
                                    setTaskDetails({ ...taskDetails, deadline: e.target.value })
                                    }
                                />
                                <textarea
                                    placeholder="Comments"
                                    value={taskDetails.comment}
                                    onChange={(e) =>
                                    setTaskDetails({ ...taskDetails, comment: e.target.value })
                                    }
                                />
                                <div className="modal-actions">
                                    <button type="button" onClick={closeModal}>Cancel</button>
                                    <button type="submit">{currentTask ? "Update" : "Add"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskList;