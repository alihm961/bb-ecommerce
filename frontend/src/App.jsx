import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
// import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import Login from './pages/AuthPage/Login';
import Register from './pages/AuthPage/Register';
import CartPage from "./pages/CartPage/CartPage";
import AddProduct from './pages/Admin/AddProduct/AddProduct';
import Inventory from './pages/Admin/Inventory/Inventory';
import SalesUsers from './pages/Admin/SalesUsers/SalesUsers'
;
import UserDashboardPage from "./pages/UserDashboardPage/UserDashboardPage";
import ProtectedRoute from './routes/ProtectedRoutes';

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/catalog" element={<CatalogPage />} /> */}
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/userdashboard" element={<UserDashboardPage />} />
      
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/cartpage" element={<CartPage />} />
    {/* admin routes */}
    <>
    <Route path="/admin/add-product" element={<ProtectedRoute roles={['admin']}><AddProduct /></ProtectedRoute>} />
    <Route path="/admin/inventory" element={<ProtectedRoute roles={['admin']}><Inventory /></ProtectedRoute>} />
    <Route path="/admin/sales-users" element={<ProtectedRoute roles={['admin']}><SalesUsers /></ProtectedRoute>} />
    </>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
