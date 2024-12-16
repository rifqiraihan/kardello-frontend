import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '../components/List';
import Headers from '../components/Headers';
import "../app/globals.css";

const HomePage = () => {
  const [showExpiredPopup, setShowExpiredPopup] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const router = useRouter();

  const handlePopupClose = () => {
    setShowExpiredPopup(false);
    router.replace('/login');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('authToken');
      const expirationTime = localStorage.getItem('authExpirationTime');
      const currentTime = Date.now();

      if (!token || !expirationTime || currentTime >= parseInt(expirationTime)) {
        setSessionExpired(true);
        setShowExpiredPopup(true);
      } else {
        setSessionExpired(false);
        setShowExpiredPopup(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto">
      <Headers />
      <List />

      {showExpiredPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-red-500 mb-4">Session Expired</h2>
            <p>Your session has expired. Please log in again to continue.</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handlePopupClose}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showExpiredPopup && (
        <div className="absolute inset-0 bg-gray-100 opacity-50 pointer-events-none"></div>
      )}
    </div>
  );
};

export default HomePage;
