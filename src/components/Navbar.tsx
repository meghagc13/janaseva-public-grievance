import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Bell, Globe, ChevronDown, CheckCircle2, UserCircle2, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    currentUser,
    currentView,
    setCurrentView,
    quickSwitchRole,
    setIsReportModalOpen,
    setIsTrackModalOpen,
    notifications,
    markNotificationAsRead
  } = useApp();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Element */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-blue-800 transition-colors">
              <Shield className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors leading-none">
                {t.appName}
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wider">
                GOVT. OF KARNATAKA CIVIC PORTAL
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setCurrentView('home')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentView === 'home' ? 'border-blue-700 text-blue-700 font-semibold' : 'border-transparent'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => setCurrentView('public_dashboard')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentView === 'public_dashboard' ? 'border-blue-700 text-blue-700 font-semibold' : 'border-transparent'
              }`}
            >
              {t.publicDashboard}
            </button>
            <button
              onClick={() => setCurrentView('community')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentView === 'community' ? 'border-blue-700 text-blue-700 font-semibold' : 'border-transparent'
              }`}
            >
              {t.community}
            </button>
            <button
              onClick={() => setCurrentView('analytics_reports')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentView === 'analytics_reports' ? 'border-blue-700 text-blue-700 font-semibold' : 'border-transparent'
              }`}
            >
              Reports & Audit
            </button>
            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="text-slate-600 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              {t.trackComplaint}
            </button>
          </nav>

          {/* Zone 3: Actions, Language & Role Portal Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                title="Change Language / ಭಾಷೆ ಬದಲಿಸಿ"
              >
                <Globe className="w-3.5 h-3.5 text-blue-700" />
                <span>
                  {language === 'en' ? 'English' : language === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 text-xs">
                  <button
                    onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center justify-between ${language === 'en' ? 'font-bold text-blue-700' : 'text-slate-700'}`}
                  >
                    <span>English</span>
                    {language === 'en' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('kn'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center justify-between ${language === 'kn' ? 'font-bold text-blue-700' : 'text-slate-700'}`}
                  >
                    <span>ಕನ್ನಡ (Kannada)</span>
                    {language === 'kn' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center justify-between ${language === 'hi' ? 'font-bold text-blue-700' : 'text-slate-700'}`}
                  >
                    <span>हिन्दी (Hindi)</span>
                    {language === 'hi' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600" />
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Notifications ({unreadNotifs.length})</span>
                    <span className="text-[10px] text-slate-400">Live Redressal Alerts</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">No new notifications</div>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-blue-50/50' : ''}`}
                        >
                          <div className="font-semibold text-slate-800 mb-0.5">{n.title}</div>
                          <div className="text-slate-600 line-clamp-2 leading-relaxed">{n.message}</div>
                          <div className="text-[10px] text-slate-400 mt-1">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher & Portal Selector */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <UserCircle2 className="w-4 h-4 text-blue-700" />
                <div className="flex flex-col text-left">
                  <span className="font-bold truncate max-w-[110px] leading-tight">{currentUser.name}</span>
                  <span className="text-[10px] text-blue-700 capitalize font-medium">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-blue-600" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick-Switch Portal Role
                  </div>
                  <button
                    onClick={() => { quickSwitchRole('citizen'); setIsRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Citizen Portal</div>
                      <div className="text-[11px] text-slate-500">Ramesh Gowda · Report, Verify, Reopen</div>
                    </div>
                    {currentUser.role === 'citizen' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
                  </button>
                  <button
                    onClick={() => { quickSwitchRole('officer'); setIsRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Government Officer</div>
                      <div className="text-[11px] text-slate-500">Er. Priya Sharma · BBMP Ward 112 AEE</div>
                    </div>
                    {currentUser.role === 'officer' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
                  </button>
                  <button
                    onClick={() => { quickSwitchRole('department_head'); setIsRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Department Supervisor</div>
                      <div className="text-[11px] text-slate-500">Dr. Balakrishna · Assign officers, monitor SLA</div>
                    </div>
                    {currentUser.role === 'department_head' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
                  </button>
                  <button
                    onClick={() => { quickSwitchRole('super_admin'); setIsRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Super Administrator</div>
                      <div className="text-[11px] text-slate-500">Sri. Manjunath Prasad IAS · State oversight</div>
                    </div>
                    {currentUser.role === 'super_admin' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <span>{t.reportProblem}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
