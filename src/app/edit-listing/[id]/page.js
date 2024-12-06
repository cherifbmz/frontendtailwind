'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const EditListingPage = () => {
  const { id } = useParams(); // Get the house ID from the URL
  const router = useRouter();

  const [house, setHouse] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the house details using the house id from the backend
    const fetchHouseDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8080/houses/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch house details');
        }

        const houseData = await res.json();
        setHouse(houseData);
        setTitle(houseData.title);
        setDescription(houseData.description);
        setPrice(houseData.price);
        setAddress(houseData.address);
      } catch (err) {
        setError('Error fetching house details');
      }
    };

    fetchHouseDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('address', address);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`http://localhost:8080/houses/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to update house');
      }

      alert('House updated successfully');
      router.push('/my-listings'); // Redirect to the user's listings page
    } catch (err) {
      setError('Error updating house');
    }
  };

  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit House Listing</h1>
      {house ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-900 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-900 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-900 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 text-gray-900 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full px-4 py-2 text-gray-900 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 mt-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
          >
            Update Listing
          </button>
        </form>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default EditListingPage;
