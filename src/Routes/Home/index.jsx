import React, { useState } from "react";

//* Import components
import NavBar from "../../Components/NavBar";
import Tasks from "../../Components/Tasks";

//* Import context
import { GroupTaskContext } from "../../Contexts/GroupTask";
import { FilterTaskContext } from "../../Contexts/FilterTask";

function Home() {
  const [groupTask, setGroupTask] = useState("");
  const [filterTask, setFilterTask] = useState({ category: [], priority: [] });

  return (
    <GroupTaskContext.Provider value={{ groupTask, setGroupTask }}>
      <FilterTaskContext.Provider value={{ filterTask, setFilterTask }}>
        <div className="container_home">
          <NavBar />
          <Tasks />
        </div>
      </FilterTaskContext.Provider>
    </GroupTaskContext.Provider>
  );
}

export default Home;
