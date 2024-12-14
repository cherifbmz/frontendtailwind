'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="navbar fixed top-0 w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="logo text-3xl font-bold text-white">
          <Link href="/">HomePursuit</Link>
        </div>

        {/* Navbar Links */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium text-white">
          <li>
            <Link href="/houses/buy" className="hover:text-gray-200 transition duration-300 ease-in-out">Buying</Link>
          </li>
          <li>
            <Link href="/houses/sell" className="hover:text-gray-200 transition duration-300 ease-in-out">Selling</Link>
          </li>

          {/* User Profile Dropdown */}
          {user ? (
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="text-lg font-medium text-white hover:text-gray-200 transition duration-300 ease-in-out"
              >
                Profile
              </button>
              {showDropdown && (
                <ul className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg w-48 z-50 transition-all duration-200">
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link href="/login" className="text-lg font-medium text-white hover:text-gray-200 transition duration-300 ease-in-out">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleDropdown}
            className="text-white text-2xl hover:text-gray-200"
          >
            <i className={`fa ${showDropdown ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showDropdown && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl text-white py-4">
          <ul className="space-y-4 px-6">
            <li>
              <Link href="/buyinglist" className="block hover:text-gray-200 transition duration-300 ease-in-out">Buying</Link>
            </li>
            <li>
              <Link href="/Ajouterhouses" className="block hover:text-gray-200 transition duration-300 ease-in-out">Selling</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/profile" className="block hover:text-gray-200 transition duration-300 ease-in-out">View Profile</Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block w-full text-left hover:text-gray-200 transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="block hover:text-gray-200 transition duration-300 ease-in-out">Login</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
