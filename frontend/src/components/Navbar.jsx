import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #eee' }}>
      <Link to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: 'none', color: '#111' }}>MultiVendor</Link>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/my-orders">Mere Orders</Link>
            <span style={{ fontSize: 14, color: '#666' }}>{user.name}</span>
            <button onClick={() => { logout(); navigate('/'); }} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
