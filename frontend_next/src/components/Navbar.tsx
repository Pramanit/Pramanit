"use client";

import { useState, useEffect, useCallback } from 'react';
import LogoImage from '../assets/icons/logo.svg';
import { useRouter } from 'next/navigation'; // Use Next.js navigation

export const Navbar = () => {
  // State to control the visibility of login/signup popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // State to differentiate between login and signup popup
  const [isSignupPopup, setIsSignupPopup] = useState(false);

  // State to control the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to control the visibility of the navbar based on scrolling
  const [isVisible, setIsVisible] = useState(true);

  // State to store the last scroll position to compare with current scroll position
  const [lastScrollY, setLastScrollY] = useState(0);

  // Function to open the login popup
  const handleLoginClick = () => {
    setIsPopupOpen(true); // Open popup
    setIsSignupPopup(false); // Ensure it's in login mode
  };

  // Function to open the signup popup
  const handleSignupClick = () => {
    setIsPopupOpen(true); // Open popup
    setIsSignupPopup(true); // Set popup in signup mode
  };

  // Function to close the popup (login/signup)
  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close popup
  };

  // Function to toggle the mobile menu open/close
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to control the navbar visibility based on scroll direction
  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // Hide the navbar when scrolling down
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close the mobile menu when scrolling
      } else {
        // Show the navbar when scrolling up
        setIsVisible(true);
      }
      // Update the last scroll position
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  // Add event listener for scrolling to control navbar visibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [controlNavbar]);

  return (
    <>
      {/* Navbar container with transition on scroll */}
      <div className={`bg-black bg-opacity-30 fixed top-0 left-4 right-4 z-40  rounded-b-xl shadow-lg mx-auto max-w-7xl transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ 
        background: 'rgba(0, 0, 0, 0.5)', // Black with some transparency
        backdropFilter: 'blur(5px)', // Blur effect for background
      }}
      >
        <div className="px-4">
          <div className="container mx-auto">
            <div className="py-4 flex items-center justify-between">
              <div className="relative">
                {/* Logo with gradient effect */}
                <div className="absolute w-full top-4 bottom-8 bg-[linear-gradient(to_right,rgba(253,230,138,0.5),rgba(251,191,36,0.5),rgba(245,158,11,0.5))] blur-md"></div>
                <a href="#"><LogoImage className="h-12 w-12 relative mt-1" /></a>
              </div>

              {/* Mobile menu toggle button */}
              <div
                className="h-10 w-10 inline-flex justify-center items-center sm:hidden cursor-pointer"
                onClick={toggleMobileMenu}
              >
                {/* Hamburger menu icon animation */}
                <div className={`burger-menu relative w-8 h-6 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'open' : ''}`}>
                  <span className={`block absolute left-0 top-0 w-full h-0.5 bg-white transform transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                  <span className={`block absolute left-0 top-2.5 w-full h-0.5 bg-white transform transition-opacity duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block absolute left-0 top-5 w-full h-0.5 bg-white transform transition-all duration-500 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                </div>
              </div>

              {/* Mobile Menu */}
              <div
                className={`absolute top-20 left-0 right-0 p-8 rounded-lg z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
                style={{ 
                  background: 'rgba(0, 0, 0, 0.5)', // Black with some transparency
                  backdropFilter: 'blur(5px)', // Blur effect for mobile menu background
                }}
              >
                {/* Mobile navigation links */}
                <nav className="text-white flex flex-col gap-4 items-center">
                  <a href="#features" className="text-opacity-60 hover:text-opacity-100 transition">Features</a>
                  <a href="#faq" className="text-opacity-60 hover:text-opacity-100 transition">FAQ</a>
                  <a href="#pricing" className="text-opacity-60 hover:text-opacity-100 transition">Pricing</a>

                  {/* Mobile "Log In" Button */}
                  <button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 px-4 rounded-lg text-white hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-1500 ease-in-out hover:shadow-lg"
                    onClick={handleLoginClick}
                  >
                    Log In
                  </button>

                  {/* Mobile "Sign Up" Button */}
                  <button
                    className="bg-gradient-to-r from-green-400 to-green-500 py-2 px-4 rounded-lg text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transform transition-all duration-1500 ease-in-out hover:shadow-lg"
                    onClick={handleSignupClick}
                  >
                    Sign Up
                  </button>
                </nav>
              </div>

              {/* Desktop Navigation */}
              <nav className="text-white gap-6 items-center hidden sm:flex">
                <a href="#features" className="text-opacity-60 hover:text-opacity-100 transition">Features</a>
                <a href="#faq" className="text-opacity-60 hover:text-opacity-100 transition">FAQ</a>
                <a href="#pricing" className="text-opacity-60 hover:text-opacity-100 transition">Pricing</a>

                {/* Desktop "Log In" Button */}
                <button
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 px-4 rounded-lg text-white hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-1500 ease-in-out hover:shadow-lg"
                  onClick={handleLoginClick}
                >
                  Log In
                </button>

                {/* Desktop "Sign Up" Button */}
                <button
                  className="bg-gradient-to-r from-green-400 to-green-500 py-2 px-4 rounded-lg text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transform transition-all duration-1500 ease-in-out hover:shadow-lg"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Popup component for both login and signup */}
      <SignInSignupPopup isOpen={isPopupOpen} isSignup={isSignupPopup} onClose={handleClosePopup} />
    </>
  );
};

// Popup component to handle both login and signup actions
const SignInSignupPopup = ({ isOpen, isSignup, onClose }: { isOpen: boolean; isSignup: boolean; onClose: () => void }) => {
  const router = useRouter();

  // Do not render the popup if it is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-96 relative">
        {/* Dynamic title based on whether it's login or signup */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">{isSignup ? 'Sign Up as' : 'Sign in as'}</h2>

        {/* Buttons for Participant and Organization */}
        <div className="flex gap-4">
          <div className="w-full">
            {/* Redirect based on login or signup for Participant */}
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full focus:outline-none"
              onClick={() => {
                onClose();
                router.push(isSignup ? "/certificates/register" : "/certificates/login");
              }}
            >
              {isSignup ? 'Participant Sign Up' : 'Participant Login'}
            </button>
          </div>
          <div className="w-full">
            {/* Redirect based on login or signup for Organization */}
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 w-full focus:outline-none"
              onClick={() => {
                onClose();
                router.push(isSignup ? "/organization/register" : "/organization/login");
              }}
            >
              {isSignup ? 'Organization Sign Up' : 'Organization Login'}
            </button>
          </div>
        </div>

        {/* Close button for the popup */}
        <button
          className="mt-4 px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 focus:outline-none w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
