import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../App.css";
import "../css/AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/users`, { withCredentials: true });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // fixed ESLint warning by adding fetchUsers as dependency

  const handleAccountChange = async (id, newLevel) => {
    try {
      await axios.put(`${API_URL}/api/admin/users/${id}/account`, { account: newLevel }, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error("Failed to update account level:", err);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.account}</td>
              <td>
                {[0,1,2,3,4].map(level => (
                  <button
                    key={level}
                    disabled={user.account === level}
                    onClick={() => handleAccountChange(user._id, level)}
                  >
                    Set {level}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
