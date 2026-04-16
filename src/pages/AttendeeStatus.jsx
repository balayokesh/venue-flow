// src/pages/AttendeeStatus.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

const AttendeeStatus = () => {
  const [searchParams] = useSearchParams();
  const { currentRole } = useRole();

  const [seat, setSeat] = useState('');
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('preparing'); // received, preparing, ready, completed

  // Get seat from URL
  useEffect(() => {
    const seatParam = searchParams.get('seat');
    if (seatParam) {
      setSeat(seatParam);
    } else {
      setSeat('Section-C-Row-12-Seat-45'); // Demo fallback
    }
  }, [searchParams]);

  // Simulate a placed order (In real app, this would come from context or backend)
  useEffect(() => {
    // Mock order data
    const mockOrder = {
      orderId: "VF-78492",
      seat: seat,
      items: [
        { name: "Classic Cheeseburger", price: 280, quantity: 1 },
        { name: "Large Pepsi", price: 120, quantity: 2 },
        { name: "Veg Paneer Wrap", price: 220, quantity: 1 }
      ],
      total: 740,
      estimatedTime: 12,
      placedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setOrder(mockOrder);
  }, [seat]);

  const getStatusInfo = () => {
    switch (status) {
      case 'received':
        return { text: 'Order Received', color: 'text-blue-400', bg: 'bg-blue-900' };
      case 'preparing':
        return { text: 'Preparing Your Order', color: 'text-yellow-400', bg: 'bg-yellow-900' };
      case 'ready':
        return { text: 'Ready for Pickup!', color: 'text-green-400', bg: 'bg-green-900' };
      case 'completed':
        return { text: 'Order Completed', color: 'text-gray-400', bg: 'bg-gray-800' };
      default:
        return { text: 'Preparing', color: 'text-yellow-400', bg: 'bg-yellow-900' };
    }
  };

  const statusInfo = getStatusInfo();

  const simulateStatusChange = () => {
    if (status === 'received') setStatus('preparing');
    else if (status === 'preparing') setStatus('ready');
    else if (status === 'ready') setStatus('completed');
  };

  if (!order) {
    return <div className="text-center py-20">Loading your order...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Order Status</h1>
          <p className="text-green-400">Seat: <span className="font-semibold">{seat}</span></p>
        </div>

        {/* Order Card */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-zinc-400 text-sm">Order ID</p>
              <p className="text-2xl font-mono font-bold text-green-400">{order.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-400 text-sm">Placed at</p>
              <p className="font-medium">{order.placedTime}</p>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`rounded-2xl p-6 mb-8 text-center ${statusInfo.bg}`}>
            <p className={`text-2xl font-semibold ${statusInfo.color}`}>
              {statusInfo.text}
            </p>
            {status === 'ready' && (
              <p className="text-green-300 mt-2">Please proceed to Express Pickup Counter</p>
            )}
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Your Order</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-zinc-700">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between text-xl font-bold border-t border-zinc-700 pt-6">
            <span>Total Amount</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* Estimated Time */}
        {status !== 'completed' && (
          <div className="bg-zinc-900 rounded-2xl p-6 mb-8 text-center">
            <p className="text-zinc-400">Estimated Ready Time</p>
            <p className="text-5xl font-bold text-green-400 mt-2">
              {order.estimatedTime} mins
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {status === 'ready' && (
            <button className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-semibold text-lg">
              I Have Picked Up My Order
            </button>
          )}

          <button
            onClick={simulateStatusChange}
            className="w-full bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl font-medium text-zinc-300"
          >
            Simulate Status Change (For Demo)
          </button>

          <Link
            to="/attendee/order"
            className="w-full text-center py-4 text-green-400 hover:text-green-300 font-medium"
          >
            ← Order More Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AttendeeStatus;