"use client";

import { useState, useEffect, useCallback } from 'react';
import LogoImage from '../assets/icons/logo.svg';

export const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLoginClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close the mobile menu on scroll
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

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
      <div className={`bg-black bg-opacity-30 fixed top-0 left-4 right-4 z-40  rounded-b-xl shadow-lg mx-auto max-w-7xl transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ 
        background: 'rgba(0, 0, 0, 0.5)', // Black with some transparency
        backdropFilter: 'blur(5px)', // Blur effect
      }}
      >
        <div className="px-4">
          <div className="container mx-auto">
            <div className="py-4 flex items-center justify-between">
              <div className="relative">
                <div className="absolute w-full top-4 bottom-8 bg-[linear-gradient(to_right,rgba(253,230,138,0.5),rgba(251,191,36,0.5),rgba(245,158,11,0.5))] blur-md"></div>
                <a href="#"><LogoImage className="h-12 w-12 relative mt-1" /></a>
              </div>

              {/* Mobile menu toggle button */}
              <div
                className="h-10 w-10 inline-flex justify-center items-center sm:hidden cursor-pointer"
                onClick={toggleMobileMenu}
              >
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
                  backdropFilter: 'blur(5px)', // Blur effect
                }}
              >
                <nav className="text-white flex flex-col gap-4 items-center">
                  <a href="#features" className="text-opacity-60 hover:text-opacity-100 transition">Features</a>
                  <a href="#faq" className="text-opacity-60 hover:text-opacity-100 transition">FAQ</a>
                  <a href="#pricing" className="text-opacity-60 hover:text-opacity-100 transition">Pricing</a>
                  <button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 px-4 rounded-lg text-white hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-1500 ease-in-out hover:shadow-lg"
                    onClick={handleLoginClick}
                  >
                    Log In
                  </button>
                </nav>
              </div>

              {/* Desktop Navigation */}
              <nav className="text-white gap-6 items-center hidden sm:flex">
                <a href="#features" className="text-opacity-60 hover:text-opacity-100 transition">Features</a>
                <a href="#faq" className="text-opacity-60 hover:text-opacity-100 transition">FAQ</a>
                <a href="#pricing" className="text-opacity-60 hover:text-opacity-100 transition">Pricing</a>
                <button
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 px-4 rounded-lg text-white hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-1500 ease-in-out hover:shadow-lg"
                  onClick={handleLoginClick}
                >
                  Log In
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Popup component */}
      <SignInPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  );
};

const SignInPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Sign in as</h2>
        <div className="flex gap-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full focus:outline-none"
            onClick={() => {
              onClose();
              window.location.href = "/certificates";
            }}
          >
            Participant
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 w-full focus:outline-none"
            onClick={() => {
              onClose();
              window.location.href = "/organization";
            }}
          >
            Organization
          </button>
        </div>
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
