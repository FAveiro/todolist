import React, { useState } from "react";

//* Import icons
import { X, FloppyDisk } from "phosphor-react";

//* Generate ID
import { v4 as uuidv4 } from "uuid";

//* List box
import ListBox from "../Listbox/ListBox";

//* Data
import { categoryValues, priorityValues } from "../../Data/data";

function NewTask({ createNewTask, Id }) {
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    category: null,
    priority: null,
  });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  };

  const handleSave = () => {
    if (!newTask.title || !newTask.content) {
      setError(true);
    } else {
      //* Get information from array in local storage
      const info = localStorage.getItem("Task");
      const data = info ? JSON.parse(info) : [];
      const newTaskData = {
        id: uuidv4(),
        parentId: Id,
        title: newTask.title,
        content: newTask.content,
        category: newTask.category,
        priority: newTask.priority
      };
      data.push(newTaskData);
      localStorage.setItem("Task", JSON.stringify(data));
      createNewTask(false);
      setError(false);
    }
  };

  return (
    <div className="new_task_card_container">
      <div className="new_task_card_header">
        <input
          name="title"
          onChange={handleChange}
          value={newTask.title}
          maxLength="25"
          placeholder="Title"
        />
        <button onClick={() => createNewTask(false)}>
          <X size={22} weight="thin" />
        </button>
      </div>
      <textarea
        name="content"
        onChange={handleChange}
        value={newTask.content}
        placeholder="Write a task..."
        rows={5}
      />
      <div className="new_task_card_class">
        <ListBox
          titleListBox="Category"
          info={categoryValues}
          name="category"
          newValue={setNewTask}
          value={newTask.category}
        />
        <ListBox
          titleListBox="Priority"
          info={priorityValues}
          name="priority"
          newValue={setNewTask}
          value={newTask.priority}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: error ? "space-between" : "flex-end",
        }}
      >
        {error && (
          <label className="new_group_error">Write some information</label>
        )}
        <button className="new_task_card_save" onClick={() => handleSave()}>
          <label>Save</label>
        </button>
      </div>
    </div>
  );
}

export default NewTask;
