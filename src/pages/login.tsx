import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../api/apiClient';
import "../app/globals.css";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Image from 'next/image';




const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    setSnackbarVisible(false);
  
    try {
      const response = await apiClient.post('/kardeloApi/login', { username, password });
  
      if (response.data?.result?.data?.error) {
        setError(response.data.result.data.error);
        setLoading(false);
        setSnackbarVisible(true);
        return;
      }
  
      const { token, user, expirationTime } = response.data.result.data;
      console.log(expirationTime, expirationTime.toString());
  
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userId', user.id);
  
      if (token) {
        // Set cookies manually
        const expirationDate = new Date(parseInt(expirationTime)).toUTCString();

        localStorage.setItem('authToken', token);
        localStorage.setItem('authExpirationTime', expirationTime.toString());
        document.cookie = `authToken=${token}; expires=${expirationDate}; path=/; Secure; SameSite=Strict`;
        document.cookie = `authExpirationTime=${expirationTime}; expires=${expirationDate}; path=/; Secure; SameSite=Strict`;
  
        setSuccess('Login successful! Redirecting...');
        setSnackbarVisible(true);
  
        setRedirecting(true);
  
        setTimeout(() => {
          router.replace('/home');
        }, 1000);
      } else {
        setError('Login failed: No token received');
        setSnackbarVisible(true);
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again.');
      console.error('Login failed:', error);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex items-center min-h-screen bg-blue-500">
      <div className="w-1/3 py-8 px-10 bg-white h-screen justify-center items-center flex flex-col rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">Login</h1>
        <div className='w-full'>
          <label htmlFor="username" className="block font-bold mb-2 text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Username"
            disabled={loading || redirecting}
          />
        </div>
        <div className="mt-4 relative w-full">
          <label htmlFor="password" className="block mb-2 font-bold text-gray-700">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Password"
            disabled={loading || redirecting}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)} 
            className="absolute right-3 top-1/2 transform -translate-y-1/5 text-gray-500"
          >
            {showPassword ? <IoEyeOffOutline className='h-8 w-8'/> : <IoEyeOutline className='h-8 w-8'/>  }
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <button
          onClick={handleLogin}
          className={`w-full p-3 rounded-lg mt-6 ${loading || redirecting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white transition duration-200`}
          disabled={loading || redirecting}
        >
          {loading || redirecting ? (
            <span>Loading...</span>
          ) : (
            'Login'
          )}
        </button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <button
            onClick={() => router.push('/register')}
            className="text-blue-600 hover:text-blue-800"
          >
            Register
          </button>
        </div>
      </div>
      <div className='w-2/3 h-screen flex justify-center text-left font-bold text-white'>
        <div className='flex flex-col justify-center m-auto '>

        <div style={{width:500, height:500}}>
        <img src={'/assets/kardello-blue.png'} className='w-full h-full' alt='Logo'/>
        </div>
            {/* <h1 className='text-4xl mb-2'>Kardello</h1>
            <h1 className='text-xl max-w-lg break-words'>Where Ideas Take Shape and Goals Take Flight.</h1>
            <h1 className='text-xl max-w-lg break-words'>Trello Inspired</h1> */}

          </div>
          
      </div>

      {snackbarVisible && (
        <div className={`fixed bottom-0 left-4 mb-6 px-6 py-3 ${success ? 'bg-green-500' :'bg-red-500'}  text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out`}
             style={{ visibility: snackbarVisible ? 'visible' : 'hidden', opacity: snackbarVisible ? 1 : 0 }}>
          <span>{success || error}</span>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
