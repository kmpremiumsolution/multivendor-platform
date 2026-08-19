import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login fail ho gaya');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '60px auto', padding: 16 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input type="email" placeholder="Email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="password" placeholder="Password" required value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        {error && <p style={{ color: 'red', fontSize: 14 }}>{error}</p>}
        <button type="submit" style={{ padding: 10, borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: 12, fontSize: 14 }}>
        Account nahi hai? <Link to="/register">Register karein</Link>
      </p>
    </div>
  );
}
