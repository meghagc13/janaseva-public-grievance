import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Users,
  Building,
  RotateCcw,
  CheckCircle,
  FileText,
  AlertTriangle,
  Search,
  Plus,
  ArrowRightLeft,
  ChevronRight
} from 'lucide-react';
import { User } from '../types';

export const SuperAdminDashboard: React.FC = () => {
  const {
    currentUser,
    complaints,
    departments,
    availableUsers,
    auditLogs,
    setSelectedComplaint,
    refreshData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'complaints' | 'reroute' | 'officers' | 'audit'>('complaints');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOfficerModalOpen, setIsAddOfficerModalOpen] = useState(false);

  // New Officer form state
  const [officerName, setOfficerName] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [officerPhone, setOfficerPhone] = useState('94480');
  const [officerDeptId, setOfficerDeptId] = useState('dept_municipal');
  const [officerDesignation, setOfficerDesignation] = useState('Assistant Executive Engineer');

  const filteredComplaints = complaints.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const overdueComplaints = complaints.filter(c => c.isOverdue);
  const officers = availableUsers.filter(u => u.role === 'officer');

  const handleCreateOfficer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/officers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: officerName,
          email: officerEmail,
          phone: officerPhone,
          departmentId: officerDeptId,
          designation: officerDesignation
        })
      });

      if (res.ok) {
        alert('Officer account created and verified successfully!');
        setIsAddOfficerModalOpen(false);
        setOfficerName('');
        setOfficerEmail('');
        await refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-xs">
      {/* Super Admin Top Badge */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 mb-2">
            State Administrative Command & Oversight
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {currentUser.name}
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            {currentUser.designation || 'Principal Secretary'} · Government of Karnataka Grievance Cell
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddOfficerModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Provision Officer Account</span>
          </button>
        </div>
      </div>

      {/* Global State Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-slate-500 font-medium">All Karnataka Grievances</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {complaints.length}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Across 31 districts</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-slate-500 font-medium">Active Departments</div>
          <div className="text-2xl font-bold text-blue-700 font-mono tabular-nums mt-1">
            {departments.length}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">BBMP, PWD, BWSSB, BESCOM...</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-slate-500 font-medium">Verified Field Officers</div>
          <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
            {officers.length}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">On ground roster</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-slate-500 font-medium">Delayed SLA Exceptions</div>
          <div className="text-2xl font-bold text-red-700 font-mono tabular-nums mt-1">
            {overdueComplaints.length}
          </div>
          <div className="text-[10px] text-red-600 font-semibold mt-1">Under disciplinary notice</div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`px-4 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
            activeTab === 'complaints' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Complaints Stream ({complaints.length})
        </button>
        <button
          onClick={() => setActiveTab('officers')}
          className={`px-4 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
            activeTab === 'officers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Officer Registry ({officers.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
            activeTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Immutable Audit Trail ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: ALL COMPLAINTS & SEARCH */}
      {activeTab === 'complaints' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID, keyword, ward, department..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <span className="text-slate-500 font-mono">{filteredComplaints.length} records found</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredComplaints.map(c => (
              <div
                key={c.id}
                className="p-4 hover:bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-700">{c.id}</span>
                    <span className="font-semibold text-slate-700">[{c.departmentName}]</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100">
                      {c.status.replace(/_/g, ' ')}
                    </span>
                    {c.isOverdue && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-700">
                        SLA Overdue
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{c.title}</h3>
                  <div className="text-slate-500 text-[11px] flex gap-3">
                    <span>{c.location.address || c.location.wardOrZone}, {c.location.district}</span>
                    <span>·</span>
                    <span>Officer: <strong>{c.assignedOfficerName || 'Unassigned'}</strong></span>
                    <span>·</span>
                    <span>Citizen: {c.citizenName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedComplaint(c)}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded flex items-center gap-1"
                  >
                    <span>Inspect / Re-Route</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: OFFICER REGISTRY */}
      {activeTab === 'officers' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 font-bold text-slate-900 text-sm">
            Government Field Engineers & Designated Redressal Officers
          </div>
          <div className="divide-y divide-slate-100">
            {officers.map(off => (
              <div key={off.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span>{off.name}</span>
                    <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      {off.badgeNumber}
                    </span>
                    <span className="text-emerald-700 text-[11px] font-semibold">✓ Verified</span>
                  </div>
                  <div className="text-slate-600 text-xs">
                    {off.designation} · Dept: <strong className="text-slate-800">{off.departmentId?.replace('dept_', '').toUpperCase()}</strong>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Email: {off.email} · Phone: +91 {off.phone} · District: {off.district}
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-bold text-[11px]">
                    Active on Duty
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 font-bold text-slate-900 text-sm">
            Government Audit Log & Event Stream
          </div>
          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto font-mono text-[11px]">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3.5 hover:bg-slate-50 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-bold text-blue-700">{log.action}</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="text-slate-800">{log.details}</div>
                <div className="text-slate-400 text-[10px]">
                  Actor: <strong>{log.actorName}</strong> ({log.actorRole}) · Ticket: {log.complaintId || 'System'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Officer Modal */}
      {isAddOfficerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">Provision Verified Officer Account</h2>
            <form onSubmit={handleCreateOfficer} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name & Title</label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  placeholder="e.g. Er. Basavaraj Patil"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Official Government Email</label>
                <input
                  type="email"
                  value={officerEmail}
                  onChange={(e) => setOfficerEmail(e.target.value)}
                  placeholder="e.g. basavaraj.patil@karnataka.gov.in"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mobile</label>
                  <input
                    type="text"
                    value={officerPhone}
                    onChange={(e) => setOfficerPhone(e.target.value)}
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Department</label>
                  <select
                    value={officerDeptId}
                    onChange={(e) => setOfficerDeptId(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.shortCode}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Designation & Rank</label>
                <input
                  type="text"
                  value={officerDesignation}
                  onChange={(e) => setOfficerDesignation(e.target.value)}
                  placeholder="e.g. Assistant Executive Engineer (AEE)"
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOfficerModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded"
                >
                  Create & Verify Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
