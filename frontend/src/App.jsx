import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VendorDetail from './pages/VendorDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyOrders from './pages/MyOrders';
import VendorDashboard from './pages/VendorDashboard';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor/:id" element={<VendorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route
          path="/vendor-dashboard"
          element={<VendorDashboard />}
        />
      </Routes>
    </>
  );
}
