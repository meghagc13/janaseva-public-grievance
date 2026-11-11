import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { KARNATAKA_DISTRICTS } from '../data/karnatakaLocations';
import {
  X,
  MapPin,
  Camera,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Shield,
  Loader2,
  Navigation,
  UploadCloud,
  Users
} from 'lucide-react';
import { Complaint } from '../types';

export const ReportComplaintModal: React.FC = () => {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    categories,
    submitComplaint,
    supportComplaint,
    setSelectedComplaint,
    t
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [selectedSubcatId, setSelectedSubcatId] = useState('');

  // Location Fields
  const [district, setDistrict] = useState('Bengaluru Urban');
  const [taluk, setTaluk] = useState('Bengaluru East');
  const [wardOrVillage, setWardOrVillage] = useState('Indiranagar');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('560038');
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 12.9716, lng: 77.5946 });
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Evidence
  const [photoUrl, setPhotoUrl] = useState('/src/assets/images/community_service_road_1794296602739.jpg');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Duplicates & Submission state
  const [duplicates, setDuplicates] = useState<Complaint[]>([]);
  const [isCheckingDuplicates, setIsCheckingDuplicates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<Complaint | null>(null);

  // Active district & taluk lookup
  const currentDistrictObj = KARNATAKA_DISTRICTS.find(d => d.name === district) || KARNATAKA_DISTRICTS[0];
  const availableTaluks = Object.keys(currentDistrictObj.taluks);
  const currentTalukObj = currentDistrictObj.taluks[taluk] || currentDistrictObj.taluks[availableTaluks[0]];
  const availableWards = currentTalukObj?.wardsOrVillages || [];

  // When district changes, update taluk & ward
  const handleDistrictChange = (newDistName: string) => {
    setDistrict(newDistName);
    const distObj = KARNATAKA_DISTRICTS.find(d => d.name === newDistName);
    if (distObj) {
      const firstTaluk = Object.keys(distObj.taluks)[0];
      setTaluk(firstTaluk);
      const talukObj = distObj.taluks[firstTaluk];
      if (talukObj) {
        setWardOrVillage(talukObj.wardsOrVillages[0] || '');
        setPincode(talukObj.defaultPincode);
      }
      setCoords({ lat: distObj.centerLat, lng: distObj.centerLng });
    }
  };

  const handleTalukChange = (newTalukName: string) => {
    setTaluk(newTalukName);
    const talukObj = currentDistrictObj.taluks[newTalukName];
    if (talukObj) {
      setWardOrVillage(talukObj.wardsOrVillages[0] || '');
      setPincode(talukObj.defaultPincode);
    }
  };

  // Auto-detect GPS Coordinates
  const handleAutoGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsDetectingGps(false);
      },
      (err) => {
        console.warn('Geolocation error or permission denied:', err.message);
        // Fallback to district center
        setCoords({ lat: currentDistrictObj.centerLat, lng: currentDistrictObj.centerLng });
        setIsDetectingGps(false);
      },
      { timeout: 7000 }
    );
  };

  // Check for duplicate complaints in same ward/category
  useEffect(() => {
    if (!selectedCatId || !district) return;

    const checkDuplicates = async () => {
      setIsCheckingDuplicates(true);
      try {
        const res = await fetch('/api/complaints/check-duplicates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            categoryId: selectedCatId,
            subcategoryId: selectedSubcatId,
            district,
            taluk,
            ward: wardOrVillage
          })
        });
        if (res.ok) {
          const data = await res.json();
          setDuplicates(data.duplicates || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsCheckingDuplicates(false);
      }
    };

    const timer = setTimeout(checkDuplicates, 400);
    return () => clearTimeout(timer);
  }, [selectedCatId, selectedSubcatId, district, taluk, wardOrVillage]);

  // Selected Category subcategories
  const currentCategory = categories.find(c => c.id === selectedCatId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !selectedCatId) {
      alert('Please fill out all mandatory problem details.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await submitComplaint({
        title,
        description,
        categoryId: selectedCatId,
        subcategoryId: selectedSubcatId || currentCategory?.subcategories[0]?.id || '',
        location: {
          latitude: coords.lat,
          longitude: coords.lng,
          district,
          taluk,
          cityOrVillage: currentDistrictObj.name,
          wardOrZone: wardOrVillage,
          address: address || `${wardOrVillage}, ${taluk}`,
          landmark,
          pincode
        },
        beforePhotoUrl: photoUrl,
        isAnonymous
      });

      setSubmittedResult(created);
    } catch (err: any) {
      alert(err.message || 'Failed to submit complaint');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSupportDuplicate = async (dupId: string) => {
    await supportComplaint(dupId);
    setIsReportModalOpen(false);
  };

  if (!isReportModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold">
              <Shield className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {t.formTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Direct submission to Karnataka Responsible Department Redressal Engine
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsReportModalOpen(false);
              setSubmittedResult(null);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {submittedResult ? (
            /* Success Acknowledgement Card */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Public Grievance Successfully Registered
              </h3>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Complaint Tracking ID:</span>
                  <strong className="text-blue-700 font-mono text-sm">{submittedResult.id}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Assigned Department:</span>
                  <span className="text-slate-800 font-semibold">{submittedResult.departmentName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Current Status:</span>
                  <span className="text-amber-600 font-semibold uppercase">{submittedResult.status.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Target Resolution SLA:</span>
                  <span className="text-slate-800 font-semibold">
                    {new Date(submittedResult.targetResolutionDate).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                You will receive in-app alerts as field officers are assigned and work progresses. Remember: the ticket will not be marked closed until you inspect and verify the physical resolution!
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsReportModalOpen(false);
                    setSelectedComplaint(submittedResult);
                    setSubmittedResult(null);
                  }}
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  View Case Sheet
                </button>
                <button
                  onClick={() => {
                    setSubmittedResult(null);
                    setTitle('');
                    setDescription('');
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Submit Another Problem
                </button>
              </div>
            </div>
          ) : (
            /* Grievance Submission Form */
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Duplicate Detection Warning Banner */}
              {duplicates.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t.duplicateWarningTitle} ({duplicates.length} already logged in this ward)</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {t.duplicateWarningDesc} Joining an existing grievance groups affected citizens together and automatically boosts priority!
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {duplicates.slice(0, 2).map(dup => (
                      <div key={dup.id} className="bg-white border border-amber-200 rounded-lg p-2.5 flex items-center justify-between gap-3">
                        <div className="truncate">
                          <span className="font-mono font-bold text-blue-700 mr-2">{dup.id}</span>
                          <span className="font-semibold text-slate-800">{dup.title}</span>
                          <span className="text-slate-400 text-[10px] block">{dup.location.address} · {dup.supportCount} citizen supporters</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSupportDuplicate(dup.id)}
                          className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[11px] whitespace-nowrap shrink-0"
                        >
                          Join & Support
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Problem Classification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.categoryLabel} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCatId}
                    onChange={(e) => {
                      setSelectedCatId(e.target.value);
                      const cat = categories.find(c => c.id === e.target.value);
                      if (cat?.subcategories?.[0]) {
                        setSelectedSubcatId(cat.subcategories[0].id);
                      }
                    }}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.subcategoryLabel} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedSubcatId}
                    onChange={(e) => setSelectedSubcatId(e.target.value)}
                    required
                    disabled={!selectedCatId}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <option value="">-- Select Specific Issue --</option>
                    {currentCategory?.subcategories.map(sub => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} (Priority: {sub.defaultPriority})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.titleLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dangerous crater-like potholes near 80 Feet Road junction"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.descLabel} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the severity, duration, hazards to public safety, and exact ground reality..."
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Karnataka Location Hierarchy (Linked Dropdowns) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    Karnataka Location & Ward Jurisdiction
                  </span>
                  <button
                    type="button"
                    onClick={handleAutoGps}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    {isDetectingGps ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-blue-700" />
                        <span>{t.gpsDetecting}</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3 h-3 text-blue-700" />
                        <span>{t.gpsDetect}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      {t.districtLabel} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 font-medium"
                    >
                      {KARNATAKA_DISTRICTS.map(d => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      {t.talukLabel} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={taluk}
                      onChange={(e) => handleTalukChange(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 font-medium"
                    >
                      {availableTaluks.map(tName => (
                        <option key={tName} value={tName}>{tName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      {t.wardLabel} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={wardOrVillage}
                      onChange={(e) => setWardOrVillage(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 font-medium"
                    >
                      {availableWards.map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1">
                      {t.addressLabel}
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 100 Feet Road, Near Metro Pillar 84"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      {t.pincodeLabel}
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span>GPS Coordinates: <strong className="font-mono text-slate-700">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</strong></span>
                  <span className="text-emerald-700 font-semibold">Geo-tagged for Officer Map</span>
                </div>
              </div>

              {/* Photo Evidence & Anonymous Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.uploadPhoto}
                  </label>
                  <div className="flex items-center gap-2">
                    <img
                      src={photoUrl}
                      alt="Grievance evidence"
                      className="w-16 h-12 rounded object-cover border border-slate-300 shrink-0"
                    />
                    <select
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-slate-700 text-xs"
                    >
                      <option value="/src/assets/images/community_service_road_1794296602739.jpg">Sample 1: Road Asphalt Defect</option>
                      <option value="https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80">Sample 2: Water Pipeline Burst</option>
                      <option value="https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80">Sample 3: Garbage Overflow</option>
                      <option value="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80">Sample 4: Streetlight Outage</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>{t.anonymousToggle}</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {t.anonymousHelp}
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Smart Routing & Submitting...</span>
                    </>
                  ) : (
                    <span>{t.submitButton}</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
