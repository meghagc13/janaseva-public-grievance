export interface TalukInfo {
  name: string;
  wardsOrVillages: string[];
  defaultPincode: string;
}

export interface DistrictInfo {
  id: string;
  name: string;
  nameKn: string;
  nameHi: string;
  division: 'Bengaluru' | 'Mysuru' | 'Belagavi' | 'Kalaburagi';
  centerLat: number;
  centerLng: number;
  taluks: { [talukName: string]: TalukInfo };
}

export const KARNATAKA_DISTRICTS: DistrictInfo[] = [
  {
    id: 'bengaluru_urban',
    name: 'Bengaluru Urban',
    nameKn: 'ಬೆಂಗಳೂರು ನಗರ',
    nameHi: 'बेंगलुरु शहरी',
    division: 'Bengaluru',
    centerLat: 12.9716,
    centerLng: 77.5946,
    taluks: {
      'Bengaluru East': {
        name: 'Bengaluru East',
        wardsOrVillages: ['Indiranagar', 'KR Puram', 'Marathahalli', 'Whitefield', 'CV Raman Nagar', 'Varthur', 'Bellandur'],
        defaultPincode: '560038'
      },
      'Bengaluru South': {
        name: 'Bengaluru South',
        wardsOrVillages: ['Jayanagar', 'JP Nagar', 'Koramangala', 'BTM Layout', 'HSR Layout', 'Electronic City', 'Banashankari'],
        defaultPincode: '560041'
      },
      'Bengaluru North': {
        name: 'Bengaluru North',
        wardsOrVillages: ['Malleshwaram', 'Hebbal', 'Yelahanka', 'Yeshwanthpur', 'RT Nagar', 'Sahakara Nagar', 'Vidyaranyapura'],
        defaultPincode: '560003'
      },
      'Bengaluru West': {
        name: 'Bengaluru West',
        wardsOrVillages: ['Rajajinagar', 'Basavanagudi', 'Vijayanagar', 'Chamarajpet', 'Mahalakshmi Layout', 'Nagarbhavi'],
        defaultPincode: '560010'
      },
      'Anekal': {
        name: 'Anekal',
        wardsOrVillages: ['Anekal Town', 'Attibele', 'Jigani Industrial Area', 'Chandapura', 'Bannerghatta'],
        defaultPincode: '562106'
      }
    }
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    nameKn: 'ಮೈಸೂರು',
    nameHi: 'मैसूरु',
    division: 'Mysuru',
    centerLat: 12.2958,
    centerLng: 76.6394,
    taluks: {
      'Mysuru Urban': {
        name: 'Mysuru Urban',
        wardsOrVillages: ['Kuvempunagar', 'Saraswathipuram', 'Gokulam', 'Jayalakshmipuram', 'Chamundi Hill', 'Vijayanagar 2nd Stage', 'Vontikoppal'],
        defaultPincode: '570009'
      },
      'Nanjangud': {
        name: 'Nanjangud',
        wardsOrVillages: ['Nanjangud Town', 'Hullahalli', 'Debur', 'Thagadur'],
        defaultPincode: '571301'
      },
      'Hunsur': {
        name: 'Hunsur',
        wardsOrVillages: ['Hunsur Municipal', 'Bilikere', 'Gavadagere', 'Dharmapura'],
        defaultPincode: '571105'
      },
      'T. Narasipura': {
        name: 'T. Narasipura',
        wardsOrVillages: ['Tirumakudalu', 'Bannur', 'Sosale', 'Muguru'],
        defaultPincode: '571124'
      }
    }
  },
  {
    id: 'dharwad',
    name: 'Hubballi-Dharwad',
    nameKn: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ',
    nameHi: 'हुबली-धारवाड़',
    division: 'Belagavi',
    centerLat: 15.3647,
    centerLng: 75.1240,
    taluks: {
      'Hubballi Urban': {
        name: 'Hubballi Urban',
        wardsOrVillages: ['Keshwapur', 'Vidyanagar', 'Gokul Road', 'Navanagar', 'Old Hubballi', 'Deshpande Nagar'],
        defaultPincode: '580020'
      },
      'Dharwad': {
        name: 'Dharwad',
        wardsOrVillages: ['Saptapur', 'Kelageri', 'Sadhankeri', 'Malmaddi', 'Toll Naka', 'Karnataka College Area'],
        defaultPincode: '580001'
      },
      'Kundgol': {
        name: 'Kundgol',
        wardsOrVillages: ['Kundgol Town', 'Saunshi', 'Rottigawad', 'Gudageri'],
        defaultPincode: '581113'
      }
    }
  },
  {
    id: 'dakshina_kannada',
    name: 'Mangaluru (Dakshina Kannada)',
    nameKn: 'ಮಂಗಳೂರು (ದಕ್ಷಿಣ ಕನ್ನಡ)',
    nameHi: 'मंगलुरु (दक्षिण कन्नड़)',
    division: 'Mysuru',
    centerLat: 12.9141,
    centerLng: 74.8560,
    taluks: {
      'Mangaluru': {
        name: 'Mangaluru',
        wardsOrVillages: ['Kadri', 'Bejai', 'Hampankatta', 'Surathkal', 'Kankanady', 'Urwa', 'Kavoor'],
        defaultPincode: '575003'
      },
      'Bantwal': {
        name: 'Bantwal',
        wardsOrVillages: ['Bantwal Town', 'Panemangalore', 'Mani', 'Vittal'],
        defaultPincode: '574211'
      },
      'Puttur': {
        name: 'Puttur',
        wardsOrVillages: ['Puttur Town', 'Kabaka', 'Bettampady', 'Uppinangady'],
        defaultPincode: '574201'
      }
    }
  },
  {
    id: 'belagavi',
    name: 'Belagavi',
    nameKn: 'ಬೆಳಗಾವಿ',
    nameHi: 'बेलगावी',
    division: 'Belagavi',
    centerLat: 15.8497,
    centerLng: 74.4977,
    taluks: {
      'Belagavi Urban': {
        name: 'Belagavi Urban',
        wardsOrVillages: ['Tilakwadi', 'Camp Area', 'Shahapur', 'Vadgaon', 'Hindwadi', 'Channamma Circle'],
        defaultPincode: '590006'
      },
      'Gokak': {
        name: 'Gokak',
        wardsOrVillages: ['Gokak Falls Area', 'Arabhavi', 'Koujalagi', 'Ghataprabha'],
        defaultPincode: '591307'
      },
      'Chikkodi': {
        name: 'Chikkodi',
        wardsOrVillages: ['Chikkodi Town', 'Sadashivanagar', 'Nipani Road', 'Khadaklat'],
        defaultPincode: '591201'
      }
    }
  },
  {
    id: 'kalaburagi',
    name: 'Kalaburagi',
    nameKn: 'ಕಲಬುರಗಿ',
    nameHi: 'कलबुर्गी',
    division: 'Kalaburagi',
    centerLat: 17.3297,
    centerLng: 76.8343,
    taluks: {
      'Kalaburagi Urban': {
        name: 'Kalaburagi Urban',
        wardsOrVillages: ['Sedam Road', 'Super Market Area', 'Brahmpur', 'MSK Mill Area', 'Vikas Nagar'],
        defaultPincode: '585102'
      },
      'Sedam': {
        name: 'Sedam',
        wardsOrVillages: ['Sedam Town', 'Kurgunta', 'Malkhed', 'Adki'],
        defaultPincode: '585222'
      },
      'Aland': {
        name: 'Aland',
        wardsOrVillages: ['Aland Town', 'Narona', 'Madana', 'Khajuri'],
        defaultPincode: '585302'
      }
    }
  },
  {
    id: 'shivamogga',
    name: 'Shivamogga',
    nameKn: 'ಶಿವಮೊಗ್ಗ',
    nameHi: 'शिवमोग्गा',
    division: 'Bengaluru',
    centerLat: 13.9299,
    centerLng: 75.5681,
    taluks: {
      'Shivamogga': {
        name: 'Shivamogga',
        wardsOrVillages: ['Vinoba Nagar', 'Gopala Gowda Extension', 'Durgigudi', 'Kote', 'Kashipura'],
        defaultPincode: '577204'
      },
      'Bhadravati': {
        name: 'Bhadravati',
        wardsOrVillages: ['Old Town Bhadravati', 'VISL Township', 'MPM Colony', 'Jannapura'],
        defaultPincode: '577301'
      },
      'Sagara': {
        name: 'Sagara',
        wardsOrVillages: ['Sagara Town', 'Jog Falls Area', 'Soraba Road', 'Avinahalli'],
        defaultPincode: '577401'
      }
    }
  },
  {
    id: 'tumakuru',
    name: 'Tumakuru',
    nameKn: 'ತುಮಕೂರು',
    nameHi: 'तुमकुरु',
    division: 'Bengaluru',
    centerLat: 13.3379,
    centerLng: 77.1010,
    taluks: {
      'Tumakuru': {
        name: 'Tumakuru',
        wardsOrVillages: ['Siddaganga Mutt Area', 'Ashok Nagar', 'SS Puram', 'Batawadi', 'Maralur'],
        defaultPincode: '572102'
      },
      'Tiptur': {
        name: 'Tiptur',
        wardsOrVillages: ['Tiptur Town', 'KBS Extension', 'Kikkeri Road', 'Nonavinakere'],
        defaultPincode: '572201'
      }
    }
  },
  {
    id: 'ballari',
    name: 'Ballari',
    nameKn: 'ಬಳ್ಳಾರಿ',
    nameHi: 'बल्लारी',
    division: 'Kalaburagi',
    centerLat: 15.1394,
    centerLng: 76.9214,
    taluks: {
      'Ballari': {
        name: 'Ballari',
        wardsOrVillages: ['Cantonment', 'Brucepet', 'Gandhi Nagar', 'Cowlbazaar', 'Kappagal Road'],
        defaultPincode: '583101'
      },
      'Siruguppa': {
        name: 'Siruguppa',
        wardsOrVillages: ['Siruguppa Town', 'Tekkalakote', 'Deshnur', 'Raravi'],
        defaultPincode: '583121'
      }
    }
  },
  {
    id: 'udupi',
    name: 'Udupi',
    nameKn: 'ಉಡುಪಿ',
    nameHi: 'उडुपी',
    division: 'Mysuru',
    centerLat: 13.3409,
    centerLng: 74.7421,
    taluks: {
      'Udupi': {
        name: 'Udupi',
        wardsOrVillages: ['Car Street', 'Manipal', 'Malpe Beach Road', 'Kalsanka', 'Ambalpady', 'Santhekatte'],
        defaultPincode: '576101'
      },
      'Kundapura': {
        name: 'Kundapura',
        wardsOrVillages: ['Kundapura Town', 'Koteshwara', 'Gangolli', 'Basrur'],
        defaultPincode: '576201'
      },
      'Karkala': {
        name: 'Karkala',
        wardsOrVillages: ['Gomateshwara Hill Area', 'Anekere', 'Bailur', 'Miyaru'],
        defaultPincode: '574104'
      }
    }
  }
];
