import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './src/server/db';
import { DEPARTMENTS, PROBLEM_CATEGORIES, determineResponsibleDepartment } from './src/data/categoriesAndDepartments';
import { Complaint, TimelineEvent } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// ----------------- REST API ROUTES -----------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'JANASEVA Backend Platform', timestamp: new Date().toISOString() });
});

// Authentication & Users
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'User not found. Please register or select a demo account.' });
  }

  db.addAuditLog({
    actorId: user.id,
    actorName: user.name,
    actorRole: user.role,
    action: 'USER_LOGIN',
    details: `User ${user.name} logged into ${user.role} portal.`
  });

  res.json({ user });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, district, taluk, role } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone number are required.' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
  }

  const newUser = db.addUser({
    id: `user_c_${Date.now()}`,
    name,
    email,
    phone,
    role: (role as any) || 'citizen',
    district: district || 'Bengaluru Urban',
    taluk: taluk || 'Bengaluru East',
    isVerified: true
  });

  db.addAuditLog({
    actorId: newUser.id,
    actorName: newUser.name,
    actorRole: newUser.role,
    action: 'USER_REGISTER',
    details: `New citizen ${newUser.name} registered from ${district || 'Karnataka'}.`
  });

  res.status(201).json({ user: newUser });
});

app.get('/api/auth/users', (req, res) => {
  const { role, departmentId } = req.query;
  let users = db.getUsers();
  if (role) {
    users = users.filter(u => u.role === role);
  }
  if (departmentId) {
    users = users.filter(u => u.departmentId === departmentId);
  }
  res.json({ users });
});

app.post('/api/officers', (req, res) => {
  const { name, email, phone, departmentId, designation, badgeNumber, district, taluk } = req.body;
  if (!name || !email || !departmentId || !designation) {
    return res.status(400).json({ error: 'Name, email, department, and designation are required.' });
  }

  const newOfficer = db.addUser({
    id: `officer_${Date.now()}`,
    name,
    email,
    phone: phone || '9448000000',
    role: 'officer',
    departmentId,
    designation,
    badgeNumber: badgeNumber || `KA-${departmentId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    district: district || 'Bengaluru Urban',
    taluk: taluk || '',
    isVerified: true
  });

  db.addAuditLog({
    actorId: 'super_admin',
    actorName: 'Super Admin',
    actorRole: 'super_admin',
    action: 'CREATE_OFFICER_ACCOUNT',
    details: `Admin provisioned officer account for ${name} (${designation}) in department ${departmentId}.`
  });

  res.status(201).json({ officer: newOfficer });
});

// Master Data: Departments & Categories
app.get('/api/departments', (req, res) => {
  res.json({ departments: DEPARTMENTS });
});

app.get('/api/categories', (req, res) => {
  res.json({ categories: PROBLEM_CATEGORIES });
});

// Duplicate Detection API
app.post('/api/complaints/check-duplicates', (req, res) => {
  const { categoryId, subcategoryId, district, taluk, ward } = req.body;
  if (!categoryId || !district) {
    return res.json({ duplicates: [] });
  }

  const duplicates = db.findNearbyDuplicates(categoryId, subcategoryId || '', district, taluk || '', ward || '');
  res.json({ duplicates });
});

// Complaints API
app.get('/api/complaints', (req, res) => {
  const {
    district,
    departmentId,
    status,
    priority,
    citizenId,
    officerId,
    search,
    isOverdue
  } = req.query;

  let complaints = db.getComplaints();

  if (district) {
    complaints = complaints.filter(c => c.location.district.toLowerCase() === (district as string).toLowerCase());
  }
  if (departmentId) {
    complaints = complaints.filter(c => c.departmentId === departmentId);
  }
  if (status) {
    complaints = complaints.filter(c => c.status === status);
  }
  if (priority) {
    complaints = complaints.filter(c => c.priority === priority);
  }
  if (citizenId) {
    complaints = complaints.filter(c => c.citizenId === citizenId);
  }
  if (officerId) {
    complaints = complaints.filter(c => c.assignedOfficerId === officerId);
  }
  if (isOverdue === 'true') {
    complaints = complaints.filter(c => c.isOverdue);
  }
  if (search) {
    const q = (search as string).toLowerCase();
    complaints = complaints.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.location.address.toLowerCase().includes(q) ||
      c.location.wardOrZone.toLowerCase().includes(q) ||
      c.categoryName.toLowerCase().includes(q)
    );
  }

  res.json({ complaints });
});

app.get('/api/complaints/:id', (req, res) => {
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found with the provided ID or Tracking Number.' });
  }
  res.json({ complaint });
});

// Submit New Complaint (with Smart Auto-Routing)
app.post('/api/complaints', (req, res) => {
  const {
    title,
    description,
    categoryId,
    subcategoryId,
    location,
    beforePhotoUrl,
    beforeVideoUrl,
    citizenId,
    citizenName,
    citizenPhone,
    isAnonymous
  } = req.body;

  if (!title || !description || !categoryId || !subcategoryId || !location?.district) {
    return res.status(400).json({ error: 'Title, description, category, subcategory, and district are mandatory.' });
  }

  const category = PROBLEM_CATEGORIES.find(c => c.id === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);

  // 1. Run Smart Department Routing Engine
  const routing = determineResponsibleDepartment(categoryId, subcategoryId, location);

  // 2. Generate unique tracking ID e.g. JNS-2026-BLR-0105
  const districtCode = location.district.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'KA');
  const sequenceNum = Math.floor(1000 + Math.random() * 9000);
  const complaintId = `JNS-2026-${districtCode}-${sequenceNum}`;

  // 3. Priority detection
  const priority = subcategory?.defaultPriority || 'medium';
  const targetResolutionDate = new Date(Date.now() + routing.targetHours * 3600000).toISOString();

  // 4. Duplicate count check
  const existingDuplicates = db.findNearbyDuplicates(
    categoryId,
    subcategoryId,
    location.district,
    location.taluk || '',
    location.wardOrZone || ''
  );

  const phoneMasked = citizenPhone
    ? `${citizenPhone.slice(0, 5)}****${citizenPhone.slice(-1)}`
    : '98450****5';

  const initialTimeline: TimelineEvent[] = [
    {
      id: `t-${Date.now()}-1`,
      status: 'submitted',
      title: 'Complaint Registered',
      description: `Citizen registered public grievance with GPS location (${location.latitude?.toFixed(4) || 'Manual'}, ${location.longitude?.toFixed(4) || 'Manual'}) and photographic proof.`,
      actorName: isAnonymous ? 'Anonymous Citizen' : (citizenName || 'Citizen'),
      actorRole: 'Citizen',
      timestamp: new Date().toISOString()
    },
    {
      id: `t-${Date.now()}-2`,
      status: 'assigned_to_dept',
      title: `Auto-Routed to ${routing.departmentName}`,
      description: routing.rationale,
      actorName: 'Janaseva Routing Engine',
      actorRole: 'Automated System',
      timestamp: new Date().toISOString()
    }
  ];

  const newComplaint: Complaint = {
    id: complaintId,
    trackingNumber: complaintId,
    title,
    description,
    categoryId,
    categoryName: category?.name || 'Public Grievance',
    subcategoryId,
    subcategoryName: subcategory?.name || 'General Issue',
    status: 'assigned_to_dept',
    priority,
    citizenId: citizenId || 'user_citizen_1',
    citizenName: isAnonymous ? 'Anonymous Citizen' : (citizenName || 'Citizen'),
    citizenPhoneMasked: phoneMasked,
    isAnonymous: !!isAnonymous,
    location: {
      latitude: location.latitude || 12.9716,
      longitude: location.longitude || 77.5946,
      state: 'Karnataka',
      district: location.district,
      taluk: location.taluk || '',
      cityOrVillage: location.cityOrVillage || '',
      wardOrZone: location.wardOrZone || '',
      address: location.address || '',
      landmark: location.landmark || '',
      pincode: location.pincode || '560001'
    },
    beforePhotoUrl: beforePhotoUrl || '/src/assets/images/community_service_road_1794296602739.jpg',
    beforeVideoUrl,
    departmentId: routing.departmentId,
    departmentName: routing.departmentName,
    createdAt: new Date().toISOString(),
    targetResolutionDate,
    isOverdue: false,
    escalatedToSupervisor: false,
    reopenedCount: 0,
    duplicateCount: existingDuplicates.length,
    supportCount: 1,
    supportedByUserIds: [citizenId || 'user_citizen_1'],
    timeline: initialTimeline
  };

  db.addComplaint(newComplaint);

  // Add audit log
  db.addAuditLog({
    complaintId,
    actorId: citizenId || 'user_citizen_1',
    actorName: isAnonymous ? 'Anonymous Citizen' : (citizenName || 'Citizen'),
    actorRole: 'citizen',
    action: 'CREATE_COMPLAINT',
    details: `Created grievance "${title}" routed to ${routing.departmentName} with ${routing.targetHours}h SLA.`
  });

  // Citizen Notification
  db.addNotification({
    userId: citizenId || 'user_citizen_1',
    title: 'Grievance Acknowledged',
    message: `Your complaint (${complaintId}) has been successfully registered and routed to ${routing.departmentName}. Target resolution deadline: ${new Date(targetResolutionDate).toLocaleString('en-IN')}.`,
    complaintId,
    type: 'assignment'
  });

  res.status(201).json({ complaint: newComplaint, routing });
});

// Assign Officer to Complaint (by Department Head or Admin)
app.patch('/api/complaints/:id/assign', (req, res) => {
  const { officerId, actorName, actorRole } = req.body;
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  const officer = db.getUserById(officerId);
  if (!officer) {
    return res.status(404).json({ error: 'Officer not found' });
  }

  const timelineEvent: TimelineEvent = {
    id: `t-${Date.now()}`,
    status: 'assigned_to_officer',
    title: `Assigned to ${officer.name}`,
    description: `Assigned to ${officer.name} (${officer.designation}, Badge: ${officer.badgeNumber || 'N/A'}) for on-site investigation and remediation.`,
    actorName: actorName || 'Department Supervisor',
    actorRole: actorRole || 'Department Head',
    timestamp: new Date().toISOString()
  };

  const updated = db.updateComplaint(req.params.id, {
    assignedOfficerId: officer.id,
    assignedOfficerName: officer.name,
    assignedOfficerPhoneMasked: `${officer.phone.slice(0, 5)}****${officer.phone.slice(-1)}`,
    assignedOfficerDesignation: officer.designation,
    assignedAt: new Date().toISOString(),
    status: 'assigned_to_officer',
    timeline: [...complaint.timeline, timelineEvent]
  });

  db.addAuditLog({
    complaintId: complaint.id,
    actorId: officer.id,
    actorName: actorName || 'Department Head',
    actorRole: actorRole || 'department_head',
    action: 'ASSIGN_OFFICER',
    details: `Assigned complaint ${complaint.id} to officer ${officer.name} (${officer.designation}).`
  });

  // Notify officer
  db.addNotification({
    userId: officer.id,
    title: 'New Complaint Assigned to You',
    message: `You have been designated as the responsible officer for complaint ${complaint.id}: "${complaint.title}". Location: ${complaint.location.address}, ${complaint.location.wardOrZone}.`,
    complaintId: complaint.id,
    type: 'assignment'
  });

  // Notify citizen
  db.addNotification({
    userId: complaint.citizenId,
    title: 'Officer Assigned to Your Grievance',
    message: `${officer.name} (${officer.designation}) has been assigned to address your grievance ${complaint.id}.`,
    complaintId: complaint.id,
    type: 'status_update'
  });

  res.json({ complaint: updated });
});

// Update Status (Work in Progress / Waiting for info / Notes)
app.patch('/api/complaints/:id/status', (req, res) => {
  const { status, note, actorName, actorRole } = req.body;
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  const timelineEvent: TimelineEvent = {
    id: `t-${Date.now()}`,
    status: status || complaint.status,
    title: `Status: ${status?.replace(/_/g, ' ').toUpperCase()}`,
    description: note || `Status updated to ${status}`,
    actorName: actorName || 'Field Officer',
    actorRole: actorRole || 'Officer',
    timestamp: new Date().toISOString()
  };

  const updated = db.updateComplaint(req.params.id, {
    status: status || complaint.status,
    timeline: [...complaint.timeline, timelineEvent]
  });

  db.addAuditLog({
    complaintId: complaint.id,
    actorId: 'officer',
    actorName: actorName || 'Officer',
    actorRole: actorRole || 'officer',
    action: 'UPDATE_STATUS',
    details: `Updated status of ${complaint.id} to ${status}. Note: ${note || 'None'}`
  });

  // Notify citizen
  db.addNotification({
    userId: complaint.citizenId,
    title: 'Progress Update on Your Complaint',
    message: `Grievance ${complaint.id}: ${note || `Work status updated to ${status?.replace(/_/g, ' ')}.`}`,
    complaintId: complaint.id,
    type: 'status_update'
  });

  res.json({ complaint: updated });
});

// Officer Submits Action Taken Report + Proof of Work
app.post('/api/complaints/:id/action-report', (req, res) => {
  const {
    officerId,
    officerName,
    actionSummary,
    materialsUsed,
    crewSize,
    costIncurred,
    afterPhotoUrl,
    verificationNotes
  } = req.body;

  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  if (!actionSummary || !afterPhotoUrl) {
    return res.status(400).json({ error: 'Action summary and after-resolution photograph are mandatory.' });
  }

  const actionReport = {
    officerId: officerId || complaint.assignedOfficerId || 'officer',
    officerName: officerName || complaint.assignedOfficerName || 'Field Officer',
    submittedAt: new Date().toISOString(),
    actionSummary,
    materialsUsed: materialsUsed || 'Standard departmental repair materials',
    crewSize: Number(crewSize) || 4,
    costIncurred: costIncurred || 'Standard maintenance fund',
    afterPhotoUrl,
    verificationNotes: verificationNotes || 'Physical repair completed and inspected.'
  };

  const timelineEvent: TimelineEvent = {
    id: `t-${Date.now()}`,
    status: 'resolved_awaiting_verification',
    title: 'Work Completed – Awaiting Citizen Verification',
    description: `Action Taken: ${actionSummary}. Materials used: ${materialsUsed || 'Standard'}. Photo evidence uploaded. Verification requested from citizen.`,
    actorName: actionReport.officerName,
    actorRole: 'Government Officer',
    timestamp: new Date().toISOString(),
    attachmentUrl: afterPhotoUrl
  };

  const updated = db.updateComplaint(req.params.id, {
    actionReport,
    resolvedAt: new Date().toISOString(),
    verificationRequestedAt: new Date().toISOString(),
    status: 'resolved_awaiting_verification',
    timeline: [...complaint.timeline, timelineEvent]
  });

  db.addAuditLog({
    complaintId: complaint.id,
    actorId: actionReport.officerId,
    actorName: actionReport.officerName,
    actorRole: 'officer',
    action: 'SUBMIT_ACTION_REPORT',
    details: `Officer submitted completion proof and after-photo for ${complaint.id}. Dispatched citizen verification request.`
  });

  // Notify Citizen to confirm resolution
  db.addNotification({
    userId: complaint.citizenId,
    title: 'Action Taken: Please Confirm Problem Resolution',
    message: `Officer ${actionReport.officerName} has reported your grievance (${complaint.id}) as solved and uploaded after-work photographs. Please inspect and confirm whether the issue is resolved.`,
    complaintId: complaint.id,
    type: 'verification_request'
  });

  res.json({ complaint: updated });
});

// Citizen Verification: Confirm Solved or Reopen
app.post('/api/complaints/:id/verify', (req, res) => {
  const { action, reopenReason, citizenName } = req.body; // action: 'confirm' or 'reopen'
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  if (action === 'confirm') {
    const timelineEvent: TimelineEvent = {
      id: `t-${Date.now()}`,
      status: 'successfully_closed',
      title: 'Citizen Confirmed Resolution',
      description: 'Citizen inspected the site and verified that the problem has been genuinely and satisfactorily resolved.',
      actorName: citizenName || complaint.citizenName,
      actorRole: 'Citizen',
      timestamp: new Date().toISOString()
    };

    const updated = db.updateComplaint(req.params.id, {
      status: 'successfully_closed',
      closedAt: new Date().toISOString(),
      timeline: [...complaint.timeline, timelineEvent]
    });

    db.addAuditLog({
      complaintId: complaint.id,
      actorId: complaint.citizenId,
      actorName: citizenName || complaint.citizenName,
      actorRole: 'citizen',
      action: 'CLOSE_COMPLAINT_VERIFIED',
      details: `Citizen confirmed resolution. Complaint ${complaint.id} successfully closed.`
    });

    if (complaint.assignedOfficerId) {
      db.addNotification({
        userId: complaint.assignedOfficerId,
        title: 'Grievance Successfully Closed by Citizen',
        message: `Citizen verified and closed ticket ${complaint.id}. Good job!`,
        complaintId: complaint.id,
        type: 'status_update'
      });
    }

    return res.json({ complaint: updated, message: 'Complaint successfully verified and closed!' });
  } else if (action === 'reopen') {
    if (!reopenReason) {
      return res.status(400).json({ error: 'Please state the reason why the problem remains unresolved.' });
    }

    const timelineEvent: TimelineEvent = {
      id: `t-${Date.now()}`,
      status: 'reopened',
      title: 'Citizen Reopened Complaint',
      description: `Citizen verified that problem is NOT solved: "${reopenReason}". Escalated for corrective re-work.`,
      actorName: citizenName || complaint.citizenName,
      actorRole: 'Citizen',
      timestamp: new Date().toISOString()
    };

    const updated = db.updateComplaint(req.params.id, {
      status: 'reopened',
      reopenReason,
      reopenedCount: (complaint.reopenedCount || 0) + 1,
      escalatedToSupervisor: true,
      escalationReason: `Reopened by citizen: ${reopenReason}`,
      escalatedAt: new Date().toISOString(),
      timeline: [...complaint.timeline, timelineEvent]
    });

    db.addAuditLog({
      complaintId: complaint.id,
      actorId: complaint.citizenId,
      actorName: citizenName || complaint.citizenName,
      actorRole: 'citizen',
      action: 'REOPEN_COMPLAINT',
      details: `Citizen reopened complaint ${complaint.id}. Reason: "${reopenReason}". Auto-escalated to supervisor.`
    });

    if (complaint.assignedOfficerId) {
      db.addNotification({
        userId: complaint.assignedOfficerId,
        title: 'ALERT: Complaint Reopened by Citizen',
        message: `Complaint ${complaint.id} was reopened by citizen: "${reopenReason}". Supervisor alerted for mandatory review.`,
        complaintId: complaint.id,
        type: 'escalation'
      });
    }

    return res.json({ complaint: updated, message: 'Complaint reopened and escalated to supervisor.' });
  }

  res.status(400).json({ error: 'Invalid verification action. Must be "confirm" or "reopen".' });
});

// Citizen Feedback & Rating
app.post('/api/complaints/:id/feedback', (req, res) => {
  const { rating, isSatisfied, comment } = req.body;
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  const feedback = {
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    isSatisfied: !!isSatisfied,
    comment: comment || '',
    submittedAt: new Date().toISOString()
  };

  const updated = db.updateComplaint(req.params.id, {
    citizenFeedback: feedback
  });

  db.addAuditLog({
    complaintId: complaint.id,
    actorId: complaint.citizenId,
    actorName: complaint.citizenName,
    actorRole: 'citizen',
    action: 'SUBMIT_FEEDBACK',
    details: `Citizen rated resolution ${feedback.rating}/5 stars. Comment: "${feedback.comment}".`
  });

  res.json({ complaint: updated, feedback });
});

// Community Upvote / Support
app.post('/api/complaints/:id/support', (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const updated = db.supportComplaint(req.params.id, userId);
  if (!updated) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  // If support count crosses 10, automatically bump priority to High/Critical
  if (updated.supportCount >= 10 && updated.priority !== 'critical') {
    db.updateComplaint(req.params.id, { priority: 'high' });
  }

  res.json({ complaint: updated });
});

// Supervisor Escalation Override
app.post('/api/complaints/:id/escalate', (req, res) => {
  const { reason, actorName } = req.body;
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  const timelineEvent: TimelineEvent = {
    id: `t-${Date.now()}`,
    status: complaint.status,
    title: 'Manual Supervisor Escalation',
    description: `Escalated by supervisor ${actorName || 'Authority'}. Reason: ${reason || 'Priority intervention required.'}`,
    actorName: actorName || 'Department Supervisor',
    actorRole: 'Supervisor',
    timestamp: new Date().toISOString()
  };

  const updated = db.updateComplaint(req.params.id, {
    escalatedToSupervisor: true,
    escalationReason: reason || 'Priority supervisor intervention',
    escalatedAt: new Date().toISOString(),
    priority: 'critical',
    timeline: [...complaint.timeline, timelineEvent]
  });

  db.addAuditLog({
    complaintId: complaint.id,
    actorId: 'supervisor',
    actorName: actorName || 'Department Supervisor',
    actorRole: 'department_head',
    action: 'ESCALATE_COMPLAINT',
    details: `Manually escalated complaint ${complaint.id} to Critical priority: ${reason}`
  });

  res.json({ complaint: updated });
});

// Super Admin Reassignment (Correct misrouted complaints)
app.patch('/api/complaints/:id/reroute', (req, res) => {
  const { newDepartmentId, reason, actorName } = req.body;
  const complaint = db.getComplaintById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  const targetDept = DEPARTMENTS.find(d => d.id === newDepartmentId);
  if (!targetDept) {
    return res.status(400).json({ error: 'Invalid department ID' });
  }

  const timelineEvent: TimelineEvent = {
    id: `t-${Date.now()}`,
    status: 'assigned_to_dept',
    title: `Re-Routed to ${targetDept.name}`,
    description: `Admin corrected jurisdiction assignment. Reason: ${reason || 'Jurisdiction realignment'}. Transferred from ${complaint.departmentName} to ${targetDept.name}.`,
    actorName: actorName || 'Super Admin',
    actorRole: 'Super Admin',
    timestamp: new Date().toISOString()
  };

  const updated = db.updateComplaint(req.params.id, {
    departmentId: targetDept.id,
    departmentName: targetDept.name,
    assignedOfficerId: undefined,
    assignedOfficerName: undefined,
    assignedOfficerPhoneMasked: undefined,
    assignedOfficerDesignation: undefined,
    status: 'assigned_to_dept',
    timeline: [...complaint.timeline, timelineEvent]
  });

  db.addAuditLog({
    complaintId: complaint.id,
    actorId: 'super_admin',
    actorName: actorName || 'Super Admin',
    actorRole: 'super_admin',
    action: 'REROUTE_COMPLAINT',
    details: `Re-routed ${complaint.id} from ${complaint.departmentName} to ${targetDept.name}. Reason: ${reason}`
  });

  res.json({ complaint: updated });
});

// Community Campaigns & Voice Topics
app.get('/api/community/campaigns', (req, res) => {
  res.json({ campaigns: db.getCampaigns() });
});

app.post('/api/community/campaigns/:id/join', (req, res) => {
  const { userId } = req.body;
  const updated = db.joinCampaign(req.params.id, userId || 'user_citizen_1');
  res.json({ campaign: updated });
});

app.get('/api/community/voices', (req, res) => {
  res.json({ voiceTopics: db.getVoiceTopics() });
});

app.post('/api/community/voices', (req, res) => {
  const { title, district, area, description, submittedBy, linkedDepartmentId } = req.body;
  if (!title || !district || !description) {
    return res.status(400).json({ error: 'Title, district, and description are required.' });
  }

  const created = db.addVoiceTopic({
    title,
    district,
    area: area || '',
    description,
    submittedBy: submittedBy || 'Active Citizen',
    status: 'open',
    linkedDepartmentId
  });

  db.addAuditLog({
    actorId: 'citizen',
    actorName: submittedBy || 'Active Citizen',
    actorRole: 'citizen',
    action: 'CREATE_VOICE_TOPIC',
    details: `Created community issue: "${title}" in ${district}.`
  });

  res.status(201).json({ voiceTopic: created });
});

app.post('/api/community/voices/:id/upvote', (req, res) => {
  const { userId } = req.body;
  const updated = db.upvoteVoiceTopic(req.params.id, userId || 'user_citizen_1');
  res.json({ voiceTopic: updated });
});

// Notifications
app.get('/api/notifications', (req, res) => {
  const { userId } = req.query;
  const list = db.getNotifications((userId as string) || 'user_citizen_1');
  res.json({ notifications: list });
});

app.patch('/api/notifications/:id/read', (req, res) => {
  const updated = db.markNotificationRead(req.params.id);
  res.json({ notification: updated });
});

// Audit Logs
app.get('/api/audit-logs', (req, res) => {
  res.json({ auditLogs: db.getAuditLogs() });
});

// Advanced Analytics for Transparency & Reports
app.get('/api/analytics', (req, res) => {
  const complaints = db.getComplaints();

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'submitted' || c.status === 'under_review' || c.status === 'assigned_to_dept').length;
  const inProgress = complaints.filter(c => c.status === 'assigned_to_officer' || c.status === 'work_in_progress' || c.status === 'waiting_for_info').length;
  const awaitingVerification = complaints.filter(c => c.status === 'resolved_awaiting_verification').length;
  const closed = complaints.filter(c => c.status === 'successfully_closed').length;
  const reopened = complaints.filter(c => c.status === 'reopened').length;
  const overdue = complaints.filter(c => c.isOverdue).length;

  // Department-wise breakdown
  const departmentStats = DEPARTMENTS.map(dept => {
    const deptComplaints = complaints.filter(c => c.departmentId === dept.id);
    const resolvedCount = deptComplaints.filter(c => c.status === 'successfully_closed').length;
    const pendingCount = deptComplaints.filter(c => c.status !== 'successfully_closed' && c.status !== 'rejected').length;
    const overdueCount = deptComplaints.filter(c => c.isOverdue).length;
    const resolutionRate = deptComplaints.length > 0 ? Math.round((resolvedCount / deptComplaints.length) * 100) : 100;

    return {
      departmentId: dept.id,
      name: dept.name,
      shortCode: dept.shortCode,
      total: deptComplaints.length,
      resolved: resolvedCount,
      pending: pendingCount,
      overdue: overdueCount,
      resolutionRate
    };
  }).sort((a, b) => b.total - a.total);

  // District-wise breakdown
  const districtCounts: { [key: string]: { total: number; resolved: number; pending: number } } = {};
  complaints.forEach(c => {
    const d = c.location.district || 'Karnataka';
    if (!districtCounts[d]) {
      districtCounts[d] = { total: 0, resolved: 0, pending: 0 };
    }
    districtCounts[d].total += 1;
    if (c.status === 'successfully_closed') {
      districtCounts[d].resolved += 1;
    } else {
      districtCounts[d].pending += 1;
    }
  });

  // Category breakdown
  const categoryStats = PROBLEM_CATEGORIES.map(cat => {
    const count = complaints.filter(c => c.categoryId === cat.id).length;
    return {
      categoryId: cat.id,
      name: cat.name,
      count
    };
  }).filter(c => c.count > 0).sort((a, b) => b.count - a.count);

  // Citizen satisfaction calculation
  const ratedComplaints = complaints.filter(c => c.citizenFeedback?.rating);
  const avgRating = ratedComplaints.length > 0
    ? (ratedComplaints.reduce((acc, c) => acc + (c.citizenFeedback?.rating || 0), 0) / ratedComplaints.length).toFixed(1)
    : '4.8';

  res.json({
    summary: {
      total,
      pending,
      inProgress,
      awaitingVerification,
      closed,
      reopened,
      overdue,
      resolutionRate: total > 0 ? Math.round((closed / total) * 100) : 0,
      avgResolutionHours: 32,
      satisfactionRating: avgRating
    },
    departmentStats,
    districtCounts,
    categoryStats
  });
});

// ----------------- VITE DEVELOPMENT & PRODUCTION INTEGRATION -----------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`JANASEVA platform running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
