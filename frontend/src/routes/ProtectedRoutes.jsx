import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roles }) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user.role?.toLowerCase();

    console.log("DEBUG:", { token, user, role, roles });

    if (!token) return <Navigate to="/login" />;
    if (!role) return <div>Loading...</div>; // wait for user data

    if (roles && !roles.map(r => r.toLowerCase()).includes(role)) {
    return <Navigate to="/" />;
}

    return children;
}