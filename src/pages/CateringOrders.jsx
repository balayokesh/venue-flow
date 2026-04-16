// src/pages/CateringOrders.jsx
import { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';

const CateringOrders = () => {
  const { currentRole } = useRole();

  const [orders, setOrders] = useState([
    {
      id: "VF-78492",
      seat: "Section-C-Row-12-Seat-45",
      items: [
        { name: "Classic Cheeseburger", qty: 1 },
        { name: "Large Pepsi", qty: 2 },
        { name: "Veg Paneer Wrap", qty: 1 }
      ],
      total: 740,
      status: "preparing", // received, preparing, ready, completed
      time: "2 min ago"
    },
    {
      id: "VF-78491",
      seat: "Section-B-Row-8-Seat-12",
      items: [
        { name: "Chicken Shawarma", qty: 2 },
        { name: "Cold Coffee", qty: 1 }
      ],
      total: 520,
      status: "received",
      time: "8 min ago"
    },
    {
      id: "VF-78490",
      seat: "Section-D-Row-15-Seat-33",
      items: [
        { name: "Veg Burger Combo", qty: 1 }
      ],
      total: 320,
      status: "ready",
      time: "15 min ago"
    }
  ]);

  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));

    const statusMessages = {
      preparing: "Order moved to Preparing",
      ready: "Order is now Ready for Pickup!",
      completed: "Order marked as Completed"
    };

    alert(statusMessages[newStatus] || "Status updated");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-blue-500 text-white';
      case 'preparing': return 'bg-yellow-500 text-black';
      case 'ready': return 'bg-green-500 text-white';
      case 'completed': return 'bg-gray-600 text-white';
      default: return 'bg-zinc-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'received': return 'Received';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready for Pickup';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Live Orders</h1>
            <p className="text-zinc-400">Manage and update order status for Express Pickup</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">Total Active Orders</p>
            <p className="text-3xl font-bold text-green-400">{orders.length}</p>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700 hover:border-green-500 transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-green-400 font-bold text-xl">{order.id}</span>
                    <span className="text-sm px-3 py-1 bg-zinc-800 rounded-full">
                      {order.time}
                    </span>
                  </div>

                  <p className="text-xl font-semibold mb-2">Seat: <span className="text-green-400">{order.seat}</span></p>

                  <div className="mt-4">
                    <p className="text-zinc-400 text-sm mb-2">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-white">
                          • {item.name} × {item.qty}
                        </p>
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 text-xl font-bold">Total: ₹{order.total}</p>
                </div>

                {/* Status & Actions */}
                <div className="md:w-80 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-zinc-400 mb-2">Current Status</p>
                    <div className={`inline-block px-6 py-2 rounded-2xl font-semibold text-sm ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-8">
                    {order.status !== 'preparing' && (
                      <button
                        onClick={() => updateStatus(order.id, 'preparing')}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-2xl font-semibold transition-colors"
                      >
                        Mark as Preparing
                      </button>
                    )}

                    {order.status !== 'ready' && (
                      <button
                        onClick={() => updateStatus(order.id, 'ready')}
                        className="bg-green-600 hover:bg-green-500 py-3 rounded-2xl font-semibold transition-colors"
                      >
                        Mark as Ready for Pickup
                      </button>
                    )}

                    {order.status !== 'completed' && (
                      <button
                        onClick={() => updateStatus(order.id, 'completed')}
                        className="bg-gray-700 hover:bg-gray-600 py-3 rounded-2xl font-semibold transition-colors"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-20 text-zinc-400">
            No orders yet. Orders placed by attendees will appear here.
          </div>
        )}

        <div className="mt-12 text-center text-zinc-500 text-sm">
          Tip: Place an order from the Attendee portal, then come here to update its status.
        </div>
      </div>
    </div>
  );
};

export default CateringOrders;