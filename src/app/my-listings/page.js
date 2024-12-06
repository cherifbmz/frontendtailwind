'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user's listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:8080/houses/my-listings', {
          credentials: 'include', // Include cookies for authentication
        });
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      const response = await fetch(`http://localhost:8080/houses/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }
      setListings(listings.filter((listing) => listing.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit-listing/${id}`);
  };

  if (loading) return <p className="text-center text-xl font-semibold mt-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-12">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">My Listings</h1>
        {listings.length === 0 ? (
          <p className="text-lg text-center text-gray-600">No listings found</p>
        ) : (
          <ul className="space-y-8">
            {listings.map((listing) => (
              <li key={listing.id} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6">
                  <img
                    src={`http://localhost:8080/images/${listing.imagePath}`}
                    alt={listing.title}
                    className="w-full lg:w-80 h-auto rounded-md shadow-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900">{listing.title}</h2>
                    <p className="text-gray-700 mt-2">{listing.description}</p>
                    <p className="font-medium text-lg text-gray-800 mt-4">Price: ${listing.price}</p>
                    <p className="text-gray-600 mt-2">{listing.address}</p>
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => handleEdit(listing.id)}
                        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
