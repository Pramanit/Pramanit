// app/certificates/page.tsx
"use client"
import React from 'react';
import {useState, useEffect} from "react";
import Image from 'next/image';
import profilePhoto from '@/assets/images/umesh.png'; // Import the profile image
import logo from '@/assets/images/pramanit3.png'; // Import your logo image


export default function CertificatesPage() {


  // Sample data for the table
  const certificates = [
    {
      id: 1,
      eventName: 'Hackathon 2024',
      organisedBy: 'Tech Community',
      prize: 'First Place',
      dateTime: '2024-09-15 10:00 AM',
      issuedTo: 'Umesh Sahu',
      issuedToEmail: 'johndoe@example.com',
      verificationId: 'ABC123XYZ',
    },
    {
      id: 2,
      eventName: 'Coding Challenge',
      organisedBy: 'Code Masters',
      prize: 'Runner Up',
      dateTime: '2024-08-10 02:00 PM',
      issuedTo: 'Umesh Sahu',
      issuedToEmail: 'janesmith@example.com',
      verificationId: 'XYZ789ABC',
    },
    {
        id: 1,
        eventName: 'Hackathon 2024',
        organisedBy: 'Tech Community',
        prize: 'First Place',
        dateTime: '2024-09-15 10:00 AM',
        issuedTo: 'Umesh Sahu',
        issuedToEmail: 'johndoe@example.com',
        verificationId: 'ABC123XYZ',
      },
      {
        id: 2,
        eventName: 'Coding Challenge',
        organisedBy: 'Code Masters',
        prize: 'Runner Up',
        dateTime: '2024-08-10 02:00 PM',
        issuedTo: 'Umesh Sahu',
        issuedToEmail: 'janesmith@example.com',
        verificationId: 'XYZ789ABC',
      },
      {
        id: 1,
        eventName: 'Hackathon 2024',
        organisedBy: 'Tech Community',
        prize: 'First Place',
        dateTime: '2024-09-15 10:00 AM',
        issuedTo: 'Umesh Sahu',
        issuedToEmail: 'johndoe@example.com',
        verificationId: 'ABC123XYZ',
      },
      {
        id: 2,
        eventName: 'Coding Challenge',
        organisedBy: 'Code Masters',
        prize: 'Runner Up',
        dateTime: '2024-08-10 02:00 PM',
        issuedTo: 'Umesh Sahu',
        issuedToEmail: 'janesmith@example.com',
        verificationId: 'XYZ789ABC',
      },
    // Additional records...
  ];

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] llg:h-[800px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#5A88B0] bg-[radial-gradient(closest-side,#000_82%,#1C3B6B)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>

      {/* Navbar */}
      <div className="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md py-2 px-4 mb-6 mx-4 rounded-lg shadow-lg">
        {/* Center Title */}
        <h1 className="text-lg font-semibold">Your Dashboard</h1>

        {/* Logo on the right */}
        <div>
          <Image
            src={logo}
            alt="Logo"
            className="w-12 h-12"
            width={48}
            height={48}
          />
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
            <span className="text-2xl font-semibold">Umesh Sahu</span>
          </div>
        </div>
      </div>

      {/* Centered Certificates Title with gap */}
      <h2 className="text-3xl font-semibold mt-10 mb-6 text-center text-white">Certificates</h2>

      {/* Table Section with padding */}
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
                <td className="py-2 px-4 border-b text-white">{certificate.organisedBy}</td>
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
    </div>
  );
}
