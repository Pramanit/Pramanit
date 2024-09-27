"use client";

import { useState } from 'react';
import LogoImage from '../assets/icons/logo.svg';
import MenuIcon from '../assets/icons/menu.svg';

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
              window.location.href = "/organizations";
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

export const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="bg-black bg-opacity-30 fixed top-0 left-0 right-0 z-40 backdrop-blur-md rounded-xl shadow-lg">
        <div className="px-4">
          <div className="container mx-auto">
            <div className="py-4 flex items-center justify-between">
              <div className="relative">
                <div className='absolute w-full top-4 bottom-8 bg-[linear-gradient(to_right,rgba(253,230,138,0.5),rgba(251,191,36,0.5),rgba(245,158,11,0.5))] blur-md'></div>
                <a href="#"><LogoImage className="h-12 w-12 relative mt-1" /></a>
              </div>

              <div className='border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden'>
                <MenuIcon className="text-white" />
              </div>

              <nav className='text-white gap-6 items-center hidden sm:flex'>
                <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>About</a>
                <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>FAQ</a>
                <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Subscribe</a>
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
