import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function VendorDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get(`/vendors/${id}`).then((res) => setVendor(res.data));
    api.get(`/products/vendor/${id}`).then((res) => setProducts(res.data));
  }, [id]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product === product._id);
      if (existing) {
        return prev.map((i) => (i.product === product._id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { product: product._id, title: product.title, price: product.price, quantity: 1 }];
    });
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const placeOrder = async () => {
    if (!user) return alert('Pehle login karein');
    if (cart.length === 0) return alert('Cart khali hai');

    try {
      await api.post('/orders', {
        vendor: id,
        type: vendor.type === 'hotel' ? 'hotel_booking' : vendor.type === 'mart' ? 'grocery' : 'food_delivery',
        items: cart,
        totalAmount: total,
      });
      alert('Order place ho gaya!');
      setCart([]);
    } catch (err) {
      alert(err.response?.data?.message || 'Order fail ho gaya');
    }
  };

  if (!vendor) return <p style={{ padding: 16 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h1>{vendor.name}</h1>
      <p style={{ color: '#666' }}>{vendor.type} · {vendor.location?.city}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 20 }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: '1px solid #eee', borderRadius: 10, padding: 12 }}>
            <h4 style={{ margin: '0 0 4px' }}>{p.title}</h4>
            <p style={{ margin: 0, fontSize: 14, color: '#666' }}>{p.description}</p>
            <p style={{ margin: '6px 0', fontWeight: 600 }}>
              Rs. {vendor.type === 'hotel' ? p.pricePerNight + '/night' : p.price}
            </p>
            <button onClick={() => addToCart(p)} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
              Add
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: '1px solid #eee', padding: 16, marginTop: 20 }}>
          <p>Total: Rs. {total}</p>
          <button onClick={placeOrder} style={{ padding: '10px 20px', borderRadius: 6, border: 'none', background: '#16a34a', color: '#fff', cursor: 'pointer' }}>
            Order Place Karein ({cart.length} items)
          </button>
        </div>
      )}
    </div>
  );
}
