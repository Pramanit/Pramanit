"use client";

import { useState } from "react";

export default function ParticipantRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show loader while the request is in progress
    setError(""); // Reset error

    const payload = { name, email, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participant/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setIsLoading(false); // Hide loader

      if (response.ok) {
        // If registration is successful, show OTP input
        setMessage("Registration successful! Please check your email for OTP.");
        setIsOtpPopupOpen(true); // Open OTP popup after registration
      } else {
        // Display error if registration fails
        setError(data.message || "Registration failed.");
      }
    } catch (err: any) {
      setIsLoading(false); // Hide loader
      setError("An error occurred during registration.");
      console.error("Error:", err.message);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show loader for OTP verification
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organization/verifyEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // Send email and OTP for verification
      });

      const data = await response.json();
      setIsLoading(false); // Hide loader

      if (response.ok) {
        setMessage("OTP verified successfully! You can now log in.");
        setIsOtpPopupOpen(false); // Close OTP popup after successful verification
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setError("An error occurred while verifying OTP.");
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Organization Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">User Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Error message */}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {/* Success message */}
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/certificates/login" className="text-blue-400 hover:underline">
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

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
