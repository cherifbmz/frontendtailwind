import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ latitude, longitude, houseId }) => {
  useEffect(() => {
    const mapId = `map-${houseId}`; // Unique ID for each map

    if (L.DomUtil.get(mapId)) {
      // If map container already exists, destroy the map
      L.DomUtil.get(mapId)._leaflet_id = null;
    }

    const map = L.map(mapId).setView([latitude, longitude], 15);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add a marker for the house
    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`<b>House ID: ${houseId}</b>`);

    return () => {
      if (map) {
        map.remove(); // Destroy the map when the component unmounts
      }
    };
  }, [latitude, longitude, houseId]);

  return (
    <div
      id={`map-${houseId}`}
      className="rounded-lg shadow-md border border-gray-200 mt-4"
      style={{ height: '300px', width: '100%' }}
    ></div>
  );
};

export default MapComponent;
