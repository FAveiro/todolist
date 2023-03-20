import { useState } from "react";

import "./App.css";

//* Import Components
import Login from "./Routes/Login";
import Home from "./Routes/Home";

//* Import context
import { UserContext } from "./Contexts/UserContext";

function App() {
  //* Get information for localstorage
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem("Username");
    const initialValue = JSON.parse(JSON.stringify(saved));
    return initialValue   
  });

  return (
    <div>
      <UserContext.Provider value={{ username, setUsername }}>
        {username ? <Home /> : <Login />}
      </UserContext.Provider>
    </div>
  );
}

export default App;