import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function VendorDashboard() {
  const { user } = useAuth();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVendor = async () => {
      try {
        const { data } = await api.get('/vendors/mine');
        setVendor(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Vendor profile abhi available nahi hai.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadVendor();
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1>Vendor Dashboard</h1>

      <p>
        Welcome, <strong>{user?.name || 'Vendor'}</strong>
      </p>

      {error && (
        <div
          style={{
            padding: 16,
            marginTop: 20,
            border: '1px solid #ddd',
            borderRadius: 8
          }}
        >
          {error}
        </div>
      )}

      {vendor && (
        <div style={{ marginTop: 24 }}>
          <h2>{vendor.name}</h2>
          <p>
            {vendor.type} · {vendor.location?.city || 'City not set'}
          </p>

          <Link to={`/vendor/${vendor._id}`}>
            View My Listing
          </Link>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginTop: 30
        }}
      >
        <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10 }}>
          <h3>🏨 Hotel Profile</h3>
          <p>Create or edit your hotel information.</p>
        </div>

        <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10 }}>
          <h3>🛏️ Rooms</h3>
          <p>Manage rooms and prices.</p>
        </div>

        <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10 }}>
          <h3>📅 Bookings</h3>
          <p>View customer bookings.</p>
        </div>

        <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 10 }}>
          <h3>👤 Profile</h3>
          <p>Manage your vendor account.</p>
        </div>
      </div>
    </div>
  );
}
