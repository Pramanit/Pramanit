// components/participant/Certificate.tsx
import React from 'react';

interface CertificateProps {
  name: string;
}

export const Certificate: React.FC<CertificateProps> = ({ name }) => {
  return (
    <div className="bg-gray-200 p-4 rounded shadow">
      <h3 className="font-medium text-center">{name}</h3>
    </div>
  );
};
