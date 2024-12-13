'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        onLogin(); // Close modal and retry transaction
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login to Payment Service</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const BuyButton = ({ houseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [housePrice, setHousePrice] = useState(null);
  const router = useRouter();

  // Fetch house details to get price
  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/houses/${houseId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setHousePrice(data.price);
        }
      } catch (error) {
        console.error('Failed to fetch house price', error);
      }
    };

    if (houseId) {
      fetchHouseDetails();
    }
  }, [houseId]);

  const performTransaction = async () => {
    setIsLoading(true);
    setMessage("");
  
    try {
      // Transfer money to seller (user with ID 4)
      const transferResponse = await fetch('http://localhost:3001/api/transactions/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientId: 4, // Hardcoded seller ID
          amount: housePrice
        }),
        credentials: 'include'
      });
  
      if (!transferResponse.ok) {
        // Check if the error is due to authentication
        if (transferResponse.status === 401) {
          setShowLoginModal(true);
          return;
        }
  
        // Parse error message from the transfer response
        const errorData = await transferResponse.json();
        setMessage(errorData.message || "Transaction failed");
        return;
      }
  
      // If transfer is successful, proceed with house purchase
      const houseResponse = await fetch(`http://localhost:8080/houses/${houseId}/buy`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      // Handle different response scenarios
      if (houseResponse.status === 204) {
        // No content response (successful purchase)
        setMessage("House purchased successfully!");
      } else if (houseResponse.ok) {
        // If there's a JSON response
        try {
          const data = await houseResponse.json();
          setMessage("House purchased successfully!");
          console.log("Purchased house:", data);
        } catch (jsonError) {
          // If json() fails, but status is ok
          setMessage("House purchased successfully!");
        }
      } else {
        // Handle error responses
        try {
          const errorData = await houseResponse.json();
          setMessage(errorData.message || "Failed to buy the house.");
        } catch {
          // If parsing JSON fails, use a generic message
          setMessage("Failed to buy the house.");
        }
      }
    } catch (error) {
      setMessage("An error occurred while buying the house.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={performTransaction}
          disabled={isLoading || !housePrice}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : `Buy House ${housePrice ? `($${housePrice.toLocaleString()})` : ''}`}
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={() => {
            setShowLoginModal(false);
            performTransaction(); // Retry transaction after login
          }}
        />
      )}
    </>
  );
};

export default BuyButton;