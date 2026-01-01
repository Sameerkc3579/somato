import React, { useEffect, useState } from "react";
import { Trash2, ShieldAlert, Loader } from "lucide-react"; // Icons
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import Auth to check role

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useAuth(); // Get current logged-in user
  const navigate = useNavigate();

  // 1. SECURITY CHECK: Kick out non-admins
  useEffect(() => {
    // If no user is logged in, OR the user is not an admin (assuming you have a role property)
    // Note: If your user object doesn't have 'role', we can skip the role check for now.
    if (!user) {
        navigate("/login");
    }
    // Uncomment this if your database has roles:
    // if (user && user.role !== 'admin') { navigate('/'); }
  }, [user, navigate]);

  // 2. Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:4000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load users. Is the server running?");
        setLoading(false);
      });
  };

  // 3. Delete User Handler
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "DELETE",
      })
      .then((res) => {
        if (res.ok) {
            // Remove from UI immediately without refreshing
            setUsers(users.filter(u => u._id !== userId));
        } else {
            alert("Failed to delete user");
        }
      })
      .catch(err => console.error(err));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-10 h-10 text-red-600 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600">
        <ShieldAlert className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold">{error}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                👥 User Database
                <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">{users.length} Total</span>
            </h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="p-4 font-bold text-gray-600 text-sm uppercase tracking-wider">User</th>
                <th className="p-4 font-bold text-gray-600 text-sm uppercase tracking-wider">Email</th>
                <th className="p-4 font-bold text-gray-600 text-sm uppercase tracking-wider">Status</th>
                <th className="p-4 font-bold text-gray-600 text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                        {u.image ? <img src={u.image} alt={u.name} className="w-full h-full rounded-full object-cover"/> : u.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{u.name}</p>
                        <p className="text-xs text-gray-500">ID: {u._id.slice(-6)}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-medium">{u.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                        onClick={() => handleDelete(u._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete User"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                <p>No users found in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;