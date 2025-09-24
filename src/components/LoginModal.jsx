import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LoginModal({ onClose }) {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(formData.username, formData.password);

    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-[#a88e73]/30 to-[#766351]/30 backdrop-blur-md flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-0 overflow-hidden border border-[#a88e73]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#a88e73] to-[#766351] px-6 py-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white tracking-wide">Sign In</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-black transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#766351] mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-[#a88e73] rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#a88e73] focus:border-[#766351] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#766351] mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-[#a88e73] rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#a88e73] focus:border-[#766351] transition-all"
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#a88e73] to-[#766351] text-white font-semibold text-lg shadow-md hover:from-[#766351] hover:to-[#a88e73] transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="bg-[#f7f3ef] px-6 py-4 text-sm text-[#766351] border-t border-[#a88e73]/20">
          <p className="font-semibold mb-1">Demo credentials:</p>
          <div className="flex gap-6">
            <p><span className="font-medium">Username:</span> user</p>
            <p><span className="font-medium">Password:</span> 123</p>
          </div>
        </div>
      </div>
    </div>
  );
}