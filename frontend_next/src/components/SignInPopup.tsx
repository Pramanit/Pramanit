import { useState } from 'react';

const SignInPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 rounded-lg p-6 w-80 text-center shadow-lg">
        <h2 className="text-xl mb-4 font-semibold">Sign in as</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full hover:bg-blue-600"
          onClick={() => alert('Participant login clicked')}
        >
          Participant
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
          onClick={() => alert('Organization login clicked')}
        >
          Organization
        </button>
        <button
          className="mt-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignInPopup;
