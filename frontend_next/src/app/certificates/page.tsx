"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import profilePhoto from '@/assets/images/profile-3d.jpg'; // Import the profile image
import logo from '@/assets/images/pramanit3.png'; // Import your logo image
import { useRouter } from "next/navigation";

interface Certificate {
  id: string;
  eventName: string;
  issuerEmail: string;
  prize: string;
  dateTime: string;
  issuedTo: string;
  issuedToEmail: string;
  verificationId: string;
}

export default function CertificatesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]); // Default to an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>("");
  const router = useRouter();
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = "/";
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      const token = localStorage.getItem('token'); // Assuming the auth token is stored in localStorage

      if (!token) {
        router.push("/org/login");
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participant`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserDetails({ email: data.email, name: data.name });
        console.log(data)
        if (!data.certificates || data.certificates.length === 0) {
          setMessage("You don't have any certificates in your name.");
        } else {
          setCertificates(data.certificates || []); // Safely set certificates
        }

      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (!isLoggedIn) {
    return <div>You are logged out</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] llg:h-[800px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#5A88B0] bg-[radial-gradient(closest-side,#000_82%,#1C3B6B)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>

      {/* Navbar */}
<div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md py-2 px-4 mb-6 mx-4 rounded-lg shadow-lg">
  <h1 className="text-lg font-semibold">Your Dashboard</h1>
  
  {/* Logo and Logout Button Container */}
  <div className="flex items-center space-x-4">
    {/* Logo */}
    <Image
      src={logo}
      alt="Logo"
      className="w-12 h-12"
      width={48}
      height={48}
    />
  
    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg focus:outline-none transition"
    >
      Logout
    </button>
  </div>
</div>


      {/* Profile Card Section */}
      <div className="flex justify-center mb-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg flex items-center space-x-6">
          <Image
            src={profilePhoto}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover"
            width={128}
            height={128}
          />
          <div className="text-left">
            <h2 className="text-gray-300 text-sm">Participant Name</h2>
            <span className="text-2xl font-semibold">{userDetails.name}</span>
            <h2 className="text-gray-300 text-sm">Email</h2>
            <span className="text-2xl font-semibold">{userDetails.email}</span>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mt-10 mb-6 text-center text-white">Certificates</h2>

      {/* Loading State */}
      {loading && <div className="text-center">Loading certificates...</div>}
      {message && <div className="text-center">{message}</div>}
      {/* Error State */}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Certificates Table */}
      {!loading && !error && certificates.length > 0 && (
        <div className="overflow-x-auto px-4">
          <table className="min-w-full bg-white bg-opacity-10 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-opacity-20">
                <th className="py-2 px-4 border-b text-left text-white">Event Name</th>
                <th className="py-2 px-4 border-b text-left text-white">Organised By</th>
                <th className="py-2 px-4 border-b text-left text-white">Prize</th>
                <th className="py-2 px-4 border-b text-left text-white">Date & Time</th>
                <th className="py-2 px-4 border-b text-left text-white">Issued To</th>
                <th className="py-2 px-4 border-b text-left text-white">Issued to Email Id</th>
                <th className="py-2 px-4 border-b text-left text-white">Verification Id</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-opacity-30 hover:bg-white/10 cursor-pointer">
                  <td className="py-2 px-4 border-b text-white">{certificate.eventName}</td>
                  <td className="py-2 px-4 border-b text-white">{certificate.issuerEmail}</td>
                  <td className="py-2 px-4 border-b text-white">{certificate.prize}</td>
                  <td className="py-2 px-4 border-b text-white">{certificate.dateTime}</td>
                  <td className="py-2 px-4 border-b text-white">{certificate.issuedTo}</td>
                  <td className="py-2 px-4 border-b text-white">{certificate.issuedToEmail}</td>
                  <td className="py-2 px-4 border-b text-white">{certificate.verificationId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
