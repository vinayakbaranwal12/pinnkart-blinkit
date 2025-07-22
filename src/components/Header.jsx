import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faShoppingCart, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LocationModal from "./LocationModal";

const Header = () => {
  const navigate = useNavigate();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const placeholders = ['Search for "kurkure"', 'Search for "chocolates"', 'Search for "biscuits"'];

  // Function to get location from localStorage
  const getLocationFromStorage = () => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        return parsedLocation;
      } catch (error) {
        console.error('Error parsing location from localStorage:', error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    // Get initial location from localStorage
    const savedLocation = getLocationFromStorage();
    if (savedLocation) {
      setUserLocation(savedLocation);
    } else {
      // If no location is saved, show the modal
      setIsLocationModalOpen(true);
    }
  }, []);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setCurrentPlaceholder(placeholders[placeholderIndex]);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [placeholderIndex]);

  const toggleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  const handleLocationSelect = (location) => {
    console.log('Location selected:', location); // Debug log
    setUserLocation(location);
    setIsLocationModalOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-b from-purple-100 to-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 mr-4 font-bold text-2xl text-purple-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            PINKART
          </span>
        </div>

        {/* Delivery Info */}
        <div className="text-center relative">
          <button
            onClick={toggleLocationModal}
            className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition duration-300"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600" />
            <div className="text-left">
              <h2 className="text-sm font-bold text-gray-700">Delivery in 10 Mins</h2>
              <p className="text-xs text-gray-500 truncate max-w-[200px]">
                {userLocation ? userLocation.address : "Select your location"}
              </p>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center flex-1 mx-4 relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 text-gray-500 w-4 h-4"
          />
          <input
            type="text"
            placeholder={currentPlaceholder}
            className="w-full pl-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          {/* Login */}
          <button
            className="flex flex-col items-center text-xs text-gray-700 hover:text-purple-700 transition duration-300"
            onClick={() => navigate("/login")}
          >
            <FontAwesomeIcon icon={faUser} className="w-5 h-5 mb-1" />
            <span className="font-medium">Login</span>
          </button>

          {/* Cart */}
          <button
            className="flex flex-col items-center text-xs text-gray-700 hover:text-purple-700 transition duration-300"
            onClick={() => navigate("/cart")}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 mb-1" />
            <span className="font-medium">Cart</span>
          </button>
        </div>
      </header>

      {/* Location Modal */}
      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
};

export default Header;
