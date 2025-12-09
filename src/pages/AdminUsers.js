import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../App.css";
import "../css/AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch all users from DB
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users`, {
        withCredentials: true,
      });

      console.log("Fetched users:", res.data);

      // Support both formats: { users: [] } or [user, user]
      const userList = Array.isArray(res.data)
        ? res.data
        : res.data.users || [];

      setUsers(userList);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Update user account level
  const handleAccountChange = async (id, newLevel) => {
    try {
      await axios.put(
        `${API_URL}/api/users/${id}/account`,
        { account: newLevel },
        { withCredentials: true }
      );

      fetchUsers();
    } catch (err) {
      console.error("Failed to update account level:", err);
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        withCredentials: true,
      });

      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="admin-users-wrapper">
      <h1>Admin User Management</h1>

      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Account Level</th>
            <th>Change Level</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.account}</td>

              <td>
                {[0, 1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    className="level-btn"
                    disabled={user.account === level}
                    onClick={() => handleAccountChange(user._id, level)}
                  >
                    Set {level}
                  </button>
                ))}
              </td>

              <td>
                <button
                  className="delete-user-btn"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
