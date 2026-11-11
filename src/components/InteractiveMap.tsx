import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Complaint, ComplaintStatus, PriorityLevel } from '../types';
import { useApp } from '../context/AppContext';
import { Filter, Layers, MapPin, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { KARNATAKA_DISTRICTS } from '../data/karnatakaLocations';

interface InteractiveMapProps {
  filteredComplaints?: Complaint[];
  heightClass?: string;
  onSelectComplaint?: (c: Complaint) => void;
  showFilters?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  filteredComplaints,
  heightClass = 'h-[520px]',
  onSelectComplaint,
  showFilters = true
}) => {
  const { complaints, setSelectedComplaint, departments } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const sourceComplaints = filteredComplaints || complaints;

  // Filter complaints
  const displayedComplaints = sourceComplaints.filter(c => {
    if (selectedDistrict !== 'all' && c.location.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'pending') {
        if (c.status !== 'submitted' && c.status !== 'under_review' && c.status !== 'assigned_to_dept') return false;
      } else if (selectedStatus === 'in_progress') {
        if (c.status !== 'assigned_to_officer' && c.status !== 'work_in_progress') return false;
      } else if (selectedStatus === 'resolved') {
        if (c.status !== 'resolved_awaiting_verification' && c.status !== 'successfully_closed') return false;
      } else if (selectedStatus === 'critical') {
        if (c.priority !== 'critical') return false;
      }
    }
    if (selectedDept !== 'all' && c.departmentId !== selectedDept) {
      return false;
    }
    return true;
  });

  // Create custom marker icons based on status/priority
  const getCustomMarkerIcon = (status: ComplaintStatus, priority: PriorityLevel) => {
    let color = '#3B82F6'; // Blue
    let label = 'WIP';

    if (priority === 'critical') {
      color = '#EF4444'; // Red
      label = '!';
    } else if (status === 'successfully_closed' || status === 'resolved_awaiting_verification') {
      color = '#10B981'; // Green
      label = '✓';
    } else if (status === 'submitted' || status === 'under_review' || status === 'assigned_to_dept') {
      color = '#F59E0B'; // Amber
      label = 'P';
    }

    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="38" viewBox="0 0 32 38" fill="none">
        <path d="M16 0C7.16344 0 0 7.16344 0 16C0 26.5 16 38 16 38C16 38 32 26.5 32 16C32 7.16344 24.8366 0 16 0Z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="16" cy="15" r="9" fill="#FFFFFF"/>
        <text x="16" y="19" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" fill="${color}" text-anchor="middle">${label}</text>
      </svg>
    `;

    return L.divIcon({
      html: svgIcon,
      className: 'custom-map-pin',
      iconSize: [32, 38],
      iconAnchor: [16, 38],
      popupAnchor: [0, -36]
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [12.9716, 77.5946], // Bengaluru center
        zoom: 11,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | JANASEVA'
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when complaints or filters change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const bounds = L.latLngBounds([]);

    displayedComplaints.forEach((c) => {
      const lat = c.location?.latitude || 12.9716;
      const lng = c.location?.longitude || 77.5946;

      const marker = L.marker([lat, lng], {
        icon: getCustomMarkerIcon(c.status, c.priority)
      });

      const popupContent = document.createElement('div');
      popupContent.className = 'text-xs text-slate-800 space-y-1.5 min-w-[200px]';
      popupContent.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-100 pb-1">
          <span class="font-mono font-bold text-[11px] text-blue-700">${c.id}</span>
          <span class="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
            c.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
          }">${c.priority}</span>
        </div>
        <div class="font-bold text-slate-900 leading-snug line-clamp-2">${c.title}</div>
        <div class="text-[11px] text-slate-500">${c.location.address || c.location.wardOrZone}, ${c.location.district}</div>
        <div class="text-[11px] text-slate-600 font-medium">Dept: <strong>${c.departmentName}</strong></div>
        <div class="pt-1.5 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[10px] text-slate-400 capitalize">Status: ${c.status.replace(/_/g, ' ')}</span>
          <button id="view-complaint-${c.id}" class="px-2 py-1 text-[11px] font-bold text-white bg-blue-700 hover:bg-blue-800 rounded">
            View Case
          </button>
        </div>
      `;

      // Attach click event to the popup button
      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-complaint-${c.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectComplaint) {
              onSelectComplaint(c);
            } else {
              setSelectedComplaint(c);
            }
          };
        }
      });

      markersLayerRef.current?.addLayer(marker);
      bounds.extend([lat, lng]);
    });

    if (displayedComplaints.length > 0 && mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [displayedComplaints, setSelectedComplaint, onSelectComplaint]);

  // Adjust center if district changes
  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    if (distName === 'all') {
      mapInstanceRef.current?.setView([12.9716, 77.5946], 11);
      return;
    }
    const match = KARNATAKA_DISTRICTS.find(d => d.name.toLowerCase() === distName.toLowerCase());
    if (match && mapInstanceRef.current) {
      mapInstanceRef.current.setView([match.centerLat, match.centerLng], 12);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Map Control Bar & Filters */}
      {showFilters && (
        <div className="p-3.5 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-700" />
            <span className="font-bold text-slate-800">
              Karnataka Grievance Geo-Spatial Map
            </span>
            <span className="text-slate-400">·</span>
            <span className="font-mono tabular-nums text-slate-500">
              {displayedComplaints.length} active pins
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* District Filter */}
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Karnataka Districts</option>
              {KARNATAKA_DISTRICTS.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="critical">🔴 Critical Priority</option>
              <option value="pending">🟡 Pending Assignment</option>
              <option value="in_progress">🔵 Work in Progress</option>
              <option value="resolved">🟢 Solved / Verified</option>
            </select>

            {/* Department Filter */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[160px] truncate"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.shortCode}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Map Viewport Container */}
      <div className={`w-full ${heightClass} relative z-0`} ref={mapContainerRef} />

      {/* Map Legend */}
      <div className="px-4 py-2 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-3">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-700">Map Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Critical Emergency</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Pending Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Work In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Verified Solved</span>
          </div>
        </div>

        <div className="text-slate-400">
          Powered by OpenStreetMap & Karnataka Geo-Data
        </div>
      </div>
    </div>
  );
};
