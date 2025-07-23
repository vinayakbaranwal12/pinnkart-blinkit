import { useState, useEffect, useRef } from 'react';

const LocationModal = ({ isOpen, onClose, onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const handleDetectLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const locationData = {
            address: data.display_name,
            latitude,
            longitude,
            timestamp: new Date().toISOString(),
          };

          localStorage.setItem('userLocation', JSON.stringify(locationData));
          onLocationSelect(locationData);
          onClose();
        } catch (err) {
          console.error('Error fetching address from coordinates:', err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
      }
    );
  };

  const fetchSuggestions = async (text) => {
    if (!text) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text
        )}&addressdetails=1&limit=5&countrycodes=in`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching Nominatim suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 400);
  };

  const handleSuggestionClick = (item) => {
    const locationData = {
      address: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('userLocation', JSON.stringify(locationData));
    onLocationSelect(locationData);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSuggestions([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div
        className="fixed top-[72px] left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-lg shadow-lg p-6 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base mb-2">
          Welcome to <span className="text-green-500 font-medium">Pinnkart</span>
        </h2>

        <div className="flex items-start mb-4">
          <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-gray-700">
            Please provide your delivery location to see products at nearby store
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={handleDetectLocation}
            className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? 'Detecting...' : 'Detect my location'}
          </button>

          <span className="text-gray-400 text-sm mx-2">OR</span>

          <div className="flex-1 relative">
            <input
              value={query}
              onChange={handleInputChange}
              placeholder="Search delivery location"
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-y-auto mt-1">
                {suggestions.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSuggestionClick(item)}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationModal;
