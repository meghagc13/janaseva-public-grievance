import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InteractiveMap } from './InteractiveMap';
import {
  BarChart2,
  PieChart,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Star,
  FileText
} from 'lucide-react';
import { KARNATAKA_DISTRICTS } from '../data/karnatakaLocations';

export const PublicDashboard: React.FC = () => {
  const { analytics, complaints, setSelectedComplaint, departments, t } = useApp();
  const [selectedViewTab, setSelectedViewTab] = useState<'map' | 'departments' | 'districts'>('map');

  const summary = analytics?.summary || {
    total: complaints.length,
    pending: 2,
    inProgress: 3,
    awaitingVerification: 1,
    closed: 4,
    reopened: 0,
    overdue: 1,
    resolutionRate: 75,
    avgResolutionHours: 32,
    satisfactionRating: '4.9'
  };

  const departmentStats = analytics?.departmentStats || [];
  const districtCounts = analytics?.districtCounts || {};
  const categoryStats = analytics?.categoryStats || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Karnataka Open Civic Governance & Transparency Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Public Grievance Redressal Performance Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Real-time, audited statistics on civic issue resolution across all 14 departments and 31 districts. All citizen personal contact data is strictly masked to preserve privacy.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-center">
          <div className="text-slate-500 font-medium text-[11px]">Total Grievances</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {summary.total}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Across Karnataka</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-center">
          <div className="text-amber-700 font-medium text-[11px]">Pending Review</div>
          <div className="text-2xl font-bold text-amber-600 font-mono tabular-nums mt-1">
            {summary.pending}
          </div>
          <div className="text-[10px] text-amber-600/80 mt-0.5">Awaiting initial triage</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-center">
          <div className="text-blue-700 font-medium text-[11px]">Work in Progress</div>
          <div className="text-2xl font-bold text-blue-600 font-mono tabular-nums mt-1">
            {summary.inProgress}
          </div>
          <div className="text-[10px] text-blue-600/80 mt-0.5">Field teams active</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-center">
          <div className="text-purple-700 font-medium text-[11px]">Verify Needed</div>
          <div className="text-2xl font-bold text-purple-600 font-mono tabular-nums mt-1">
            {summary.awaitingVerification}
          </div>
          <div className="text-[10px] text-purple-600/80 mt-0.5">Proof uploaded</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-center">
          <div className="text-emerald-700 font-medium text-[11px]">Verified Solved</div>
          <div className="text-2xl font-bold text-emerald-600 font-mono tabular-nums mt-1">
            {summary.closed}
          </div>
          <div className="text-[10px] text-emerald-600/80 mt-0.5">{summary.resolutionRate}% success rate</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-center">
          <div className="text-red-700 font-medium text-[11px]">Overdue SLA</div>
          <div className="text-2xl font-bold text-red-600 font-mono tabular-nums mt-1">
            {summary.overdue}
          </div>
          <div className="text-[10px] text-red-600/80 mt-0.5">Escalated tickets</div>
        </div>
      </div>

      {/* Main Interactive Map & Visuals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900">
              Karnataka Grievance Geo-Spatial Map & Department Analysis
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setSelectedViewTab('map')}
              className={`px-3 py-1 rounded font-medium cursor-pointer ${
                selectedViewTab === 'map' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => setSelectedViewTab('departments')}
              className={`px-3 py-1 rounded font-medium cursor-pointer ${
                selectedViewTab === 'departments' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Department League Table
            </button>
            <button
              onClick={() => setSelectedViewTab('districts')}
              className={`px-3 py-1 rounded font-medium cursor-pointer ${
                selectedViewTab === 'districts' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              District Breakdown
            </button>
          </div>
        </div>

        {selectedViewTab === 'map' && (
          <InteractiveMap
            heightClass="h-[520px]"
            onSelectComplaint={(c) => setSelectedComplaint(c)}
          />
        )}

        {selectedViewTab === 'departments' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 font-bold text-slate-900 text-sm">
              All 14 Karnataka Departments: Grievance Volume, Resolution Rate & SLA Compliance
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-3">Department</th>
                    <th className="p-3">Code</th>
                    <th className="p-3 text-right">Total Received</th>
                    <th className="p-3 text-right">Resolved & Verified</th>
                    <th className="p-3 text-right">Pending</th>
                    <th className="p-3 text-right">Overdue</th>
                    <th className="p-3 text-right">Resolution Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {departmentStats.map((dept) => (
                    <tr key={dept.departmentId} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">{dept.name}</td>
                      <td className="p-3 font-mono text-slate-500">{dept.shortCode}</td>
                      <td className="p-3 text-right font-mono tabular-nums text-slate-800">{dept.total}</td>
                      <td className="p-3 text-right font-mono tabular-nums text-emerald-700 font-bold">{dept.resolved}</td>
                      <td className="p-3 text-right font-mono tabular-nums text-amber-700">{dept.pending}</td>
                      <td className="p-3 text-right font-mono tabular-nums text-red-600 font-bold">{dept.overdue}</td>
                      <td className="p-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          dept.resolutionRate >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {dept.resolutionRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedViewTab === 'districts' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">
              District Grievance Inflow & Resolution Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(districtCounts).map(distName => {
                const info = districtCounts[distName];
                const pct = info.total > 0 ? Math.round((info.resolved / info.total) * 100) : 0;
                return (
                  <div key={distName} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900">{distName}</strong>
                      <span className="font-mono text-xs font-bold text-blue-700">{info.total} total</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full" style={{ width: `${pct}%` }} />
                      <div className="bg-amber-500 h-full" style={{ width: `${100 - pct}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Resolved: <strong className="text-emerald-700">{info.resolved}</strong></span>
                      <span>Pending: <strong className="text-amber-700">{info.pending}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Frequently Reported Problems Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-700" />
          <span>Most Frequently Reported Civic Categories in Karnataka</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categoryStats.map(cat => (
            <div key={cat.categoryId} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">{cat.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High priority category</div>
              </div>
              <div className="font-mono font-bold text-base text-blue-700 tabular-nums">
                {cat.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
