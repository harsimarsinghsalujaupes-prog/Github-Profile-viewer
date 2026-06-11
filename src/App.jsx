import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div>
      <h1>GitHub Profile Viewer</h1>

      <input
        type="text"
        placeholder="Enter GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {userData && (
        <div>
          <img
            src={userData.avatar_url}
            alt="Profile"
            width="150"
          />

          <h2>{userData.name}</h2>

          <p>{userData.bio}</p>

          <p>Followers: {userData.followers}</p>

          <p>Following: {userData.following}</p>

          <p>Repositories: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default App;