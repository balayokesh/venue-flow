// src/pages/AttendeeOrder.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { menuData } from '../data/menu';
import { concessionStands } from '../data/stands';

const AttendeeOrder = () => {
  const [searchParams] = useSearchParams();
  const { currentRole } = useRole();

  const [seat, setSeat] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedStand, setSelectedStand] = useState(null);

  // Get seat number from URL (e.g., ?seat=C-12-45)
  useEffect(() => {
    const seatParam = searchParams.get('seat');
    if (seatParam) {
      setSeat(seatParam);
    } else {
      setSeat('Section-C-Row-12-Seat-45'); // Demo fallback
    }
  }, [searchParams]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`✅ Order placed successfully!\nSeat: ${seat}\nItems: ${cart.length}\nTotal: ₹${totalAmount}\n\nYou can now go to /catering/orders to mark it as Ready.`);
    
    // In real app, this would send order to backend
    console.log("Order placed:", { seat, cart, total: totalAmount });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Seat Header */}
        <div className="bg-zinc-900 border border-green-600 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-400 text-sm">You are seated at</p>
              <h1 className="text-3xl font-bold">Seat: <span className="text-green-400">{seat}</span></h1>
            </div>
            <div className="text-right">
              <p className="text-zinc-400">Welcome to Venue-Flow</p>
              <p className="text-sm text-green-500">Express Pickup Only</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-semibold mb-6">Menu</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {menuData.map((item) => (
                <div key={item.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 hover:border-green-500 transition-all">
                  <img 
                    src={item.image || `https://picsum.photos/id/${item.id + 100}/400/200`} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-zinc-400 text-sm">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold text-xl">₹{item.price}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-4 w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg font-medium transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900 rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-semibold mb-6">Your Cart ({cart.length})</h2>

              {cart.length === 0 ? (
                <p className="text-zinc-400 py-8 text-center">Your cart is empty.<br />Add items from the menu.</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.cartId} className="flex justify-between items-center bg-zinc-800 p-4 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-green-400">₹{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-500 hover:text-red-400 text-xl"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-700 pt-6">
                    <div className="flex justify-between text-lg mb-6">
                      <span>Total</span>
                      <span className="font-bold">₹{totalAmount}</span>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-semibold text-lg transition-colors"
                    >
                      Place Order - Express Pickup
                    </button>

                    <p className="text-center text-zinc-500 text-sm mt-4">
                      Order will be ready at nearest Express Pickup counter
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeOrder;