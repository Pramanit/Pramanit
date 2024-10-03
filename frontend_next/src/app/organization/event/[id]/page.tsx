"use client"; // Make this a Client Component

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/pramanit3.png'; // Import the logo image
import { IoArrowBackOutline } from 'react-icons/io5'; // Import a back icon
import { IoCopy } from 'react-icons/io5'; // Import copy icon

// Define the EventType interface for event data
interface EventType {
  eventName: string;
  description: string;
  dateTime: string;
}

// Define the CertificateType interface for certificate data
interface CertificateType {
  issuedToEmail: string;
  prize: string;
  date: string;
  verificationId: string;
}

// Set the runtime environment to 'edge'
export const runtime = 'edge';

export default function EventPage() {
  const router = useRouter(); // Initialize useRouter
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState<EventType | null>(null); // Store event data
  const [certificates, setCertificates] = useState<CertificateType[]>([]); // Store certificates data
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle certificate form popup
  const [loading, setLoading] = useState(true); // Handle loading state
  const [generating, setGenerating] = useState(false); // Handle generating state for the certificate
  const [error, setError] = useState<string | null>(null); // Handle error state

  const [copiedId, setCopiedId] = useState<string | null>(null); // Track the ID that was copied

  // Fetch event details and certificates when the page loads
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/event/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenOrganization')}`, // Assuming you're storing the JWT in localStorage
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        setEvent(data.event);
        setCertificates(data.certificates);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching event details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Handle certificate generation
  const handleGenerateCertificate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const certificateData = {
      name: formData.get("participantName") as string,
      email: formData.get("email") as string,
      prize: formData.get("prizePosition") as string,
      dateTime: event?.dateTime,
    };

    setGenerating(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/event/${id}/createCertificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('tokenOrganization')}`, // Send the JWT token
        },
        body: JSON.stringify(certificateData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate');
      }

      const data = await response.json();
      console.log('Certificate generated successfully:', data);
      setIsFormOpen(false);
      fetchCertificates(); // Refresh the list of certificates
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setGenerating(false);
    }
  };

  // Fetch updated list of certificates after generating a new one
  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/event/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenOrganization')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch certificates');
      }

      const data = await response.json();
      setCertificates(data.certificates);
    } catch (error: any) {
      console.error('Error fetching certificates:', error);
    }
  };

  // Handle copy of the verification ID
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id); // Set the copied ID to show the message
      setTimeout(() => setCopiedId(null), 2000); // Remove the message after 2 seconds
    });
  };

  // Loading state UI
  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  // Error state UI
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Main Event Page UI
  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md py-2 px-4 mb-6 mx-4 rounded-lg shadow-lg">
        <div className="flex items-center">
          {/* Back button */}
          <button onClick={() => router.back()} className="mr-4 text-white hover:text-blue-500">
            <IoArrowBackOutline size={24} />
          </button>
          <h1 className="text-lg font-semibold">Event Details</h1>
        </div>
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
                    <th className="px-4 py-2 text-left text-gray-300">Verification Id</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {certificates.map((cert, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-300">{cert.issuedToEmail}</td>
                      <td className="px-4 py-2 text-gray-300">{cert.prize}</td>
                      <td className="px-4 py-2 text-gray-300">{cert.date}</td>
                      <td className="px-4 py-2 text-gray-300">
                        <div className="relative">
                          {/* Copy Button for Verification Id */}
                          <button 
                            className="absolute top-0 left-0 flex items-center text-gray-300 hover:text-blue-500"
                            onClick={() => handleCopyId(cert.verificationId)}
                          >
                            <IoCopy className="mr-1" /> 
                          </button>
                          {/* Verification ID Display */}
                          <span
                            className="pl-8 cursor-pointer"
                            onClick={() => handleCopyId(cert.verificationId)} // Copy on click
                          >
                            {cert.verificationId}
                          </span>
                          {/* Message to indicate copy success */}
                          {copiedId === cert.verificationId && (
                            <span className="text-green-500 text-sm ml-2">Verification ID copied!</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-300">No certificates issued yet.</p>
          )}
        </div>
      </div>

      {/* Certificate Generation Form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h3 className="text-xl font-semibold mb-4">Generate Certificate</h3>
            <form onSubmit={handleGenerateCertificate}>
              <div className="mb-4">
                <label className="block text-gray-700">Participant Name</label>
                <input
                  type="text"
                  name="participantName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Prize Position</label>
                <input
                  type="text"
                  name="prizePosition"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={generating}
                >
                  {generating ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
