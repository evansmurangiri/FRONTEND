import React, { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../utils/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await fetchAllUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border">
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.isAdmin ? "Admin" : "User"}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
