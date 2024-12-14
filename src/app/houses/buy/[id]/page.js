'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import BuyButton from "../../../components/BuyButton";

const MapComponent = dynamic(() => import('@/app/components/MapComponent'), { ssr: false });

const HouseDetails = () => {
  const [house, setHouse] = useState(null);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/houses/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401) {
              setError('Invalid or expired token');
              router.push('/login');
            } else {
              throw new Error('Failed to fetch house details');
            }
          }
          return response.json();
        })
        .then((data) => setHouse(data))
        .catch((error) => setError(error.message));
    }
  }, [id, router]);

  const toggleMap = () => setShowMap((prev) => !prev);

  if (error) {
    return <div className="text-red-600 text-center mt-5 text-lg font-medium">{error}</div>;
  }

  if (!house) {
    return <div className="text-center mt-5 text-lg font-medium text-gray-600">Loading...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{house.title}</h1>
      <p className="text-lg text-gray-700 mb-3">{house.description}</p>
      <p className="text-xl font-semibold text-gray-800 mb-4">Price: <span className="text-green-600">${house.price}</span></p>
      <p className="text-sm text-gray-500 mb-6">Address: {house.address}</p>

      <div className="overflow-hidden rounded-lg shadow-lg mb-6">
      <img
  src={`http://localhost:8080/houses/${id}/image`}
  alt={house.title}
  className="w-full h-auto object-cover"
/>
        
      </div>

      {/* Button to toggle map visibility */}
      <button
        onClick={toggleMap}
        className={`py-2 px-6 text-base font-semibold rounded-md transition-all duration-300 ${
          showMap ? 'bg-red-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>

      {/* Display the map only when showMap is true */}
      {showMap && (
        <div className="mt-6">
          <MapComponent
            latitude={house.latitude}
            longitude={house.longitude}
            houseId={house.id}
          />
        </div>
      )}

      {/* Buy Button */}
      <div className="mt-8">
        <BuyButton houseId={id} />
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mt-6 py-2 px-6 bg-gray-700 text-white text-base font-semibold rounded-md shadow-md hover:bg-gray-800 transition-all duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default HouseDetails;
