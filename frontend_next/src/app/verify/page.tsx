"use client";

import { useState } from "react";
import Image from "next/image";
import pramanitLogo from "@/assets/images/pramanit3.png"; // Adjust path as per your structure
import { useRouter } from "next/navigation"; // Import router for navigation
import { Certificate } from './../../components/participant/Certificate';

// Define the type for the certificate details
interface CertificateDetails {
  eventName: string;
  organizedBy: string;
  prize: string;
  dateTime: string;
  issuedTo: string;
  issuedToEmail: string;
}

export default function CertificateVerification() {
  const [inputId, setInputId] = useState(""); // Input field for certificate ID
  // const [certificateDetails, setCertificateDetails] = useState<CertificateDetails | null>(null);
  const [certificateDetails, setCertificateDetails] = useState<string[] | null>(null);  // Holds certificate details after verification
  const [isLoading, setIsLoading] = useState(false); // Indicates loading state during verification
  const [error, setError] = useState<string | null>(null); // Holds error messages

  const router = useRouter(); // Hook for navigation (e.g., redirect on logo click)

  // Function to handle certificate verification
  const handleVerification = async () => {
    setIsLoading(true); // Set loading to true when verification starts
    setError(null); // Clear any previous errors
    setCertificateDetails(null); // Clear certificate details before new verification

    try {
      const response = await fetch(`http://localhost:3000/verify/${inputId.trim()}`); // Fetching certificate by input ID

      if (!response.ok) {
        throw new Error("Failed to verify certificate"); // Throw error if the response is not OK
      }

      const data = await response.json(); // Parse JSON response

      if (data.success) {
       const certificateFields = data.cert.split(" ");
       console.log(certificateFields);
        setCertificateDetails(data.cert.split(" ")); // Set certificate details on successful verification
      } else {
        setError("Invalid Certificate ID. Please try again."); // Show error for invalid certificate ID
      }
    } catch (err) {
      setError("Verification failed. Please try again."); // Handle any other errors during fetch
    } finally {
      setIsLoading(false); // Set loading to false after verification completes
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden">
      
      {/* Logo at top left corner */}
      <div className="absolute top-4 left-4 cursor-pointer" onClick={() => router.push("/#")}>
        <Image src={pramanitLogo} alt="Pramanit Logo" width={50} height={50} />
      </div>

      {/* Form Section as a Card */}
      {/* This section is no longer a popup, it now appears as part of the page */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Verification Form</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm mb-1">Enter Certificate ID</label>
            <input
              type="text"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)} // Update inputId state on change
              placeholder="Enter Certificate ID"
              className="w-full p-2 rounded bg-gray-700 text-white" // Input styling
              required
            />
          </div>
          <div className="flex justify-between">
            {/* Button to trigger verification */}
            <button
              type="button"
              onClick={handleVerification}
              disabled={isLoading} // Disable button during loading
              className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700"
            >
              {isLoading ? "Verifying..." : "Verify Certificate"} {/* Show loading text when verifying */}
            </button>
          </div>
        </form>

        {/* Display error if verification fails */}
        {error && (
          <div className="mt-4 text-center text-red-500">{error}</div>
        )}
      </div>

      {/* Certificate Details Section as a Card */}
      {/* This section will display once the certificate details are successfully verified */}
      {certificateDetails && (
        <div className="mt-6 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4 text-center">Certificate Details</h3>
          <div className="text-sm mb-1"><strong>Event Name:</strong> {certificateDetails[3]}</div>
          <div className="text-sm mb-1"><strong>Organized By:</strong> {certificateDetails[0]}</div>
          <div className="text-sm mb-1"><strong>Prize:</strong> {certificateDetails[2]}</div>
          <div className="text-sm mb-1"><strong>Issued To:</strong> {certificateDetails[1]}</div> 
          {/* <div className="text-sm mb-1"><strong>Date & Time:</strong> {certificateDetails.dateTime}</div> */}
          {/* <div className="text-sm"><strong>Issued to Email Id:</strong> {certificateDetails.issuedToEmail}</div> */}
        </div>
      )}
    </div>
  );
}
