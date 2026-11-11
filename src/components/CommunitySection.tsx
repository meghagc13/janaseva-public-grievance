import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Megaphone,
  Calendar,
  ThumbsUp,
  Plus,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { KARNATAKA_DISTRICTS } from '../data/karnatakaLocations';

export const CommunitySection: React.FC = () => {
  const {
    campaigns,
    voiceTopics,
    joinCampaign,
    upvoteVoiceTopic,
    submitVoiceTopic,
    currentUser,
    complaints,
    setSelectedComplaint,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'voice' | 'campaigns' | 'solved'>('voice');
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  // New Voice Topic form
  const [voiceTitle, setVoiceTitle] = useState('');
  const [voiceDistrict, setVoiceDistrict] = useState('Bengaluru Urban');
  const [voiceArea, setVoiceArea] = useState('Silk Board / HSR Layout');
  const [voiceDesc, setVoiceDesc] = useState('');

  const solvedComplaints = complaints.filter(c => c.status === 'successfully_closed');

  const handleCreateVoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiceTitle || !voiceDesc) return;
    await submitVoiceTopic({
      title: voiceTitle,
      district: voiceDistrict,
      area: voiceArea,
      description: voiceDesc
    });
    setIsSuggestModalOpen(false);
    setVoiceTitle('');
    setVoiceDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-700/60 border border-blue-400/30 text-[11px] font-bold tracking-wide text-amber-300">
            <Users className="w-3.5 h-3.5" />
            <span>Community Participation & Social Action</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Voice of the Community & Civic Campaigns
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Democratic civic engagement across Karnataka. Highlight collective local challenges, vote on high-impact public demands, and participate in neighborhood cleanliness and green canopy drives.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setIsSuggestModalOpen(true)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Raise a Community Voice Topic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Voice of the Community ({voiceTopics.length})
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'campaigns'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cleanliness & Audit Drives ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('solved')}
            className={`px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'solved'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Resolved Community Issues ({solvedComplaints.length})
          </button>
        </div>
      </div>

      {/* TAB 1: VOICE OF THE COMMUNITY */}
      {activeTab === 'voice' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {voiceTopics.map((topic) => {
              const hasUpvoted = topic.upvotedByUserIds.includes(currentUser.id);
              return (
                <div
                  key={topic.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-blue-700 text-[11px] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {topic.area}, {topic.district}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        topic.status === 'official_drive_initiated'
                          ? 'bg-purple-100 text-purple-800'
                          : topic.status === 'forwarded_to_dept'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {topic.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {topic.title}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {topic.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-400">
                      By: <strong className="text-slate-600">{topic.submittedBy}</strong>
                    </div>

                    <button
                      onClick={() => upvoteVoiceTopic(topic.id)}
                      disabled={hasUpvoted}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        hasUpvoted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{topic.upvotes} Upvotes</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: COMMUNITY CAMPAIGNS & DRIVES */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((camp) => {
              const hasJoined = camp.joinedUserIds.includes(currentUser.id);
              return (
                <div
                  key={camp.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-700 text-xs">
                        {camp.department}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {camp.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {camp.title}
                    </h3>
                    <div className="text-slate-500 font-medium text-xs">
                      {camp.titleKn}
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed">
                      {camp.description}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-700" />
                        <span><strong>Schedule:</strong> {camp.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-700" />
                        <span><strong>Venue:</strong> {camp.location}, {camp.district}</span>
                      </div>
                      <div className="pt-1 text-slate-800 font-semibold">
                        Goal: {camp.targetGoal}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-bold text-xs">
                      {camp.participantCount} Citizens Participating
                    </span>
                    <button
                      onClick={() => joinCampaign(camp.id)}
                      disabled={hasJoined}
                      className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                        hasJoined
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-blue-700 hover:bg-blue-800 text-white'
                      }`}
                    >
                      {hasJoined ? 'Joined ✓' : 'Join Campaign'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: RESOLVED COMMUNITY ISSUES */}
      {activeTab === 'solved' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solvedComplaints.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedComplaint(c)}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 cursor-pointer shadow-xs space-y-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-blue-700 text-xs">{c.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Solved
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">{c.title}</h3>

                <p className="text-slate-600 text-xs line-clamp-2">
                  {c.actionReport?.actionSummary || c.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Dept: <strong>{c.departmentName}</strong></span>
                  <span>{c.location.district}</span>
                  <span className="text-blue-700 font-bold">View Solution Proof &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggest Topic Modal */}
      {isSuggestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Raise a Voice of the Community Topic
            </h2>
            <form onSubmit={handleCreateVoice} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Topic Headline</label>
                <input
                  type="text"
                  value={voiceTitle}
                  onChange={(e) => setVoiceTitle(e.target.value)}
                  placeholder="e.g. Demand for automated traffic pedestrian crossing at..."
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">District</label>
                  <select
                    value={voiceDistrict}
                    onChange={(e) => setVoiceDistrict(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                  >
                    {KARNATAKA_DISTRICTS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Area / Landmark</label>
                  <input
                    type="text"
                    value={voiceArea}
                    onChange={(e) => setVoiceArea(e.target.value)}
                    placeholder="e.g. Indiranagar Metro"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Detailed Civic Rationale</label>
                <textarea
                  rows={3}
                  value={voiceDesc}
                  onChange={(e) => setVoiceDesc(e.target.value)}
                  placeholder="Explain why this public issue matters to multiple residents..."
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSuggestModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded"
                >
                  Post to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
