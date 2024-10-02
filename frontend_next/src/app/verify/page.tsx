"use client";

import { useState } from "react";

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
  const [inputId, setInputId] = useState("");
  const [certificateDetails, setCertificateDetails] = useState<CertificateDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleVerification = async () => {
    setIsLoading(true);
    setError(null);
    setCertificateDetails(null);

    try {
      // Make a request to your Express.js backend
      const response = await fetch(`http://localhost:3000/verify/${inputId.trim()}`);

      if (!response.ok) {
        throw new Error("Failed to verify certificate");
      }

      const data = await response.json();

      if (data.success) {
        setCertificateDetails(data.cert); // Set the certificate details from your backend
        setIsFormOpen(true); // Open the form with certificate details
      } else {
        setError("Invalid Certificate ID. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden">
      {/* Popup Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">Verification Window</h2>
            <form>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Enter Certificate ID</label>
                <input
                  type="text"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                  placeholder="Enter Certificate ID"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleVerification}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700"
                >
                  {isLoading ? "Verifying..." : "Verify Certificate"}
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

            {error && (
              <div className="mt-4 text-center text-red-500">{error}</div>
            )}

            {certificateDetails && (
              <div className="mt-6 p-4 rounded-lg bg-gray-700 text-white border border-gray-600">
                <h3 className="text-lg font-bold mb-4 text-center">Certificate Details</h3>
                <div className="text-sm mb-1"><strong>Event Name:</strong> {certificateDetails.eventName}</div>
                <div className="text-sm mb-1"><strong>Organized By:</strong> {certificateDetails.organizedBy}</div>
                <div className="text-sm mb-1"><strong>Prize:</strong> {certificateDetails.prize}</div>
                <div className="text-sm mb-1"><strong>Date & Time:</strong> {certificateDetails.dateTime}</div>
                <div className="text-sm mb-1"><strong>Issued To:</strong> {certificateDetails.issuedTo}</div>
                <div className="text-sm"><strong>Issued to Email Id:</strong> {certificateDetails.issuedToEmail}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
