import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/my').then((res) => setOrders(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 16 }}>
      <h2>Mere Orders</h2>
      {orders.length === 0 && <p>Koi order nahi mila.</p>}
      {orders.map((o) => (
        <div key={o._id} style={{ border: '1px solid #eee', borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <p style={{ margin: 0, fontWeight: 600 }}>{o.vendor?.name} — {o.type}</p>
          <p style={{ margin: '4px 0', color: '#666' }}>Status: {o.status}</p>
          <p style={{ margin: 0 }}>Total: Rs. {o.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}
