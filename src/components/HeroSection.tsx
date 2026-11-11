import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Search, CheckCircle, ShieldAlert, Clock, MapPin, Users, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    t,
    setIsReportModalOpen,
    setIsTrackModalOpen,
    setTrackingSearchId,
    analytics,
    quickSwitchRole,
    currentUser,
    setCurrentView
  } = useApp();

  const handleQuickTrack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchId = formData.get('trackingId') as string;
    if (searchId) {
      setTrackingSearchId(searchId.trim());
      setIsTrackModalOpen(true);
    }
  };

  const summary = analytics?.summary || {
    total: 1240,
    closed: 982,
    inProgress: 184,
    resolutionRate: 79,
    avgResolutionHours: 32
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/civic_karnataka_banner_1794296601467.jpg"
          alt="Vidhana Soudha Secretariat Karnataka"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/60 border border-blue-500/30 text-blue-200 text-xs font-semibold tracking-wide">
              <span>Karnataka Public Redressal & Civic Accountability System</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300">Sakala Compliant</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.tagline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {t.subTagline}
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{t.reportProblem}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsTrackModalOpen(true)}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>{t.trackComplaint}</span>
              </button>

              <button
                onClick={() => setCurrentView('public_dashboard')}
                className="px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:underline transition-colors cursor-pointer"
              >
                {t.publicDashboard} &rarr;
              </button>
            </div>

            {/* Quick Track Search Input */}
            <form onSubmit={handleQuickTrack} className="pt-2 max-w-md">
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="trackingId"
                  placeholder="Enter Complaint ID (e.g. JNS-2026-BLR-0101)..."
                  className="w-full pl-4 pr-24 py-2.5 text-xs text-slate-900 bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors"
                >
                  Track
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Portal Switcher & Live Stats Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Portal Switcher for Evaluation */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select User Demonstration Portal
                </div>
                <span className="text-[10px] text-amber-400 font-medium">Interactive Multi-Role</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-3">
                <button
                  onClick={() => quickSwitchRole('citizen')}
                  className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    currentUser.role === 'citizen'
                      ? 'bg-blue-900/50 border-blue-400 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>1. Citizen Portal</span>
                    {currentUser.role === 'citizen' && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">Report & verify proof</div>
                </button>

                <button
                  onClick={() => quickSwitchRole('officer')}
                  className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    currentUser.role === 'officer'
                      ? 'bg-blue-900/50 border-blue-400 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>2. Field Officer</span>
                    {currentUser.role === 'officer' && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">Er. Priya (BBMP Ward)</div>
                </button>

                <button
                  onClick={() => quickSwitchRole('department_head')}
                  className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    currentUser.role === 'department_head'
                      ? 'bg-blue-900/50 border-blue-400 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>3. Dept Head</span>
                    {currentUser.role === 'department_head' && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">Assign & monitor SLA</div>
                </button>

                <button
                  onClick={() => quickSwitchRole('super_admin')}
                  className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    currentUser.role === 'super_admin'
                      ? 'bg-blue-900/50 border-blue-400 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>4. Super Admin</span>
                    {currentUser.role === 'super_admin' && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">IAS oversight & re-routing</div>
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                <span>Active: <strong className="text-white">{currentUser.name}</strong></span>
                <button
                  onClick={() => {
                    if (currentUser.role === 'citizen') setCurrentView('citizen_dashboard');
                    else if (currentUser.role === 'officer') setCurrentView('officer_dashboard');
                    else if (currentUser.role === 'department_head') setCurrentView('dept_dashboard');
                    else setCurrentView('admin_dashboard');
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                >
                  Open Dashboard &rarr;
                </button>
              </div>
            </div>

            {/* Transparency Trust Metrics */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
                <div className="text-lg font-bold text-white font-mono tabular-nums">
                  {summary.total}
                </div>
                <div className="text-[11px] text-slate-400">Total Registered</div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
                <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
                  {summary.closed}
                </div>
                <div className="text-[11px] text-slate-400">Verified Solved</div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-400 font-mono tabular-nums">
                  {summary.resolutionRate}%
                </div>
                <div className="text-[11px] text-slate-400">Resolution Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
