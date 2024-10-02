"use client"; // Make this a Client Component

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/pramanit3.png'; // Import the blue tick image

// Define the Event type
interface EventType {
  eventName: string;
  description: string;
  dateTime: string;
}

export const runtime = 'edge';

export default function EventPage() {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState<EventType | null>(null); // State to store the event data
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage popup visibility
  const [loading, setLoading] = useState(true); // State for loading
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
    } catch (error) {
      console.error('Error generating certificate:', error);
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
          <p className="text-gray-300 mb-4 text-center">Click the button below to generate a certificate for this event.</p>
          <div className="text-center">
            <button
              className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700"
              onClick={() => setIsFormOpen(true)}
            >
              Generate Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">Generate Certificate</h2>
            <form onSubmit={handleGenerateCertificate}>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Issued to Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Participant Name</label>
                <input
                  name="participantName"
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Prize/Position</label>
                <input
                  name="prizePosition"
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700">
                  Submit
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
