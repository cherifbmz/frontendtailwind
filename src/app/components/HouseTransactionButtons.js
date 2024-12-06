// components/HouseTransactionButtons.js
'use client';
import { useState } from 'react';

const HouseTransactionButtons = ({ house, currentUser, onTransactionComplete }) => {
    const [loading, setLoading] = useState(false);

    const handleTransaction = async (type) => {
        if (!currentUser) {
            alert('Please log in to perform this action');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/houses/${house.id}/${type}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to ${type} house`);
            }

            const updatedHouse = await response.json();
            onTransactionComplete(updatedHouse);
            
            alert(type === 'sell' ? 
                'House has been listed for sale!' : 
                'Congratulations on your purchase!'
            );
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderButtons = () => {
        // If the house has no seller, show the sell button
        if (!house.seller) {
            return (
                <button
                    onClick={() => handleTransaction('sell')}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Processing...' : 'List for Sale'}
                </button>
            );
        }

        // If the house has a seller but no buyer, show the buy button
        // Don't show buy button if the current user is the seller
        if (!house.buyer && (!currentUser || house.seller.id !== currentUser.id)) {
            return (
                <button
                    onClick={() => handleTransaction('buy')}
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                    {loading ? 'Processing...' : 'Buy House'}
                </button>
            );
        }

        // If the house is already sold
        if (house.buyer) {
            return (
                <span className="text-red-500">
                    Sold to {house.buyer.fullName}
                </span>
            );
        }

        return null;
    };

    return (
        <div className="mt-4">
            {renderButtons()}
        </div>
    );
};

export default HouseTransactionButtons;
