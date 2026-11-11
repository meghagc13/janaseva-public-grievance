import fs from 'fs';
import path from 'path';
import { Complaint, User, CommunityCampaign, VoiceTopic, AuditLog, NotificationItem } from '../types';
import { DEPARTMENTS, PROBLEM_CATEGORIES, determineResponsibleDepartment } from '../data/categoriesAndDepartments';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'janaseva_db.json');

export interface DatabaseSchema {
  users: User[];
  complaints: Complaint[];
  campaigns: CommunityCampaign[];
  voiceTopics: VoiceTopic[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
}

// Initial Seed Users
const SEED_USERS: User[] = [
  {
    id: 'user_citizen_1',
    name: 'Ramesh Gowda',
    email: 'ramesh.gowda@gmail.com',
    phone: '9845012345',
    role: 'citizen',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru East',
    isVerified: true,
  },
  {
    id: 'user_citizen_2',
    name: 'Anita Kulkarni',
    email: 'anita.kulkarni@gmail.com',
    phone: '9880198765',
    role: 'citizen',
    district: 'Mysuru',
    taluk: 'Mysuru Urban',
    isVerified: true,
  },
  {
    id: 'user_officer_bbmp',
    name: 'Er. Priya Sharma',
    email: 'priya.sharma@bbmp.gov.in',
    phone: '9448055112',
    role: 'officer',
    departmentId: 'dept_municipal',
    designation: 'Assistant Executive Engineer (AEE) - Ward 112',
    badgeNumber: 'KA-BBMP-ENG-8402',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru East',
    isVerified: true,
  },
  {
    id: 'user_officer_pwd',
    name: 'Er. Raghu Veerappa',
    email: 'raghu.pwd@karnataka.gov.in',
    phone: '9448066223',
    role: 'officer',
    departmentId: 'dept_pwd',
    designation: 'Assistant Engineer (Roads & Bridges)',
    badgeNumber: 'KA-PWD-ENG-3190',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru North',
    isVerified: true,
  },
  {
    id: 'user_officer_water',
    name: 'Er. Suresh Babu',
    email: 'suresh.bwssb@karnataka.gov.in',
    phone: '9448077334',
    role: 'officer',
    departmentId: 'dept_water',
    designation: 'Sub-Divisional Engineer (Water Maintenance)',
    badgeNumber: 'KA-BWSSB-ENG-1288',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru South',
    isVerified: true,
  },
  {
    id: 'user_dept_head_bbmp',
    name: 'Dr. S. N. Balakrishna',
    email: 'jc.east@bbmp.gov.in',
    phone: '9448011001',
    role: 'department_head',
    departmentId: 'dept_municipal',
    designation: 'Joint Commissioner (Civic Infrastructure)',
    badgeNumber: 'KA-BBMP-JC-009',
    district: 'Bengaluru Urban',
    isVerified: true,
  },
  {
    id: 'user_super_admin',
    name: 'Sri. Manjunath Prasad IAS',
    email: 'admin.janaseva@karnataka.gov.in',
    phone: '9448000001',
    role: 'super_admin',
    designation: 'Principal Secretary (Administrative Reforms & Grievances)',
    badgeNumber: 'IAS-KN-1994',
    district: 'Bengaluru Urban',
    isVerified: true,
  }
];

// Seed Complaints
const SEED_COMPLAINTS: Complaint[] = [
  {
    id: 'JNS-2026-BLR-0101',
    trackingNumber: 'JNS-2026-BLR-0101',
    title: 'Severe deep potholes near Indiranagar 100 Feet Road Signal',
    description: 'Multiple deep crater-like potholes across the main intersection near 12th Main junction. Two-wheelers frequently skid during rains, and water accumulation makes them invisible at night.',
    categoryId: 'cat_road_infra',
    categoryName: 'Road and Infrastructure',
    subcategoryId: 'sub_potholes',
    subcategoryName: 'Potholes / Broken Asphalt',
    status: 'work_in_progress',
    priority: 'high',
    citizenId: 'user_citizen_1',
    citizenName: 'Ramesh Gowda',
    citizenPhoneMasked: '98450****5',
    isAnonymous: false,
    location: {
      latitude: 12.9784,
      longitude: 77.6408,
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      taluk: 'Bengaluru East',
      cityOrVillage: 'Bengaluru',
      wardOrZone: 'Indiranagar (Ward 112)',
      address: '100 Feet Road, Near 12th Main Junction, Indiranagar',
      landmark: 'Opposite Metro Pillar 84',
      pincode: '560038'
    },
    beforePhotoUrl: '/src/assets/images/community_service_road_1794296602739.jpg',
    departmentId: 'dept_municipal',
    departmentName: 'Municipal Corporation (BBMP / City Corporations)',
    assignedOfficerId: 'user_officer_bbmp',
    assignedOfficerName: 'Er. Priya Sharma',
    assignedOfficerPhoneMasked: '94480****2',
    assignedOfficerDesignation: 'Assistant Executive Engineer (AEE) - Ward 112',
    assignedAt: new Date(Date.now() - 36 * 3600000).toISOString(),
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    targetResolutionDate: new Date(Date.now() + 24 * 3600000).toISOString(),
    isOverdue: false,
    escalatedToSupervisor: false,
    reopenedCount: 0,
    duplicateCount: 3,
    supportCount: 14,
    supportedByUserIds: ['user_citizen_2'],
    timeline: [
      {
        id: 't-1',
        status: 'submitted',
        title: 'Complaint Registered',
        description: 'Complaint submitted by citizen Ramesh Gowda with GPS location & photo.',
        actorName: 'Ramesh Gowda',
        actorRole: 'Citizen',
        timestamp: new Date(Date.now() - 48 * 3600000).toISOString()
      },
      {
        id: 't-2',
        status: 'assigned_to_dept',
        title: 'Auto-Routed to BBMP',
        description: 'Smart routing engine assigned ticket to BBMP based on municipal ward jurisdiction.',
        actorName: 'Janaseva Routing Engine',
        actorRole: 'Automated System',
        timestamp: new Date(Date.now() - 47 * 3600000).toISOString()
      },
      {
        id: 't-3',
        status: 'assigned_to_officer',
        title: 'Officer Designated',
        description: 'Assigned to Ward 112 AEE Er. Priya Sharma for ground inspection.',
        actorName: 'Dr. S. N. Balakrishna',
        actorRole: 'Department Supervisor',
        timestamp: new Date(Date.now() - 36 * 3600000).toISOString()
      },
      {
        id: 't-4',
        status: 'work_in_progress',
        title: 'Field Team Dispatched',
        description: 'Asphalt cold-mix batch ordered; road leveling team mobilized on site.',
        actorName: 'Er. Priya Sharma',
        actorRole: 'Government Officer',
        timestamp: new Date(Date.now() - 12 * 3600000).toISOString()
      }
    ]
  },
  {
    id: 'JNS-2026-BLR-0102',
    trackingNumber: 'JNS-2026-BLR-0102',
    title: 'Major BWSSB clean drinking water pipeline burst on 80 Feet Road Koramangala',
    description: 'Drinking water is gushing out on the street since early morning. Thousands of liters of water wasted and local residents have low water pressure in 4th Block.',
    categoryId: 'cat_water',
    categoryName: 'Water Problems',
    subcategoryId: 'sub_broken_pipelines',
    subcategoryName: 'Burst Water Pipeline',
    status: 'assigned_to_officer',
    priority: 'critical',
    citizenId: 'user_citizen_1',
    citizenName: 'Anonymous Citizen',
    citizenPhoneMasked: '98450****5',
    isAnonymous: true,
    location: {
      latitude: 12.9352,
      longitude: 77.6245,
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      taluk: 'Bengaluru South',
      cityOrVillage: 'Bengaluru',
      wardOrZone: 'Koramangala (Ward 151)',
      address: '80 Feet Road, 4th Block, Koramangala',
      landmark: 'Near Sony World Junction',
      pincode: '560034'
    },
    beforePhotoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80',
    departmentId: 'dept_water',
    departmentName: 'Water Supply & Sewerage Board (BWSSB / KUWSDB)',
    assignedOfficerId: 'user_officer_water',
    assignedOfficerName: 'Er. Suresh Babu',
    assignedOfficerPhoneMasked: '94480****4',
    assignedOfficerDesignation: 'Sub-Divisional Engineer (Water Maintenance)',
    assignedAt: new Date(Date.now() - 14 * 3600000).toISOString(),
    createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    targetResolutionDate: new Date(Date.now() - 6 * 3600000).toISOString(), // Overdue for demo
    isOverdue: true,
    escalatedToSupervisor: true,
    escalationReason: 'Critical pipeline burst exceeded 12-hour SLA window. Escalated automatically to BWSSB Executive Engineer.',
    escalatedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    reopenedCount: 0,
    duplicateCount: 2,
    supportCount: 28,
    supportedByUserIds: [],
    timeline: [
      {
        id: 't-10',
        status: 'submitted',
        title: 'Critical Grievance Submitted',
        description: 'Anonymous citizen reported burst pipeline with photo evidence.',
        actorName: 'Anonymous Citizen',
        actorRole: 'Citizen',
        timestamp: new Date(Date.now() - 18 * 3600000).toISOString()
      },
      {
        id: 't-11',
        status: 'assigned_to_dept',
        title: 'Priority Escalation to BWSSB',
        description: 'System identified critical water network failure and dispatched to BWSSB division.',
        actorName: 'Janaseva Routing Engine',
        actorRole: 'Automated System',
        timestamp: new Date(Date.now() - 17 * 3600000).toISOString()
      },
      {
        id: 't-12',
        status: 'assigned_to_officer',
        title: 'Assigned to Sub-Divisional Engineer',
        description: 'Officer Er. Suresh Babu notified via system emergency alert.',
        actorName: 'BWSSB Control Room',
        actorRole: 'Department Supervisor',
        timestamp: new Date(Date.now() - 14 * 3600000).toISOString()
      },
      {
        id: 't-13',
        status: 'assigned_to_officer',
        title: 'SLA Breach & Auto-Escalation',
        description: 'Overdue by 6 hours. Priority escalation notification sent to Executive Engineer.',
        actorName: 'SLA Escalation Engine',
        actorRole: 'System Daemon',
        timestamp: new Date(Date.now() - 4 * 3600000).toISOString()
      }
    ]
  },
  {
    id: 'JNS-2026-MYS-0103',
    trackingNumber: 'JNS-2026-MYS-0103',
    title: 'Defective streetlights causing total darkness on Chamundi Hill approach road',
    description: 'Over 8 consecutive sodium streetlights are defunct from the foothills bend up to the viewpoint. Poses severe safety hazard for pilgrims and tourists navigating the sharp curves at night.',
    categoryId: 'cat_electricity',
    categoryName: 'Electricity & Street Lighting',
    subcategoryId: 'sub_streetlights',
    subcategoryName: 'Streetlights Not Working / Dark Stretch',
    status: 'resolved_awaiting_verification',
    priority: 'medium',
    citizenId: 'user_citizen_2',
    citizenName: 'Anita Kulkarni',
    citizenPhoneMasked: '98801****5',
    isAnonymous: false,
    location: {
      latitude: 12.3023,
      longitude: 76.6712,
      state: 'Karnataka',
      district: 'Mysuru',
      taluk: 'Mysuru Urban',
      cityOrVillage: 'Mysuru',
      wardOrZone: 'Chamundi Hill Ward',
      address: 'Chamundi Hill Ghat Road, Curve 4 to Viewpoint',
      landmark: 'Near Nandi Statue turn',
      pincode: '570010'
    },
    beforePhotoUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
    departmentId: 'dept_municipal',
    departmentName: 'Municipal Corporation (BBMP / City Corporations)',
    assignedOfficerId: 'user_officer_bbmp',
    assignedOfficerName: 'Er. Priya Sharma',
    assignedOfficerPhoneMasked: '94480****2',
    assignedOfficerDesignation: 'Executive Engineer (Electrical Division)',
    assignedAt: new Date(Date.now() - 72 * 3600000).toISOString(),
    createdAt: new Date(Date.now() - 96 * 3600000).toISOString(),
    targetResolutionDate: new Date(Date.now() - 24 * 3600000).toISOString(),
    isOverdue: false,
    escalatedToSupervisor: false,
    resolvedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    verificationRequestedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    actionReport: {
      officerId: 'user_officer_bbmp',
      officerName: 'Er. Priya Sharma',
      submittedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
      actionSummary: 'Replaced 8 burnt LED driver fixtures and repaired underground line cable joint between pole #42 and #49. All lamps tested and functional.',
      materialsUsed: '8x 90W Philips Streetlight LED luminaires, 40m armored copper cable, waterproof junction sleeves',
      crewSize: 4,
      costIncurred: '₹ 18,400',
      afterPhotoUrl: '/src/assets/images/clean_city_civic_1794296602596.jpg',
      verificationNotes: 'Ground lighting lux levels verified on 08-Nov night. Full illumination restored along ghat curve.'
    },
    reopenedCount: 0,
    duplicateCount: 1,
    supportCount: 9,
    supportedByUserIds: ['user_citizen_1'],
    timeline: [
      {
        id: 't-21',
        status: 'submitted',
        title: 'Complaint Logged',
        description: 'Resident Anita Kulkarni submitted streetlight outage grievance.',
        actorName: 'Anita Kulkarni',
        actorRole: 'Citizen',
        timestamp: new Date(Date.now() - 96 * 3600000).toISOString()
      },
      {
        id: 't-22',
        status: 'assigned_to_officer',
        title: 'Assigned to Electrical Engineer',
        description: 'Work order #MY-ELEC-442 generated and assigned.',
        actorName: 'Mysuru City Corporation',
        actorRole: 'Department Supervisor',
        timestamp: new Date(Date.now() - 72 * 3600000).toISOString()
      },
      {
        id: 't-23',
        status: 'work_in_progress',
        title: 'Cable Repair in Progress',
        description: 'Electrical truck team arrived on Chamundi Hill Ghat road.',
        actorName: 'Er. Priya Sharma',
        actorRole: 'Government Officer',
        timestamp: new Date(Date.now() - 24 * 3600000).toISOString()
      },
      {
        id: 't-24',
        status: 'resolved_awaiting_verification',
        title: 'Work Completed – Awaiting Citizen Verification',
        description: 'Officer uploaded Action Taken Report and proof of work. Verification notification dispatched to complainant.',
        actorName: 'Er. Priya Sharma',
        actorRole: 'Government Officer',
        timestamp: new Date(Date.now() - 10 * 3600000).toISOString()
      }
    ]
  },
  {
    id: 'JNS-2026-DWD-0104',
    trackingNumber: 'JNS-2026-DWD-0104',
    title: 'Overflowing commercial garbage dump opposite Vidyanagar Bus Stand',
    description: 'Commercial vegetable and packaging waste piled up for over 5 days. Stray cattle and dogs scattering waste onto the carriage way, emitting unbearable stench.',
    categoryId: 'cat_sanitation',
    categoryName: 'Sanitation and Garbage',
    subcategoryId: 'sub_garbage_uncollected',
    subcategoryName: 'Garbage Not Collected for Days',
    status: 'successfully_closed',
    priority: 'high',
    citizenId: 'user_citizen_1',
    citizenName: 'Ramesh Gowda',
    citizenPhoneMasked: '98450****5',
    isAnonymous: false,
    location: {
      latitude: 15.3647,
      longitude: 75.1240,
      state: 'Karnataka',
      district: 'Hubballi-Dharwad',
      taluk: 'Hubballi Urban',
      cityOrVillage: 'Hubballi',
      wardOrZone: 'Vidyanagar',
      address: 'Vidyanagar Main Road, Opposite Central Bus Stand',
      landmark: 'Behind BVB Engineering College Compound',
      pincode: '580021'
    },
    beforePhotoUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
    departmentId: 'dept_sanitation',
    departmentName: 'Sanitation & Solid Waste Management',
    assignedOfficerId: 'user_officer_bbmp',
    assignedOfficerName: 'Er. Priya Sharma',
    assignedOfficerPhoneMasked: '94480****2',
    assignedOfficerDesignation: 'Health Inspector & SWM Supervisor',
    assignedAt: new Date(Date.now() - 120 * 3600000).toISOString(),
    createdAt: new Date(Date.now() - 140 * 3600000).toISOString(),
    targetResolutionDate: new Date(Date.now() - 96 * 3600000).toISOString(),
    isOverdue: false,
    escalatedToSupervisor: false,
    resolvedAt: new Date(Date.now() - 80 * 3600000).toISOString(),
    closedAt: new Date(Date.now() - 40 * 3600000).toISOString(),
    actionReport: {
      officerId: 'user_officer_bbmp',
      officerName: 'Er. Priya Sharma',
      submittedAt: new Date(Date.now() - 80 * 3600000).toISOString(),
      actionSummary: 'Compactor trucks mobilized; 4.2 metric tons of mixed commercial solid waste lifted and sent to designated processing yard. Bleaching powder disinfected throughout.',
      materialsUsed: '2x 14-ton compactor trucks, 50kg bleaching powder, warning signage boards',
      crewSize: 8,
      costIncurred: '₹ 12,000',
      afterPhotoUrl: '/src/assets/images/clean_city_civic_1794296602596.jpg',
      verificationNotes: 'Permanent secondary dustbin enclosure established to prevent future roadside littering.'
    },
    citizenFeedback: {
      rating: 5,
      isSatisfied: true,
      comment: 'Very rapid response and the area was thoroughly bleached and cleaned. Excellent service by HDMC!',
      submittedAt: new Date(Date.now() - 40 * 3600000).toISOString()
    },
    reopenedCount: 0,
    duplicateCount: 4,
    supportCount: 32,
    supportedByUserIds: ['user_citizen_1', 'user_citizen_2'],
    timeline: [
      {
        id: 't-31',
        status: 'submitted',
        title: 'Waste Overflow Reported',
        description: 'Citizen logged grievance regarding uncollected commercial garbage.',
        actorName: 'Ramesh Gowda',
        actorRole: 'Citizen',
        timestamp: new Date(Date.now() - 140 * 3600000).toISOString()
      },
      {
        id: 't-32',
        status: 'work_in_progress',
        title: 'Sanitation Crew Deployed',
        description: 'Compactor truck and sanitation workers cleared the site.',
        actorName: 'Er. Priya Sharma',
        actorRole: 'Government Officer',
        timestamp: new Date(Date.now() - 90 * 3600000).toISOString()
      },
      {
        id: 't-33',
        status: 'resolved_awaiting_verification',
        title: 'Resolution Evidence Submitted',
        description: 'After-cleaning photograph and chemical treatment proof uploaded.',
        actorName: 'Er. Priya Sharma',
        actorRole: 'Government Officer',
        timestamp: new Date(Date.now() - 80 * 3600000).toISOString()
      },
      {
        id: 't-34',
        status: 'successfully_closed',
        title: 'Citizen Confirmed & 5-Star Feedback',
        description: 'Complainant verified clean site and gave 5-star rating.',
        actorName: 'Ramesh Gowda',
        actorRole: 'Citizen',
        timestamp: new Date(Date.now() - 40 * 3600000).toISOString()
      }
    ]
  }
];

// Seed Community Campaigns
const SEED_CAMPAIGNS: CommunityCampaign[] = [
  {
    id: 'camp-1',
    title: 'Ward 112 Pothole & Footpath Safety Audit Walk',
    titleKn: 'ವಾರ್ಡ್ ೧೧೨ ರಸ್ತೆ ಗುಂಡಿ ಮತ್ತು ಪಾದಚಾರಿ ಸುರಕ್ಷತಾ ನಡಿಗೆ',
    department: 'Municipal Corporation (BBMP)',
    district: 'Bengaluru Urban',
    location: 'Indiranagar 100 Feet Road to 80 Feet Road Junction',
    description: 'Citizens and BBMP ward engineers join hands for an on-foot civic audit to tag missing footpath slabs, dangerous curbs, and potholes before monsoon paving.',
    date: 'Saturday, Nov 15, 2026 - 7:30 AM',
    organizer: 'Indiranagar Resident Welfare Association & BBMP Ward Office',
    participantCount: 48,
    joinedUserIds: ['user_citizen_1'],
    status: 'upcoming',
    targetGoal: 'Identify & prioritize 50 vulnerable pedestrian spots'
  },
  {
    id: 'camp-2',
    title: 'Green Canopy Avenue Tree Plantation Drive',
    titleKn: 'ಹಸಿರು ಕವಚ ರಸ್ತೆ ಬದಿ ಗಿಡ ನೆಡುವ ಅಭಿಯಾನ',
    department: 'Forest, Ecology & Environment Department',
    district: 'Mysuru',
    location: 'Chamundi Foothills Heritage Ring Road',
    description: 'Community-led planting of 250 native shade-giving trees (Neem, Honge, Mahua) with tree guards and drip irrigation tubes maintained by local volunteers.',
    date: 'Sunday, Nov 16, 2026 - 6:45 AM',
    organizer: 'Mysuru Environmental Forum & Forest Department',
    participantCount: 112,
    joinedUserIds: ['user_citizen_2'],
    status: 'upcoming',
    targetGoal: '250 native saplings with 2-year maintenance pledge'
  },
  {
    id: 'camp-3',
    title: 'Koramangala Valley Storm Water Drain Desilting Monitor',
    titleKn: 'ಕೋರಮಂಗಲ ರಾಜಕಾಲುವೆ ಹೂಳೆತ್ತುವಿಕೆ ವೀಕ್ಷಣೆ',
    department: 'Water Supply & Municipal Corporation',
    district: 'Bengaluru Urban',
    location: 'Koramangala 4th Block Drain Outfall',
    description: 'Public transparency drive where civil society volunteers observe mechanized desilting of secondary drains and verify silt disposal at authorized quarries.',
    date: 'Ongoing - Nov 10 to Nov 20, 2026',
    organizer: 'Citizens for Clean Waterways',
    participantCount: 35,
    joinedUserIds: [],
    status: 'ongoing',
    targetGoal: 'Ensure 100% unobstructed storm water flow'
  }
];

// Seed Voice of the Community Topics
const SEED_VOICE_TOPICS: VoiceTopic[] = [
  {
    id: 'voice-1',
    title: 'Demand for elevated pedestrian skywalk with escalators at Silk Board Junction',
    district: 'Bengaluru Urban',
    area: 'Central Silk Board',
    description: 'Every day thousands of metro commuters, elderly citizens and bus passengers risk their lives crossing the 12-lane highway chaos. An integrated skywalk is an urgent life-saving necessity.',
    submittedBy: 'K. Venkatesh (Citizen Forum)',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    upvotes: 142,
    upvotedByUserIds: ['user_citizen_1', 'user_citizen_2'],
    status: 'forwarded_to_dept',
    linkedDepartmentId: 'dept_transport'
  },
  {
    id: 'voice-2',
    title: 'Dedicated BMTC Electric Feeder buses connecting Hoodi & Hope Farm to Metro',
    district: 'Bengaluru Urban',
    area: 'Whitefield',
    description: 'High frequency 10-minute mini-feeder buses needed to connect dense interior residential pockets to Purple Line metro stations, drastically reducing private car congestion.',
    submittedBy: 'Whitefield Rising Civic Group',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    upvotes: 89,
    upvotedByUserIds: ['user_citizen_1'],
    status: 'official_drive_initiated',
    linkedDepartmentId: 'dept_transport'
  },
  {
    id: 'voice-3',
    title: 'Strict enforcement of heavy vehicle entry ban during school rush hours in Hubballi',
    district: 'Hubballi-Dharwad',
    area: 'Vidyanagar - Shirur Park',
    description: 'Tipper trucks and heavy goods carriers violate morning 7:30 AM to 9:30 AM restrictions, threatening school vans and cycling children.',
    submittedBy: 'Parents Civic Coalition',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    upvotes: 64,
    upvotedByUserIds: [],
    status: 'open',
    linkedDepartmentId: 'dept_police'
  }
];

// Seed Audit Logs
const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
    complaintId: 'JNS-2026-BLR-0101',
    actorId: 'user_citizen_1',
    actorName: 'Ramesh Gowda',
    actorRole: 'citizen',
    action: 'CREATE_COMPLAINT',
    details: 'Submitted complaint JNS-2026-BLR-0101 for potholes on Indiranagar 100 Feet Road.'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 47 * 3600000).toISOString(),
    complaintId: 'JNS-2026-BLR-0101',
    actorId: 'system_router',
    actorName: 'Smart Routing Engine',
    actorRole: 'system',
    action: 'AUTO_ROUTE_DEPARTMENT',
    details: 'Routed to Municipal Corporation (BBMP) based on municipal road category.'
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 36 * 3600000).toISOString(),
    complaintId: 'JNS-2026-BLR-0101',
    actorId: 'user_dept_head_bbmp',
    actorName: 'Dr. S. N. Balakrishna',
    actorRole: 'department_head',
    action: 'ASSIGN_OFFICER',
    details: 'Assigned complaint to field engineer Er. Priya Sharma (Ward 112).'
  },
  {
    id: 'log-4',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    complaintId: 'JNS-2026-BLR-0102',
    actorId: 'system_sla',
    actorName: 'SLA Watchdog',
    actorRole: 'system',
    action: 'AUTO_ESCALATE_SLA',
    details: 'Ticket JNS-2026-BLR-0102 reached critical 12h threshold without field update. Escalated to supervisor.'
  }
];

// Seed Notifications
const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user_citizen_1',
    title: 'Field Team Dispatched for Your Grievance',
    message: 'Er. Priya Sharma has arrived on site at Indiranagar 100 Feet Road for road repair.',
    complaintId: 'JNS-2026-BLR-0101',
    type: 'status_update',
    isRead: false,
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString()
  },
  {
    id: 'notif-2',
    userId: 'user_citizen_2',
    title: 'Resolution Verification Required',
    message: 'Streetlights repaired on Chamundi Hill Road. Please verify if the problem is solved.',
    complaintId: 'JNS-2026-MYS-0103',
    type: 'verification_request',
    isRead: false,
    createdAt: new Date(Date.now() - 10 * 3600000).toISOString()
  },
  {
    id: 'notif-3',
    userId: 'user_officer_water',
    title: 'Overdue SLA Alert: Koramangala Pipe Burst',
    message: 'Complaint JNS-2026-BLR-0102 has breached critical SLA and was escalated to the supervisor.',
    complaintId: 'JNS-2026-BLR-0102',
    type: 'deadline_alert',
    isRead: false,
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString()
  }
];

class DatabaseManager {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn('Failed reading db.json, re-initializing seeds:', err);
    }

    const initialData: DatabaseSchema = {
      users: SEED_USERS,
      complaints: SEED_COMPLAINTS,
      campaigns: SEED_CAMPAIGNS,
      voiceTopics: SEED_VOICE_TOPICS,
      auditLogs: SEED_AUDIT_LOGS,
      notifications: SEED_NOTIFICATIONS
    };

    this.saveData(initialData);
    return initialData;
  }

  public saveData(dataToSave?: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const data = dataToSave || this.data;
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed writing db.json:', err);
    }
  }

  // Users
  getUsers() { return this.data.users; }
  getUserById(id: string) { return this.data.users.find(u => u.id === id); }
  getUserByEmail(email: string) { return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase()); }
  addUser(user: User) {
    this.data.users.push(user);
    this.saveData();
    return user;
  }

  // Complaints
  getComplaints() { return this.data.complaints; }
  getComplaintById(id: string) {
    return this.data.complaints.find(c => c.id === id || c.trackingNumber === id);
  }

  addComplaint(complaint: Complaint) {
    this.data.complaints.unshift(complaint);
    this.saveData();
    return complaint;
  }

  updateComplaint(id: string, updates: Partial<Complaint>) {
    const index = this.data.complaints.findIndex(c => c.id === id || c.trackingNumber === id);
    if (index === -1) return null;
    this.data.complaints[index] = { ...this.data.complaints[index], ...updates };
    this.saveData();
    return this.data.complaints[index];
  }

  // Duplicate detection algorithm
  findNearbyDuplicates(categoryId: string, subcategoryId: string, district: string, taluk: string, ward: string) {
    return this.data.complaints.filter(c => {
      // Must be open or in-progress
      const isNotClosed = c.status !== 'successfully_closed' && c.status !== 'rejected';
      if (!isNotClosed) return false;

      // Same category or subcategory
      const categoryMatch = c.categoryId === categoryId || c.subcategoryId === subcategoryId;
      if (!categoryMatch) return false;

      // Location match
      const districtMatch = c.location.district.toLowerCase() === district.toLowerCase();
      const talukMatch = c.location.taluk.toLowerCase() === taluk.toLowerCase();
      const wardMatch = ward && c.location.wardOrZone.toLowerCase().includes(ward.toLowerCase());

      return districtMatch && (talukMatch || wardMatch);
    });
  }

  // Audit Logs
  getAuditLogs() { return this.data.auditLogs; }
  addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>) {
    const entry: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...log
    };
    this.data.auditLogs.unshift(entry);
    this.saveData();
    return entry;
  }

  // Notifications
  getNotifications(userId: string) {
    return this.data.notifications.filter(n => n.userId === userId);
  }

  addNotification(notif: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) {
    const entry: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      isRead: false,
      ...notif
    };
    this.data.notifications.unshift(entry);
    this.saveData();
    return entry;
  }

  markNotificationRead(id: string) {
    const n = this.data.notifications.find(item => item.id === id);
    if (n) {
      n.isRead = true;
      this.saveData();
    }
    return n;
  }

  // Campaigns
  getCampaigns() { return this.data.campaigns; }
  joinCampaign(campaignId: string, userId: string) {
    const camp = this.data.campaigns.find(c => c.id === campaignId);
    if (camp && !camp.joinedUserIds.includes(userId)) {
      camp.joinedUserIds.push(userId);
      camp.participantCount += 1;
      this.saveData();
    }
    return camp;
  }

  // Voice topics
  getVoiceTopics() { return this.data.voiceTopics; }
  addVoiceTopic(topic: Omit<VoiceTopic, 'id' | 'createdAt' | 'upvotes' | 'upvotedByUserIds'>) {
    const newTopic: VoiceTopic = {
      id: `voice-${Date.now()}`,
      createdAt: new Date().toISOString(),
      upvotes: 1,
      upvotedByUserIds: [],
      ...topic
    };
    this.data.voiceTopics.unshift(newTopic);
    this.saveData();
    return newTopic;
  }

  upvoteVoiceTopic(topicId: string, userId: string) {
    const topic = this.data.voiceTopics.find(t => t.id === topicId);
    if (topic && !topic.upvotedByUserIds.includes(userId)) {
      topic.upvotedByUserIds.push(userId);
      topic.upvotes += 1;
      this.saveData();
    }
    return topic;
  }

  // Support complaint
  supportComplaint(complaintId: string, userId: string) {
    const complaint = this.getComplaintById(complaintId);
    if (complaint && !complaint.supportedByUserIds.includes(userId)) {
      complaint.supportedByUserIds.push(userId);
      complaint.supportCount += 1;
      this.saveData();
    }
    return complaint;
  }
}

export const db = new DatabaseManager();
