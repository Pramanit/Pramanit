"use client"; // Make this a Client Component

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/pramanit3.png'; // Import the blue tick image

// Define the Event type
interface EventType {
  eventName: string;
  description: string;
  dateTime: string;
}

const eventsData: EventType[] = [
  {
    eventName: 'Coding Workshop',
    description: 'A workshop on modern web development.',
    dateTime: '2024-09-30 10:00 AM',
  },
  {
    eventName: 'Art Exhibition',
    description: 'An exhibition showcasing local artists.',
    dateTime: '2024-10-05 2:00 PM',
  },
  // Add more events as needed
];

export default function EventPage() {
  const { id } = useParams(); // Get the event ID from the URL
  const event = eventsData[Number(id) - 1]; // Fetch the event based on the ID
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage popup visibility

  // Function to handle form submission
  const handleGenerateCertificate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const certificateData = {
      email: formData.get("email"),
      participantName: formData.get("participantName"),
      prizePosition: formData.get("prizePosition"),
    };
    console.log('Certificate Data:', certificateData); // Handle form data here
    setIsFormOpen(false); // Close the form after submission
  };

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
          <h2 className="text-4xl font-semibold mb-4 text-center">{event?.eventName}</h2>
          <p className="text-gray-300 mb-4 text-center italic">{event?.description}</p>
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
