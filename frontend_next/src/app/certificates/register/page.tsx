"use client";

export default function ParticipantRegister() {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-4 sm:py-8 relative overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Participant Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/participant/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
