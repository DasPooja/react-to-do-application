import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();



export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);

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

    const addtask = (task) => {
        setTasks([...tasks, task])
    };

    const updateTask = (taskToUpdate, updatedTask) => {
        setTasks(tasks.map((task) => (task === taskToUpdate ? updatedTask : task)));
    };

    const deleteTask = (taskToDelete) => {
        setTasks(tasks.filter((task) => task !== taskToDelete))
    }

    return ( 
        <TaskContext.Provider value={{tasks, addtask, updateTask, deleteTask}}>
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