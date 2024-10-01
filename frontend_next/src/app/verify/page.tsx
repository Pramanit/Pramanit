"use client"

import { useState, useEffect } from 'react'

// Simulated backend fetch function
const fetchCertificateId = async (): Promise<string> => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
  return "CERT-" + Math.random().toString(36).substr(2, 9).toUpperCase()
}

export default function CertificateVerification() {
  const [certificateId, setCertificateId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCertificate = async () => {
      try {
        const id = await fetchCertificateId()
        setCertificateId(id)
      } catch (err) {
        setError("Failed to fetch certificate. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadCertificate()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Verification Window</h2>
          {isLoading ? (
            <div className="text-center text-white">Loading certificate...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-300 text-sm font-semibold mb-2">Your Certificate:</p>
              <div className="border-2 border-green-500 rounded-lg p-4 bg-gray-700">
                <p className="text-xl font-mono text-white text-center">{certificateId}</p>
              </div>
            </div>
          )}
        </div>
        <div className="bg-green-800 text-green-100 px-6 py-4">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-semibold">Verified</span>
          </div>
          <p className="mt-1 text-sm">This certificate has been successfully verified.</p>
        </div>
      </div>
    </div>
  )
}