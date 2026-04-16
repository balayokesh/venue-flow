// src/pages/CateringDashboard.jsx
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

const CateringDashboard = () => {
  const { currentRole } = useRole();

  const stats = [
    {
      title: "Pending Orders",
      value: "24",
      color: "text-yellow-400",
      icon: "⏳"
    },
    {
      title: "Ready for Pickup",
      value: "12",
      color: "text-green-400",
      icon: "✅"
    },
    {
      title: "Orders Today",
      value: "87",
      color: "text-blue-400",
      icon: "📊"
    },
    {
      title: "Avg. Prep Time",
      value: "11 min",
      color: "text-purple-400",
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Catering Dashboard</h1>
          <p className="text-zinc-400">Kitchen & Express Pickup Management</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <p className="text-4xl font-bold mb-1">{stat.value}</p>
              <p className={`text-lg ${stat.color}`}>{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              to="/catering/orders"
              className="bg-zinc-900 hover:bg-zinc-800 border border-green-600 hover:border-green-400 rounded-3xl p-10 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="text-6xl">📋</div>
                <div>
                  <h3 className="text-3xl font-semibold group-hover:text-green-400 transition-colors">
                    View All Orders
                  </h3>
                  <p className="text-zinc-400 mt-3 text-lg">
                    Manage incoming orders and update their status
                  </p>
                </div>
              </div>
            </Link>

            <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-700">
              <div className="flex items-center gap-6">
                <div className="text-6xl">🏪</div>
                <div>
                  <h3 className="text-3xl font-semibold">Stand Status</h3>
                  <p className="text-zinc-400 mt-3 text-lg">
                    Currently all stands are operational<br />
                    Average wait time: <span className="text-green-400">9 minutes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Preview */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            <Link 
              to="/catering/orders" 
              className="text-green-400 hover:text-green-300 font-medium flex items-center gap-2"
            >
              View All Orders →
            </Link>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center py-5 border-b border-zinc-800">
                <div className="flex-1">
                  <p className="font-medium">Order #VF-78492</p>
                  <p className="text-sm text-zinc-400">Seat: Section-C-Row-12-Seat-45 • 3 items</p>
                </div>
                <div className="text-yellow-400 font-medium">Preparing</div>
              </div>

              <div className="flex justify-between items-center py-5 border-b border-zinc-800">
                <div className="flex-1">
                  <p className="font-medium">Order #VF-78491</p>
                  <p className="text-sm text-zinc-400">Seat: Section-B-Row-8-Seat-12 • 2 items</p>
                </div>
                <div className="text-green-400 font-medium">Ready for Pickup</div>
              </div>

              <div className="flex justify-between items-center py-5">
                <div className="flex-1">
                  <p className="font-medium">Order #VF-78490</p>
                  <p className="text-sm text-zinc-400">Seat: Section-D-Row-15-Seat-33 • 4 items</p>
                </div>
                <div className="text-blue-400 font-medium">Order Received</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CateringDashboard;