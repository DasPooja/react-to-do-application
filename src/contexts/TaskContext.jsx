import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [taskDetails, setTaskDetails] = useState({
        title: "",
        priority: "Low",
        deadline: "",
        comment: "",
    });

    const generateColor = (index) => {
        const hue = (index * 137) % 360; // Generate a unique hue value
        return `hsl(${hue}, 70%, 80%)`; // Soft pastel-like colors
      };

    // Load tasks from localStorage on initial render
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
            if (storedTasks) {
                try {
                    const parsedTasks = JSON.parse(storedTasks);
                    if (Array.isArray(parsedTasks)) {
                        setTasks(parsedTasks);
                    }
                } catch (error) {
                    console.error("Error parsing tasks from localStorage:", error);
                }
            }
    }, []);
    
    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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

    const addtask = (task) => {
        setTasks([...tasks, task])
    };

    const updateTask = (taskToUpdate, updatedTask) => {
        setTasks(tasks.map((task) => (task === taskToUpdate ? updatedTask : task)));
    };

    const deleteTask = (taskToDelete) => {
        setTasks(tasks.filter((task) => task !== taskToDelete))
    }

    const saveTask = (e) => {
        e.preventDefault();
    
        if (!taskDetails.title.trim()) {
            alert("This is required");
            return;
        }
    
        if (currentTask) {
            // Update an existing task
            updateTask(currentTask, taskDetails)
        } else {
            // Add new task
            addtask(taskDetails);
        }
    
        closeModal();
    }

    return ( 
        <TaskContext.Provider value={{tasks, addtask, updateTask, deleteTask, generateColor,isModalOpen, currentTask, setCurrentTask, taskDetails, setTaskDetails, openModal, closeModal, saveTask  }}>
            {children}
        </TaskContext.Provider>
    )
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);

    if (context === undefined) throw new Error
    ("TodoContext was used outside the TodoProvider");
    return context;
};