import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, CheckCircle2, Clock, AlertCircle, FileText, ChevronRight, Star, RotateCcw } from 'lucide-react';
import { ComplaintStatus } from '../types';

export const CitizenDashboard: React.FC = () => {
  const {
    complaints,
    currentUser,
    setSelectedComplaint,
    setIsReportModalOpen,
    t
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter complaints belonging to citizen or demo view
  const myComplaints = complaints.filter(c =>
    c.citizenId === currentUser.id || c.citizenName === currentUser.name || currentUser.role === 'citizen'
  );

  const awaitingVerificationList = myComplaints.filter(c => c.status === 'resolved_awaiting_verification');

  const filtered = myComplaints.filter(c => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'verification') return c.status === 'resolved_awaiting_verification';
    if (statusFilter === 'active') return c.status !== 'successfully_closed' && c.status !== 'rejected';
    if (statusFilter === 'closed') return c.status === 'successfully_closed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Citizen Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 mb-2">
            Citizen Grievance Redressal Portal
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Namaskara, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Registered Ward: <strong>{currentUser.district} ({currentUser.taluk || 'East'})</strong> · Contact: +91 {currentUser.phone}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.reportProblem}</span>
          </button>
        </div>
      </div>

      {/* Action Required Banner for Verification */}
      {awaitingVerificationList.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Action Required: {awaitingVerificationList.length} Complaint(s) Solved by Officer – Confirm Ground Resolution!</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Officers have uploaded physical proof of work. In accordance with Karnataka Sakala governance, tickets are never closed without citizen verification. Please inspect the site and confirm or reopen!
          </p>
          <div className="space-y-2 pt-1">
            {awaitingVerificationList.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedComplaint(item)}
                className="bg-white border border-amber-200 hover:border-amber-400 p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <span className="font-mono font-bold text-blue-700 mr-2 text-xs">{item.id}</span>
                  <span className="font-semibold text-slate-900 text-xs">{item.title}</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Officer: {item.assignedOfficerName} ({item.departmentName})
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-xs">
                  Verify & Inspect &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complaints List Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">
              My Registered Grievance History ({myComplaints.length})
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                statusFilter === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('verification')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                statusFilter === 'verification' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Verify Needed ({awaitingVerificationList.length})
            </button>
            <button
              onClick={() => setStatusFilter('closed')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                statusFilter === 'closed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Complaints Grid */}
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No complaints in this filter.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedComplaint(item)}
                className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-700">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800">
                      {item.departmentName}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>

                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                    <span>{item.location.address || item.location.wardOrZone}, {item.location.district}</span>
                    <span>·</span>
                    <span>Reported {new Date(item.createdAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>Officer: <strong>{item.assignedOfficerName || 'Under Nodal Routing'}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase ${
                      item.status === 'successfully_closed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'resolved_awaiting_verification'
                        ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-400'
                        : item.status === 'work_in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.status.replace(/_/g, ' ')}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">
                      SLA: {new Date(item.targetResolutionDate).toLocaleDateString()}
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
