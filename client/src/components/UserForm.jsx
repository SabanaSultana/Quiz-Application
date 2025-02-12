import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/user",
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UserForm;
