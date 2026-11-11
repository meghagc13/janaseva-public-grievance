import React from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, UserCheck, Network, Hammer, CheckCircle2, ArrowRight } from 'lucide-react';

export const FiveQuestionsSection: React.FC = () => {
  const { t, setIsReportModalOpen } = useApp();

  const questions = [
    {
      num: '01',
      icon: HelpCircle,
      title: t.q1Title,
      desc: t.q1Desc,
      pill: 'Citizens Report With Evidence',
      color: 'blue'
    },
    {
      num: '02',
      icon: UserCheck,
      title: t.q2Title,
      desc: t.q2Desc,
      pill: 'Designated Government Engineer',
      color: 'emerald'
    },
    {
      num: '03',
      icon: Network,
      title: t.q3Title,
      desc: t.q3Desc,
      pill: 'Smart Algorithmic Routing',
      color: 'indigo'
    },
    {
      num: '04',
      icon: Hammer,
      title: t.q4Title,
      desc: t.q4Desc,
      pill: 'Action Taken Report & After-Photo',
      color: 'amber'
    },
    {
      num: '05',
      icon: CheckCircle2,
      title: t.q5Title,
      desc: t.q5Desc,
      pill: 'Mandatory Citizen Verification',
      color: 'purple'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md mb-3">
            Core Philosophy & Accountability Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Answering the 5 Vital Questions of Public Governance
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            JANASEVA is not an ordinary passive complaint mailbox. It is an end-to-end civic accountability workflow ensuring no ticket disappears into government bureaucracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {questions.map((q) => {
            const Icon = q.icon;
            return (
              <div
                key={q.num}
                className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-5 flex flex-col justify-between transition-colors shadow-sm relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400 tabular-nums">
                      {q.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-700 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                    {q.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {q.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-800 flex items-center gap-1">
                  <span>{q.pill}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <span>Report a Civic Problem in Your Area</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
