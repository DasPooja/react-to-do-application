import { useTaskContext } from '../contexts/TaskContext';

function TaskForm() {
    const {isModalOpen, currentTask, taskDetails, setTaskDetails, saveTask, closeModal} = useTaskContext();

    return (
        <>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{currentTask ? "Edit Task" : "Add Task"}</h2>
                        <form onSubmit={saveTask}>
                            <label htmlFor='task-title'>Task</label>
                            <input
                                id="task-title"
                                type="text"
                                placeholder="Task"
                                value={taskDetails.title}
                                onChange={(e) =>
                                setTaskDetails({ ...taskDetails, title: e.target.value })
                                }
                                required
                            />
                            <label htmlFor="task-priority">Priority</label>
                            <select
                                id="task-priority"
                                value={taskDetails.priority}
                                onChange={(e) =>
                                setTaskDetails({ ...taskDetails, priority: e.target.value })
                                }
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <label htmlFor="task-deadline">Deadline</label>
                            <input
                                id="task-deadline"
                                type="date"
                                value={taskDetails.deadline}
                                onChange={(e) =>
                                setTaskDetails({ ...taskDetails, deadline: e.target.value })
                                }
                            />
                            <label htmlFor="task-comment">Comments</label>
                            <textarea
                                id="task-comment"
                                placeholder="Type here..."
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
        </>
    )
}

export default TaskForm;
