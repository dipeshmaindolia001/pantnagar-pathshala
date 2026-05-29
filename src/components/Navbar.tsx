'use client';

import { useState } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl sm:text-2xl font-extrabold font-heading gradient-text">
              Pantnagar Mock Tests
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            {isLoaded && (
              <Link
                href="/resources"
                className="px-5 py-2 rounded-lg text-sm font-semibold text-primary-900 border border-primary-800 hover:bg-primary-50 transition-colors duration-200"
              >
                📚 Free Resources
              </Link>
            )}
            {isLoaded && !isSignedIn && (
              <>
                <Link
                  href="/sign-in"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-primary-900 border border-primary-800 hover:bg-primary-50 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 transition-colors duration-200 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
            {isLoaded && isSignedIn && (
              <>
                <Link
                  href="/dashboard"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 transition-colors duration-200 shadow-md"
                >
                  Dashboard
                </Link>
                <UserButton
                  appearance={{
                    elements: { avatarBox: 'w-9 h-9' },
                  }}
                />
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-primary-900 hover:bg-primary-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-2 border-t border-gray-100">
          {isLoaded && (
            <Link
              href="/resources"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-primary-900 border border-primary-800 hover:bg-primary-50 transition-colors"
            >
              📚 Free Resources
            </Link>
          )}
          {isLoaded && !isSignedIn && (
            <>
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-primary-900 border border-primary-800 hover:bg-primary-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 transition-colors shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
          {isLoaded && isSignedIn && (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 transition-colors shadow-md"
              >
                Dashboard
              </Link>
              <div className="flex justify-center pt-1">
                <UserButton
                  appearance={{
                    elements: { avatarBox: 'w-9 h-9' },
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
