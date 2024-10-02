"use client"; // Make this a Client Component

import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/pramanit3.png"; // Import the logo image

export default function RegistrationPage() {
  const [isRegistered, setIsRegistered] = useState(false); // Handle if the user is already registered
  const [isFormOpen, setIsFormOpen] = useState(true); // Keep the registration form visible until submitted
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Assuming you will call an API or handle registration logic here
    setIsRegistered(true);
    setIsFormOpen(false);
    console.log("User registered:", userData);
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md py-2 px-4 mb-6 mx-4 rounded-lg shadow-lg">
          <h1 className="text-lg font-semibold">Registration Successful</h1>
          <div>
            <Image src={logo} alt="Logo" className="w-12 h-12" width={48} height={48} />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold mt-10 mb-6 text-center text-white">Thank you for registering!</h2>
          <p className="text-lg text-white">Welcome, {userData.name}. You have successfully registered with the email: {userData.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md py-2 px-4 mb-6 mx-4 rounded-lg shadow-lg">
        <h1 className="text-lg font-semibold">Register</h1>
        <div>
          <Image src={logo} alt="Logo" className="w-12 h-12" width={48} height={48} />
        </div>
      </div>

      {/* Registration Form */}
      {isFormOpen && (
        <div className="flex justify-center items-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create New Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={userData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700">
                  Register
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
