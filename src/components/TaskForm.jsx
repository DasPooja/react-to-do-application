import { useState } from "react";
import './TaskForm.css';

function TaskForm () {
    const [addTitle, setAddTitle] = useState("");
    const [addContent, setAddContent] = useState("");


    const onSubmitTask = (e) => {
        e.preventdefault();
        // console.log("e", e);
    }
    // console.log("values", addTitle, addContent);

    localStorage.setItem("taskDetails", addTitle, addContent)
    // localStorage.setItem("title", addTitle);
    // localStorage.setItem("content", addContent);

    return (
        <div className="add-form">
        <form onSubmit={onSubmitTask}>
            <label htmlFor="title">Tilte</label>
            <input type="text" id="title" name="title" placeholder="Add title" value={addTitle} onChange={(e) => setAddTitle(e.target.value)} required/>
            <label htmlFor="content">Content</label>
            <input type="text" id="content" name="content" placeholder="Add content" value={addContent} onChange={(e) => setAddContent(e.target.value)} required />
            <button>Submit</button>
        </form>
        </div>
    )
};

export default TaskForm;