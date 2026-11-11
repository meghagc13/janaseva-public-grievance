import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  UserPlus,
  Filter,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { Complaint, User } from '../types';

export const DepartmentDashboard: React.FC = () => {
  const {
    currentUser,
    complaints,
    departments,
    availableUsers,
    setSelectedComplaint,
    assignOfficer,
    escalateComplaint
  } = useApp();

  // Current active department filter (defaults to user's dept or BBMP)
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    currentUser.departmentId || 'dept_municipal'
  );
  const [filterState, setFilterState] = useState<'all' | 'unassigned' | 'in_progress' | 'overdue' | 'closed'>('all');

  const activeDept = departments.find(d => d.id === selectedDeptId) || departments[0];

  // Complaints belonging to the selected department
  const deptComplaints = complaints.filter(c => c.departmentId === selectedDeptId);

  const unassignedList = deptComplaints.filter(c => !c.assignedOfficerId);
  const inProgressList = deptComplaints.filter(c => c.status === 'work_in_progress' || c.status === 'assigned_to_officer');
  const overdueList = deptComplaints.filter(c => c.isOverdue);
  const closedList = deptComplaints.filter(c => c.status === 'successfully_closed');

  const deptOfficers = availableUsers.filter(u => u.role === 'officer');

  const displayed = deptComplaints.filter(c => {
    if (filterState === 'unassigned') return !c.assignedOfficerId;
    if (filterState === 'in_progress') return c.status === 'work_in_progress' || c.status === 'assigned_to_officer';
    if (filterState === 'overdue') return c.isOverdue;
    if (filterState === 'closed') return c.status === 'successfully_closed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-xs">
      {/* Department Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{activeDept.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                {activeDept.shortCode}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {activeDept.description}
            </p>
            <div className="text-[11px] text-slate-500 flex items-center gap-4 mt-2">
              <span>Nodal Officer: <strong>{activeDept.nodalOfficer}</strong></span>
              <span>·</span>
              <span>Citizen Helpline: <strong>{activeDept.helpline}</strong></span>
              <span>·</span>
              <span>Standard SLA: <strong>{activeDept.slaHoursStandard} Hours</strong></span>
            </div>
          </div>
        </div>

        {/* Switch Department Dropdown */}
        <div className="shrink-0">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Department Division Switcher:
          </label>
          <select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
          >
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.shortCode} – {d.name.split('(')[0]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setFilterState('all')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${filterState === 'all' ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-400' : 'bg-white border-slate-200'}`}
        >
          <div className="text-slate-500 text-xs font-medium">Total Received</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {deptComplaints.length}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Active within jurisdiction</div>
        </div>

        <div
          onClick={() => setFilterState('unassigned')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${filterState === 'unassigned' ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400' : 'bg-white border-slate-200'}`}
        >
          <div className="text-amber-800 text-xs font-medium">Needing Officer Designation</div>
          <div className="text-2xl font-bold text-amber-700 font-mono tabular-nums mt-1">
            {unassignedList.length}
          </div>
          <div className="text-[10px] text-amber-600 font-semibold mt-1">Assign field team</div>
        </div>

        <div
          onClick={() => setFilterState('overdue')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${filterState === 'overdue' ? 'bg-red-50 border-red-400 ring-1 ring-red-400' : 'bg-white border-slate-200'}`}
        >
          <div className="text-red-800 text-xs font-medium">Overdue / SLA Escalated</div>
          <div className="text-2xl font-bold text-red-700 font-mono tabular-nums mt-1">
            {overdueList.length}
          </div>
          <div className="text-[10px] text-red-600 font-semibold mt-1">Supervisory alert</div>
        </div>

        <div
          onClick={() => setFilterState('closed')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${filterState === 'closed' ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400' : 'bg-white border-slate-200'}`}
        >
          <div className="text-emerald-800 text-xs font-medium">Verified Solved</div>
          <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
            {closedList.length}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">
            {deptComplaints.length > 0 ? Math.round((closedList.length / deptComplaints.length) * 100) : 100}% Success Rate
          </div>
        </div>
      </div>

      {/* Complaints Queue Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="font-bold text-slate-900 text-sm">
            {activeDept.shortCode} Grievance Docket ({displayed.length})
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Filter:</span>
            <span className="capitalize font-bold text-blue-700">{filterState.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {displayed.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No complaints in this state for {activeDept.shortCode}.
            </div>
          ) : (
            displayed.map(c => (
              <div
                key={c.id}
                className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-700">{c.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      c.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {c.priority} Priority
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800">
                      {c.status.replace(/_/g, ' ')}
                    </span>
                    {c.isOverdue && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-700">
                        OVERDUE
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{c.title}</h3>

                  <div className="text-slate-500 flex flex-wrap items-center gap-3 text-[11px]">
                    <span>{c.location.address || c.location.wardOrZone}, {c.location.district}</span>
                    <span>·</span>
                    <span>Citizen: <strong>{c.citizenName}</strong></span>
                    <span>·</span>
                    <span>Assigned Officer: <strong>{c.assignedOfficerName || 'Not Assigned Yet'}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!c.assignedOfficerId && (
                    <button
                      onClick={() => setSelectedComplaint(c)}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded flex items-center gap-1"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Assign Officer</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedComplaint(c)}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>View Case</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
