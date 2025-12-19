import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👥 User Database</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="p-4 font-bold text-gray-600">User</th>
                <th className="p-4 font-bold text-gray-600">Email</th>
                <th className="p-4 font-bold text-gray-600">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                    <span className="font-bold text-gray-800">{user.name}</span>
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="p-8 text-center text-gray-500">No users found yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;