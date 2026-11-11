import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Search, CheckCircle2, Clock, AlertCircle, ArrowRight, Shield, MapPin, User, Hammer } from 'lucide-react';
import { Complaint, ComplaintStatus } from '../types';

export const TrackComplaintModal: React.FC = () => {
  const {
    isTrackModalOpen,
    setIsTrackModalOpen,
    trackingSearchId,
    setTrackingSearchId,
    complaints,
    setSelectedComplaint,
    t
  } = useApp();

  const [inputVal, setInputVal] = useState(trackingSearchId || '');
  const [matchedComplaint, setMatchedComplaint] = useState<Complaint | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (trackingSearchId) {
      setInputVal(trackingSearchId);
      performSearch(trackingSearchId);
    }
  }, [trackingSearchId, complaints]);

  const performSearch = (idToSearch: string) => {
    const q = idToSearch.trim().toLowerCase();
    const found = complaints.find(c =>
      c.id.toLowerCase() === q ||
      c.trackingNumber.toLowerCase() === q
    );
    setMatchedComplaint(found || null);
    setHasSearched(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      performSearch(inputVal.trim());
    }
  };

  const statusSteps: Array<{ key: ComplaintStatus; label: string }> = [
    { key: 'submitted', label: '1. Submitted' },
    { key: 'assigned_to_dept', label: '2. Routed to Dept' },
    { key: 'assigned_to_officer', label: '3. Officer Designated' },
    { key: 'work_in_progress', label: '4. Action In Progress' },
    { key: 'resolved_awaiting_verification', label: '5. Work Done (Verify)' },
    { key: 'successfully_closed', label: '6. Verified & Closed' },
  ];

  const getStepState = (stepKey: ComplaintStatus, currentStatus: ComplaintStatus) => {
    const order = [
      'submitted',
      'under_review',
      'assigned_to_dept',
      'assigned_to_officer',
      'work_in_progress',
      'waiting_for_info',
      'resolved_awaiting_verification',
      'successfully_closed'
    ];

    const stepIdx = order.indexOf(stepKey);
    const currIdx = order.indexOf(currentStatus);

    if (currentStatus === 'reopened') {
      if (stepKey === 'resolved_awaiting_verification') return 'current';
    }

    if (currIdx > stepIdx) return 'completed';
    if (currIdx === stepIdx) return 'current';
    return 'upcoming';
  };

  if (!isTrackModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900">
              {t.trackComplaint} (Karnataka Public Redressal)
            </h2>
          </div>
          <button
            onClick={() => {
              setIsTrackModalOpen(false);
              setTrackingSearchId('');
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <form onSubmit={handleSearchSubmit} className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Enter Unique Tracking Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. JNS-2026-BLR-0101, JNS-2026-MYS-0103"
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
              />
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
              >
                Track Now
              </button>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>Try sample:</span>
              <button
                type="button"
                onClick={() => {
                  setInputVal('JNS-2026-BLR-0101');
                  performSearch('JNS-2026-BLR-0101');
                }}
                className="text-blue-600 hover:underline font-mono"
              >
                JNS-2026-BLR-0101 (In Progress)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setInputVal('JNS-2026-MYS-0103');
                  performSearch('JNS-2026-MYS-0103');
                }}
                className="text-blue-600 hover:underline font-mono"
              >
                JNS-2026-MYS-0103 (Needs Verification)
              </button>
            </div>
          </form>

          {/* Search Result */}
          {hasSearched && (
            matchedComplaint ? (
              <div className="space-y-6 border-t border-slate-200 pt-5 text-xs">
                {/* Status Hero Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-blue-700">
                        {matchedComplaint.id}
                      </span>
                      <span className="text-slate-400 mx-2">·</span>
                      <span className="text-slate-500">
                        Registered on {new Date(matchedComplaint.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                        matchedComplaint.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {matchedComplaint.priority} Priority
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-100 text-blue-800">
                        {matchedComplaint.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {matchedComplaint.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>Dept: <strong>{matchedComplaint.departmentName}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>Location: <strong>{matchedComplaint.location.wardOrZone}, {matchedComplaint.location.district}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>Officer: <strong>{matchedComplaint.assignedOfficerName || 'Under Assignment'}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>Target Deadline: <strong className="font-mono">{new Date(matchedComplaint.targetResolutionDate).toLocaleDateString()}</strong></span>
                    </div>
                  </div>

                  {matchedComplaint.isOverdue && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-[11px] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span><strong>SLA Breach Alert:</strong> This ticket has exceeded target resolution time and has been escalated to supervisory review.</span>
                    </div>
                  )}
                </div>

                {/* Progress Timeline Stepper */}
                <div className="space-y-3">
                  <div className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                    Complaint Progress Lifecycle
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {statusSteps.map((step) => {
                      const state = getStepState(step.key, matchedComplaint.status);
                      return (
                        <div
                          key={step.key}
                          className={`p-2.5 rounded-lg border text-left ${
                            state === 'completed'
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                              : state === 'current'
                              ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold ring-1 ring-blue-400'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span>{step.label}</span>
                            {state === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            {state === 'current' && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Open Full Detail View Button */}
                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setIsTrackModalOpen(false);
                      setSelectedComplaint(matchedComplaint);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Open Complete Case Sheet & Evidence</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 space-y-2 border-t border-slate-200 pt-5">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="font-semibold text-slate-700">No complaint found</div>
                <div className="text-xs max-w-sm mx-auto">
                  Please verify the Complaint ID format (e.g. JNS-2026-BLR-0101) or check your registered mobile history.
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
