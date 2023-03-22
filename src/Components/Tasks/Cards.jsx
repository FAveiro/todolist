import React, { useState, useEffect } from "react";

//* Import icons
import { PencilSimple, Trash } from "phosphor-react";

function Cards({
  id,
  title,
  content,
  category,
  priority,
  setDelete,
  setChangeTask,
}) {
  const [showMore, setShowMore] = useState(false);
  const readMoreText = showMore ? "Show Less" : "Read More...";

  const styles = {
    container: {
      display: "grid",
      width: "30em",
      height: "max-content",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      borderRadius: "20px",
      backgroundColor: "rgba(19, 171, 176, 0.4)",
      boxShadow: "0px 0px 7px 0.1px #000000",
      gap: "10px",
      padding: "10px 20px",
    },
    title: {
      textDecoration: category.value === "done" ? "line-through" : null,
    },
  };

  //* Delete task
  const handleDelete = () => {
    //* Get information from array in local storage
    const info = JSON.parse(localStorage.getItem("Task"));
    const newArray = info.filter((obj) => {
      return obj.id !== id;
    });
    localStorage.setItem("Task", JSON.stringify(newArray));
    setDelete(id);
  };

  return (
    <div style={styles.container}>
      <div className="card_header">
        <h3 style={styles.title}>{title}</h3>
        <div className="card_header_category">
          <div className="listbox_container_close">
            <button>
              <label
                style={{
                  color: category.color,
                  fontWeight: "400",
                }}
              >
                {category.text}
              </label>
            </button>
          </div>
          <div className="listbox_container_close">
            <button>
              <label
                style={{
                  color: priority.color,
                  fontWeight: "400",
                }}
              >
                {priority.text}
              </label>
            </button>
          </div>
          <div className="card_change">
            <button onClick={() => setChangeTask(id)}>
              <PencilSimple size={20} color="#13abb0" />
            </button>
            <button onClick={handleDelete}>
              <Trash size={20} color="#ef4838" />
            </button>
          </div>
        </div>
      </div>
      <label className="task_card_container_label">
        {showMore ? content : content.substring(0, 150)}
      </label>
      {content.length > 150 && (
        <h5 className="readmore" onClick={() => setShowMore(!showMore)}>
          {readMoreText}
        </h5>
      )}
    </div>
  );
}

export default Cards;
