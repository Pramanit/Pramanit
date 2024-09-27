// app/certificates/page.tsx
"use client"
import React from 'react';
import Image from 'next/image';
import {useState, useEffect} from "react";
import profilePhoto from '@/assets/images/umesh.png'; // Import the profile image
import logo from '@/assets/images/pramanit3.png'; // Import your logo image

export default async function CertificatesPage() {

  useEffect(async ()=>{
    const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/org`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = response.json();

    console.log(responseData);

  },[])
  // Sample data for the table
  const certificates = [
    {
      id: 1,
      eventName: 'Hackathon 2024',
      organisedBy: 'Tech Community',
      prize: 'First Place',
      dateTime: '2024-09-15 10:00 AM',
      issuedTo: 'Umesh Don',
      issuedToEmail: 'johndoe@example.com',
      verificationId: 'ABC123XYZ',
    },
    {
      id: 2,
      eventName: 'Coding Challenge',
      organisedBy: 'Code Masters',
      prize: 'Runner Up',
      dateTime: '2024-08-10 02:00 PM',
      issuedTo: 'Umesh Don',
      issuedToEmail: 'janesmith@example.com',
      verificationId: 'XYZ789ABC',
    },
    {
        id: 1,
        eventName: 'Hackathon 2024',
        organisedBy: 'Tech Community',
        prize: 'First Place',
        dateTime: '2024-09-15 10:00 AM',
        issuedTo: 'Umesh Don',
        issuedToEmail: 'johndoe@example.com',
        verificationId: 'ABC123XYZ',
      },
      {
        id: 2,
        eventName: 'Coding Challenge',
        organisedBy: 'Code Masters',
        prize: 'Runner Up',
        dateTime: '2024-08-10 02:00 PM',
        issuedTo: 'Umesh Don',
        issuedToEmail: 'janesmith@example.com',
        verificationId: 'XYZ789ABC',
      },
      {
        id: 1,
        eventName: 'Hackathon 2024',
        organisedBy: 'Tech Community',
        prize: 'First Place',
        dateTime: '2024-09-15 10:00 AM',
        issuedTo: 'Umesh Don',
        issuedToEmail: 'johndoe@example.com',
        verificationId: 'ABC123XYZ',
      },
      {
        id: 2,
        eventName: 'Coding Challenge',
        organisedBy: 'Code Masters',
        prize: 'Runner Up',
        dateTime: '2024-08-10 02:00 PM',
        issuedTo: 'Umesh Don',
        issuedToEmail: 'janesmith@example.com',
        verificationId: 'XYZ789ABC',
      },
    // Additional records...
  ];

  return (
    <div><p>hello there</p></div>
  );
}
