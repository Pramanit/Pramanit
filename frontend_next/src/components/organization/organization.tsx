// src/pages/organization.tsx

"use client";

const OrganizationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, Organization!</h1>
        <p className="mb-4">This is the organization page where you can manage your data and perform administrative tasks.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => alert('Organization functionality will be implemented here')}
        >
          Manage Your Dashboard
        </button>
      </div>
    </div>
  );
};

export default OrganizationPage;
