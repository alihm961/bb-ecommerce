import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes/';
import CartPage from '../pages/CartPage/CartPage';
// import OrdersPage from '../pages/OrdersPage/OrdersPage';
// import Notifications from '../pages/Notifications/Notifications';

export default function CustomerRoutes() {
return (
    <>
    <Route 
        path="/cart"element={<ProtectedRoute roles={['customer']}><CartPage /></ProtectedRoute>
        } 
    // /><Route path="/orders" element={<ProtectedRoute roles={['customer']}><OrdersPage /></ProtectedRoute>
    //     } 
    // /><Route path="/notifications" element={<ProtectedRoute roles={['customer', 'admin']}><Notifications /></ProtectedRoute>
    //     } 
    />
    </>
);
}
