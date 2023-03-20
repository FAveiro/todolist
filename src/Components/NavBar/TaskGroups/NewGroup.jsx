import React, { useState, useContext } from "react";

//* Import icons
import { FloppyDisk, XCircle } from "phosphor-react";

//* Import hooks
import { useOutSideClick } from "../../../Hooks/useOutSideClick";

//* Generate ID
import { v4 as uuidv4 } from "uuid";

//* Import context
import { GroupTaskContext } from "../../../Contexts/GroupTask";

function NewGroup({ closeGroup }) {
  const [error, setError] = useState(false);
  const [group, setGroup] = useState("");
  const { setGroupTask } = useContext(GroupTaskContext);

  const ref = useOutSideClick(() => closeGroup(false));

  const handleSaveNewGroup = () => {
    //* Get information from array in local storage
    const info = localStorage.getItem("GroupTask");
    const data = info ? JSON.parse(info) : [];
    const newGroup = { id: uuidv4(), title: group };
    const existentGroup = data.filter((obj) => obj.title === group);

    if (!group || existentGroup.length > 0) {
      setError(true);
    } else {
      data.push(newGroup);
      localStorage.setItem("GroupTask", JSON.stringify(data));
      setGroupTask(newGroup);
      closeGroup(false);
    }
  };

  return (
    <div className="new_group_container" ref={ref}>
      <div className="new_group_input">
        {/* New Group input */}
        <div className="new_group_input">
          <input
            className="input_group_task"
            type="text"
            name="NewGroupTask"
            maxLength="17"
            onChange={(event) => setGroup(event.target.value)}
          />
          <button className="new_group_button" onClick={handleSaveNewGroup}>
            <FloppyDisk
              size={25}
              color="#13abb0"
              weight="regular"
              alt="Close"
            />
          </button>
        </div>
        {/* Close new group */}
        <button
          className="new_group_button close_button"
          onClick={() => closeGroup(false)}
        >
          <XCircle size={25} color="#ef4838" weight="regular" />
        </button>
      </div>
      {error && (
        <label className="new_group_error">Cant create this group.</label>
      )}
    </div>
  );
}

export default NewGroup;
