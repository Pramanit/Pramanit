"use client"; // Make this a Client Component
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import profilePhoto from '@/assets/images/organization-3d.jpg'; // Import the profile image
import logo from '@/assets/images/pramanit3.png'; // Import your logo image
import blueTick from '@/assets/images/bluetick1.png'; // Import the blue tick image

// Define the Event type
interface EventType {
  event: string; // or whatever properties your event has
  id: number;  // adjust as necessary
  // Add more properties as needed
}

export default function OrganizationsPage() {
  const [isVerified] = useState(true); // Replace this with actual verification logic
  const [isFormOpen, setIsFormOpen] = useState(false); // State to handle form visibility
  const router = useRouter();
  
  // State to hold the list of events
  const [events, setEvents] = useState([
    {
      id: 1,
      eventName: 'Coding Workshop',
      description: 'A workshop on modern web development.',
      dateTime: '2024-09-30 10:00 AM',
    },
    {
      id: 2,
      eventName: 'Art Exhibition',
      description: 'An exhibition showcasing local artists.',
      dateTime: '2024-10-05 2:00 PM',
    },
    // Duplicate events removed to avoid redundancy
  ]);

  // Update the handleAddEvent function
  const handleAddEvent = (event: any) => { 
    setEvents([...events, { ...event, id: events.length + 1 }]);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden">
      
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md py-2 px-4 mb-6 mx-4 rounded-lg shadow-lg">
        <h1 className="text-lg font-semibold">Organization Dashboard</h1>
        <div>
          {/* Redirect to home page when logo is clicked */}
          <a href="/">
            <Image src={logo} alt="Logo" className="w-12 h-12" width={48} height={48} />
          </a>
        </div>
      </div>

      {/* Profile Card Section */}
      <div className="flex justify-center mb-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg flex items-center space-x-6">
          <Image src={profilePhoto} alt="User Profile" className="w-32 h-32 rounded-full object-cover" width={128} height={128} />
          <div className="text-left">
            <h2 className="text-gray-300 text-sm">Organization Name</h2>
            <span className="text-2xl font-semibold">ABC org.</span>
            {isVerified && (
              <Image src={blueTick} alt="Verified Organization" className="inline-block w-9 h-9 ml-2 pb-1 pr-1" width={20} height={20} />
            )}
          </div>
        </div>
      </div>

      {/* Centered Events Title */}
      <h2 className="text-3xl font-semibold mt-10 mb-6 text-center text-white">Events List</h2>
      
      {/* Table Section */}
      <div className="overflow-x-auto px-4 mb-4">
        <table className="min-w-full bg-white bg-opacity-10 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-opacity-20">
              <th className="py-2 px-4 border-b text-left text-white">Event Name</th>
              <th className="py-2 px-4 border-b text-left text-white">Description</th>
              <th className="py-2 px-4 border-b text-left text-white">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-opacity-30 hover:bg-white/10 cursor-pointer"
                onClick={() => router.push(`/organization/event/${event.id}`)} // Navigate to event detail page
              >
                <td className="py-2 px-4 border-b text-white">{event.eventName}</td>
                <td className="py-2 px-4 border-b text-white">{event.description}</td>
                <td className="py-2 px-4 border-b text-white">{event.dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Event Button */}
      <div className="flex z-10 justify-center mt-6">
        <div className=''>
          <button
            className="px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
            onClick={() => setIsFormOpen(true)}
          >
            Create Event
          </button>
        </div>
      </div>

      {/* Popup Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create New Event</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newEvent = {
                  eventName: formData.get("eventName"),
                  description: formData.get("description"),
                  dateTime: formData.get("dateTime"),
                };
                handleAddEvent(newEvent);
              }}
            >
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Event Name</label>
                <input name="eventName" type="text" className="w-full p-2 rounded bg-gray-700 text-white" required />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Description</label>
                <textarea name="description" className="w-full p-2 rounded bg-gray-700 text-white" required />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Date & Time</label>
                <input name="dateTime" type="datetime-local" className="w-full p-2 rounded bg-gray-700 text-white" required />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700">
                  Save
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
