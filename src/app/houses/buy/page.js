'use client';
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Lazy load MapComponent
const MapComponent = dynamic(() => import("../../components/MapComponent"), { ssr: false });

const truncateText = (text, length) => (text.length > length ? text.substring(0, length) + '...' : text);

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:8080/houses/', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch houses');
        }

        const data = await response.json();
        setHouses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, [router]);

  const toggleMap = (id) => {
    setShowMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">List of Houses</h1>
      {houses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {houses.map((house) => (
            <div key={house.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
  src={`http://localhost:8080/houses/${house.id}/image`}
  alt={house.title}
  className="w-full h-auto object-cover"
/>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{house.title}</h3>
                <p className="text-gray-600 mt-2">{truncateText(house.description, 50)}</p>
                <p className="text-gray-800 mt-2 font-semibold">Price: ${house.price}</p>
                <p className="text-gray-600 mt-1">Address: {house.address}</p>

                <button
                  onClick={() => toggleMap(house.id)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
                >
                  {showMap[house.id] ? 'Hide Map' : 'Show Map'}
                </button>
                {showMap[house.id] && (
                  <div className="mt-4">
                    <MapComponent
                      latitude={house.latitude}
                      longitude={house.longitude}
                      houseId={house.id}
                    />
                  </div>
                )}

                <Link href={`/houses/buy/${house.id}`}>
                  <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No houses available.</p>
      )}
    </div>
  );
};

export default HouseList;
