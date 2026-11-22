'use client';

import { useState } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🌱</span>
            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl font-extrabold font-heading gradient-text tracking-tight">
                Pantnagar Pathshala
              </span>
              <span className="text-[10px] text-gray-400 font-body hidden sm:block">
                Learn • Practice • Crack Pantnagar
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/resources"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-800 hover:bg-primary-50 transition-colors duration-200"
            >
              📚 Free Resources
            </Link>
            <Link
              href="/mocktest"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-800 hover:bg-primary-50 transition-colors duration-200"
            >
              📝 Mock Tests
            </Link>
            <Link
              href="/mentorship"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-800 hover:bg-primary-50 transition-colors duration-200"
            >
              🎯 Mentorship
            </Link>

            {isLoaded && isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 transition-colors duration-200 shadow-md"
                >
                  Dashboard
                </Link>
                <UserButton
                  appearance={{
                    elements: { avatarBox: 'w-9 h-9' },
                  }}
                />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-900 border border-primary-800 hover:bg-primary-50 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 transition-colors duration-200 shadow-md"
                >
                  Sign Up
                </Link>
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
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-2 border-t border-gray-100">
          <Link
            href="/resources"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-primary-900 border border-primary-800 hover:bg-primary-50 transition-colors"
          >
            📚 Free Resources
          </Link>
          <Link
            href="/mocktest"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-primary-900 border border-primary-800 hover:bg-primary-50 transition-colors"
          >
            📝 Mock Tests
          </Link>
          <Link
            href="/mentorship"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-primary-900 border border-primary-800 hover:bg-primary-50 transition-colors"
          >
            🎯 Mentorship
          </Link>

          {isLoaded && isSignedIn ? (
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
          ) : (
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
        </div>
      </div>
    </nav>
  );
}
