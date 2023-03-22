import React, { useState, useEffect, useContext } from "react";

//* Import icons
import { PlusCircle } from "phosphor-react";

//* Import context
import { GroupTaskContext } from "../../Contexts/GroupTask";
import { FilterTaskContext } from "../../Contexts/FilterTask";

//* Import components
import NewTask from "./NewTask";
import Cards from "./Cards";
import ChangeTask from "./ChangeTask";

function index() {
  const [data, setData] = useState([]);
  const [createNewTask, setCreateNewTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(null);
  const [changeIdTask, setChangeIdTask] = useState(null);
  const { groupTask } = useContext(GroupTaskContext);
  const { filterTask } = useContext(FilterTaskContext);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("Task"));
    if (info) {
      setData(info.filter((obj) => obj.parentId === groupTask.id));
      if (filterTask.category.length > 0 || filterTask.priority.length > 0) {
        setData((prevValue) =>
          prevValue.filter(
            (obj) =>
              filterTask.category.indexOf(obj.category.value) >= 0 ||
              filterTask.priority.indexOf(obj.priority.value) >= 0
          )
        );
      }
    } else {
      setData([]);
    }
  }, [groupTask, filterTask, createNewTask, deleteTask, changeIdTask]);



  return (
    <div className="container_task">
      {groupTask && (
        <div className="task_header">
          <h2>{groupTask.title}</h2>
          <button onClick={() => setCreateNewTask(true)}>
            <PlusCircle size={28} color="#13abb0" weight="duotone" />
          </button>
        </div>
      )}
      <div className="container_cards_task">
        {createNewTask && (
          <NewTask createNewTask={setCreateNewTask} Id={groupTask.id} />
        )}
        {data &&
          data.map((task) => {
            if (changeIdTask != task.id) {
              return (
                <Cards
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  content={task.content}
                  category={task.category}
                  priority={task.priority}
                  setDelete={setDeleteTask}
                  setChangeTask={setChangeIdTask}
                />
              );
            } else {
              return (
                <ChangeTask
                  key={task.id}
                  idChange={task.id}
                  titleChange={task.title}
                  contentChange={task.content}
                  categoryChange={task.category}
                  priorityChange={task.priority}
                  setChangeTask={setChangeIdTask}

                />
              );
            }
          })}
      </div>
    </div>
  );
}

export default index;
