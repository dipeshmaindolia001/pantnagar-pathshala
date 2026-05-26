'use client';

import { Suspense, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function PaymentForm() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const groupParam = searchParams.get('group');

  const [transactionId, setTransactionId] = useState('');
  const [groupName, setGroupName] = useState<string>(
    groupParam && ['PCB', 'PCM', 'Biology', 'Chemistry', 'Physics'].includes(groupParam)
      ? groupParam
      : 'PCB'
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isSingleSubject = ['Biology', 'Chemistry', 'Physics'].includes(groupName);
  const price = 50;

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || 'dipeshmaindolia@oksbi';

  useEffect(() => {
    if (groupParam && ['PCB', 'PCM', 'Biology', 'Chemistry', 'Physics'].includes(groupParam)) {
      setGroupName(groupParam);
    }
  }, [groupParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      setError('Please enter the Transaction/UTR ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Ensure user exists in DB first
      if (user) {
        await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName || user.firstName || 'User',
          }),
        });
      }

      // Submit payment
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: transactionId.trim(), groupName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Payment submission failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-extrabold font-heading text-primary-900">
            Complete Payment
          </h1>
          <p className="mt-2 text-gray-600 font-body">
            Scan the QR code or use the UPI ID to pay
          </p>
        </div>

        {success ? (
          /* Success State */
          <div className="glass-card rounded-2xl p-8 text-center shadow-lg animate-fade-in-up">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold font-heading text-primary-900 mb-2">
              Payment Submitted!
            </h2>
            <p className="text-gray-600 font-body mb-6 text-sm">
              Your payment for the **{groupName} package** is under review. You&apos;ll get access within a few hours once verified by the admin.
            </p>

            {/* Premium WhatsApp Chat Link */}
            <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-left">
              <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                💬 Need Fast Approval?
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Join our official WhatsApp discussion support group to contact the admin directly for rapid approval or to raise any payment-side query.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow transition-all cursor-pointer text-center"
              >
                Join Support WhatsApp Group →
              </a>
            </div>

            <a
              href="/dashboard"
              className="inline-block px-6 py-3 rounded-xl text-sm font-bold text-white bg-primary-700 hover:bg-primary-800 transition-colors duration-200 shadow-md"
            >
              Go to Dashboard
            </a>
          </div>
        ) : (
          /* Payment Form */
          <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-lg animate-fade-in-up">
            {/* QR Code */}
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-white rounded-2xl shadow-md border border-gray-100 mb-4">
                <Image
                  src="/gpay-qr.jpeg"
                  alt="UPI QR Code"
                  width={220}
                  height={220}
                  className="rounded-lg"
                  priority
                />
              </div>
              <p className="text-sm text-gray-500 font-body">
                Scan with any UPI app
              </p>
            </div>

            {/* UPI ID */}
            <div className="flex items-center justify-center gap-2 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-sm text-gray-600 font-body">UPI ID:</span>
              <span className="text-sm font-bold text-primary-800 font-heading select-all">
                {upiId}
              </span>
            </div>

            {/* Amount */}
            <div className="text-center mb-6">
              <span className="text-4xl font-extrabold font-heading text-saffron-600">
                ₹{price}
              </span>
              <p className="text-sm text-gray-500 font-body mt-1">
                One-time payment for {groupName} package
              </p>
            </div>

            {/* Instructions */}
            <div className="mb-6 p-4 rounded-xl bg-primary-50 border border-primary-100">
              <p className="text-sm text-primary-800 font-body leading-relaxed">
                <strong>Instructions:</strong> Pay ₹{price} using any UPI app (Google Pay,
                PhonePe, Paytm, etc.). After payment, enter the Transaction/UTR ID
                from your payment confirmation below. Your access will be activated
                once verified by admin.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="transactionId" className="block text-sm font-semibold text-gray-700 font-body mb-1.5">
                  Transaction / UTR ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="transactionId"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g., 423456789012"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-0 outline-none text-sm font-body transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="groupName" className="block text-sm font-semibold text-gray-700 font-body mb-1.5">
                  Group
                </label>
                <select
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-0 outline-none text-sm font-body transition-colors duration-200 bg-white cursor-pointer"
                >
                  <option value="PCB">PCB — Physics, Chemistry, Biology (₹50)</option>
                  <option value="PCM">PCM — Physics, Chemistry, Mathematics (₹50)</option>
                  <option value="Biology">Biology Subject Mock Package — 5 Mocks (₹50)</option>
                  <option value="Chemistry">Chemistry Subject Mock Package — 5 Mocks (₹50)</option>
                  <option value="Physics">Physics Subject Mock Package — 5 Mocks (₹50)</option>
                </select>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-body">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3.5 rounded-xl text-base font-bold text-white bg-primary-700 hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Payment Details'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentForm />
    </Suspense>
  );
}
