import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);      // store API data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // empty dependency → runs once when component mounts

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((el) => (
          <li key={el.id}>
            {el.name} ({el.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
