import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Instagram, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">AgendaFácil</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/booking" className="text-gray-600 hover:text-blue-600">
              Agendar
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-red-600">
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : !isAuthPage ? (
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                <User className="h-6 w-6" />
              </Link>
            ) : null}
            <a href="#" className="text-gray-600 hover:text-pink-600">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 AgendaFácil. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;