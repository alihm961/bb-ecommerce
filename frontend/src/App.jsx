import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LandingPage from './pages/LandingPage/LandingPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import AuthPage from './pages/AuthPage/AuthPage';

import AdminRoutes from './routes/AdminRoutes';
import CustomerRoutes from './routes/CustomerRoutes';

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />

      {/* Customer & Admin routes */}
      {CustomerRoutes()}
      {AdminRoutes()}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


