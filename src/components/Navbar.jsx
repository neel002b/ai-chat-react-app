import { Link, useLocation } from 'react-router-dom';
import { LogOut, MessageSquare, Database } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { logoutUser, user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-600 p-2 rounded-lg text-white group-hover:bg-primary-700 transition-colors shadow-md shadow-primary-100">
                <MessageSquare size={20} />
              </div>
              <span className="text-xl font-bold text-slate-800">AI Chat</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Chat
              </Link>
              <Link
                to="/knowledge-base"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive('/knowledge-base') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Database size={16} />
                Knowledge Base
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-slate-600 hidden lg:block border-r border-slate-200 pr-4 mr-1">
                Hello, <span className="font-medium text-slate-900">{user.email}</span>
              </span>
            )}
            
            <div className="md:hidden flex items-center mr-2">
               <Link
                to="/knowledge-base"
                className={`p-2 rounded-lg ${isActive('/knowledge-base') ? 'text-primary-600 bg-primary-50' : 'text-slate-600'}`}
              >
                <Database size={20} />
              </Link>
            </div>

            <button 
              onClick={logoutUser}
              className="btn btn-secondary flex items-center gap-2 text-sm h-10"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
