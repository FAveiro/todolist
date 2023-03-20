import React, { useState, useContext } from "react";

//* Import icons
import { PencilSimple, FloppyDisk, Trash } from "phosphor-react";

//* Import hooks
import { useOutSideClick } from "../../../Hooks/useOutSideClick";

//* Import context
import { GroupTaskContext } from "../../../Contexts/GroupTask";

function Groups({ data, changeGroup }) {
  const [error, setError] = useState(false);
  const [hoverComponent, setHoverComponent] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [dataChange, setDataChange] = useState("");
  const { setGroupTask } = useContext(GroupTaskContext);

  const ref = useOutSideClick(() => leaveComponent());

  const leaveComponent = () => {
    setOnChange(false);
    changeGroup(false);
    setError(false);
    setDataChange(data.title);
  };

  //* Show the information (Input/Select group task)
  const showInformation = () => {
    if (onChange) {
      return (
        <input
          type="text"
          name="ChangeNameGroup"
          className="input_group_task"
          maxLength="17"
          value={dataChange}
          onChange={(event) => setDataChange(event.target.value)}
        />
      );
    } else {
      return (
        <button onClick={() => setGroupTask(data)}>
          <h3>{data.title}</h3>
        </button>
      );
    }
  };

  //* Save Icon and Change icon
  const showIcon = () => {
    if (onChange) {
      return (
        <button>
          <FloppyDisk
            size={24}
            color="#13abb0"
            weight="duotone"
            onClick={handleSave}
          />
        </button>
      );
    } else if (hoverComponent) {
      return (
        <div className="group_task_icons">
          <button>
            <PencilSimple
              size={24}
              color="#13abb0"
              weight="duotone"
              onClick={() => handleChange()}
            />
          </button>
          <button>
            <Trash
              size={24}
              color="#ef4838"
              weight="duotone"
              onClick={handleDelete}
            />
          </button>
        </div>
      );
    } else {
      null;
    }
  };

  //* Inicialize information to change
  const handleChange = () => {
    setOnChange(true);
    setDataChange(data.title);
  };

  //* Remove information
  const handleDelete = () => {
    //* Get information from array in local storage
    const info = JSON.parse(localStorage.getItem("GroupTask"));
    const newArray = info.filter((obj) => {
      return obj.id !== data.id;
    });
    localStorage.setItem("GroupTask", JSON.stringify(newArray));
    changeGroup(true);
    setGroupTask("")
  };

  //* Save change name of task group
  const handleSave = () => {
    //* Get information from array in local storage
    const info = JSON.parse(localStorage.getItem("GroupTask"));
    const indexUpdate = info.findIndex((obj) => obj.id === data.id);
    if (!dataChange) {
      setError(true);
    } else {
      info[indexUpdate].title = dataChange;
      localStorage.setItem("GroupTask", JSON.stringify(info));
      setGroupTask(info[indexUpdate])
      setError(false);
      setOnChange(false);
      changeGroup(true);
    }
  };

  return (
    <div
      className="navbar_list_group_header"
      ref={ref}
      onMouseEnter={() => setHoverComponent(true)}
      onMouseLeave={() => setHoverComponent(false)}
    >
      {/* Change name of Taskgroup or Select TaskGroup u want show */}
      <div className="group_show">
        {showInformation()}
        {error && (
          <label className="new_group_error">Cant change this group.</label>
        )}
      </div>
      {/* Check if is for save the change name or open the change name  */}
      {showIcon()}
    </div>
  );
}

export default Groups;
