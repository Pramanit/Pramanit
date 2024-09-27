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
      <div className="px-4">
    <div className="container bg-black">
      <div className="py-4 flex items-center justify-between">

      <div className="relative">
        <div className='absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F7AABE,#B57CEC,#E472D1)] blur-md '></div>

      <LogoImage className="h-12 w-12 relative mt-1"/>
      </div>
      <div className='border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden'>

      <MenuIcon className="text-white" />
      </div>
      <nav className='text-white gap-6 items-center hidden sm:flex'>
        
        <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition' >About</a>
        <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Features</a>
        <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Updates</a>
        <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Help</a>
        <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Customers</a>
        <button className='bg-white py-2 px-4 rounded-lg text-black'>Get for free</button>
      </nav>

      </div>




    </div>
    </div>
    </div>
  )
};