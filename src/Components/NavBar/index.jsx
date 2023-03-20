import React, { useContext } from "react";

//* Import context
import { UserContext } from "../../Contexts/UserContext";

//* Import Components
import TaskGroups from "./TaskGroups";
import Filter from "./Filter";

function NavBar() {
  const { username } = useContext(UserContext);

  return (
    <div className="container_navbar">
      {/* User information */}
      <div className="navbar_userinfo">
        <h2>Hello, {username}</h2>
      </div>
      {/* Group of tasks */}
      <TaskGroups />
      {/* Filter */}
      <Filter />
    </div>
  );
}

export default NavBar;