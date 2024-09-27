"use client";

import { useState } from 'react';
import LogoImage from '../assets/icons/logo.svg';

const SignInPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white bg-opacity-80 rounded-lg p-8 w-96 text-center shadow-xl">
        <h2 className="text-2xl mb-6 font-bold">Sign in as</h2>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded mb-4 w-full hover:bg-blue-700"
          onClick={() => {
            onClose();
            window.location.href = "/certificates";
          }}
        >
          Participant
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded mb-4 w-full hover:bg-blue-700"
          onClick={() => {
            onClose();
            window.location.href = "/organizations"; 
          }}
        >
          Organization
        </button>
        <button
          className="mt-6 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-black">
      <div className="container mx-auto px-4">
        <div className="py-4 flex items-center justify-between">
          {/* Logo on the left side */}
          <LogoImage className="h-12 w-12" />

          {/* Login button on the right side */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>

      {/* Popup component */}
      <SignInPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};
