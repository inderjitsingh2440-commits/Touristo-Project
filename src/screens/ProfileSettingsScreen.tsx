import React, { useState, useEffect } from 'react';
import { dbStorage } from '../services/dbStorage';
import { UserProfile, EmergencyContact, UserTrip, ScreenId } from '../types/touristo';
import { 
  User, 
  Settings, 
  MapPin, 
  PhoneCall, 
  Globe, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  Download, 
  Upload, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X,
  Compass,
  AlertCircle
} from 'lucide-react';

import { AuthUser } from '../types/auth';

interface ProfileSettingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  currentUser?: AuthUser | null;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({ 
  onNavigate,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  const [profile, setProfile] = useState<UserProfile>(dbStorage.getProfile());
  const [trips, setTrips] = useState<UserTrip[]>(dbStorage.getTrips());
  const [contacts, setContacts] = useState<EmergencyContact[]>(dbStorage.getContacts());

  // Edit Profile Modal
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [nationalityInput, setNationalityInput] = useState(profile.nationality);
  const [bloodGroupInput, setBloodGroupInput] = useState(profile.bloodGroup);
  const [phoneInput, setPhoneInput] = useState(profile.phone);

  // Add Contact Modal
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactRelation, setContactRelation] = useState('Family');
  const [contactPhone, setContactPhone] = useState('');

  // Status message
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    setProfile(dbStorage.getProfile());
    setTrips(dbStorage.getTrips());
    setContacts(dbStorage.getContacts());
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: nameInput,
      nationality: nationalityInput,
      bloodGroup: bloodGroupInput,
      phone: phoneInput,
    };
    dbStorage.saveProfile(updated);
    setProfile(updated);
    setIsEditProfileOpen(false);
    showNotice('Profile updated successfully!');
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;

    const newContact: EmergencyContact = {
      id: 'cont_' + Date.now(),
      name: contactName.trim(),
      relation: contactRelation,
      phone: contactPhone.trim(),
      notifyOnSOS: true,
    };

    const updated = [...contacts, newContact];
    dbStorage.saveContacts(updated);
    setContacts(updated);
    setContactName('');
    setContactPhone('');
    setIsAddContactOpen(false);
    showNotice('Emergency contact added!');
  };

  const handleDeleteContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    dbStorage.saveContacts(updated);
    setContacts(updated);
    showNotice('Contact removed.');
  };

  const handleToggleNotify = (id: string) => {
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, notifyOnSOS: !c.notifyOnSOS } : c
    );
    dbStorage.saveContacts(updated);
    setContacts(updated);
  };

  const showNotice = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleExportData = () => {
    const dataStr = dbStorage.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `touristo_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showNotice('Data backup exported successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all Touristo data to factory defaults?')) {
      dbStorage.resetAll();
      setProfile(dbStorage.getProfile());
      setTrips(dbStorage.getTrips());
      setContacts(dbStorage.getContacts());
      showNotice('Data reset to defaults.');
    }
  };

  return (
    <div className="space-y-4 pb-14 animate-in fade-in">
      {statusMsg && (
        <div className="p-3 bg-[#E6F6EF] border border-teal-200 text-[#075B4E] text-xs font-bold rounded-2xl flex items-center gap-2">
          <Check className="w-4 h-4 text-[#087F68]" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#087F68]/15 border-2 border-[#087F68]/40 overflow-hidden flex items-center justify-center text-[#087F68] font-bold text-lg relative">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
              <span className="text-sm font-bold">
                {(currentUser?.name || profile.name).substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#172B2A]">{currentUser?.name || profile.name}</h3>
                {currentUser?.isGuest ? (
                  <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Guest Mode
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Verified Traveler
                  </span>
                )}
              </div>
              <p className="text-xs text-[#62716F]">
                {currentUser?.nationality || profile.nationality} · Currency: {currentUser?.preferredCurrency || profile.preferredCurrency}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{currentUser?.email || profile.email}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setNameInput(currentUser?.name || profile.name);
              setNationalityInput(currentUser?.nationality || profile.nationality);
              setBloodGroupInput(currentUser?.bloodGroup || profile.bloodGroup);
              setPhoneInput(currentUser?.phone || profile.phone);
              setIsEditProfileOpen(true);
            }}
            className="p-2 rounded-xl bg-[#F5F7F7] hover:bg-[#E6F6EF] text-[#075B4E] border border-[#E2E8E6] transition-colors"
            title="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Auth Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          {onOpenLogin && (
            <button
              onClick={onOpenLogin}
              className="flex-1 py-1.5 px-3 bg-[#E6F6EF] hover:bg-[#087F68] text-[#087F68] hover:text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>{currentUser?.isGuest ? 'Sign In / Register' : 'Switch Traveler Profile'}</span>
            </button>
          )}
          {onLogout && currentUser && !currentUser.isGuest && (
            <button
              onClick={onLogout}
              className="py-1.5 px-3 border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl text-xs font-semibold transition-all"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Active Trip Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#172B2A]">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#087F68]" />
            Active Travel Itinerary
          </span>
          <span className="text-[10px] bg-[#E6F6EF] text-[#087F68] px-2 py-0.5 rounded-full font-bold">
            Day 5 of 15
          </span>
        </div>

        {trips.map((trip) => (
          <div key={trip.id} className="p-3 bg-[#F5F7F7] rounded-xl border border-[#E2E8E6] text-xs space-y-1">
            <div className="font-bold text-[#172B2A] text-sm">{trip.destination}</div>
            <div className="text-[11px] text-[#62716F]">
              {trip.startDate} to {trip.endDate} · Budget: ₹{trip.budgetINR.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 italic pt-1">{trip.notes}</p>
          </div>
        ))}
      </div>

      {/* Emergency Contacts Manager */}
      <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#172B2A]">
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-[#087F68]" />
            Emergency SOS Contacts ({contacts.length})
          </span>
          <button
            onClick={() => setIsAddContactOpen(true)}
            className="text-[11px] text-[#087F68] font-bold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Contact
          </button>
        </div>

        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3 rounded-xl bg-[#F5F7F7] border border-[#E2E8E6] flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-[#172B2A]">{contact.name}</div>
                <div className="text-[11px] text-[#62716F]">
                  {contact.phone} · {contact.relation}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleNotify(contact.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                    contact.notifyOnSOS
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                  title="Toggle SOS dispatch"
                >
                  {contact.notifyOnSOS ? 'Notify on SOS: Yes' : 'Notify on SOS: No'}
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                  title="Remove contact"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences Section (Currency, Language, Notifications) */}
      <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B2A]">
          Application Preferences
        </h4>

        {/* Reporting Currency Preference */}
        <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#087F68]" />
            <span className="font-medium text-[#172B2A]">Reporting Currency</span>
          </div>
          <select
            value={profile.preferredCurrency}
            onChange={(e) => {
              const updated = { ...profile, preferredCurrency: e.target.value };
              setProfile(updated);
              dbStorage.saveProfile(updated);
            }}
            className="bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-2.5 py-1 text-xs font-bold text-[#087F68] focus:outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
            <option value="AED">AED (د.إ)</option>
          </select>
        </div>

        {/* Primary Language */}
        <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#087F68]" />
            <span className="font-medium text-[#172B2A]">Primary Language</span>
          </div>
          <select
            value={profile.preferredLanguage}
            onChange={(e) => {
              const updated = { ...profile, preferredLanguage: e.target.value };
              setProfile(updated);
              dbStorage.saveProfile(updated);
            }}
            className="bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-2.5 py-1 text-xs font-bold text-[#087F68] focus:outline-none"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        {/* Travel Notifications */}
        <div className="flex items-center justify-between text-xs py-1">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#087F68]" />
            <span className="font-medium text-[#172B2A]">Safety & Scam Alerts</span>
          </div>
          <input
            type="checkbox"
            checked={profile.notificationEnabled}
            onChange={(e) => {
              const updated = { ...profile, notificationEnabled: e.target.checked };
              setProfile(updated);
              dbStorage.saveProfile(updated);
            }}
            className="w-4 h-4 rounded text-[#087F68] focus:ring-[#087F68]"
          />
        </div>
      </div>

      {/* Data Management & Export / Reset */}
      <div className="bg-white rounded-2xl border border-[#E2E8E6] p-4 shadow-xs space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B2A]">
          Data Portability & Backup
        </h4>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            className="flex-1 py-2.5 bg-[#F5F7F7] hover:bg-[#E6F6EF] border border-[#E2E8E6] text-[#075B4E] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export User Data (JSON)</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors"
            title="Reset All Local Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* About TOURISTO */}
      <div className="text-center p-4 bg-white rounded-2xl border border-[#E2E8E6] shadow-xs space-y-2">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl p-1 bg-white border border-[#E2E8E6] shadow-md overflow-hidden ring-4 ring-[#E6F6EF]">
            <img 
              src="/assets/aistudio/WhatsApp_Image_2026-10-31_at_9.52.03_AM_17298cf5.jpeg" 
              alt="Touristo Official Logo" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
        <p className="font-extrabold text-sm text-[#087F68]">TOURISTO</p>
        <p className="text-xs font-semibold text-[#075B4E]">Travel Smart. Travel Safe.</p>
        <p className="text-[11px] text-[#62716F]">Your AI Travel Companion for India · Version 2.4.0</p>
        <p className="text-[10px] text-slate-400">Reserve Bank of India & Delhi Police Open Data Integrated</p>
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 border border-[#E2E8E6] shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-sm text-[#172B2A]">Edit Traveler Profile</h4>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">Nationality</label>
                <input
                  type="text"
                  value={nationalityInput}
                  onChange={(e) => setNationalityInput(e.target.value)}
                  className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#62716F] mb-1 block">Blood Group</label>
                  <input
                    type="text"
                    value={bloodGroupInput}
                    onChange={(e) => setBloodGroupInput(e.target.value)}
                    className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#62716F] mb-1 block">Phone</label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2"
                  />
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold text-xs rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {isAddContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 border border-[#E2E8E6] shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-sm text-[#172B2A]">Add Emergency Contact</h4>
              <button onClick={() => setIsAddContactOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddContact} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. David Miller"
                  className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">Relationship</label>
                <select
                  value={contactRelation}
                  onChange={(e) => setContactRelation(e.target.value)}
                  className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-2 py-2"
                >
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Embassy">Embassy Official</option>
                  <option value="Hotel">Hotel Concierge</option>
                  <option value="Colleague">Colleague</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#62716F] mb-1 block">Phone Number (with Country Code)</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 (555) 012-3456"
                  className="w-full text-xs bg-[#F5F7F7] border border-[#E2E8E6] rounded-xl px-3 py-2"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#087F68] hover:bg-[#075B4E] text-white font-bold text-xs rounded-xl"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
