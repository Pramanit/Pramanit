"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import password visibility icons
import Image from "next/image"; // For handling image rendering

export default function ParticipantLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility toggle
  const [isEmailValid, setIsEmailValid] = useState(true); // Email validation state

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push("/certificates"); // Redirect if token is present
    }
  }, [router]);

  // Email validation regex function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setMessage("Please enter a valid email address.");
      return;
    } else {
      setIsEmailValid(true); // Reset email validation state if valid
    }

    setLoading(true); // Start loading
    const payload = { email, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participant/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");
        localStorage.setItem('token', data.token);

        // Redirect user after successful login
        router.push("/certificates"); // Change this to the route you want to redirect to
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error: any) {  
      console.error('Error:', error); // Log the entire error
      setMessage('An error occurred while logging in');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden flex items-center justify-center">
      {/* Falcon Icon and Link to Home Page */}
      <div className="absolute top-4 left-4 cursor-pointer" onClick={() => router.push("/#")}>
        <Image src="/logo.png" alt="Falcon Icon" width={50} height={50} />
      </div>

      <div className="w-full max-w-md p-8 rounded-lg bg-white bg-opacity-20 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Participant Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-100">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 rounded bg-gray-700 text-white ${!isEmailValid ? 'border-red-500' : ''}`}
              required
            />
            {!isEmailValid && <p className="text-red-500 text-sm">Invalid email address</p>}
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm mb-2 text-gray-300">Password*</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
            <div
              className="absolute top-12 right-3 transform -translate-y-1/2 cursor-pointer text-2xl"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Do not have an account?{" "}
          <a href="/certificates/register" className="text-blue-400 hover:underline">
            Register here
          </a>
        </p>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
