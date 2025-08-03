import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LandingPage from './pages/LandingPage/LandingPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import AuthPage from './pages/AuthPage/AuthPage';
import CartPage from "./pages/CartPage/CartPage";
import AdminRoutes from './routes/AdminRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import UserDashboardPage from "./pages/UserDashboardPage/UserDashboardPage";


export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/productdetails" element={<ProductDetailPage />} />
      <Route path="/userdashboard" element={<UserDashboardPage />} />
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
      <Route path="/cartpage" element={<CartPage />} />


      {CustomerRoutes()}
      {AdminRoutes()}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


