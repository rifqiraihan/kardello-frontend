import { useState } from 'react';
import { useRouter } from 'next/router';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'; // Importing icons
import apiClient from '../api/apiClient'; // Assuming this is set up correctly for your API requests
import "../app/globals.css";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const [redirecting, setRedirecting] = useState(false); // Track redirecting state
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility state
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const router = useRouter();

  const validateForm = () => {
    if (!name || !username || !password) {
      setError('All fields are required');
      setSnackbarVisible(true);
      return false;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      setSnackbarVisible(true);
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setSnackbarVisible(true);
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true); // Start loading state
    setError('');
    setSuccessMessage('');
    setSnackbarVisible(false);

    try {
      const response = await apiClient.post('/kardeloApi/register', { username, password, name });

      if (response.data?.result?.data?.error) {
        setError(response.data.result.data.error);
        setSnackbarVisible(true);
        return;
      }

      setSuccessMessage('Registration successful! Redirecting...');
      setSnackbarVisible(true);

      // Set redirecting state
      setRedirecting(true);

      setTimeout(() => {
        router.push('/login');
      }, 2000); // Delay to show success message
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
      setSnackbarVisible(true);
      console.error('Registration failed:', error);
    } finally {
      setLoading(false); // Stop loading after the request finishes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="w-1/3 p-6 h-full bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Register</h1>
        <div>
          <label htmlFor="name" className="block font-bold mb-2 text-gray-700">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Full Name"
            disabled={loading || redirecting} // Disable during loading or redirecting
          />
        </div>
        <div className="mt-4">
          <label htmlFor="username" className="block mb-2 font-bold text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Username"
            disabled={loading || redirecting} // Disable during loading or redirecting
          />
        </div>
        <div className="mt-4 relative">
          <label htmlFor="password" className="block mb-2 font-bold text-gray-700">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'} // Toggle input type based on state
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Password"
            disabled={loading || redirecting} // Disable during loading or redirecting
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)} // Toggle password visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/5 text-gray-500"
          >
            {showPassword ? <IoEyeOffOutline className="h-8 w-8" /> : <IoEyeOutline className="h-8 w-8" />}
          </button>
        </div>
        <button
          onClick={handleRegister}
          className={`w-full p-3 rounded-lg mt-6 ${loading || redirecting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white transition duration-200`}
          disabled={loading || redirecting} // Disable button during loading or redirecting
        >
          {loading || redirecting ? (
            <span>{redirecting ? 'Redirecting...' : 'Registering...'}</span>
          ) : (
            'Register'
          )}
        </button>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <button
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:text-blue-800"
          >
            Login
          </button>
        </div>
      </div>

      {snackbarVisible && (
        <div
          className={`fixed bottom-0 left-4 mb-6 px-6 py-3 ${successMessage ? 'bg-green-500' : 'bg-red-500'} text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out`}
          style={{ visibility: snackbarVisible ? 'visible' : 'hidden', opacity: snackbarVisible ? 1 : 0 }}
        >
          <span>{successMessage || error}</span>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
