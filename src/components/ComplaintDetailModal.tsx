import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Shield,
  MapPin,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Star,
  ThumbsUp,
  Hammer,
  HelpCircle,
  FileText,
  Phone,
  ArrowRight,
  Share2,
  Layers,
  Send
} from 'lucide-react';
import { Complaint, User as UserType } from '../types';

export const ComplaintDetailModal: React.FC = () => {
  const {
    selectedComplaint,
    setSelectedComplaint,
    currentUser,
    verifyResolution,
    submitFeedback,
    supportComplaint,
    assignOfficer,
    submitActionReport,
    escalateComplaint,
    rerouteComplaint,
    availableUsers,
    departments,
    t
  } = useApp();

  // Citizen verification state
  const [reopenReason, setReopenReason] = useState('');
  const [isReopenFormOpen, setIsReopenFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');

  // Officer action report state
  const [isActionReportOpen, setIsActionReportOpen] = useState(false);
  const [actionSummary, setActionSummary] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('Standard hot-mix asphalt batch and road compaction roller');
  const [crewSize, setCrewSize] = useState(4);
  const [costIncurred, setCostIncurred] = useState('₹ 14,500');
  const [afterPhotoUrl, setAfterPhotoUrl] = useState('/src/assets/images/clean_city_civic_1794296602596.jpg');

  // Admin / Dept Head controls
  const [selectedOfficerToAssign, setSelectedOfficerToAssign] = useState('');
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isRerouteOpen, setIsRerouteOpen] = useState(false);
  const [newDepartmentId, setNewDepartmentId] = useState('');
  const [rerouteReason, setRerouteReason] = useState('');

  if (!selectedComplaint) return null;

  const isComplainant = currentUser.id === selectedComplaint.citizenId || currentUser.role === 'citizen';
  const isAssignedOfficer = currentUser.id === selectedComplaint.assignedOfficerId || currentUser.role === 'officer';
  const isDeptHeadOrAdmin = currentUser.role === 'department_head' || currentUser.role === 'super_admin';

  const deptOfficers = availableUsers.filter(u => u.role === 'officer');

  const handleConfirmResolution = async () => {
    await verifyResolution(selectedComplaint.id, 'confirm');
    setSelectedComplaint(null);
  };

  const handleReopenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reopenReason.trim()) return;
    await verifyResolution(selectedComplaint.id, 'reopen', reopenReason.trim());
    setIsReopenFormOpen(false);
    setSelectedComplaint(null);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFeedback(selectedComplaint.id, rating, rating >= 4, feedbackComment);
    alert('Thank you for rating the civic service!');
  };

  const handleActionReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionSummary) {
      alert('Please provide summary of action taken.');
      return;
    }
    await submitActionReport(selectedComplaint.id, {
      actionSummary,
      materialsUsed,
      crewSize,
      costIncurred,
      afterPhotoUrl
    });
    setIsActionReportOpen(false);
    setSelectedComplaint(null);
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfficerToAssign) return;
    await assignOfficer(selectedComplaint.id, selectedOfficerToAssign);
    setIsAssignOpen(false);
    setSelectedComplaint(null);
  };

  const handleRerouteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDepartmentId) return;
    await rerouteComplaint(selectedComplaint.id, newDepartmentId, rerouteReason);
    setIsRerouteOpen(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[94vh] overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono font-bold text-base text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              {selectedComplaint.id}
            </span>
            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
              selectedComplaint.priority === 'critical'
                ? 'bg-red-100 text-red-800 border border-red-200'
                : 'bg-slate-100 text-slate-800'
            }`}>
              {selectedComplaint.priority} Priority
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-blue-100 text-blue-800 border border-blue-200">
              {selectedComplaint.status.replace(/_/g, ' ')}
            </span>
          </div>

          <button
            onClick={() => setSelectedComplaint(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-800">
          {/* Headline & Location */}
          <div className="space-y-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {selectedComplaint.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-500 text-xs">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                {selectedComplaint.location.address || selectedComplaint.location.wardOrZone}, {selectedComplaint.location.district}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                Reported {new Date(selectedComplaint.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                Category: {selectedComplaint.categoryName} ({selectedComplaint.subcategoryName})
              </span>
            </div>
          </div>

          {/* SLA & Escalation Notice */}
          {selectedComplaint.isOverdue && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-3 text-red-900">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Overdue SLA Escalation Notice</div>
                <div className="text-[11px] text-red-800 mt-0.5">
                  Target resolution deadline was {new Date(selectedComplaint.targetResolutionDate).toLocaleString('en-IN')}. This ticket has breached service guarantees and is under supervisory escalation.
                </div>
              </div>
            </div>
          )}

          {/* 5 Core Questions Transparency Panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Shield className="w-4 h-4 text-blue-700" />
              5 Core Questions Accountability Sheet
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Q1: What is the problem? */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-[11px] text-blue-800">
                  1. What is the problem in society?
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {selectedComplaint.description}
                </p>
                <div className="text-[11px] text-slate-500 pt-1">
                  Reported by: <strong>{selectedComplaint.citizenName}</strong> (Privacy-Protected: {selectedComplaint.citizenPhoneMasked})
                </div>
              </div>

              {/* Q2: Who is responsible? */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-[11px] text-blue-800">
                  2. Who is responsible for solving it?
                </div>
                {selectedComplaint.assignedOfficerName ? (
                  <>
                    <div className="font-semibold text-slate-900">
                      {selectedComplaint.assignedOfficerName}
                    </div>
                    <div className="text-slate-600">
                      {selectedComplaint.assignedOfficerDesignation || 'Field Engineer'}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-0.5">
                      <span>Officer Contact: <strong>{selectedComplaint.assignedOfficerPhoneMasked || 'Office Line'}</strong></span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">Assigned on Duty</span>
                    </div>
                  </>
                ) : (
                  <div className="text-amber-700 font-medium italic">
                    Under nodal assignment by {selectedComplaint.departmentName} supervisor.
                  </div>
                )}
              </div>

              {/* Q3: Which department receives it? */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-[11px] text-blue-800">
                  3. Which department should receive it?
                </div>
                <div className="font-semibold text-slate-900">
                  {selectedComplaint.departmentName}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Jurisdiction based on civic road class, municipal asset ownership, and ward governance rules.
                </p>
              </div>

              {/* Q4: What action has been taken? */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-[11px] text-blue-800">
                  4. What action has been taken?
                </div>
                {selectedComplaint.actionReport ? (
                  <div className="space-y-1 text-slate-700">
                    <p className="font-medium text-slate-900">
                      {selectedComplaint.actionReport.actionSummary}
                    </p>
                    <div className="text-[11px] text-slate-500">
                      Materials: {selectedComplaint.actionReport.materialsUsed} · Crew: {selectedComplaint.actionReport.crewSize} workers
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Completed: {new Date(selectedComplaint.actionReport.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 italic">
                    {selectedComplaint.status === 'work_in_progress'
                      ? 'Work in progress by ground team. Final Action Taken Report pending.'
                      : 'Pending ground investigation by designated officer.'}
                  </div>
                )}
              </div>
            </div>

            {/* Q5: Is it actually solved? */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 text-[11px] text-blue-800 mb-1">
                5. Is the problem actually solved?
              </div>
              {selectedComplaint.status === 'successfully_closed' ? (
                <div className="text-emerald-700 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Yes. Complainant inspected the site, verified physical resolution, and closed the complaint.
                  </span>
                </div>
              ) : selectedComplaint.status === 'resolved_awaiting_verification' ? (
                <div className="text-amber-800 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>
                    Officer marked work as completed with photographic proof. Awaiting citizen physical verification!
                  </span>
                </div>
              ) : selectedComplaint.status === 'reopened' ? (
                <div className="text-red-700 font-semibold flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-red-600" />
                  <span>
                    No. Citizen reported issue is NOT resolved ("{selectedComplaint.reopenReason}"). Ticket escalated for corrective remediation.
                  </span>
                </div>
              ) : (
                <div className="text-slate-500 italic">
                  Not yet. Complaint is currently in active processing.
                </div>
              )}
            </div>
          </div>

          {/* Before & After Photo Comparison */}
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Physical Evidence & Ground Photos
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                  <span>BEFORE (Citizen Submission)</span>
                  <span className="text-slate-400">At Grievance Registration</span>
                </div>
                <div className="h-52 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={selectedComplaint.beforePhotoUrl || '/src/assets/images/community_service_road_1794296602739.jpg'}
                    alt="Before Resolution"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                  <span>AFTER (Officer Work Proof)</span>
                  <span className="text-slate-400">At Resolution Submission</span>
                </div>
                <div className="h-52 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                  {selectedComplaint.actionReport?.afterPhotoUrl ? (
                    <img
                      src={selectedComplaint.actionReport.afterPhotoUrl}
                      alt="After Resolution Proof"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6 text-slate-400 space-y-1">
                      <Hammer className="w-8 h-8 mx-auto text-slate-300" />
                      <div className="font-medium">After-Work Photo Pending</div>
                      <div className="text-[10px]">Officer must upload physical proof upon completing work.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CITIZEN VERIFICATION ACTION SECTION */}
          {selectedComplaint.status === 'resolved_awaiting_verification' && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                    Mandatory Citizen Resolution Verification
                  </h3>
                  <p className="text-xs text-amber-900 mt-1">
                    The department engineer has uploaded the after-work photo above. Please inspect and confirm whether the problem has been solved on the ground.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleConfirmResolution}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm: Problem Is Solved (Close Ticket)</span>
                </button>

                <button
                  onClick={() => setIsReopenFormOpen(!isReopenFormOpen)}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reopen Complaint (Problem Still Exists)</span>
                </button>
              </div>

              {isReopenFormOpen && (
                <form onSubmit={handleReopenSubmit} className="pt-3 border-t border-amber-200 space-y-3">
                  <label className="block font-bold text-slate-800">
                    Why is the issue still unresolved? (Please be specific)
                  </label>
                  <textarea
                    rows={2}
                    value={reopenReason}
                    onChange={(e) => setReopenReason(e.target.value)}
                    placeholder="e.g. The asphalt washed away after rain, or only half of the potholes were filled..."
                    required
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-medium"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsReopenFormOpen(false)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded"
                    >
                      Submit Reopen Escalation
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* CITIZEN RATING & FEEDBACK */}
          {selectedComplaint.status === 'successfully_closed' && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Citizen Service Rating & Feedback
                </div>
                {selectedComplaint.citizenFeedback && (
                  <span className="text-emerald-800 font-bold">
                    Rated: {selectedComplaint.citizenFeedback.rating} / 5 Stars
                  </span>
                )}
              </div>

              {selectedComplaint.citizenFeedback ? (
                <div className="bg-white p-3 rounded-lg border border-emerald-200 text-slate-700">
                  <div className="font-medium italic">"{selectedComplaint.citizenFeedback.comment}"</div>
                  <div className="text-[10px] text-slate-400 mt-1">Submitted on {new Date(selectedComplaint.citizenFeedback.submittedAt).toLocaleDateString()}</div>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-700 font-semibold">Your Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Add remarks regarding officer response, quality of work, and resolution timeliness..."
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs"
                  >
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          )}

          {/* OFFICER ACTION TAKEN REPORT FORM */}
          {(currentUser.role === 'officer' || currentUser.role === 'department_head') &&
            selectedComplaint.status !== 'successfully_closed' && (
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-blue-950 flex items-center gap-1.5">
                    <Hammer className="w-4 h-4 text-blue-700" />
                    Government Officer Action Taken Controls
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsActionReportOpen(!isActionReportOpen)}
                    className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs"
                  >
                    {isActionReportOpen ? 'Close Form' : 'Submit Action Taken Report & Proof'}
                  </button>
                </div>

                {isActionReportOpen && (
                  <form onSubmit={handleActionReportSubmit} className="pt-3 border-t border-blue-200 space-y-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Action Taken Summary <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={actionSummary}
                        onChange={(e) => setActionSummary(e.target.value)}
                        placeholder="Detail the physical work executed, machinery used, and quality verification on site..."
                        required
                        className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Materials Used</label>
                        <input
                          type="text"
                          value={materialsUsed}
                          onChange={(e) => setMaterialsUsed(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Crew Size</label>
                        <input
                          type="number"
                          value={crewSize}
                          onChange={(e) => setCrewSize(Number(e.target.value))}
                          className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Cost Incurred</label>
                        <input
                          type="text"
                          value={costIncurred}
                          onChange={(e) => setCostIncurred(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Select After-Work Proof Photograph <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={afterPhotoUrl}
                        onChange={(e) => setAfterPhotoUrl(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800"
                      >
                        <option value="/src/assets/images/clean_city_civic_1794296602596.jpg">Clean & Repaired Roadway / Footpath</option>
                        <option value="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&auto=format&fit=crop&q=80">Repaired Infrastructure Pipe</option>
                        <option value="/src/assets/images/community_service_road_1794296602739.jpg">Freshly Asphalted Surface</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsActionReportOpen(false)}
                        className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded"
                      >
                        Submit Evidence for Citizen Verification
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          {/* SUPERVISOR & SUPER ADMIN CONTROLS */}
          {isDeptHeadOrAdmin && (
            <div className="bg-slate-100 p-4 rounded-xl space-y-3 border border-slate-200">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Supervisor / Admin Governance Actions</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAssignOpen(!isAssignOpen)}
                    className="px-3 py-1 bg-white border border-slate-300 text-slate-800 rounded font-semibold hover:bg-slate-50"
                  >
                    Assign Officer
                  </button>
                  <button
                    onClick={() => setIsRerouteOpen(!isRerouteOpen)}
                    className="px-3 py-1 bg-white border border-slate-300 text-slate-800 rounded font-semibold hover:bg-slate-50"
                  >
                    Re-Route Department
                  </button>
                  <button
                    onClick={() => escalateComplaint(selectedComplaint.id, 'Supervisor manual escalation to Critical priority')}
                    className="px-3 py-1 bg-red-700 text-white rounded font-bold hover:bg-red-800"
                  >
                    Escalate to Critical
                  </button>
                </div>
              </div>

              {isAssignOpen && (
                <form onSubmit={handleAssignSubmit} className="pt-2 border-t border-slate-200 flex gap-2">
                  <select
                    value={selectedOfficerToAssign}
                    onChange={(e) => setSelectedOfficerToAssign(e.target.value)}
                    required
                    className="flex-1 p-2 bg-white border border-slate-300 rounded text-slate-800"
                  >
                    <option value="">-- Choose Field Officer --</option>
                    {deptOfficers.map(off => (
                      <option key={off.id} value={off.id}>
                        {off.name} ({off.designation} · {off.departmentId?.replace('dept_', '').toUpperCase()})
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-700 text-white font-bold rounded"
                  >
                    Confirm Assignment
                  </button>
                </form>
              )}

              {isRerouteOpen && (
                <form onSubmit={handleRerouteSubmit} className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      value={newDepartmentId}
                      onChange={(e) => setNewDepartmentId(e.target.value)}
                      required
                      className="p-2 bg-white border border-slate-300 rounded text-slate-800"
                    >
                      <option value="">-- Select Correct Department --</option>
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={rerouteReason}
                      onChange={(e) => setRerouteReason(e.target.value)}
                      placeholder="Reason for re-routing..."
                      required
                      className="p-2 bg-white border border-slate-300 rounded text-slate-800"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-700 text-white font-bold rounded"
                    >
                      Apply Re-route
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Activity Timeline */}
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Full Audit Trail & Action Timeline
            </div>
            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 bg-white">
              {selectedComplaint.timeline.map((event, idx) => (
                <div key={event.id || idx} className="p-3.5 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{event.title}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(event.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {event.description}
                    </p>
                    <div className="text-[10px] text-slate-400">
                      By: <strong className="text-slate-600">{event.actorName}</strong> ({event.actorRole})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Support Counter */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-blue-700" />
              <span className="font-semibold text-slate-700">
                <strong>{selectedComplaint.supportCount}</strong> citizens affected & supporting this grievance
              </span>
            </div>
            <button
              onClick={() => supportComplaint(selectedComplaint.id)}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold rounded text-xs transition-colors cursor-pointer"
            >
              + Support Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
