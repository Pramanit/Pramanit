"use client"; // Make this a Client Component

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/pramanit3.png'; // Import the blue tick image
import Loader from '@/components/loader'; // Import the Loader component

// Define the Event and Certificate types
interface EventType {
  eventName: string;
  description: string;
  dateTime: string;
}

interface CertificateType {
  issuedToEmail: string;
  prize: string;
  date: string;
  issuedToEmailId: string;
}

export const runtime = 'edge';

export default function EventPage() {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState<EventType | null>(null); // State to store the event data
  const [certificates, setCertificates] = useState<CertificateType[]>([]); // State to store certificates
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage popup visibility
  const [loading, setLoading] = useState(true); // State for loading
  const [generating, setGenerating] = useState(false); // State for certificate generation
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch event details from the API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/event/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the JWT in localStorage
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        setEvent(data.event); // Set the event data
        setCertificates(data.certificates); // Set the certificates data
        setLoading(false); // Stop the loading state
      } catch (error: any) {
        console.error('Error fetching event details:', error);
        setError(error.message); // Set the error message
        setLoading(false); // Stop the loading state
      }
    };

    fetchEvent();
  }, [id]);

  // Function to handle form submission
  const handleGenerateCertificate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const certificateData = {
      name: formData.get("participantName") as string,
      email: formData.get("email") as string,
      prize: formData.get("prizePosition") as string,
      dateTime: event?.dateTime, // Fetching the date from the event data
    };

    setGenerating(true); // Start generating state

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/event/${id}/createCertificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the JWT token
        },
        body: JSON.stringify(certificateData), // Convert certificate data to JSON
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate');
      }

      const data = await response.json();
      console.log('Certificate generated successfully:', data);
      setIsFormOpen(false); // Close the form after submission
      // Fetch certificates again after generating
      fetchCertificates();
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setGenerating(false); // Reset generating state
    }
  };

  // Fetch certificates after generating a new certificate
  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/event/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the JWT in localStorage
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch certificates');
      }

      const data = await response.json();
      setCertificates(data.certificates); // Update the certificates state
    } catch (error: any) {
      console.error('Error fetching certificates:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md py-2 px-4 mb-6 mx-4 rounded-lg shadow-lg">
        <h1 className="text-lg font-semibold">Event Details</h1>
        <div>
          <Image src={logo} alt="Logo" className="w-12 h-12" width={48} height={48} />
        </div>
      </div>

      {/* Event Details Card */}
      <div className="flex justify-center mt-20 mb-20">
        <div className="">
          <h2 className="text-4xl font-semibold mb-4 text-center">Event Name: {event?.eventName}</h2>
          <p className="text-gray-300 mb-4 text-center italic">Description: {event?.description}</p>
          <p className="text-gray-400 text-center">Date & Time: {event?.dateTime}</p>
        </div>
      </div>

      {/* Generate Certificate Card */}
      <div className="flex justify-center mb-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-2xl font-semibold mb-4 text-center">Generate Certificate</h3>
          <p className="text-gray-300 mb-4 text-center">Fill in the details below:</p>
          <button className="w-full px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setIsFormOpen(true)}>
            Open Certificate Form
          </button>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="flex justify-center mb-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">Certificates Issued</h3>
          {certificates.length > 0 ? (
            <div className="overflow-x-auto max-h-80">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-300">Issued To Email</th>
                    <th className="px-4 py-2 text-left text-gray-300">Prize</th>
                    <th className="px-4 py-2 text-left text-gray-300">Date</th>
                    {/* <th className="px-4 py-2 text-left text-gray-300">Email ID</th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {certificates.map((cert, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-white overflow-hidden text-ellipsis whitespace-nowrap">{cert.issuedToEmail}</td>
                      <td className="px-4 py-2 text-white overflow-hidden text-ellipsis whitespace-nowrap">{cert.prize}</td>
                      <td className="px-4 py-2 text-white overflow-hidden text-ellipsis whitespace-nowrap">{new Date(cert.date).toLocaleString()}</td>
                      {/* <td className="px-4 py-2 text-white overflow-hidden text-ellipsis whitespace-nowrap">{cert.issuedToEmailId}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400">No certificates issued yet.</p>
          )}
        </div>
      </div>

{/* Generate Certificate Form Popup */}
{isFormOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <form onSubmit={handleGenerateCertificate} className="bg-white rounded-lg p-8 w-96 shadow-lg transition-transform transform duration-300 ease-in-out scale-100 hover:scale-105">
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">Generate Certificate</h3>
      
      <div className="mb-4">
        <label htmlFor="participantName" className="block text-sm font-medium text-gray-700 mb-2">Participant Name</label>
        <input
          type="text"
          name="participantName"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter participant's name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter participant's email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="prizePosition" className="block text-sm font-medium text-gray-700 mb-2">Prize Position</label>
        <input
          type="text"
          name="prizePosition"
          required
          className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter prize position"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          className={`px-4 py-2 w-full mr-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition duration-200 ${generating ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={generating}
        >
          {generating ? 'Generating...' : 'Generate'}
        </button>
        <button
          type="button"
          className="px-4 py-2 w-full bg-red-600 rounded-md text-white hover:bg-red-700 transition duration-200"
          onClick={() => setIsFormOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
}
