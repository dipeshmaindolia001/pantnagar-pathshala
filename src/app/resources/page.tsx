import { db } from "@/db";
import { resources } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export default async function ResourcesPage() {

  // Fetch free resources directly in Server Component
  const allResources = await db
    .select()
    .from(resources)
    .orderBy(desc(resources.createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-emerald-50/10">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center sm:text-left">
          <span className="inline-block px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Free Material
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
            📚 Free Study Resources & PDFs
          </h1>
          <p className="text-green-200 mt-2 text-base sm:text-lg max-w-2xl">
            Access free Pantnagar University (GBPUAT) entrance exam syllabus, previous papers, formula guides, and exam notes curated by our admins.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {allResources.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center max-w-xl mx-auto shadow-xl">
            <div className="text-6xl mb-4">📂</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No Resources Uploaded Yet
            </h2>
            <p className="text-gray-500 mb-6">
              Our admins are preparing the syllabus guides, previous question papers, and study guides. They will appear right here very soon!
            </p>
            <div className="inline-flex items-center gap-1.5 text-green-700 font-semibold">
              ✨ Stay tuned & check back later!
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResources.map((res) => (
              <div
                key={res.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-gray-100 bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group shadow-lg"
              >
                {/* Visual hover top highlight strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-700 to-emerald-600 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-green-50 text-green-800 rounded-xl">
                      {/* Document PDF SVG Icon */}
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold font-mono">
                      PDF Resource
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 font-heading leading-snug group-hover:text-green-800 transition-colors">
                    {res.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 mb-6">
                    Added on: {res.createdAt ? new Date(res.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    }) : "N/A"}
                  </p>
                </div>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-800 hover:bg-green-900 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center text-sm"
                >
                  <span>Download / View PDF</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
