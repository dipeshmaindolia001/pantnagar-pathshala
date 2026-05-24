"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PendingUser {
  clerkId: string;
  name: string;
  email: string;
  groupAccess: string;
  transactionId: string;
  createdAt: string;
}

interface ApprovedUser {
  clerkId: string;
  name: string;
  email: string;
  groupAccess: string;
  createdAt: string;
}

interface Resource {
  id: number;
  title: string;
  url: string;
  createdAt: string;
}

interface AdminPanelProps {
  pendingUsers: PendingUser[];
  approvedUsers: ApprovedUser[];
  resources: Resource[];
}

const getBadgeStyles = (groupAccess: string) => {
  switch (groupAccess) {
    case "PCB": return "bg-emerald-105 text-emerald-800 border border-emerald-200";
    case "PCM": return "bg-blue-105 text-blue-800 border border-blue-200";
    case "Biology": return "bg-green-100 text-green-800 border border-green-200";
    case "Chemistry": return "bg-purple-100 text-purple-800 border border-purple-200";
    case "Physics": return "bg-orange-100 text-orange-800 border border-orange-200";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function AdminPanel({
  pendingUsers,
  approvedUsers,
  resources = [],
}: AdminPanelProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"users" | "resources">("users");

  // User Approval states - loadingId and successId now use unique keys: `${clerkId}-${groupAccess}`
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  // Resource states
  const [resTitle, setResTitle] = useState("");
  const [resUrl, setResUrl] = useState("");
  const [addingResource, setAddingResource] = useState(false);
  const [deletingResourceId, setDeletingResourceId] = useState<number | null>(null);

  const handleApprove = async (clerkId: string, groupAccess: string) => {
    const loadingKey = `${clerkId}-${groupAccess}`;
    setLoadingId(loadingKey);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId, groupName: groupAccess }),
      });

      if (res.ok) {
        setSuccessId(loadingKey);
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to approve");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim() || !resUrl.trim()) return;

    setAddingResource(true);
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: resTitle, url: resUrl }),
      });

      if (res.ok) {
        setResTitle("");
        setResUrl("");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add resource");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setAddingResource(false);
    }
  };

  const handleDeleteResource = async (id: number) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    setDeletingResourceId(id);
    try {
      const res = await fetch(`/api/resources?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete resource");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeletingResourceId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    if (dateStr === "N/A") return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Premium Tab Selector */}
      <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-xl p-1.5 flex gap-1 shadow-sm">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex-1 py-3 px-4 text-center rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${
            activeTab === "users"
              ? "bg-green-800 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
          }`}
        >
          👥 User Access & Approvals
        </button>
        <button
          onClick={() => setActiveTab("resources")}
          className={`flex-1 py-3 px-4 text-center rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${
            activeTab === "resources"
              ? "bg-green-800 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
          }`}
        >
          📚 Manage Free Resources
        </button>
      </div>

      {activeTab === "users" ? (
        <div className="space-y-8 animate-fade-in">
          {/* Pending Approvals */}
          <div className="glass-card rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              ⏳ Pending Approvals
              {pendingUsers.length > 0 && (
                <span className="bg-yellow-100 text-yellow-700 text-sm px-2.5 py-0.5 rounded-full">
                  {pendingUsers.length}
                </span>
              )}
            </h2>

            {pendingUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-2">🎉</p>
                <p>No pending approvals! All caught up.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Group</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Transaction ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((user) => {
                      const uniqueKey = `${user.clerkId}-${user.groupAccess}`;
                      const isPending = loadingId === uniqueKey;
                      const isSuccess = successId === uniqueKey;
                      return (
                        <tr
                          key={uniqueKey}
                          className={`border-b border-gray-100 hover:bg-green-50/50 transition-colors ${
                            isSuccess ? "bg-green-50" : ""
                          }`}
                        >
                          <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">{user.email}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${getBadgeStyles(user.groupAccess)}`}
                            >
                              {user.groupAccess}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-mono text-gray-600">
                            {user.transactionId}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="py-3 px-4">
                            {isSuccess ? (
                              <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm">
                                ✅ Approved
                              </span>
                            ) : (
                              <button
                                onClick={() => handleApprove(user.clerkId, user.groupAccess)}
                                disabled={isPending}
                                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                              >
                                {isPending ? (
                                  <span className="flex items-center gap-1.5">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Approving...
                                  </span>
                                ) : (
                                  "Approve Access"
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Approved Users */}
          <div className="glass-card rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              ✅ Approved Users
              <span className="bg-green-100 text-green-700 text-sm px-2.5 py-0.5 rounded-full">
                {approvedUsers.length}
              </span>
            </h2>

            {approvedUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No approved users yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Group</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedUsers.map((user, i) => (
                      <tr
                        key={`${user.clerkId}-${user.groupAccess}-${i}`}
                        className="border-b border-gray-100 hover:bg-green-50/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${getBadgeStyles(user.groupAccess)}`}
                          >
                            {user.groupAccess}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Add Free Resource */}
          <div className="glass-card rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              ➕ Add Free PDF / Resource Link
            </h2>

            <form onSubmit={handleAddResource} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Resource / PDF Title
                  </label>
                  <input
                    type="text"
                    required
                    value={resTitle}
                    onChange={(e) => setResTitle(e.target.value)}
                    placeholder="e.g., Physics Chemistry Biology 2024 Syllabus PDF"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Google Drive Link
                  </label>
                  <input
                    type="url"
                    required
                    value={resUrl}
                    onChange={(e) => setResUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={addingResource}
                  className="px-6 py-2.5 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 disabled:opacity-50 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  {addingResource ? "Adding Resource..." : "Add Resource"}
                </button>
              </div>
            </form>
          </div>

          {/* List of Free Resources */}
          <div className="glass-card rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📚 Active Resources ({resources.length})
            </h2>

            {resources.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-2">📁</p>
                <p>No resources added yet. Add your first study PDF above.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Resource Title</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Google Drive URL</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date Added</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((res) => (
                      <tr
                        key={res.id}
                        className="border-b border-gray-100 hover:bg-green-50/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-semibold text-gray-800">{res.title}</td>
                        <td className="py-3 px-4 text-sm font-mono text-gray-500 max-w-xs truncate">
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-700 hover:underline hover:text-green-900 font-medium"
                          >
                            {res.url}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {formatDate(res.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDeleteResource(res.id)}
                            disabled={deletingResourceId === res.id}
                            className="px-3.5 py-1.5 text-xs bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-bold border border-red-200 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {deletingResourceId === res.id ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
