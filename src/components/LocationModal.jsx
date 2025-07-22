import { useState, useEffect, useRef } from 'react';

const LocationModal = ({ isOpen, onClose, onLocationSelect }) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);
  const placeAutocompleteRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Reset input value when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [isOpen]);

  const updateLocation = (locationData) => {
    console.log('Updating location with:', locationData);
    try {
      // Update localStorage
      localStorage.setItem('userLocation', JSON.stringify(locationData));
      console.log('Location saved to localStorage:', localStorage.getItem('userLocation'));
      
      // Update parent component first
      onLocationSelect(locationData);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  useEffect(() => {
    let placeAutocomplete = null;

    const initPlaceAutocomplete = () => {
      if (!window.google || !inputRef.current || !isOpen) return;

      try {
        console.log('Initializing PlaceAutocompleteElement...');

        // Remove any existing place autocomplete
        if (placeAutocompleteRef.current) {
          placeAutocompleteRef.current.remove();
        }

        // Create new place autocomplete element
        placeAutocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'],
          componentRestrictions: { country: 'IN' },
          fields: ['address_components', 'formatted_address', 'geometry', 'name']
        });

        // Store reference
        placeAutocompleteRef.current = placeAutocomplete;

        // Add place change listener
        placeAutocomplete.addListener('place_changed', () => {
          console.log('Place changed event fired');
          const place = placeAutocomplete.getPlace();
          console.log('Place details:', place);

          if (place.geometry) {
            const locationData = {
              address: place.formatted_address || place.name,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              timestamp: new Date().toISOString()
            };

            console.log('Saving location data:', locationData);
            updateLocation(locationData);
          } else {
            console.error('No geometry found for place:', place);
          }
        });

        console.log('PlaceAutocompleteElement initialized successfully');
      } catch (error) {
        console.error('Error initializing PlaceAutocompleteElement:', error);
      }
    };

    // Check if Google Maps API is loaded
    if (window.google && window.google.maps) {
      initPlaceAutocomplete();
    } else {
      // Wait for Google Maps API to load
      const checkGoogleMapsInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMapsInterval);
          initPlaceAutocomplete();
        }
      }, 100);

      // Clear interval after 10 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkGoogleMapsInterval), 10000);
    }

    // Cleanup function
    return () => {
      if (placeAutocompleteRef.current) {
        google.maps.event.clearInstanceListeners(placeAutocompleteRef.current);
      }
    };
  }, [isOpen, onLocationSelect, onClose]);

  const handleDetectLocation = async () => {
    setLoading(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            const GOOGLE_MAPS_API_KEY = 'AIzaSyCcNHTiJlmSMM3WFwauxTnwLpgdEiIbGyg';
            
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            
            const data = await response.json();
            if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              const locationData = {
                address,
                latitude,
                longitude,
                timestamp: new Date().toISOString()
              };
              
              updateLocation(locationData);
            }
            setLoading(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error detecting location:', error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!isOpen || !mounted) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-[72px] left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-lg shadow-lg p-6 z-50" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col">
          <div className="mb-4">
            <h2 className="text-base">
              <span>Welcome to </span>
              <span className="text-green-500 font-medium">Pinnkart</span>
            </h2>
          </div>
          
          <div className="flex items-start mb-4">
            <div className="mr-3">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-700 text-sm">
              Please provide your delivery location to see products at nearby store
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDetectLocation}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Detecting..." : "Detect my location"}
            </button>

            <div className="flex items-center">
              <span className="text-gray-400 mx-2 text-sm">OR</span>
            </div>

            <form onSubmit={handleSubmit} className="flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search delivery location"
                className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-500 transition-colors duration-200"
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationModal; 