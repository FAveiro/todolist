import React, { useState, useEffect } from "react";

//* Import icons
import { PlusCircle } from "phosphor-react";

//* Import components
import Groups from "./Groups";
import NewGroup from "./NewGroup";

function GroupTask() {
  const [groupTask, setGroupTask] = useState([]);
  const [newGroup, setNewGroup] = useState(false);
  const [changeGroup, setchangeGroup] = useState(false);

  useEffect(() => {
    setGroupTask(JSON.parse(localStorage.getItem("GroupTask")));
    setchangeGroup(false)
  }, [newGroup, changeGroup]);

  return (
    <div className="navbar_list_header navbar_list_group">
      <div className="navbar_create_grouptask">
        <h3>Task Groups</h3>
        <button onClick={() => setNewGroup(true)}>
          <PlusCircle size={28} color="#13abb0" weight="duotone" />
        </button>
      </div>
      {/* Create new group task */}
      {newGroup && <NewGroup closeGroup={setNewGroup} />}
      {/* Write each group task */}
      {groupTask && groupTask.map((info) => (
        <Groups key={info.id} data={info} changeGroup={setchangeGroup} />
      ))}
    </div>
  );
}

export default GroupTask;
