import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Phone, MapPin, Mail, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsReportModalOpen, setIsTrackModalOpen, t } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center font-bold">
                <Shield className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-base font-extrabold tracking-tight">JANASEVA</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Public Grievance Redressal & Social Problem Solving System for Karnataka. Ensuring genuine accountability from report to physical resolution proof.
            </p>
            <div className="text-[11px] text-slate-500">
              Karnataka Sakala & Civic Services Architecture
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Quick Navigation
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors cursor-pointer">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => setIsReportModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  {t.reportProblem}
                </button>
              </li>
              <li>
                <button onClick={() => setIsTrackModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  {t.trackComplaint}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('public_dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  {t.publicDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('community')} className="hover:text-white transition-colors cursor-pointer">
                  {t.community} & Campaigns
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('analytics_reports')} className="hover:text-white transition-colors cursor-pointer">
                  Statutory Reports & Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Department Emergency Helplines */}
          <div className="space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              State Emergency Helplines
            </div>
            <ul className="space-y-1 text-slate-400 text-[11px]">
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Emergency Services & Police:</span>
                <strong className="text-white font-mono">112</strong>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Municipal Civic Works (BBMP):</span>
                <strong className="text-white font-mono">1533</strong>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Water Supply & Sewerage:</span>
                <strong className="text-white font-mono">1916</strong>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Electricity Breakdown (BESCOM):</span>
                <strong className="text-white font-mono">1912</strong>
              </li>
              <li className="flex justify-between">
                <span>Health & Ambulance Helplines:</span>
                <strong className="text-white font-mono">104 / 108</strong>
              </li>
            </ul>
          </div>

          {/* Col 4: Karnataka State Coverage */}
          <div className="space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Jurisdiction & Transparency
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Serving citizens across Bengaluru Urban, Mysuru, Hubballi-Dharwad, Mangaluru, Belagavi, Kalaburagi, and all 31 districts of Karnataka.
            </p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 leading-normal">
              Civic technology demo platform designed for transparent grievance redressal and accountable public problem resolution.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 JANASEVA Civic Redressal Platform · Government of Karnataka
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Guaranteed · Citizen Phone Masking Active</span>
            <span>·</span>
            <span>English · ಕನ್ನಡ · हिन्दी</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
