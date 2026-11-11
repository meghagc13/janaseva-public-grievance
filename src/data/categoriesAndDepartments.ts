import { Department, ComplaintCategory, PriorityLevel } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept_municipal',
    name: 'Municipal Corporation (BBMP / City Corporations)',
    shortCode: 'BBMP/ULB',
    nameKn: 'ಮಹಾನಗರ ಪಾಲಿಕೆ (ಬಿಬಿಎಂಪಿ / ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆಗಳು)',
    nameHi: 'नगर निगम (बीबीएमपी / शहरी स्थानीय निकाय)',
    categoryIds: ['cat_road_infra', 'cat_sanitation', 'cat_electricity', 'cat_public_safety'],
    description: 'Responsible for civic administration, city roads, footpaths, local drainage, street lighting and urban municipal services.',
    nodalOfficer: 'Joint Commissioner (Civic Works & Redressal)',
    contactEmail: 'grievance@bbmp.gov.in',
    helpline: '1533',
    slaHoursStandard: 72,
    slaHoursCritical: 24,
  },
  {
    id: 'dept_pwd',
    name: 'Public Works Department (PWD)',
    shortCode: 'PWD',
    nameKn: 'ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆ (ಪಿ.ಡಬ್ಲ್ಯೂ.ಡಿ)',
    nameHi: 'लोक निर्माण विभाग (पीडब्ल्यूडी)',
    categoryIds: ['cat_road_infra'],
    description: 'Maintains state highways, major arterial roads, bridges, flyovers and public government buildings.',
    nodalOfficer: 'Chief Engineer (Communications & Buildings)',
    contactEmail: 'feedback.pwd@karnataka.gov.in',
    helpline: '1800-425-7930',
    slaHoursStandard: 96,
    slaHoursCritical: 36,
  },
  {
    id: 'dept_water',
    name: 'Water Supply & Sewerage Board (BWSSB / KUWSDB)',
    shortCode: 'BWSSB/WATER',
    nameKn: 'ಜಲಮಂಡಳಿ ಮತ್ತು ಒಳಚರಂಡಿ ಇಲಾಖೆ (ಬಿಡಬ್ಲ್ಯೂಎಸ್‌ಎಸ್‌ಬಿ)',
    nameHi: 'जल आपूर्ति एवं सीवरेज बोर्ड (बीडब्ल्यूएसएसबी)',
    categoryIds: ['cat_water'],
    description: 'Provides piped drinking water, manages water supply pipelines, sewerage lines and wastewater treatment.',
    nodalOfficer: 'Executive Engineer (Water Network Operations)',
    contactEmail: 'complaints@bwssb.gov.in',
    helpline: '1916',
    slaHoursStandard: 48,
    slaHoursCritical: 12,
  },
  {
    id: 'dept_electricity',
    name: 'Electricity Supply Company (BESCOM / ESCOMs)',
    shortCode: 'BESCOM/ESCOM',
    nameKn: 'ವಿದ್ಯುತ್ ಸರಬರಾಜು ಕಂಪನಿ (ಬೆಸ್ಕಾಂ / ಎಸ್ಕಾಂಗಳು)',
    nameHi: 'विद्युत आपूर्ति निगम (बेस्कॉम / एस्कॉम)',
    categoryIds: ['cat_electricity'],
    description: 'Manages high/low-tension power distribution, electric transformers, poles, street lighting feeds, and prevents electrical hazards.',
    nodalOfficer: 'Superintending Engineer (Operations & Maintenance)',
    contactEmail: 'helpline@bescom.co.in',
    helpline: '1912',
    slaHoursStandard: 24,
    slaHoursCritical: 6,
  },
  {
    id: 'dept_police',
    name: 'Police Department & Traffic Division',
    shortCode: 'POLICE',
    nameKn: 'ಪೊಲೀಸ್ ಮತ್ತು ಸಂಚಾರ ವಿಭಾಗ',
    nameHi: 'पुलिस एवं यातायात प्रभाग',
    categoryIds: ['cat_public_safety'],
    description: 'Maintains public law and order, manages traffic signal infrastructure, and addresses public nuisance or dangerous zones.',
    nodalOfficer: 'Deputy Commissioner of Police (Traffic & Grievances)',
    contactEmail: 'trafficpolice@karnataka.gov.in',
    helpline: '112',
    slaHoursStandard: 24,
    slaHoursCritical: 4,
  },
  {
    id: 'dept_health',
    name: 'Health & Family Welfare Department',
    shortCode: 'HEALTH',
    nameKn: 'ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಇಲಾಖೆ',
    nameHi: 'स्वास्थ्य एवं परिवार कल्याण विभाग',
    categoryIds: ['cat_health'],
    description: 'Oversees government general hospitals, primary health centers (PHCs), essential drug availability and public health hygiene.',
    nodalOfficer: 'District Health Officer (DHO)',
    contactEmail: 'healthgrievance@karnataka.gov.in',
    helpline: '104',
    slaHoursStandard: 48,
    slaHoursCritical: 12,
  },
  {
    id: 'dept_education',
    name: 'Primary & Secondary Education Department',
    shortCode: 'EDUCATION',
    nameKn: 'ಶಾಲಾ ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಕ್ಷರತಾ ಇಲಾಖೆ',
    nameHi: 'स्कूली शिक्षा एवं साक्षरता विभाग',
    categoryIds: ['cat_education'],
    description: 'Manages government school buildings, school sanitation/toilets, clean drinking water for students and classroom safety.',
    nodalOfficer: 'Deputy Director of Public Instruction (DDPI)',
    contactEmail: 'education.grievance@karnataka.gov.in',
    helpline: '080-22214352',
    slaHoursStandard: 120,
    slaHoursCritical: 48,
  },
  {
    id: 'dept_transport',
    name: 'Transport Department (KSRTC / BMTC)',
    shortCode: 'TRANSPORT',
    nameKn: 'ಸಾರಿಗೆ ಇಲಾಖೆ (ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ / ಬಿ.ಎಂ.ಟಿ.ಸಿ)',
    nameHi: 'परिवहन विभाग (केएसआरटीसी / बीएमटीसी)',
    categoryIds: ['cat_transport'],
    description: 'Maintains public bus shelters, bus terminals, public transit fleet facilities and commuter infrastructure.',
    nodalOfficer: 'Chief Traffic Manager (Public Grievance)',
    contactEmail: 'trans-grievance@karnataka.gov.in',
    helpline: '149',
    slaHoursStandard: 72,
    slaHoursCritical: 24,
  },
  {
    id: 'dept_sanitation',
    name: 'Sanitation & Solid Waste Management',
    shortCode: 'SWM',
    nameKn: 'ಘನತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ ಮತ್ತು ನೈರ್ಮಲ್ಯ ಇಲಾಖೆ',
    nameHi: 'स्वच्छता एवं ठोस अपशिष्ट प्रबंधन',
    categoryIds: ['cat_sanitation'],
    description: 'Coordinates doorstep garbage collection, commercial waste clearance, public dustbins, and community toilet sanitation.',
    nodalOfficer: 'Superintending Engineer (Solid Waste Management)',
    contactEmail: 'swm-support@karnataka.gov.in',
    helpline: '1533',
    slaHoursStandard: 24,
    slaHoursCritical: 8,
  },
  {
    id: 'dept_environment',
    name: 'Forest, Ecology & Environment Department (KSPCB)',
    shortCode: 'KSPCB/ENV',
    nameKn: 'ಅರಣ್ಯ, ಪರಿಸರ ಮತ್ತು ಪರಿಸರ ಮಾಲಿನ್ಯ ನಿಯಂತ್ರಣ ಮಂಡಳಿ',
    nameHi: 'वन, पर्यावरण एवं प्रदूषण नियंत्रण बोर्ड',
    categoryIds: ['cat_environment'],
    description: 'Monitors air/water/noise pollution, unauthorized tree cutting, illegal industrial discharge and environmental degradation.',
    nodalOfficer: 'Member Secretary (Karnataka State Pollution Control Board)',
    contactEmail: 'chairman@kspcb.gov.in',
    helpline: '080-25589112',
    slaHoursStandard: 72,
    slaHoursCritical: 24,
  },
  {
    id: 'dept_rdpr',
    name: 'Rural Development & Panchayat Raj (RDPR)',
    shortCode: 'RDPR',
    nameKn: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ ಇಲಾಖೆ',
    nameHi: 'ग्रामीण विकास एवं पंचायती राज विभाग',
    categoryIds: ['cat_rural_development', 'cat_water', 'cat_road_infra'],
    description: 'Administers Gram Panchayat services, village roads, rural drinking water and rural public facilities across Karnataka villages.',
    nodalOfficer: 'Chief Executive Officer (Zilla Panchayat)',
    contactEmail: 'rdpr-helpline@karnataka.gov.in',
    helpline: '1800-425-8666',
    slaHoursStandard: 96,
    slaHoursCritical: 36,
  },
  {
    id: 'dept_women_child',
    name: 'Women & Child Development Department',
    shortCode: 'WCD',
    nameKn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಇಲಾಖೆ',
    nameHi: 'महिला एवं बाल विकास विभाग',
    categoryIds: ['cat_women_child'],
    description: 'Manages Anganwadi infrastructure, child welfare centers and safety amenities for women and children in public spheres.',
    nodalOfficer: 'Director (Women & Child Welfare Karnataka)',
    contactEmail: 'wcd-grievances@karnataka.gov.in',
    helpline: '181',
    slaHoursStandard: 48,
    slaHoursCritical: 12,
  },
  {
    id: 'dept_food_civil',
    name: 'Food and Civil Supplies Department',
    shortCode: 'FOOD',
    nameKn: 'ಆಹಾರ, ನಾಗರಿಕ ಸರಬರಾಜು ಮತ್ತು ಗ್ರಾಹಕರ ವ್ಯವಹಾರಗಳ ಇಲಾಖೆ',
    nameHi: 'खाद्य एवं नागरिक आपूर्ति विभाग',
    categoryIds: ['cat_food_civil'],
    description: 'Monitors Public Distribution System (PDS) ration shops, fair price depots, foodgrain quality and fair trade practices.',
    nodalOfficer: 'Joint Director (Public Distribution & Vigilance)',
    contactEmail: 'food-supplies@karnataka.gov.in',
    helpline: '1967',
    slaHoursStandard: 72,
    slaHoursCritical: 24,
  },
  {
    id: 'dept_revenue',
    name: 'Revenue & Land Records Department',
    shortCode: 'REVENUE',
    nameKn: 'ಕಂದಾಯ ಇಲಾಖೆ (ಭೂ ದಾಖಲೆಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಆಸ್ತಿ ರಕ್ಷಣೆ)',
    nameHi: 'राजस्व विभाग (भूमि अभिलेख एवं सार्वजनिक संपत्ति)',
    categoryIds: ['cat_revenue_land'],
    description: 'Prevents illegal encroachment on public lands, storm water drains (Rajakaluve), lake buffer zones and government spaces.',
    nodalOfficer: 'Tahasildar / Assistant Commissioner (Revenue)',
    contactEmail: 'revenue-redressal@karnataka.gov.in',
    helpline: '080-22238477',
    slaHoursStandard: 120,
    slaHoursCritical: 48,
  }
];

export const PROBLEM_CATEGORIES: ComplaintCategory[] = [
  {
    id: 'cat_road_infra',
    name: 'Road and Infrastructure',
    nameKn: 'ರಸ್ತೆ ಮತ್ತು ಮೂಲಸೌಕರ್ಯ',
    nameHi: 'सड़क एवं बुनियादी ढांचा',
    icon: 'Hammer',
    defaultDepartmentId: 'dept_municipal',
    subcategories: [
      {
        id: 'sub_potholes',
        name: 'Potholes / Broken Asphalt',
        nameKn: 'ಗುಂಡಿಗಳು / ಕಿತ್ತುಹೋದ ರಸ್ತೆ',
        nameHi: 'गड्ढे / टूटी हुई सड़क',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_municipal'
      },
      {
        id: 'sub_broken_roads',
        name: 'Unpaved / Severely Broken Road',
        nameKn: 'ಹಾಳಾದ ಮುಖ್ಯ ರಸ್ತೆ',
        nameHi: 'गंभीर रूप से क्षतिग्रस्त सड़क',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_pwd'
      },
      {
        id: 'sub_footpaths',
        name: 'Damaged or Missing Footpath',
        nameKn: 'ಹಾಳಾದ ಪಾದಚಾರಿ ಮಾರ್ಗ',
        nameHi: 'टूटा हुआ फुटपाथ',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_municipal'
      },
      {
        id: 'sub_bridges',
        name: 'Damaged Bridge / Culvert',
        nameKn: 'ಹಾಳಾದ ಸೇತುವೆ / ಕಲ್ವರ್ಟ್',
        nameHi: 'टूटा हुआ पुल / पुलिया',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_pwd'
      },
      {
        id: 'sub_road_signs',
        name: 'Missing Road Signs / Caution Boards',
        nameKn: 'ರಸ್ತೆ ಸೂಚನಾ ಫಲಕಗಳ ಕೊರತೆ',
        nameHi: 'सड़क संकेतकों की कमी',
        defaultPriority: 'low',
        suggestedDeptId: 'dept_municipal'
      }
    ]
  },
  {
    id: 'cat_water',
    name: 'Water Problems',
    nameKn: 'ಕುಡಿಯುವ ನೀರು ಮತ್ತು ಒಳಚರಂಡಿ',
    nameHi: 'पेयजल एवं सीवर समस्याएं',
    icon: 'Droplets',
    defaultDepartmentId: 'dept_water',
    subcategories: [
      {
        id: 'sub_water_leakage',
        name: 'Water Pipe Leakage on Public Road',
        nameKn: 'ಮುಖ್ಯ ಪೈಪ್‌ಲೈನ್ ನೀರಿನ ಸೋರಿಕೆ',
        nameHi: 'सड़क पर पाइप से पानी का रिसाव',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_water'
      },
      {
        id: 'sub_no_drinking_water',
        name: 'No Drinking Water Supply',
        nameKn: 'ಕುಡಿಯುವ ನೀರು ಸರಬರಾಜು ಇಲ್ಲದಿರುವುದು',
        nameHi: 'पीने के पानी की आपूर्ति न होना',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_water'
      },
      {
        id: 'sub_contaminated_water',
        name: 'Contaminated / Muddy Water Supply',
        nameKn: 'ಕಲುಷಿತ ಅಥವಾ ಮಣ್ಣಿನ ನೀರು',
        nameHi: 'दूषित / गंदा पेयजल',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_water'
      },
      {
        id: 'sub_broken_pipelines',
        name: 'Burst Water Pipeline',
        nameKn: 'ಒಡೆದ ನೀರಿನ ಪೈಪ್‌ಲೈನ್',
        nameHi: 'फटी हुई पानी की पाइपलाइन',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_water'
      },
      {
        id: 'sub_irregular_supply',
        name: 'Irregular Water Supply Timing',
        nameKn: 'ಅನಿಯಮಿತ ನೀರು ಸರಬರಾಜು',
        nameHi: 'अनियमित जलापूर्ति',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_water'
      }
    ]
  },
  {
    id: 'cat_sanitation',
    name: 'Sanitation and Garbage',
    nameKn: 'ಘನತ್ಯಾಜ್ಯ ಮತ್ತು ನೈರ್ಮಲ್ಯ',
    nameHi: 'स्वच्छता एवं कचरा प्रबंधन',
    icon: 'Trash2',
    defaultDepartmentId: 'dept_sanitation',
    subcategories: [
      {
        id: 'sub_garbage_uncollected',
        name: 'Garbage Not Collected for Days',
        nameKn: 'ಕಸ ಸಂಗ್ರಹಿಸದೇ ಇರುವುದು',
        nameHi: 'कई दिनों से कचरा न उठना',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_sanitation'
      },
      {
        id: 'sub_overflow_dustbins',
        name: 'Overflowing Public Dustbins',
        nameKn: 'ತುಂಬಿ ಹರಿಯುತ್ತಿರುವ ಸಾರ್ವಜನಿಕ ಕಸದ ತೊಟ್ಟಿಗಳು',
        nameHi: 'सड़क पर खुले में कचरा फैलना',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_sanitation'
      },
      {
        id: 'sub_open_drainage',
        name: 'Open Drainage / Clogged Storm Drain',
        nameKn: 'ತೆರೆದ ರಾಜಕಾಲುವೆ / ಚರಂಡಿ ಕಟ್ಟಿಕೊಂಡಿರುವುದು',
        nameHi: 'खुली या चोक नाली',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_municipal'
      },
      {
        id: 'sub_sewage_overflow',
        name: 'Sewage Overflowing on Road',
        nameKn: 'ರಸ್ತೆಯಲ್ಲಿ ಕೊಳಚೆ ನೀರು ಹರಿಯುತ್ತಿರುವುದು',
        nameHi: 'सड़क पर सीवर का पानी बहना',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_water'
      },
      {
        id: 'sub_public_toilet',
        name: 'Public Toilet Poor Maintenance',
        nameKn: 'ಸಾರ್ವಜನಿಕ ಶೌಚಾಲಯದ ಅಸ್ವಚ್ಛತೆ',
        nameHi: 'सार्वजनिक शौचालय की बदहाली',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_sanitation'
      }
    ]
  },
  {
    id: 'cat_electricity',
    name: 'Electricity & Street Lighting',
    nameKn: 'ವಿದ್ಯುತ್ ಮತ್ತು ಬೀದಿ ದೀಪಗಳು',
    nameHi: 'बिजली एवं स्ट्रीट लाइट',
    icon: 'Zap',
    defaultDepartmentId: 'dept_electricity',
    subcategories: [
      {
        id: 'sub_streetlights',
        name: 'Streetlights Not Working / Dark Stretch',
        nameKn: 'ಬೀದಿ ದೀಪಗಳು ಉರಿಯದಿರುವುದು',
        nameHi: 'स्ट्रीट लाइट बंद होना / अंधेरा',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_municipal'
      },
      {
        id: 'sub_damaged_pole',
        name: 'Damaged / Leaning Electric Pole',
        nameKn: 'ಬಾಗಿದ ಅಥವಾ ಹಾಳಾದ ವಿದ್ಯುತ್ ಕಂಬ',
        nameHi: 'झुका या क्षतिग्रस्त बिजली का खंभा',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_electricity'
      },
      {
        id: 'sub_power_failure',
        name: 'Frequent Unannounced Power Outages',
        nameKn: 'ನಿರಂತರ ಅಘೋಷಿತ ವಿದ್ಯುತ್ ಕಡಿತ',
        nameHi: 'बार-बार बिजली गुल होना',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_electricity'
      },
      {
        id: 'sub_exposed_wires',
        name: 'Exposed / Hanging Live Electrical Wires',
        nameKn: 'ಅಪಾಯಕಾರಿ ನೇತಾಡುವ ವಿದ್ಯುತ್ ತಂತಿಗಳು',
        nameHi: 'खुले या लटके हुए बिजली के तार',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_electricity'
      }
    ]
  },
  {
    id: 'cat_public_safety',
    name: 'Public Safety & Traffic',
    nameKn: 'ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷತೆ ಮತ್ತು ಸಂಚಾರ',
    nameHi: 'सार्वजनिक सुरक्षा एवं यातायात',
    icon: 'ShieldAlert',
    defaultDepartmentId: 'dept_police',
    subcategories: [
      {
        id: 'sub_traffic_signal',
        name: 'Traffic Signal Not Working / Blinking',
        nameKn: 'ಕೆಟ್ಟುಹೋದ ಟ್ರಾಫಿಕ್ ಸಿಗ್ನಲ್',
        nameHi: 'खराब ट्रैफिक सिग्नल',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_police'
      },
      {
        id: 'sub_dangerous_location',
        name: 'Dangerous Public Location / Dark Alley',
        nameKn: 'ಅಪಾಯಕಾರಿ ಸಾರ್ವಜನಿಕ ಸ್ಥಳ / ಕತ್ತಲೆಯ ಜಾಗ',
        nameHi: 'असुरक्षित सार्वजनिक स्थल',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_police'
      },
      {
        id: 'sub_damaged_public_infra',
        name: 'Damaged Public Guard Rails / Barricades',
        nameKn: 'ಹಾಳಾದ ಸುರಕ್ಷತಾ ತಡೆಗೋಡೆಗಳು',
        nameHi: 'क्षतिग्रस्त सुरक्षा रेलिंग / बैरिकेड',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_municipal'
      },
      {
        id: 'sub_public_nuisance',
        name: 'Public Encroachment / Nuisance',
        nameKn: 'ಸಾರ್ವಜನಿಕ ಸ್ಥಳ ಅತಿಕ್ರಮಣ / ಉಪದ್ರವ',
        nameHi: 'सार्वजनिक उपद्रव / अवैध कब्जा',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_police'
      }
    ]
  },
  {
    id: 'cat_health',
    name: 'Healthcare & Public Hospitals',
    nameKn: 'ಆರೋಗ್ಯ ಮತ್ತು ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳು',
    nameHi: 'स्वास्थ्य एवं सरकारी अस्पताल',
    icon: 'HeartPulse',
    defaultDepartmentId: 'dept_health',
    subcategories: [
      {
        id: 'sub_hospital_cleanliness',
        name: 'Government Hospital Cleanliness / Hygiene',
        nameKn: 'ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ ಅಸ್ವಚ್ಛತೆ',
        nameHi: 'सरकारी अस्पताल में गंदगी',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_health'
      },
      {
        id: 'sub_medicine_shortage',
        name: 'Shortage of Essential Free Medicines',
        nameKn: 'ಅಗತ್ಯ ಉಚಿತ ಔಷಧಿಗಳ ಕೊರತೆ',
        nameHi: 'आवश्यक दवाओं का अभाव',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_health'
      },
      {
        id: 'sub_phc_maintenance',
        name: 'Primary Health Center (PHC) Infrastructure',
        nameKn: 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದ ಮೂಲಸೌಕರ್ಯ',
        nameHi: 'प्राथमिक स्वास्थ्य केंद्र बदहाली',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_health'
      }
    ]
  },
  {
    id: 'cat_education',
    name: 'Education & Govt Schools',
    nameKn: 'ಶಿಕ್ಷಣ ಮತ್ತು ಸರ್ಕಾರಿ ಶಾಲೆಗಳು',
    nameHi: 'शिक्षा एवं सरकारी विद्यालय',
    icon: 'GraduationCap',
    defaultDepartmentId: 'dept_education',
    subcategories: [
      {
        id: 'sub_school_infra',
        name: 'Government School Building & Boundary Wall',
        nameKn: 'ಸರ್ಕಾರಿ ಶಾಲಾ ಕಟ್ಟಡ ದುರಸ್ತಿ',
        nameHi: 'सरकारी स्कूल भवन मरम्मत',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_education'
      },
      {
        id: 'sub_school_drinking_water',
        name: 'Drinking Water Supply in School',
        nameKn: 'ಶಾಲೆಯಲ್ಲಿ ಕುಡಿಯುವ ನೀರಿನ ಕೊರತೆ',
        nameHi: 'स्कूल में पीने के पानी का अभाव',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_education'
      },
      {
        id: 'sub_school_toilets',
        name: 'Dysfunctional Student Toilets',
        nameKn: 'ವಿದ್ಯಾರ್ಥಿ ಶೌಚಾಲಯ ನಿರ್ವಹಣೆ ಇಲ್ಲದಿರುವುದು',
        nameHi: 'स्कूल शौचालय की खस्ताहाली',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_education'
      },
      {
        id: 'sub_damaged_classrooms',
        name: 'Damaged Roof / Classrooms',
        nameKn: 'ಶಿಥಿಲಗೊಂಡ ತರಗತಿ ಕೊಠಡಿಗಳು',
        nameHi: 'क्षतिग्रस्त कक्षाएं / छत',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_education'
      }
    ]
  },
  {
    id: 'cat_environment',
    name: 'Environment & Pollution',
    nameKn: 'ಪರಿಸರ ಮತ್ತು ಮಾಲಿನ್ಯ',
    nameHi: 'पर्यावरण एवं प्रदूषण',
    icon: 'Trees',
    defaultDepartmentId: 'dept_environment',
    subcategories: [
      {
        id: 'sub_illegal_dumping',
        name: 'Illegal Industrial / Toxic Waste Dumping',
        nameKn: 'ಅಕ್ರಮ ರಾಸಾಯನಿಕ ತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿ',
        nameHi: 'अवैध कचरा व रासायनिक डंपिंग',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_environment'
      },
      {
        id: 'sub_air_pollution',
        name: 'Severe Air Pollution / Burning of Waste',
        nameKn: 'ಕಸ ಸುಡುವುದು / ವಾಯು ಮಾಲಿನ್ಯ',
        nameHi: 'कचरा जलाना / वायु प्रदूषण',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_environment'
      },
      {
        id: 'sub_water_pollution',
        name: 'Lake or River Water Contamination',
        nameKn: 'ಕೆರೆ ಅಥವಾ ನದಿ ನೀರು ಕಲುಷಿತಗೊಳಿಸುವಿಕೆ',
        nameHi: 'झील या नदी में प्रदूषित पानी',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_environment'
      },
      {
        id: 'sub_tree_cutting',
        name: 'Unauthorized Tree Cutting',
        nameKn: 'ಅನಧಿಕೃತ ಮರ ಕಡಿಯುವಿಕೆ',
        nameHi: 'अवैध रूप से पेड़ काटना',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_environment'
      },
      {
        id: 'sub_noise_pollution',
        name: 'Excessive Commercial / Industrial Noise',
        nameKn: 'ಮಿತಿಮೀರಿದ ಶಬ್ದ ಮಾಲಿನ್ಯ',
        nameHi: 'अत्यधिक ध्वनि प्रदूषण',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_environment'
      }
    ]
  },
  {
    id: 'cat_transport',
    name: 'Public Transport & Bus Facilities',
    nameKn: 'ಸಾರ್ವಜನಿಕ ಸಾರಿಗೆ ಮತ್ತು ಬಸ್ ನಿಲ್ದಾಣಗಳು',
    nameHi: 'सार्वजनिक परिवहन एवं बस स्टॉप',
    icon: 'Bus',
    defaultDepartmentId: 'dept_transport',
    subcategories: [
      {
        id: 'sub_bus_stop_maintenance',
        name: 'Bus Stop Poor Cleanliness / Lighting',
        nameKn: 'ಬಸ್ ನಿಲ್ದಾಣದ ನಿರ್ವಹಣೆ ಕೊರತೆ',
        nameHi: 'बस स्टॉप पर अस्वच्छता / लाइट नहीं',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_transport'
      },
      {
        id: 'sub_damaged_bus_shelter',
        name: 'Broken Roof / Damaged Bus Shelter',
        nameKn: 'ಹಾಳಾದ ಬಸ್ ಶೆಲ್ಟರ್',
        nameHi: 'टूटा हुआ बस शेल्टर',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_transport'
      },
      {
        id: 'sub_public_transit_issues',
        name: 'Skipping Stops / Unpunctual Service',
        nameKn: 'ಸಮಯಪಾಲನೆ ಇಲ್ಲದಿರುವುದು / ನಿಲುಗಡೆ ತಪ್ಪಿಸುವುದು',
        nameHi: 'अनियमित बस सेवा / स्टॉप छोड़ना',
        defaultPriority: 'low',
        suggestedDeptId: 'dept_transport'
      }
    ]
  },
  {
    id: 'cat_rural_development',
    name: 'Rural Development & Panchayat Raj',
    nameKn: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್',
    nameHi: 'ग्रामीण विकास एवं पंचायत राज',
    icon: 'Home',
    defaultDepartmentId: 'dept_rdpr',
    subcategories: [
      {
        id: 'sub_village_roads',
        name: 'Village Internal Road Repair',
        nameKn: 'ಗ್ರಾಮೀಣ ರಸ್ತೆ ದುರಸ್ತಿ',
        nameHi: 'ग्रामीण आंतरिक सड़क मरम्मत',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_rdpr'
      },
      {
        id: 'sub_panchayat_sanitation',
        name: 'Gram Panchayat Open Drains & Sanitation',
        nameKn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ನೈರ್ಮಲ್ಯ ಕೊರತೆ',
        nameHi: 'ग्राम पंचायत में स्वच्छता की कमी',
        defaultPriority: 'medium',
        suggestedDeptId: 'dept_rdpr'
      }
    ]
  },
  {
    id: 'cat_food_civil',
    name: 'Food & Civil Supplies (Ration/PDS)',
    nameKn: 'ಆಹಾರ ಮತ್ತು ಪಡಿತರ ವಿತರಣೆ (ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿ)',
    nameHi: 'खाद्य एवं राशन वितरण (उचित मूल्य दुकान)',
    icon: 'Utensils',
    defaultDepartmentId: 'dept_food_civil',
    subcategories: [
      {
        id: 'sub_pds_irregular',
        name: 'Irregular Fair Price / Ration Shop Timings',
        nameKn: 'ಪಡಿತರ ಅಂಗಡಿ ಸರಿಯಾಗಿ ತೆರೆಯದಿರುವುದು',
        nameHi: 'राशन दुकान समय पर न खुलना',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_food_civil'
      },
      {
        id: 'sub_foodgrain_quality',
        name: 'Poor Quality Foodgrains / Rice / Wheat',
        nameKn: 'ಕಳಪೆ ಗುಣಮಟ್ಟದ ಆಹಾರ ಧಾನ್ಯಗಳು',
        nameHi: 'खाद्यान्न की खराब गुणवत्ता',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_food_civil'
      }
    ]
  },
  {
    id: 'cat_women_child',
    name: 'Women & Child Welfare (Anganwadi)',
    nameKn: 'ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ (ಅಂಗನವಾಡಿ)',
    nameHi: 'महिला एवं बाल कल्याण (आंगनवाड़ी)',
    icon: 'Baby',
    defaultDepartmentId: 'dept_women_child',
    subcategories: [
      {
        id: 'sub_anganwadi_infra',
        name: 'Anganwadi Building / Drinking Water Repair',
        nameKn: 'ಅಂಗನವಾಡಿ ಕಟ್ಟಡ ಹಾಗೂ ಮೂಲಸೌಕರ್ಯ',
        nameHi: 'आंगनवाड़ी केंद्र की बदहाली',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_women_child'
      }
    ]
  },
  {
    id: 'cat_revenue_land',
    name: 'Revenue & Public Land Protection',
    nameKn: 'ಕಂದಾಯ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಆಸ್ತಿ ರಕ್ಷಣೆ',
    nameHi: 'राजस्व एवं सार्वजनिक भूमि संरक्षण',
    icon: 'LandPlot',
    defaultDepartmentId: 'dept_revenue',
    subcategories: [
      {
        id: 'sub_lake_encroachment',
        name: 'Encroachment of Public Lake / Drain Buffer',
        nameKn: 'ಕೆರೆ ಅಥವಾ ರಾಜಕಾಲುವೆ ಅತಿಕ್ರಮಣ',
        nameHi: 'तालाब या नाले पर अवैध कब्जा',
        defaultPriority: 'critical',
        suggestedDeptId: 'dept_revenue'
      },
      {
        id: 'sub_public_land_grab',
        name: 'Illegal Construction on Government Land',
        nameKn: 'ಸರ್ಕಾರಿ ಜಾಗದಲ್ಲಿ ಅಕ್ರಮ ನಿರ್ಮಾಣ',
        nameHi: 'सरकारी जमीन पर अनाधिकृत निर्माण',
        defaultPriority: 'high',
        suggestedDeptId: 'dept_revenue'
      }
    ]
  }
];

/**
 * Smart Complaint Routing Engine
 * Takes category, subcategory and location context (e.g. urban vs rural or major highway)
 * and determines the exact responsible authority.
 */
export function determineResponsibleDepartment(
  categoryId: string,
  subcategoryId: string,
  location: { district?: string; cityOrVillage?: string; wardOrZone?: string }
): { departmentId: string; departmentName: string; rationale: string; targetHours: number } {
  const category = PROBLEM_CATEGORIES.find(c => c.id === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
  
  // Rural context check: if the address or ward mentions Gram Panchayat or village
  const isRural = location.cityOrVillage?.toLowerCase().includes('village') ||
                  location.cityOrVillage?.toLowerCase().includes('gram') ||
                  location.wardOrZone?.toLowerCase().includes('panchayat');

  let chosenDeptId = subcategory?.suggestedDeptId || category?.defaultDepartmentId || 'dept_municipal';
  let rationale = `Matched via Category: "${category?.name}" and Issue: "${subcategory?.name}".`;

  if (isRural && (categoryId === 'cat_road_infra' || categoryId === 'cat_sanitation')) {
    chosenDeptId = 'dept_rdpr';
    rationale = `Routed to Rural Development & Panchayat Raj (RDPR) because the reported location is in a rural Gram Panchayat jurisdiction.`;
  }

  // Major highway / state bridge check
  if (subcategoryId === 'sub_broken_roads' || subcategoryId === 'sub_bridges') {
    chosenDeptId = 'dept_pwd';
    rationale = `State arterial roads and bridges fall under the jurisdiction of the Karnataka Public Works Department (PWD).`;
  }

  // Sewage on road -> BWSSB / Water Board
  if (subcategoryId === 'sub_sewage_overflow') {
    chosenDeptId = 'dept_water';
    rationale = `Underground sewer mains and manholes are governed by Water Supply & Sewerage Board (BWSSB/KUWSDB).`;
  }

  // Streetlights vs Live wires
  if (subcategoryId === 'sub_streetlights') {
    chosenDeptId = 'dept_municipal';
    rationale = `Urban street lighting infrastructure is maintained by the City Municipal Corporation.`;
  } else if (subcategoryId === 'sub_exposed_wires' || subcategoryId === 'sub_damaged_pole') {
    chosenDeptId = 'dept_electricity';
    rationale = `High danger electrical power lines are directly handled by the regional Electricity Supply Company (BESCOM/ESCOM).`;
  }

  const dept = DEPARTMENTS.find(d => d.id === chosenDeptId) || DEPARTMENTS[0];
  const priority = subcategory?.defaultPriority || 'medium';
  const targetHours = priority === 'critical' ? dept.slaHoursCritical : dept.slaHoursStandard;

  return {
    departmentId: dept.id,
    departmentName: dept.name,
    rationale,
    targetHours
  };
}
