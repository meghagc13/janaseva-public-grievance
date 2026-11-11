import React, { createContext, useContext, useState, useEffect } from 'react';
import { Complaint, User, Department, ComplaintCategory, CommunityCampaign, VoiceTopic, AuditLog, NotificationItem } from '../types';
import { SupportedLanguage, TRANSLATIONS, TranslationDictionary } from '../locales/translations';
import { DEPARTMENTS, PROBLEM_CATEGORIES } from '../data/categoriesAndDepartments';

interface AnalyticsData {
  summary: {
    total: number;
    pending: number;
    inProgress: number;
    awaitingVerification: number;
    closed: number;
    reopened: number;
    overdue: number;
    resolutionRate: number;
    avgResolutionHours: number;
    satisfactionRating: string;
  };
  departmentStats: Array<{
    departmentId: string;
    name: string;
    shortCode: string;
    total: number;
    resolved: number;
    pending: number;
    overdue: number;
    resolutionRate: number;
  }>;
  districtCounts: { [key: string]: { total: number; resolved: number; pending: number } };
  categoryStats: Array<{ categoryId: string; name: string; count: number }>;
}

export type ActivePortalView =
  | 'home'
  | 'citizen_dashboard'
  | 'officer_dashboard'
  | 'dept_dashboard'
  | 'admin_dashboard'
  | 'public_dashboard'
  | 'community'
  | 'analytics_reports';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  availableUsers: User[];
  currentView: ActivePortalView;
  setCurrentView: (view: ActivePortalView) => void;
  
  // Data
  complaints: Complaint[];
  departments: Department[];
  categories: ComplaintCategory[];
  campaigns: CommunityCampaign[];
  voiceTopics: VoiceTopic[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  analytics: AnalyticsData | null;
  isLoading: boolean;
  
  // Modals & Selectors
  selectedComplaint: Complaint | null;
  setSelectedComplaint: (c: Complaint | null) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isTrackModalOpen: boolean;
  setIsTrackModalOpen: (open: boolean) => void;
  trackingSearchId: string;
  setTrackingSearchId: (id: string) => void;
  
  // Actions
  refreshData: () => Promise<void>;
  submitComplaint: (data: any) => Promise<Complaint>;
  assignOfficer: (complaintId: string, officerId: string) => Promise<void>;
  updateComplaintStatus: (complaintId: string, status: string, note: string) => Promise<void>;
  submitActionReport: (complaintId: string, reportData: any) => Promise<void>;
  verifyResolution: (complaintId: string, action: 'confirm' | 'reopen', reopenReason?: string) => Promise<void>;
  submitFeedback: (complaintId: string, rating: number, isSatisfied: boolean, comment: string) => Promise<void>;
  supportComplaint: (complaintId: string) => Promise<void>;
  escalateComplaint: (complaintId: string, reason: string) => Promise<void>;
  rerouteComplaint: (complaintId: string, newDeptId: string, reason: string) => Promise<void>;
  joinCampaign: (campaignId: string) => Promise<void>;
  submitVoiceTopic: (data: any) => Promise<void>;
  upvoteVoiceTopic: (topicId: string) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  quickSwitchRole: (role: User['role']) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const t = TRANSLATIONS[language];

  // Default initial user is citizen Ramesh Gowda
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user_citizen_1',
    name: 'Ramesh Gowda',
    email: 'ramesh.gowda@gmail.com',
    phone: '9845012345',
    role: 'citizen',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru East',
    isVerified: true
  });

  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [currentView, setCurrentView] = useState<ActivePortalView>('home');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [departments] = useState<Department[]>(DEPARTMENTS);
  const [categories] = useState<ComplaintCategory[]>(PROBLEM_CATEGORIES);
  const [campaigns, setCampaigns] = useState<CommunityCampaign[]>([]);
  const [voiceTopics, setVoiceTopics] = useState<VoiceTopic[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);
  const [trackingSearchId, setTrackingSearchId] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const refreshData = async () => {
    try {
      const [compRes, usersRes, campRes, voiceRes, auditRes, notifRes, analyticsRes] = await Promise.all([
        fetch('/api/complaints'),
        fetch('/api/auth/users'),
        fetch('/api/community/campaigns'),
        fetch('/api/community/voices'),
        fetch('/api/audit-logs'),
        fetch(`/api/notifications?userId=${currentUser.id}`),
        fetch('/api/analytics')
      ]);

      if (compRes.ok) {
        const d = await compRes.json();
        setComplaints(d.complaints || []);
      }
      if (usersRes.ok) {
        const d = await usersRes.json();
        setAvailableUsers(d.users || []);
      }
      if (campRes.ok) {
        const d = await campRes.json();
        setCampaigns(d.campaigns || []);
      }
      if (voiceRes.ok) {
        const d = await voiceRes.json();
        setVoiceTopics(d.voiceTopics || []);
      }
      if (auditRes.ok) {
        const d = await auditRes.json();
        setAuditLogs(d.auditLogs || []);
      }
      if (notifRes.ok) {
        const d = await notifRes.json();
        setNotifications(d.notifications || []);
      }
      if (analyticsRes.ok) {
        const d = await analyticsRes.json();
        setAnalytics(d);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [currentUser.id]);

  const submitComplaint = async (data: any): Promise<Complaint> => {
    const res = await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        citizenId: currentUser.id,
        citizenName: currentUser.name,
        citizenPhone: currentUser.phone
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit complaint');
    }

    const { complaint } = await res.json();
    await refreshData();
    showToast(`Complaint registered successfully! ID: ${complaint.id}`);
    return complaint;
  };

  const assignOfficer = async (complaintId: string, officerId: string) => {
    const res = await fetch(`/api/complaints/${complaintId}/assign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        officerId,
        actorName: currentUser.name,
        actorRole: currentUser.role
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to assign officer');
    }

    await refreshData();
    showToast(`Assigned officer successfully to ticket ${complaintId}`);
  };

  const updateComplaintStatus = async (complaintId: string, status: string, note: string) => {
    const res = await fetch(`/api/complaints/${complaintId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        note,
        actorName: currentUser.name,
        actorRole: currentUser.role
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update status');
    }

    await refreshData();
    showToast(`Updated status for ticket ${complaintId}`);
  };

  const submitActionReport = async (complaintId: string, reportData: any) => {
    const res = await fetch(`/api/complaints/${complaintId}/action-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...reportData,
        officerId: currentUser.id,
        officerName: currentUser.name
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit action report');
    }

    await refreshData();
    showToast(`Action Taken Report and proof submitted for ${complaintId}! Dispatched for citizen verification.`);
  };

  const verifyResolution = async (complaintId: string, action: 'confirm' | 'reopen', reopenReason?: string) => {
    const res = await fetch(`/api/complaints/${complaintId}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        reopenReason,
        citizenName: currentUser.name
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to process verification');
    }

    const data = await res.json();
    await refreshData();
    showToast(data.message);
  };

  const submitFeedback = async (complaintId: string, rating: number, isSatisfied: boolean, comment: string) => {
    const res = await fetch(`/api/complaints/${complaintId}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, isSatisfied, comment })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit feedback');
    }

    await refreshData();
    showToast('Thank you for providing your feedback!');
  };

  const supportComplaint = async (complaintId: string) => {
    const res = await fetch(`/api/complaints/${complaintId}/support`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id })
    });

    if (res.ok) {
      await refreshData();
      showToast('You supported this public complaint! Priority boosted.');
    }
  };

  const escalateComplaint = async (complaintId: string, reason: string) => {
    const res = await fetch(`/api/complaints/${complaintId}/escalate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, actorName: currentUser.name })
    });

    if (res.ok) {
      await refreshData();
      showToast(`Complaint ${complaintId} escalated to Critical priority.`);
    }
  };

  const rerouteComplaint = async (complaintId: string, newDeptId: string, reason: string) => {
    const res = await fetch(`/api/complaints/${complaintId}/reroute`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newDepartmentId: newDeptId, reason, actorName: currentUser.name })
    });

    if (res.ok) {
      await refreshData();
      showToast(`Complaint ${complaintId} re-routed to new department successfully.`);
    }
  };

  const joinCampaign = async (campaignId: string) => {
    const res = await fetch(`/api/community/campaigns/${campaignId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id })
    });

    if (res.ok) {
      await refreshData();
      showToast('You have joined the community campaign! See you there.');
    }
  };

  const submitVoiceTopic = async (data: any) => {
    const res = await fetch('/api/community/voices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        submittedBy: currentUser.name
      })
    });

    if (res.ok) {
      await refreshData();
      showToast('Your community voice suggestion has been posted!');
    }
  };

  const upvoteVoiceTopic = async (topicId: string) => {
    const res = await fetch(`/api/community/voices/${topicId}/upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id })
    });

    if (res.ok) {
      await refreshData();
      showToast('Upvoted community issue!');
    }
  };

  const markNotificationAsRead = async (id: string) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Quick switch role convenience for testing & evaluation
  const quickSwitchRole = (role: User['role']) => {
    if (role === 'citizen') {
      const u = availableUsers.find(u => u.role === 'citizen') || {
        id: 'user_citizen_1',
        name: 'Ramesh Gowda',
        email: 'ramesh.gowda@gmail.com',
        phone: '9845012345',
        role: 'citizen',
        district: 'Bengaluru Urban',
        taluk: 'Bengaluru East',
        isVerified: true
      };
      setCurrentUser(u);
      setCurrentView('citizen_dashboard');
      showToast(`Switched to Citizen portal (${u.name})`);
    } else if (role === 'officer') {
      const u = availableUsers.find(u => u.role === 'officer') || {
        id: 'user_officer_bbmp',
        name: 'Er. Priya Sharma',
        email: 'priya.sharma@bbmp.gov.in',
        phone: '9448055112',
        role: 'officer',
        departmentId: 'dept_municipal',
        designation: 'Assistant Executive Engineer - Ward 112',
        badgeNumber: 'KA-BBMP-ENG-8402',
        district: 'Bengaluru Urban',
        isVerified: true
      };
      setCurrentUser(u);
      setCurrentView('officer_dashboard');
      showToast(`Switched to Government Officer portal (${u.name})`);
    } else if (role === 'department_head') {
      const u = availableUsers.find(u => u.role === 'department_head') || {
        id: 'user_dept_head_bbmp',
        name: 'Dr. S. N. Balakrishna',
        email: 'jc.east@bbmp.gov.in',
        phone: '9448011001',
        role: 'department_head',
        departmentId: 'dept_municipal',
        designation: 'Joint Commissioner (Civic Infrastructure)',
        badgeNumber: 'KA-BBMP-JC-009',
        district: 'Bengaluru Urban',
        isVerified: true
      };
      setCurrentUser(u);
      setCurrentView('dept_dashboard');
      showToast(`Switched to Department Supervisor portal (${u.name})`);
    } else if (role === 'super_admin') {
      const u = availableUsers.find(u => u.role === 'super_admin') || {
        id: 'user_super_admin',
        name: 'Sri. Manjunath Prasad IAS',
        email: 'admin.janaseva@karnataka.gov.in',
        phone: '9448000001',
        role: 'super_admin',
        designation: 'Principal Secretary (Administrative Reforms)',
        badgeNumber: 'IAS-KN-1994',
        district: 'Bengaluru Urban',
        isVerified: true
      };
      setCurrentUser(u);
      setCurrentView('admin_dashboard');
      showToast(`Switched to Super Admin portal (${u.name})`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        setCurrentUser,
        availableUsers,
        currentView,
        setCurrentView,
        complaints,
        departments,
        categories,
        campaigns,
        voiceTopics,
        auditLogs,
        notifications,
        analytics,
        isLoading,
        selectedComplaint,
        setSelectedComplaint,
        isReportModalOpen,
        setIsReportModalOpen,
        isTrackModalOpen,
        setIsTrackModalOpen,
        trackingSearchId,
        setTrackingSearchId,
        refreshData,
        submitComplaint,
        assignOfficer,
        updateComplaintStatus,
        submitActionReport,
        verifyResolution,
        submitFeedback,
        supportComplaint,
        escalateComplaint,
        rerouteComplaint,
        joinCampaign,
        submitVoiceTopic,
        upvoteVoiceTopic,
        markNotificationAsRead,
        quickSwitchRole,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
