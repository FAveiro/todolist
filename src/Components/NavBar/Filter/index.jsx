import React, { useContext, useState } from "react";

//* Import components
import ButtonFilter from "./ButtonFilter";

//* Data
import { categoryValues, priorityValues } from "../../../Data/data";

//* Import context
import { FilterTaskContext } from "../../../Contexts/FilterTask";

function Filter() {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState([]);
  const { setFilterTask } = useContext(FilterTaskContext);

  const handleClick = () => {
    setFilterTask((prevValue) => {
      return {
        ...prevValue,
        category: categoryFilter,
      };
    });

    setFilterTask((prevValue) => {
      return {
        ...prevValue,
        priority: priorityFilter,
      };
    });
  };

  return (
    <div className="navbar_list_header">
      <h3>Search Filter</h3>
      {/* Category */}
      <div className="navbar_list_filter_header">
        <h4>Category</h4>
        <div className="navbar_filter_list">
          {categoryValues.map((category, i) => (
            <ButtonFilter
              key={i}
              value={category.value}
              bgColor={category.bgColor}
              color={category.color}
              text={category.text}
              valueClick={categoryFilter}
              onClickFilter={setCategoryFilter}
            />
          ))}
        </div>
      </div>
      {/* Priority */}
      <div className="navbar_list_filter_header">
        <h4>Priority</h4>
        <div className="navbar_filter_list">
          {priorityValues.map((priority, i) => (
            <ButtonFilter
              key={i}
              value={priority.value}
              bgColor={priority.bgColor}
              color={priority.color}
              text={priority.text}
              valueClick={priorityFilter}
              onClickFilter={setPriorityFilter}
            />
          ))}
        </div>
      </div>
      {/* Submit search */}
      <div className="navbar_filter_submit">
        <button onClick={handleClick}>
          <h4>Search</h4>
        </button>
      </div>
    </div>
  );
}

export default Filter;
