import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../services/auth';
import useAuth from '../hooks/useAuth';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const data = await register(formData.email, formData.password);
      loginUser(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <AuthForm 
        type="register" 
        onSubmit={handleRegister} 
        error={error} 
        loading={loading} 
      />
    </div>
  );
};

export default RegisterPage;
