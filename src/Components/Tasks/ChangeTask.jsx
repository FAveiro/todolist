import React, { useState } from "react";

//* Import icons
import { X } from "phosphor-react";

//* List box
import ListBox from "../Listbox/ListBox";

//* Data
import { categoryValues, priorityValues } from "../../Data/data";

function ChangeTask({
  idChange,
  titleChange,
  contentChange,
  categoryChange,
  priorityChange,
  setChangeTask,
}) {
  const [changeTaskData, setChangeTaskData] = useState({
    id: idChange,
    title: titleChange,
    content: contentChange,
    category: categoryChange,
    priority: priorityChange,
  });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setChangeTaskData((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  };

  const handleSave = () => {
    if (!changeTaskData.title || !changeTaskData.content) {
      setError(true);
    } else {
      //* Get information from array in local storage
      const info = JSON.parse(localStorage.getItem("Task"));
      const indexUpdate = info.findIndex((obj) => obj.id === changeTaskData.id);
      info[indexUpdate].id = changeTaskData.id;
      info[indexUpdate].title = changeTaskData.title;
      info[indexUpdate].content = changeTaskData.content;
      info[indexUpdate].category = changeTaskData.category;
      info[indexUpdate].priority = changeTaskData.priority;
      localStorage.setItem("Task", JSON.stringify(info));
      setChangeTask(null);
      setError(false);
    }
  };

  return (
    <div className="new_task_card_container">
      <div className="new_task_card_header">
        <input
          name="title"
          onChange={handleChange}
          value={changeTaskData.title}
          maxLength="15"
          placeholder="Title"
        />
        <button onClick={() => setChangeTask(null)}>
          <X size={22} weight="thin" />
        </button>
      </div>
      <textarea
        name="content"
        onChange={handleChange}
        value={changeTaskData.content}
        placeholder="Write a task..."
        rows={5}
      />
      <div className="new_task_card_class">
        <ListBox
          titleListBox="Category"
          info={categoryValues}
          name="category"
          newValue={setChangeTaskData}
          value={changeTaskData.category}
          disabledButton={false}
        />
        <ListBox
          titleListBox="Priority"
          info={priorityValues}
          name="priority"
          newValue={setChangeTaskData}
          value={changeTaskData.priority}
          disabledButton={false}
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

export default ChangeTask;
