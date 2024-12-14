'use client'; // This marks the file as a client component

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddHouseForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('address', address);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8080/houses', formData, {
                withCredentials: true, // Sends cookies for authentication
            });

            if (response.status === 201) {
                setSuccess('House added successfully!');
                setTitle('');
                setDescription('');
                setPrice('');
                setAddress('');
                setImage(null);
                router.push('/houses/sell');
            } else {
                setError(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data?.message || 'Failed to add house');
            } else if (error.request) {
                setError('No response from the server. Please check your connection.');
            } else {
                setError('An error occurred while processing the request.');
            }

            if (error.response && error.response.status === 401) {
                setError('Unauthorized access. Redirecting to login...');
                router.push('/login');
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Add New House</h1>
            
            {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-600 p-2 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Add House
                </button>
            </form>
        </div>
    );
};

export default AddHouseForm;
