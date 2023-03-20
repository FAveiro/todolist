import React, { useState, useEffect } from "react";

//* Data
import { categoryValues, priorityValues } from "../../Data/data";

//* Import components
import ListBox from "../Listbox/ListBox";

function Cards({ id, title, content, category, priority }) {
  const [showMore, setShowMore] = useState(false);
  const [newValues, setNewValues] = useState({ category, priority });
  const readMoreText = showMore ? "Show Less" : "Read More...";

  const styles = {
    container: {
      display: "grid",
      width: "23em",
      height: "max-content",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      borderRadius: "20px",
      backgroundColor: "rgba(19, 171, 176, 0.4)",
      boxShadow: "0px 0px 7px 0.1px #000000",
      gap: "10px",
    },
    title: {
      textDecoration: newValues.category.value === 'done' ? 'line-through' : null
    }
  };

  //* Change priority or category
  useEffect(() => {
    //* Get information from array in local storage
    const info = JSON.parse(localStorage.getItem("Task"));
    const indexUpdate = info.findIndex((obj) => obj.id === id);
    if (info[indexUpdate].category.value != newValues.category.value) {
      info[indexUpdate].category = newValues.category;
    } else if (info[indexUpdate].priority.value != newValues.priority.value) {
      info[indexUpdate].priority = newValues.priority;
    }
    localStorage.setItem("Task", JSON.stringify(info));
  }, [newValues]);

  return (
    <div style={styles.container}>
      <div className="card_header">
        <h3 style={styles.title}>{title}</h3>
        <div className="card_header_category">
          <ListBox
            titleListBox="Category"
            info={categoryValues}
            name="category"
            newValue={setNewValues}
            value={newValues.category}
          />
          <ListBox
            titleListBox="Priority"
            info={priorityValues}
            name="priority"
            newValue={setNewValues}
            value={newValues.priority}
          />
        </div>
      </div>
      <label className="task_card_container_label">
        {showMore ? content : content.substring(0, 150)}
      </label>
      {content.length > 150 && (
        <h5 onClick={() => setShowMore(!showMore)}>{readMoreText}</h5>
      )}
    </div>
  );
}

export default Cards;
