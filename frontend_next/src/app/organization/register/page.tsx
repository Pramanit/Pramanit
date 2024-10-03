"use client";

import { useState } from "react";

export default function OrganizationRegister() {
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e : any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e : any) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true); // Set loading to true when registration starts
    try {
      // Send a POST request to the backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setIsOtpPopupOpen(true); // Open OTP popup after successful registration
      } else {
        setErrorMessage(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setErrorMessage("An error occurred during registration.");
    } finally {
      setIsLoading(false); // Set loading back to false after the registration is complete
    }
};


  const handleOtpSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const payload = {email: formData.email, otp: otp};
      // Send a POST request to the backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/verifyEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setIsOtpPopupOpen(false); // Open OTP popup after successful registration
      } else {
        setErrorMessage(data.message || "OTP failed");
      }
    } catch (err) {
      console.error("Error during otp verification:", err);
      setErrorMessage("An error occurred during error verifcation");
    }
    console.log("OTP submitted:", otp);
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Organization Register</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">User Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
