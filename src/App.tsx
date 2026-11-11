import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FiveQuestionsSection } from './components/FiveQuestionsSection';
import { InteractiveMap } from './components/InteractiveMap';
import { ReportComplaintModal } from './components/ReportComplaintModal';
import { TrackComplaintModal } from './components/TrackComplaintModal';
import { ComplaintDetailModal } from './components/ComplaintDetailModal';
import { CitizenDashboard } from './components/CitizenDashboard';
import { OfficerDashboard } from './components/OfficerDashboard';
import { DepartmentDashboard } from './components/DepartmentDashboard';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { PublicDashboard } from './components/PublicDashboard';
import { CommunitySection } from './components/CommunitySection';
import { ReportsAnalyticsView } from './components/ReportsAnalyticsView';
import { Footer } from './components/Footer';
import {
  Building2,
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Phone,
  Flame,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    departments,
    complaints,
    setSelectedComplaint,
    setIsReportModalOpen,
    setIsTrackModalOpen,
    toastMessage,
    t
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs max-w-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium leading-relaxed">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-12">
            {/* 1. Hero with Vidhana Soudha Visual & Role Switcher */}
            <HeroSection />

            {/* 2. Five Questions Accountability Framework */}
            <FiveQuestionsSection />

            {/* 3. Live Karnataka Interactive Map & Recent Grievances */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded mb-1">
                    Live Public Redressal Map
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Active Grievances & Verified Resolutions Across Karnataka
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any marker to inspect physical ground evidence, assigned engineer, and resolution status.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    + Report Problem in Your Ward
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8">
                  <InteractiveMap
                    heightClass="h-[500px]"
                    onSelectComplaint={(c) => setSelectedComplaint(c)}
                  />
                </div>

                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Recent Grievances Docket
                    </span>
                    <button
                      onClick={() => setCurrentView('public_dashboard')}
                      className="text-xs text-blue-700 hover:underline font-semibold cursor-pointer"
                    >
                      View All &rarr;
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto divide-y divide-slate-100 pr-1">
                    {complaints.slice(0, 5).map(c => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedComplaint(c)}
                        className="pt-2.5 first:pt-0 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-mono font-bold text-blue-700">{c.id}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                            c.status === 'successfully_closed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : c.status === 'resolved_awaiting_verification'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-50 text-blue-800'
                          }`}>
                            {c.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-700 transition-colors line-clamp-2">
                          {c.title}
                        </h4>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                          <span>{c.location.district} ({c.location.wardOrZone || 'Urban'})</span>
                          <span>{c.departmentName.split('(')[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 4. All 14 Karnataka Departments Directory */}
            <section className="bg-white border-y border-slate-200 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded mb-2">
                    Department Network
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Integrated Karnataka Departments & Citizen Helplines
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Every complaint is algorithmically routed to the exact jurisdiction authority with defined SLA deadlines.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {departments.slice(0, 8).map(dept => (
                    <div
                      key={dept.id}
                      onClick={() => setCurrentView('dept_dashboard')}
                      className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-4 flex flex-col justify-between transition-colors cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-blue-700 text-[11px]">{dept.shortCode}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{dept.slaHoursStandard}h Standard SLA</span>
                        </div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {dept.name}
                        </h3>
                        <p className="text-slate-500 text-[11px] line-clamp-2">
                          {dept.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium flex items-center gap-1">
                          <Phone className="w-3 h-3 text-blue-700" />
                          <span>{dept.helpline}</span>
                        </span>
                        <span className="text-blue-700 font-bold group-hover:translate-x-0.5 transition-transform">
                          Queue &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setCurrentView('public_dashboard')}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    View All 14 Department Redressal Statistics & SLAs &rarr;
                  </button>
                </div>
              </div>
            </section>

            {/* 5. Citizen Call to Action */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Notice a Pothole, Broken Streetlight, or Garbage Issue in Your Ward?
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                    Don't let public problems linger. Take 60 seconds to upload a photo and GPS location. Your complaint will be assigned to a designated officer and tracked until verified solved.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="px-6 py-3 bg-white hover:bg-slate-100 text-blue-900 font-bold rounded-lg text-xs shadow-md transition-all cursor-pointer"
                  >
                    {t.reportProblem} Now
                  </button>
                  <button
                    onClick={() => setIsTrackModalOpen(true)}
                    className="px-5 py-3 bg-blue-900/60 hover:bg-blue-900 border border-blue-400/40 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    {t.trackComplaint}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'citizen_dashboard' && <CitizenDashboard />}
        {currentView === 'officer_dashboard' && <OfficerDashboard />}
        {currentView === 'dept_dashboard' && <DepartmentDashboard />}
        {currentView === 'admin_dashboard' && <SuperAdminDashboard />}
        {currentView === 'public_dashboard' && <PublicDashboard />}
        {currentView === 'community' && <CommunitySection />}
        {currentView === 'analytics_reports' && <ReportsAnalyticsView />}
      </main>

      {/* Global Modals */}
      <ReportComplaintModal />
      <TrackComplaintModal />
      <ComplaintDetailModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
