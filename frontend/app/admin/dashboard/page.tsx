"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Download, LogOut, RefreshCw } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string | null;
  email: string;
  service_required: string;
  budget: string | null;
  status: "new" | "contacted" | "closed";
  date_submitted: string;
}

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-500" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { value: "closed", label: "Closed", color: "bg-green-500" },
];

// Security note: Using localStorage for JWT. httpOnly cookies preferred for production.
export default function Dashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterService, setFilterService] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("admin_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string> = {};
      if (filterStatus !== "all") params.status = filterStatus;
      if (filterService) params.service_required = filterService;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/leads`,
        { headers: getAuthHeaders(), params }
      );
      setLeads(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchLeads();
  }, [router]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/leads/${leadId}`,
        { status: newStatus },
        { headers: getAuthHeaders() }
      );
      fetchLeads();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/leads/export`,
        {
          headers: getAuthHeaders(),
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "leads_export.csv";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const handleFilterApply = () => {
    fetchLeads();
  };

  return (
    <main className="min-h-screen bg-[#111827]">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <SectionHeading
              eyebrow="Admin"
              title="Lead Management"
              subtitle="View and manage incoming leads"
            />
            <div className="flex gap-3">
              <GradientButton
                onClick={handleExport}
                disabled={isExporting}
                variant="secondary"
              >
                <Download size={18} className="mr-2" />
                {isExporting ? "Exporting..." : "Export CSV"}
              </GradientButton>
              <GradientButton onClick={handleLogout} variant="secondary">
                <LogOut size={18} className="mr-2" />
                Logout
              </GradientButton>
            </div>
          </motion.div>

          <GlassCard className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-body">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body"
                >
                  <option value="all" className="bg-[#0F172A]">
                    All Statuses
                  </option>
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0F172A]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-body">
                  Filter by Service
                </label>
                <input
                  type="text"
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  placeholder="e.g., Agentic AI"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body"
                />
              </div>
              <div className="flex items-end">
                <GradientButton onClick={handleFilterApply} variant="secondary">
                  <RefreshCw size={18} className="mr-2" />
                  Apply Filters
                </GradientButton>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-[#00D4FF] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400 font-body">Loading leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400 font-body">No leads found matching your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 font-body">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 font-body">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 font-body">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 font-body">
                        Service
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 font-body">
                        Budget
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 font-body">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 font-body">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-4 py-3 text-white font-body">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-300 font-body">
                          {lead.company || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-300 font-body">{lead.email}</td>
                        <td className="px-4 py-3 text-gray-300 font-body">
                          {lead.service_required}
                        </td>
                        <td className="px-4 py-3 text-gray-300 font-body">
                          {lead.budget || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className="px-2 py-1 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-[#00D4FF] font-body"
                          >
                            {statusOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-[#0F172A]">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-gray-400 font-body">
                          {new Date(lead.date_submitted).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </div>
      </section>
    </main>
  );
}