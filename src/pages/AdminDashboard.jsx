// src/pages/AdminDashboard.jsx
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

const AdminDashboard = () => {
  const { currentRole } = useRole();

  const stats = [
    {
      title: "Total Orders Today",
      value: "142",
      change: "+18%",
      color: "text-green-400"
    },
    {
      title: "Active Orders",
      value: "37",
      change: "In Progress",
      color: "text-yellow-400"
    },
    {
      title: "QR Codes Generated",
      value: "248",
      change: "This Week",
      color: "text-blue-400"
    },
    {
      title: "Avg. Order Value",
      value: "₹680",
      change: "+12%",
      color: "text-green-400"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-zinc-400">Welcome back, Venue Organizer</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
              <p className="text-zinc-400 text-sm mb-2">{stat.title}</p>
              <p className="text-4xl font-bold mb-1">{stat.value}</p>
              <p className={`text-sm ${stat.color}`}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* QR Generator Card */}
            <Link 
              to="/admin/qr-generator"
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-green-500 rounded-3xl p-8 transition-all group"
            >
              <div className="text-5xl mb-6">📱</div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-green-400">QR Code Generator</h3>
              <p className="text-zinc-400">Generate and print QR codes for seats</p>
            </Link>

            {/* Manage Stands */}
            <Link 
              to="/admin/stands"
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-blue-500 rounded-3xl p-8 transition-all group"
            >
              <div className="text-5xl mb-6">🏪</div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-400">Manage Pickup Stands</h3>
              <p className="text-zinc-400">Add, edit or remove Express Pickup counters</p>
            </Link>

            {/* Manage Menu */}
            <Link 
              to="/admin/menu"
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-purple-500 rounded-3xl p-8 transition-all group"
            >
              <div className="text-5xl mb-6">🍔</div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-purple-400">Manage Menu</h3>
              <p className="text-zinc-400">Update food items and pricing</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <Link to="/catering/orders" className="text-green-400 hover:text-green-300 text-sm font-medium">
              View All Orders →
            </Link>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-zinc-800">
                <div>
                  <p className="font-medium">Order #VF-78492 placed</p>
                  <p className="text-sm text-zinc-400">Seat C-12-45 • 3 items • ₹740</p>
                </div>
                <span className="text-yellow-400 text-sm">Just now</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-zinc-800">
                <div>
                  <p className="font-medium">QR Codes generated for Section D</p>
                  <p className="text-sm text-zinc-400">Rows 8–14 • 84 QR codes</p>
                </div>
                <span className="text-zinc-500 text-sm">2 hours ago</span>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium">Stand A wait time updated</p>
                  <p className="text-sm text-zinc-400">Now showing 8 minutes</p>
                </div>
                <span className="text-zinc-500 text-sm">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;