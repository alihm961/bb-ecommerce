import { Routes, Route, Navigate } from 'react-router-dom';


import LandingPage from './pages/LandingPage/LandingPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductDetail from './pages/ProductDetailPage/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';
import AuthPage from './pages/AuthPage/AuthPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import NotificationsPage from './pages/Notifications/Notifications';

export default function App() {
  const { user } = useAuth();

  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/auth" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute roles={['admin']}><JobQueuePage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
    </Routes>
  );
}

