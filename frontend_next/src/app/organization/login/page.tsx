"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import password visibility icons
import { Logo } from "@/components/Logo";

export default function ParticipantLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility toggle
  const [isEmailValid, setIsEmailValid] = useState(true); // Email validation state

  const router = useRouter(); // Initialize useRouter

  // Check for token and redirect if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push("/organization"); // Redirect if token is present
    }
  }, [router]);

  // Email validation regex function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before proceeding with login
    if (!validateEmail(email)) {
      setIsEmailValid(false); // Set invalid email state
      setMessage("Please enter a valid email address.");
      return; // Stop further execution if email is invalid
    } else {
      setIsEmailValid(true); // Reset email validation state if valid
    }

    setLoading(true); // Start loading state
    const payload = { email, password }; // Only email and password for login

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");

        // Store the token in localStorage if login is successful
        localStorage.setItem('token', data.token);

        // Redirect user after successful login
        router.push("/organization"); // Change this to the route you want to redirect to
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      setMessage('An error occurred while logging in');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden flex items-center justify-center">
      {/* Position the Logo in the top-right corner */}
      <Logo/>
      <div className="w-full max-w-md p-8 rounded-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
        
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Organization Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={email} // Bind the state to input value
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              className={`w-full p-2 rounded bg-gray-700 text-white ${!isEmailValid ? 'border-red-500' : ''}`}
              required
            />
            {!isEmailValid && <p className="text-red-500 text-sm">Invalid email address</p>}
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
              value={password} // Bind the state to input value
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
            <div
              className="absolute top-12 right-3 transform -translate-y-1/2 cursor-pointer text-2xl"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle password visibility
            >
              {isPasswordVisible ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Do not have an account?{" "}
          <a href="/organization/register" className="text-blue-400 hover:underline">
            Register here
          </a>
        </p>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
