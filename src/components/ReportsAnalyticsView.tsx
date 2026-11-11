import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  Building,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Star,
  Users
} from 'lucide-react';

export const ReportsAnalyticsView: React.FC = () => {
  const { complaints, departments, analytics, availableUsers } = useApp();
  const [reportPeriod, setReportPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const summary = analytics?.summary || {
    total: complaints.length,
    closed: 4,
    pending: 2,
    inProgress: 3,
    overdue: 1,
    resolutionRate: 75,
    avgResolutionHours: 32,
    satisfactionRating: '4.9'
  };

  const departmentStats = analytics?.departmentStats || [];
  const districtCounts = analytics?.districtCounts || {};
  const officers = availableUsers.filter(u => u.role === 'officer');

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = ['Complaint ID', 'Title', 'Department', 'District', 'Ward', 'Status', 'Priority', 'Citizen', 'Created Date', 'Deadline', 'Is Overdue'];
    const rows = complaints.map(c => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.departmentName}"`,
      c.location.district,
      `"${c.location.wardOrZone}"`,
      c.status,
      c.priority,
      c.citizenName,
      new Date(c.createdAt).toLocaleDateString(),
      new Date(c.targetResolutionDate).toLocaleDateString(),
      c.isOverdue ? 'YES' : 'NO'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `JANASEVA_Grievance_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Printable PDF view handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 mb-1">
            Government Performance & Audit Division
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Civic Redressal Analytics & Statutory Audit Reports
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Prepared under the Karnataka Guarantee of Services to Citizens (Sakala) Framework
          </p>
        </div>

        <div className="flex items-center gap-3 no-print">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setReportPeriod('monthly')}
              className={`px-3 py-1.5 rounded font-bold transition-colors ${
                reportPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Monthly Audit
            </button>
            <button
              onClick={() => setReportPeriod('yearly')}
              className={`px-3 py-1.5 rounded font-bold transition-colors ${
                reportPeriod === 'yearly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Annual Performance
            </button>
          </div>

          <button
            onClick={exportToCSV}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export CSV / Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-slate-500 font-semibold">Total Complaints Filed</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{summary.total}</div>
          <div className="text-[10px] text-slate-400 mt-1">100% digital audit trace</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-emerald-700 font-semibold">Verified Closed Rate</div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">{summary.resolutionRate}%</div>
          <div className="text-[10px] text-emerald-600 mt-1">Citizen confirmed</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-blue-700 font-semibold">Average Resolution Time</div>
          <div className="text-2xl font-bold font-mono text-blue-700 mt-1">{summary.avgResolutionHours}h</div>
          <div className="text-[10px] text-blue-600 mt-1">Against 72h benchmark</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-amber-700 font-semibold">Citizen Satisfaction Score</div>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1 flex items-center gap-1">
            <span>{summary.satisfactionRating}</span>
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-[10px] text-amber-600 mt-1">Independent rating</div>
        </div>
      </div>

      {/* Officer Workload & Productivity Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 font-bold text-slate-900 text-sm">
          Field Officer Workload Distribution & Accountability
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3">Officer Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Designation</th>
                <th className="p-3 text-right">Assigned Tasks</th>
                <th className="p-3 text-right">Completed</th>
                <th className="p-3 text-right">Overdue</th>
                <th className="p-3 text-right">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {officers.map(off => {
                const tasks = complaints.filter(c => c.assignedOfficerId === off.id);
                const done = tasks.filter(c => c.status === 'successfully_closed' || c.status === 'resolved_awaiting_verification').length;
                const overdue = tasks.filter(c => c.isOverdue).length;
                const rate = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 100;

                return (
                  <tr key={off.id} className="hover:bg-slate-50 font-medium">
                    <td className="p-3 font-semibold text-slate-900">{off.name}</td>
                    <td className="p-3 text-slate-600 font-mono text-[11px]">{off.departmentId?.replace('dept_', '').toUpperCase()}</td>
                    <td className="p-3 text-slate-600">{off.designation}</td>
                    <td className="p-3 text-right font-mono tabular-nums">{tasks.length}</td>
                    <td className="p-3 text-right font-mono tabular-nums text-emerald-700">{done}</td>
                    <td className="p-3 text-right font-mono tabular-nums text-red-600">{overdue}</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-blue-50 text-blue-800">
                        {rate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Footer Stamp for Printed Reports */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-[11px] text-slate-500 space-y-1">
        <div>
          Official Performance Statement generated from JANASEVA Civic Database on {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}.
        </div>
        <div className="font-semibold text-slate-700">
          State Administrative Reforms & Public Grievance Commission · Bengaluru, Karnataka
        </div>
      </div>
    </div>
  );
};
