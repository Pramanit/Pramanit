"use client";

import { useState } from "react";

export default function OrganizationRegister() {
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending OTP
    setIsOtpPopupOpen(true); // Open OTP popup after registration form is submitted
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP validation logic
    console.log("OTP submitted:", otp);
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Organization Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">User Name</label>
            <input
              type="string"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/organization/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>

      {/* OTP Popup */}
      {isOtpPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-2xl font-semibold mb-4 text-center text-white">Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">OTP</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700">
                  Verify OTP
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
                  onClick={() => setIsOtpPopupOpen(false)}
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
