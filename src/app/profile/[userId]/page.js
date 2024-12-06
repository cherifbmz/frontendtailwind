'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // For dynamic route params
import { fetchUserProfile } from '@/app/services/userService';

const UserProfile = () => {
  const { userId } = useParams(); // Dynamic userId from route
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user profile on component load
    if (userId) {
      fetchUserProfile(userId)
        .then(setProfile)
        .catch(err => setError(err.message));
    }
  }, [userId]);

  if (error) {
    return (
      <div className="text-center text-xl text-red-600 font-semibold mt-6">
        Error: {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-xl font-semibold mt-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 bg-blue-600 text-white rounded-t-lg">
          <h1 className="text-3xl font-bold">{profile.fullName}</h1>
          <p className="text-lg">{profile.email}</p>
        </div>

        {/* Houses for Sale */}
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Houses for Sale</h2>
          {profile.housesForSale && profile.housesForSale.length > 0 ? (
            profile.housesForSale.map(house => (
              <div key={house.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900">{house.title}</h3>
                <p className="text-gray-700">{house.description}</p>
                <p className="font-medium text-lg text-gray-800">Price: ${house.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No houses for sale</p>
          )}

          {/* Houses Bought */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-8">Houses Bought</h2>
          {profile.housesBought && profile.housesBought.length > 0 ? (
            profile.housesBought.map(house => (
              <div key={house.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900">{house.title}</h3>
                <p className="text-gray-700">{house.description}</p>
                <p className="font-medium text-lg text-gray-800">Price: ${house.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No houses bought</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
