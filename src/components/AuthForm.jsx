import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';

const AuthForm = ({ type, onSubmit, error, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isLogin = type === 'login';

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-slate-500 mt-2">
          {isLogin 
            ? 'Sign in to continue your conversation' 
            : 'Join us and start chatting with AI'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              className="input pl-10"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="input pl-10"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full h-12 flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            isLogin ? 'Sign In' : 'Create Account'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-600">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
              Register here
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
