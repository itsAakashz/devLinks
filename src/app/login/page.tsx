"use client"
import { useState, FormEvent } from 'react';
import { login } from '../auth/auth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="grid items-center justify-center min-h-screen bg-gray-100">
      <div className="lg:w-[476px] max-w-md p-8 space-y-10 bg-white rounded-[12px] h-[812px] lg:h-auto">
        <div className="flex bg-grey lg:mx-auto">
        <img src="/logo.png" alt="Devlinks" className="w-[40px] h-[40px]" />
        <p className="p-2 text-[24px]">devLinks</p>
        </div>
        <div>
          <h2 className="text-[32px] font-bold">Login</h2>
          <p className="text-gray-400 py-2">Add your details below to get back into the app</p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="email" className="text-[12px]">Email address</label>
            <div className="absolute left-3 inset-y-2.5 my-7 pointer-events-none">
              <FaEnvelope className="w-5 h-5 text-gray-500" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="e.g. alex@email.com"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-[12px]">Password</label>
            <div className="absolute left-3 inset-y-2.5 my-7 pointer-events-none">
              <FaLock className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#633CFF] border border-transparent rounded-[8px] group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
                 Don&apos;t have an account?
            <a href="/signup" className="text-purple-600 hover:underline p-1">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
