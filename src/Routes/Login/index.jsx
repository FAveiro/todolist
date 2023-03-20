import React, { useState, useContext } from "react";

//* Import context
import { UserContext } from "../../Contexts/UserContext";

function Login() {
  const [ error, setError ] = useState(false);
  const [ user, setUser ] = useState("");
  const { setUsername } = useContext(UserContext);

  const handleSubmit = () => {
    if (!user) {
      setError(true);
    } else {
      localStorage.setItem('Username', user)
      setUsername(user);
    }
  };

  return (
    <div className="container_login">
      <h1>Task Management</h1>
      {/* Card */}
      <div className="card_login">
        {/* Card - Tittle */}
        <div className="card_login_title">
          <h2>Welcome back!</h2>
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sem elit, semper quis dignissim quis, finibus sed sem.
          </h4>
        </div>
        {/* Card - Input */}
        <div className="card_login_input">
          <h4>Insert username</h4>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={(event) => setUser(event.target.value)}
          />
          {error && (
            <label className="card_login_input_error">
              You need insert a Username.
            </label>
          )}
        </div>
        {/* Card - Submit */}
        <div className="card_login_submit">
          <button onClick={handleSubmit}>Enter</button>
        </div>
      </div>
    </div>
  );
}

export default Login;