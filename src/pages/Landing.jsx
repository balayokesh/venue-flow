// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

const Landing = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleRoleSelect = (role) => {
    setRole(role);
    if (role === 'attendee') navigate('/attendee/order');
    if (role === 'admin') navigate('/admin');
    if (role === 'catering') navigate('/catering');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Venue-Flow</h1>
        <p className="text-xl text-green-300 mb-12">
          Order food from your seat. Skip the queues. Enjoy the game.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Attendee Card */}
          <div 
            onClick={() => handleRoleSelect('attendee')}
            className="bg-zinc-900 border border-green-500 hover:border-green-400 p-8 rounded-2xl cursor-pointer transition-all hover:scale-105"
          >
            <div className="text-5xl mb-6">👤</div>
            <h2 className="text-2xl font-semibold text-white mb-3">Attendee Portal</h2>
            <p className="text-zinc-400">Scan QR at your seat and order food instantly</p>
          </div>

          {/* Admin Card */}
          <div 
            onClick={() => handleRoleSelect('admin')}
            className="bg-zinc-900 border border-blue-500 hover:border-blue-400 p-8 rounded-2xl cursor-pointer transition-all hover:scale-105"
          >
            <div className="text-5xl mb-6">⚙️</div>
            <h2 className="text-2xl font-semibold text-white mb-3">Admin Portal</h2>
            <p className="text-zinc-400">Manage QR codes, stands &amp; menu</p>
          </div>

          {/* Catering Card */}
          <div 
            onClick={() => handleRoleSelect('catering')}
            className="bg-zinc-900 border border-orange-500 hover:border-orange-400 p-8 rounded-2xl cursor-pointer transition-all hover:scale-105"
          >
            <div className="text-5xl mb-6">🍔</div>
            <h2 className="text-2xl font-semibold text-white mb-3">Catering Portal</h2>
            <p className="text-zinc-400">Manage orders and update status</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;