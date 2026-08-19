import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'customer' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration fail ho gaya');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '60px auto', padding: 16 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input placeholder="Naam" required value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="email" placeholder="Email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input placeholder="Phone" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="password" placeholder="Password" required value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor (restaurant/hotel/mart owner)</option>
        </select>
        {error && <p style={{ color: 'red', fontSize: 14 }}>{error}</p>}
        <button type="submit" style={{ padding: 10, borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: 12, fontSize: 14 }}>
        Pehle se account hai? <Link to="/login">Login karein</Link>
      </p>
    </div>
  );
}
