// src/pages/AdminUserManagement.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminUserManagement.css"; // create your own styles

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    document.title = "Admin – User Management";
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/users`, { withCredentials: true });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccountChange = async (userId, newAccount) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/users/${userId}/account`,
        { account: newAccount },
        { withCredentials: true }
      );

      setUsers(users.map(u => u._id === userId ? { ...u, account: newAccount } : u));
    } catch (err) {
      console.error(err);
      alert("Failed to update account level.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <div className="admin-user-management">
      <h1>User Management</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Current Account</th>
            <th>Change Account</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.account}</td>
              <td>
                <select
                  value={user.account}
                  onChange={(e) => handleAccountChange(user._id, parseInt(e.target.value))}
                >
                  <option value={0}>Basic User</option>
                  <option value={1}>Playwright</option>
                  <option value={2}>Null</option>
                  <option value={3}>Unlocked Playwright</option>
                  <option value={4}>Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;
