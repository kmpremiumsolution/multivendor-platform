import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const TYPES = [
  { key: '', label: 'Sab' },
  { key: 'restaurant', label: 'Restaurants' },
  { key: 'hotel', label: 'Hotels' },
  { key: 'mart', label: 'Mart' },
];

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get('/vendors', { params: type ? { type } : {} })
      .then((res) => setVendors(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h1>Multi-Vendor Marketplace</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => setType(t.key)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: type === t.key ? '2px solid #2563eb' : '1px solid #ccc',
              background: type === t.key ? '#eff6ff' : '#fff',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {vendors.map((v) => (
          <Link
            key={v._id}
            to={`/vendor/${v._id}`}
            style={{ border: '1px solid #eee', borderRadius: 10, padding: 12, textDecoration: 'none', color: '#111' }}
          >
            <h3 style={{ margin: '0 0 4px' }}>{v.name}</h3>
            <p style={{ margin: 0, color: '#666', fontSize: 14 }}>{v.type} · {v.location?.city}</p>
            <p style={{ margin: '4px 0 0', fontSize: 14 }}>⭐ {v.rating || 'New'}</p>
          </Link>
        ))}
      </div>

      {!loading && vendors.length === 0 && <p>Koi vendor nahi mila.</p>}
    </div>
  );
}
