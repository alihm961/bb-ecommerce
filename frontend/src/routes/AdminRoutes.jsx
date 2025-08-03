import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes/';
import AddProduct from '../pages/Admin/AddProduct/AddProduct';
import Inventory from '../pages/Admin/Inventory/Inventory';
import SalesUsers from '../pages/Admin/SalesUsers/SalesUsers';

export default function AdminRoutes() {
return (
    <>
    <Route path="/admin/add-product" element={<ProtectedRoute roles={['admin']}><AddProduct /></ProtectedRoute>
        } 
    />
    <Route path="/admin/inventory" element={<ProtectedRoute roles={['admin']}><Inventory /></ProtectedRoute>
        } 
    />
    <Route path="/admin/sales-users" element={<ProtectedRoute roles={['admin']}><SalesUsers /></ProtectedRoute>
        } 
    />
    </>
);
}
