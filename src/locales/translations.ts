export type SupportedLanguage = 'en' | 'kn' | 'hi';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  subTagline: string;
  reportProblem: string;
  trackComplaint: string;
  publicDashboard: string;
  departments: string;
  community: string;
  voiceOfCommunity: string;
  login: string;
  register: string;
  logout: string;
  home: string;
  about: string;
  howItWorks: string;
  
  // 5 Core Questions
  q1Title: string;
  q1Desc: string;
  q2Title: string;
  q2Desc: string;
  q3Title: string;
  q3Desc: string;
  q4Title: string;
  q4Desc: string;
  q5Title: string;
  q5Desc: string;
  
  // Complaint Form
  formTitle: string;
  titleLabel: string;
  descLabel: string;
  categoryLabel: string;
  subcategoryLabel: string;
  districtLabel: string;
  talukLabel: string;
  wardLabel: string;
  addressLabel: string;
  pincodeLabel: string;
  gpsDetect: string;
  gpsDetecting: string;
  uploadPhoto: string;
  anonymousToggle: string;
  anonymousHelp: string;
  submitButton: string;
  duplicateWarningTitle: string;
  duplicateWarningDesc: string;
  joinExistingButton: string;
  
  // Statuses
  statusSubmitted: string;
  statusUnderReview: string;
  statusAssignedDept: string;
  statusAssignedOfficer: string;
  statusWorkInProgress: string;
  statusWaitingInfo: string;
  statusResolvedAwaitingVerification: string;
  statusClosed: string;
  statusReopened: string;
  statusRejected: string;
  
  // Roles
  roleCitizen: string;
  roleOfficer: string;
  roleDeptHead: string;
  roleSuperAdmin: string;
  
  // Actions
  viewDetails: string;
  verifyResolution: string;
  reopenComplaint: string;
  rateExperience: string;
  uploadEvidence: string;
  assignOfficer: string;
  escalateComplaint: string;
  exportReport: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'JANASEVA',
    tagline: 'Your Voice. Your Community. Your Solution.',
    subTagline: 'Report public problems, reach the right authorities and track real solutions. Together, let\'s build a better society.',
    reportProblem: 'Report a Problem',
    trackComplaint: 'Track Complaint',
    publicDashboard: 'Public Dashboard',
    departments: 'Departments',
    community: 'Community',
    voiceOfCommunity: 'Voice of the Community',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    home: 'Home',
    about: 'About Janaseva',
    howItWorks: 'How It Works',
    
    q1Title: '1. What is the problem in society?',
    q1Desc: 'Accurately categorized citizen grievance with photos, GPS coordinates and street landmarks.',
    q2Title: '2. Who is responsible for solving it?',
    q2Desc: 'Assigned to a specific verified government field engineer with designated accountability.',
    q3Title: '3. Which department should receive it?',
    q3Desc: 'Smart algorithmic jurisdiction routing based on asset type, road class and local municipality.',
    q4Title: '4. What action has been taken?',
    q4Desc: 'Transparent action taken reports with material records, work timeline and physical proof.',
    q5Title: '5. Is the problem actually solved?',
    q5Desc: 'Citizen verification required. No ticket is closed merely because an officer clicks resolve.',
    
    formTitle: 'Submit a Public Grievance',
    titleLabel: 'Problem Headline',
    descLabel: 'Detailed Description',
    categoryLabel: 'Problem Category',
    subcategoryLabel: 'Specific Issue',
    districtLabel: 'District',
    talukLabel: 'Taluk',
    wardLabel: 'Ward / Village / Area',
    addressLabel: 'Street Address & Landmark',
    pincodeLabel: 'PIN Code',
    gpsDetect: 'Auto-Detect via GPS',
    gpsDetecting: 'Acquiring GPS coordinates...',
    uploadPhoto: 'Attach Problem Photograph',
    anonymousToggle: 'Report Anonymously',
    anonymousHelp: 'Your name & phone will be concealed from public views and only visible to authorized supervisory officers.',
    submitButton: 'Submit Complaint',
    duplicateWarningTitle: 'Potential Duplicate Issue Detected Nearby',
    duplicateWarningDesc: 'Other citizens in your ward have already reported a similar problem. You can join their ticket to boost priority!',
    joinExistingButton: 'Support & Boost Existing Ticket',
    
    statusSubmitted: 'Submitted',
    statusUnderReview: 'Under Review',
    statusAssignedDept: 'Assigned to Department',
    statusAssignedOfficer: 'Assigned to Officer',
    statusWorkInProgress: 'Work in Progress',
    statusWaitingInfo: 'Waiting for Information',
    statusResolvedAwaitingVerification: 'Resolved – Awaiting Verification',
    statusClosed: 'Successfully Closed',
    statusReopened: 'Reopened by Citizen',
    statusRejected: 'Rejected with Reason',
    
    roleCitizen: 'Citizen',
    roleOfficer: 'Government Officer',
    roleDeptHead: 'Department Head',
    roleSuperAdmin: 'Super Administrator',
    
    viewDetails: 'View Case Sheet',
    verifyResolution: 'Confirm Solved',
    reopenComplaint: 'Reopen (Not Solved)',
    rateExperience: 'Rate Resolution',
    uploadEvidence: 'Submit Work Proof',
    assignOfficer: 'Assign Field Officer',
    escalateComplaint: 'Escalate to Supervisor',
    exportReport: 'Export PDF / Excel',
  },
  
  kn: {
    appName: 'ಜನಸೇವಾ (JANASEVA)',
    tagline: 'ನಿಮ್ಮ ಧ್ವನಿ. ನಿಮ್ಮ ಸಮುದಾಯ. ನಿಮ್ಮ ಪರಿಹಾರ.',
    subTagline: 'ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ, ಸರಿಯಾದ ಇಲಾಖೆಯನ್ನು ತಲುಪಿಸಿ, ನೈಜ ಪರಿಹಾರಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ. ಒಟ್ಟಾಗಿ ಉತ್ತಮ ಸಮಾಜವನ್ನು ನಿರ್ಮಿಸೋಣ.',
    reportProblem: 'ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ',
    trackComplaint: 'ದೂರು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    publicDashboard: 'ಸಾರ್ವಜನಿಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    departments: 'ಇಲಾಖೆಗಳು',
    community: 'ಸಮುದಾಯ ವೇದಿಕೆ',
    voiceOfCommunity: 'ಸಮುದಾಯದ ಧ್ವನಿ',
    login: 'ಲಾಗಿನ್',
    register: 'ನೋಂದಣಿ',
    logout: 'ನಿರ್ಗಮಿಸಿ',
    home: 'ಮುಖಪುಟ',
    about: 'ಜನಸೇವಾ ಕುರಿತು',
    howItWorks: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    
    q1Title: '೧. ಸಮಾಜದಲ್ಲಿರುವ ಸಮಸ್ಯೆ ಏನು?',
    q1Desc: 'ಫೋಟೋ, ಜಿಪಿಎಸ್ ಸ್ಥಳ ಮತ್ತು ವಿವರವಾದ ಸಾಕ್ಷಿಯೊಂದಿಗೆ ದಾಖಲಿಸಲಾದ ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆ.',
    q2Title: '೨. ಇದನ್ನು ಪರಿಹರಿಸಲು ಯಾರು ಜವಾಬ್ದಾರರು?',
    q2Desc: 'ನಿರ್ದಿಷ್ಟ ವಾರ್ಡ್ ಅಧಿಕಾರಿಗೆ ವೈಯಕ್ತಿಕ ಹೊಣೆಗಾರಿಕೆಯೊಂದಿಗೆ ನಿಯೋಜನೆ.',
    q3Title: '೩. ಯಾವ ಇಲಾಖೆಗೆ ದೂರು ಹೋಗಬೇಕು?',
    q3Desc: 'ಬುದ್ಧಿವಂತ ಸ್ವಯಂಚಾಲಿತ ರೂಟಿಂಗ್ ಮೂಲಕ ಸರಿಯಾದ ಸರ್ಕಾರಿ ಇಲಾಖೆಗೆ ನಿಯೋಜನೆ.',
    q4Title: '೪. ಏನು ಕ್ರಮ ಕೈಗೊಳ್ಳಲಾಗಿದೆ?',
    q4Desc: 'ಕೆಲಸದ ವಿವರ, ಬಳಸಿದ ಸಾಮಗ್ರಿಗಳು ಮತ್ತು ಫೋಟೋ ಸಾಕ್ಷಿಯೊಂದಿಗೆ ಪಾರದರ್ಶಕ ವರದಿ.',
    q5Title: '೫. ಸಮಸ್ಯೆ ನಿಜವಾಗಿಯೂ ಪರಿಹಾರವಾಗಿದೆಯೇ?',
    q5Desc: 'ನಾಗರಿಕರ ಒಪ್ಪಿಗೆ ಕಡ್ಡಾಯ. ಕೇವಲ ಗುಂಡಿ ಒತ್ತುವುದರಿಂದ ದೂರು ಮುಕ್ತಾಯವಾಗುವುದಿಲ್ಲ.',
    
    formTitle: 'ಸಾರ್ವಜನಿಕ ದೂರು ಸಲ್ಲಿಸಿ',
    titleLabel: 'ಸಮಸ್ಯೆಯ ಶೀರ್ಷಿಕೆ',
    descLabel: 'ವಿವರವಾದ ವಿವರಣೆ',
    categoryLabel: 'ಸಮಸ್ಯೆಯ ವರ್ಗ',
    subcategoryLabel: 'ನಿರ್ದಿಷ್ಟ ತೊಂದರೆ',
    districtLabel: 'ಜಿಲ್ಲೆ',
    talukLabel: 'ತಾಲೂಕು',
    wardLabel: 'ವಾರ್ಡ್ / ಗ್ರಾಮ / ಬಡಾವಣೆ',
    addressLabel: 'ರಸ್ತೆ ವಿಳಾಸ ಮತ್ತು ಗುರುತು',
    pincodeLabel: 'ಪಿನ್ ಕೋಡ್',
    gpsDetect: 'ಜಿಪಿಎಸ್ ಮೂಲಕ ಪತ್ತೆಹಚ್ಚಿ',
    gpsDetecting: 'ಜಿಪಿಎಸ್ ಸ್ಥಳ ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
    uploadPhoto: 'ಸಮಸ್ಯೆಯ ಫೋಟೋ ಲಗತ್ತಿಸಿ',
    anonymousToggle: 'ಅನಾಮಧೇಯವಾಗಿ ವರದಿ ಮಾಡಿ',
    anonymousHelp: 'ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಫೋನ್ ಸಾರ್ವಜನಿಕರಿಗೆ ಕಾಣಿಸುವುದಿಲ್ಲ.',
    submitButton: 'ದೂರು ಸಲ್ಲಿಸಿ',
    duplicateWarningTitle: 'ಇದೇ ರೀತಿಯ ದೂರು ಈಗಾಗಲೇ ದಾಖಲಾಗಿದೆ',
    duplicateWarningDesc: 'ನಿಮ್ಮ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಇತರ ನಾಗರಿಕರು ಇದೇ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿದ್ದಾರೆ. ನಿಮ್ಮ ಬೆಂಬಲ ನೀಡಿ ಪ್ರಾಮುಖ್ಯತೆ ಹೆಚ್ಚಿಸಿ!',
    joinExistingButton: 'ಹಾಲಿ ದೂರಿಗೆ ಬೆಂಬಲ ನೀಡಿ',
    
    statusSubmitted: 'ಸಲ್ಲಿಸಲಾಗಿದೆ',
    statusUnderReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',
    statusAssignedDept: 'ಇಲಾಖೆಗೆ ನಿಯೋಜಿಸಲಾಗಿದೆ',
    statusAssignedOfficer: 'ಅಧಿಕಾರಿಗೆ ನಿಯೋಜಿಸಲಾಗಿದೆ',
    statusWorkInProgress: 'ಕೆಲಸ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    statusWaitingInfo: 'ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ',
    statusResolvedAwaitingVerification: 'ಪರಿಹರಿಸಲಾಗಿದೆ – ನಾಗರಿಕರ ಪರಿಶೀಲನೆ ಬಾಕಿ',
    statusClosed: 'ಯಶಸ್ವಿಯಾಗಿ ಮುಕ್ತಾಯಗೊಂಡಿದೆ',
    statusReopened: 'ನಾಗರಿಕರಿಂದ ಮರುತೆರೆಯಲಾಗಿದೆ',
    statusRejected: 'ಕಾರಣ ಸಹಿತ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ',
    
    roleCitizen: 'ನಾಗರಿಕರು',
    roleOfficer: 'ಸರ್ಕಾರಿ ಅಧಿಕಾರಿ',
    roleDeptHead: 'ಇಲಾಖಾ ಮುಖ್ಯಸ್ಥರು',
    roleSuperAdmin: 'ಸೂಪರ್ ಅಡ್ಮಿನ್',
    
    viewDetails: 'ವಿವರ ನೋಡಿ',
    verifyResolution: 'ಪರಿಹಾರ ದೃಢೀಕರಿಸಿ',
    reopenComplaint: 'ಮರುತೆರೆಯಿರಿ (ಪರಿಹಾರವಾಗಿಲ್ಲ)',
    rateExperience: 'ರೇಟಿಂಗ್ ನೀಡಿ',
    uploadEvidence: 'ಕೆಲಸದ ಸಾಕ್ಷ್ಯ ಸಲ್ಲಿಸಿ',
    assignOfficer: 'ಅಧಿಕಾರಿಯನ್ನು ನಿಯೋಜಿಸಿ',
    escalateComplaint: 'ಮೇಲಧಿಕಾರಿಗೆ ವರ್ಗಾಯಿಸಿ',
    exportReport: 'ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
  },
  
  hi: {
    appName: 'जनसेवा (JANASEVA)',
    tagline: 'आपकी आवाज़। आपका समुदाय। आपका समाधान।',
    subTagline: 'सार्वजनिक समस्याओं की रिपोर्ट करें, सही विभागों तक पहुंचें और वास्तविक समाधान ट्रैक करें। आइए मिलकर बेहतर समाज बनाएं।',
    reportProblem: 'समस्या दर्ज करें',
    trackComplaint: 'शिकायत ट्रैक करें',
    publicDashboard: 'सार्वजनिक डैशबोर्ड',
    departments: 'विभाग',
    community: 'सामुदायिक मंच',
    voiceOfCommunity: 'जनता की आवाज़',
    login: 'लॉग इन',
    register: 'पंजीकरण',
    logout: 'लॉग आउट',
    home: 'होम',
    about: 'जनसेवा के बारे में',
    howItWorks: 'यह कैसे काम करता है',
    
    q1Title: '१. समाज में समस्या क्या है?',
    q1Desc: 'फोटो, जीपीएस लोकेशन और सटीक विवरण के साथ दर्ज की गई नागरिक शिकायत।',
    q2Title: '२. इसे हल करने के लिए कौन जिम्मेदार है?',
    q2Desc: 'सत्यापित सरकारी अधिकारी और फील्ड इंजीनियर को जवाबदेही के साथ कार्य सौंपा जाता है।',
    q3Title: '३. शिकायत किस विभाग को मिलनी चाहिए?',
    q3Desc: 'सटीक स्मार्ट रूटिंग नियमों द्वारा सीधे संबंधित सरकारी विभाग को प्रेषित।',
    q4Title: '४. क्या कार्रवाई की गई है?',
    q4Desc: 'सामग्री विवरण, समयसीमा और काम के बाद की फोटो साक्ष्य के साथ पारदर्शी रिपोर्ट।',
    q5Title: '५. क्या समस्या वास्तव में हल हो गई है?',
    q5Desc: 'नागरिक सत्यापन अनिवार्य है। केवल बटन दबाने से कोई शिकायत बंद नहीं मानी जाती।',
    
    formTitle: 'सार्वजनिक शिकायत दर्ज करें',
    titleLabel: 'समस्या का शीर्षक',
    descLabel: 'विस्तृत विवरण',
    categoryLabel: 'समस्या की श्रेणी',
    subcategoryLabel: 'विशिष्ट समस्या',
    districtLabel: 'जिला',
    talukLabel: 'तालुका',
    wardLabel: 'वार्ड / गांव / क्षेत्र',
    addressLabel: 'सड़क का पता व लैंडमार्क',
    pincodeLabel: 'पिन कोड',
    gpsDetect: 'जीपीएस से स्वतः पहचानें',
    gpsDetecting: 'जीपीएस लोकेशन प्राप्त हो रही है...',
    uploadPhoto: 'समस्या की फोटो संलग्न करें',
    anonymousToggle: 'गोपनीय (अनाम) रूप से दर्ज करें',
    anonymousHelp: 'आपका नाम और फोन नंबर सार्वजनिक रूप से छुपाया जाएगा।',
    submitButton: 'शिकायत सबमिट करें',
    duplicateWarningTitle: 'निकटवर्ती समान शिकायत का पता चला',
    duplicateWarningDesc: 'आपके वार्ड में पहले से ही एक मिलती-जुलती शिकायत दर्ज है। प्राथमिकता बढ़ाने के लिए आप उससे जुड़ सकते हैं!',
    joinExistingButton: 'मौजूदा शिकायत का समर्थन करें',
    
    statusSubmitted: 'दर्ज की गई',
    statusUnderReview: 'समीक्षाधीन',
    statusAssignedDept: 'विभाग को सौंपा गया',
    statusAssignedOfficer: 'अधिकारी को सौंपा गया',
    statusWorkInProgress: 'कार्य प्रगति पर है',
    statusWaitingInfo: 'अतिरिक्त जानकारी की प्रतीक्षा',
    statusResolvedAwaitingVerification: 'निस्तारित – नागरिक सत्यापन प्रतीक्षित',
    statusClosed: 'सफलतापूर्वक बंद',
    statusReopened: 'नागरिक द्वारा पुनः खोला गया',
    statusRejected: 'कारण सहित अस्वीकृत',
    
    roleCitizen: 'नागरिक',
    roleOfficer: 'सरकारी अधिकारी',
    roleDeptHead: 'विभागाध्यक्ष',
    roleSuperAdmin: 'सुपर एडमिन',
    
    viewDetails: 'विवरण देखें',
    verifyResolution: 'समाधान की पुष्टि करें',
    reopenComplaint: 'पुनः खोलें (हल नहीं हुआ)',
    rateExperience: 'रेटिंग दें',
    uploadEvidence: 'कार्य साक्ष्य प्रस्तुत करें',
    assignOfficer: 'फील्ड अधिकारी नियुक्त करें',
    escalateComplaint: 'वरिष्ठ अधिकारी को भेजें',
    exportReport: 'रिपोर्ट डाउनलोड करें',
  }
};
