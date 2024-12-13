// app/profile/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/me', {
                credentials: 'include',
            });

            if (response.status === 401) {
                router.push('/login');
                return;
            }

            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                setProfile(userData);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Error loading profile</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            
            <div className="bg-white shadow-md rounded p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="mb-4">
                    <p><strong>Name:</strong> {profile.fullName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                </div>
            </div>

            <div className="bg-white shadow-md rounded p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Houses Listed for Sale</h2>
                {profile.housesForSale && profile.housesForSale.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profile.housesForSale.map(house => (
                            <div key={house.id} className="border rounded p-4">
                                <img
                                   src={`http://localhost:8080/houses/${house.id}/image`}
                                    alt={house.title}
                                    className="w-full h-48 object-cover mb-2"
                                />
                                <h3 className="font-semibold">{house.title}</h3>
                                <p className="text-gray-600">${house.price}</p>
                                <p className="text-sm text-gray-500">{house.address}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No houses listed for sale</p>
                )}
            </div>

            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-xl font-semibold mb-4">Houses Bought</h2>
                {profile.housesBought && profile.housesBought.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profile.housesBought.map(house => (
                            <div key={house.id} className="border rounded p-4">
                                <img
                                    src={`http://localhost:8080/houses/${house.id}/image`}
                                    alt={house.title}
                                    className="w-full h-48 object-cover mb-2"
                                />
                                <h3 className="font-semibold">{house.title}</h3>
                                <p className="text-gray-600">${house.price}</p>
                                <p className="text-sm text-gray-500">{house.address}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No houses bought yet</p>
                )}
            </div>
        </div>
    );
};

export default Profile;