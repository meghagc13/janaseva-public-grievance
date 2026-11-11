import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InteractiveMap } from './InteractiveMap';
import {
  Briefcase,
  AlertTriangle,
  Clock,
  CheckCircle2,
  MapPin,
  Hammer,
  Eye,
  Phone,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { Complaint } from '../types';

export const OfficerDashboard: React.FC = () => {
  const {
    currentUser,
    complaints,
    setSelectedComplaint,
    updateComplaintStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'queue' | 'map'>('queue');
  const [filterType, setFilterType] = useState<'all' | 'pending' | 'overdue' | 'resolved'>('all');

  // Filter complaints assigned to this officer or this officer's department
  const myAssignedComplaints = complaints.filter(c =>
    c.assignedOfficerId === currentUser.id ||
    (!c.assignedOfficerId && c.departmentId === currentUser.departmentId) ||
    currentUser.role === 'officer'
  );

  const overdueList = myAssignedComplaints.filter(c => c.isOverdue);
  const inProgressList = myAssignedComplaints.filter(c => c.status === 'work_in_progress');
  const resolvedList = myAssignedComplaints.filter(c => c.status === 'resolved_awaiting_verification' || c.status === 'successfully_closed');

  const displayedList = myAssignedComplaints.filter(c => {
    if (filterType === 'pending') return c.status === 'assigned_to_officer' || c.status === 'work_in_progress';
    if (filterType === 'overdue') return c.isOverdue;
    if (filterType === 'resolved') return c.status === 'resolved_awaiting_verification' || c.status === 'successfully_closed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Officer ID & Designation Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                Verified Field Engineer
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              {currentUser.designation || 'Assistant Executive Engineer'} · Badge: <strong className="font-mono text-slate-800">{currentUser.badgeNumber || 'KA-ENG-8402'}</strong>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Assigned Jurisdiction: <strong>{currentUser.district || 'Bengaluru Urban'} (Ward 112)</strong>
            </p>
          </div>
        </div>

        {/* Quick KPI Counters */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-center">
            <div className="font-mono font-bold text-base text-slate-900 tabular-nums">
              {myAssignedComplaints.length}
            </div>
            <div className="text-[10px] text-slate-500">Total Work Orders</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2 text-center">
            <div className="font-mono font-bold text-base text-red-700 tabular-nums">
              {overdueList.length}
            </div>
            <div className="text-[10px] text-red-600 font-semibold">Overdue SLA</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3.5 py-2 text-center">
            <div className="font-mono font-bold text-base text-emerald-700 tabular-nums">
              {resolvedList.length}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold">Completed</div>
          </div>
        </div>
      </div>

      {/* SLA Breach Warning */}
      {overdueList.length > 0 && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex items-center justify-between text-xs text-red-900">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <strong>Attention Required:</strong> You have {overdueList.length} complaint(s) exceeding maximum Sakala SLA deadlines.
            </div>
          </div>
          <button
            onClick={() => setFilterType('overdue')}
            className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white font-bold rounded text-xs"
          >
            Filter Overdue Tasks
          </button>
        </div>
      )}

      {/* Navigation Switcher: Queue vs Jurisdiction Map */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
              activeTab === 'queue' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Assigned Tasks Queue ({myAssignedComplaints.length})
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
              activeTab === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Field Jurisdiction Map View
          </button>
        </div>

        {activeTab === 'queue' && (
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded font-medium ${filterType === 'all' ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('pending')}
              className={`px-3 py-1 rounded font-medium ${filterType === 'pending' ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterType('overdue')}
              className={`px-3 py-1 rounded font-medium ${filterType === 'overdue' ? 'bg-red-100 text-red-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Overdue ({overdueList.length})
            </button>
            <button
              onClick={() => setFilterType('resolved')}
              className={`px-3 py-1 rounded font-medium ${filterType === 'resolved' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Resolved
            </button>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'queue' ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100">
          {displayedList.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No complaints in this queue view.
            </div>
          ) : (
            displayedList.map(task => (
              <div
                key={task.id}
                className="p-5 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-blue-700">{task.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      task.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {task.priority} Priority
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-800">
                      {task.status.replace(/_/g, ' ')}
                    </span>
                    {task.isOverdue && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-700">
                        OVERDUE
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{task.title}</h3>

                  <div className="text-slate-500 flex flex-wrap items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      {task.location.address || task.location.wardOrZone}, {task.location.district}
                    </span>
                    <span>·</span>
                    <span>Complainant: <strong>{task.citizenName}</strong> ({task.citizenPhoneMasked})</span>
                    <span>·</span>
                    <span>Deadline: <strong className="font-mono text-slate-700">{new Date(task.targetResolutionDate).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</strong></span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {task.status === 'assigned_to_officer' && (
                    <button
                      onClick={() => updateComplaintStatus(task.id, 'work_in_progress', 'Field team arrived on site; remediation initiated.')}
                      className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold rounded"
                    >
                      Mark In Progress
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedComplaint(task)}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Work Case</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <InteractiveMap
            filteredComplaints={myAssignedComplaints}
            heightClass="h-[560px]"
            onSelectComplaint={(c) => setSelectedComplaint(c)}
          />
        </div>
      )}
    </div>
  );
};
