export type ComplaintStatus =
  | 'submitted'
  | 'under_review'
  | 'assigned_to_dept'
  | 'assigned_to_officer'
  | 'work_in_progress'
  | 'waiting_for_info'
  | 'resolved_awaiting_verification'
  | 'successfully_closed'
  | 'reopened'
  | 'rejected';

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export type UserRole = 'citizen' | 'officer' | 'department_head' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  departmentId?: string;
  designation?: string;
  badgeNumber?: string;
  district?: string;
  taluk?: string;
  isVerified?: boolean;
  avatarUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  shortCode: string;
  nameKn: string;
  nameHi: string;
  categoryIds: string[];
  description: string;
  nodalOfficer: string;
  contactEmail: string;
  helpline: string;
  slaHoursStandard: number;
  slaHoursCritical: number;
}

export interface ComplaintCategory {
  id: string;
  name: string;
  nameKn: string;
  nameHi: string;
  icon: string;
  defaultDepartmentId: string;
  subcategories: {
    id: string;
    name: string;
    nameKn: string;
    nameHi: string;
    defaultPriority: PriorityLevel;
    suggestedDeptId?: string;
  }[];
}

export interface LocationData {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  taluk: string;
  cityOrVillage: string;
  wardOrZone: string;
  address: string;
  landmark: string;
  pincode: string;
}

export interface ActionReport {
  officerId: string;
  officerName: string;
  submittedAt: string;
  actionSummary: string;
  materialsUsed?: string;
  crewSize?: number;
  costIncurred?: string;
  afterPhotoUrl: string;
  verificationNotes: string;
}

export interface CitizenFeedback {
  rating: number; // 1 to 5
  isSatisfied: boolean;
  comment: string;
  submittedAt: string;
}

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  title: string;
  description: string;
  actorName: string;
  actorRole: string;
  timestamp: string;
  attachmentUrl?: string;
  isInternal?: boolean;
}

export interface Complaint {
  id: string; // e.g. JNS-2026-BLR-0102
  trackingNumber: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
  status: ComplaintStatus;
  priority: PriorityLevel;
  
  // Reporting Citizen
  citizenId: string;
  citizenName: string;
  citizenPhoneMasked: string;
  isAnonymous: boolean;
  
  // Location
  location: LocationData;
  
  // Media Evidence
  beforePhotoUrl?: string;
  beforeVideoUrl?: string;
  
  // Department & Officer Assignment
  departmentId: string;
  departmentName: string;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  assignedOfficerPhoneMasked?: string;
  assignedOfficerDesignation?: string;
  assignedAt?: string;
  
  // Deadlines & SLA
  createdAt: string;
  targetResolutionDate: string;
  isOverdue: boolean;
  escalatedToSupervisor: boolean;
  escalationReason?: string;
  escalatedAt?: string;
  
  // Resolution & Citizen Verification
  actionReport?: ActionReport;
  resolvedAt?: string;
  verificationRequestedAt?: string;
  citizenFeedback?: CitizenFeedback;
  closedAt?: string;
  reopenReason?: string;
  reopenedCount: number;
  rejectionReason?: string;
  
  // Duplicate Clustering & Community
  duplicateClusterId?: string;
  duplicateCount: number;
  supportCount: number; // Upvotes / affected citizens
  supportedByUserIds: string[];
  
  // History & Audit
  timeline: TimelineEvent[];
}

export interface CommunityCampaign {
  id: string;
  title: string;
  titleKn: string;
  department: string;
  district: string;
  location: string;
  description: string;
  date: string;
  organizer: string;
  participantCount: number;
  joinedUserIds: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  targetGoal: string;
}

export interface VoiceTopic {
  id: string;
  title: string;
  district: string;
  area: string;
  description: string;
  submittedBy: string;
  createdAt: string;
  upvotes: number;
  upvotedByUserIds: string[];
  status: 'open' | 'forwarded_to_dept' | 'official_drive_initiated';
  linkedDepartmentId?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  complaintId?: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  details: string;
  ipAddress?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  complaintId?: string;
  type: 'status_update' | 'assignment' | 'escalation' | 'verification_request' | 'deadline_alert';
  isRead: boolean;
  createdAt: string;
}
