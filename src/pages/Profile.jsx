import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Camera, Save, CheckCircle, Brush,
  AtSign, Share2, Globe, Edit3, User, Link2
} from 'lucide-react';
import toast from 'react-hot-toast';
import Chatbot from '../components/Chatbot';
import './Profile.css';

// ─────────────────────────────────────────────────────────────────
//  Profile.jsx  –  Editable user profile page
//  Saves all changes to localStorage
// ─────────────────────────────────────────────────────────────────

/* ── Available avatar gradient pickers ───────────────────────── */
const avatarGradients = [
  { id: 'g1', value: 'linear-gradient(135deg, #f6ad55, #f6e05e)', label: 'Sunset' },
  { id: 'g2', value: 'linear-gradient(135deg, #d35400, #e8874c)', label: 'Terracotta' },
  { id: 'g3', value: 'linear-gradient(135deg, #6b21a8, #a855f7)', label: 'Amethyst' },
  { id: 'g4', value: 'linear-gradient(135deg, #0369a1, #38bdf8)', label: 'Ocean' },
  { id: 'g5', value: 'linear-gradient(135deg, #065f46, #34d399)', label: 'Forest' },
  { id: 'g6', value: 'linear-gradient(135deg, #be185d, #fb7185)', label: 'Rose' },
];

/* ── Skill level labels ──────────────────────────────────────── */
const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

/* ── Creative domain options ─────────────────────────────────── */
const domainOptions = [
  'Digital Art', 'Illustration', 'Character Design', 'Concept Art',
  'UI/UX Design', 'Graphic Design', 'Photography', 'Animation',
  'Motion Design', 'Typography', '3D Art', 'Video Editing',
];

/* ══════════════════════════════════════════════════════════════
   MAIN PROFILE COMPONENT
═══════════════════════════════════════════════════════════════ */
const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ── Load saved profile from localStorage ──────────────────
  const loadProfile = () => {
    try {
      const saved = localStorage.getItem('userProfile');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore parse errors */ }

    // Default values for first-time users
    const name = localStorage.getItem('userName') || 'Creator';
    return {
      displayName: name,
      username: `@${name.toLowerCase().replace(/\s+/g, '_')}`,
      bio: 'Creative artist and visual storyteller. Sharing my journey through color, line, and imagination.',
      location: '',
      website: '',
      instagram: '',
      twitter: '',
      skillLevel: 'Intermediate',
      domains: ['Digital Art', 'Illustration'],
      selectedGradient: avatarGradients[0].value,
      avatarImage: null, // base64 string or null
    };
  };

  // ── State ──────────────────────────────────────────────────
  const [profile, setProfile] = useState(loadProfile);
  const [isDirty, setIsDirty] = useState(false);   // track unsaved changes
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // temporary image preview

  // Sync previewUrl with saved avatarImage on load
  useEffect(() => {
    if (profile.avatarImage) setPreviewUrl(profile.avatarImage);
  }, []);

  // ── Field updater helper ───────────────────────────────────
  const updateField = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  // ── Handle photo file selection ────────────────────────────
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only allow image files under 5MB
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5 MB.');
      return;
    }

    // Convert to base64 for localStorage storage
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setPreviewUrl(base64);
      updateField('avatarImage', base64);
    };
    reader.readAsDataURL(file);
  };

  // ── Toggle domain selection ────────────────────────────────
  const toggleDomain = (domain) => {
    setProfile(prev => {
      const already = prev.domains.includes(domain);
      const updated = already
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain];
      return { ...prev, domains: updated };
    });
    setIsDirty(true);
  };

  // ── Save to localStorage ───────────────────────────────────
  const handleSave = () => {
    // Basic validation
    if (!profile.displayName.trim()) {
      toast.error('Display name cannot be empty.');
      return;
    }
    if (profile.displayName.trim().length < 2) {
      toast.error('Display name must be at least 2 characters.');
      return;
    }

    setSaving(true);

    // Simulate a short save delay (feels professional)
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      // Also sync userName so Dashboard picks it up
      localStorage.setItem('userName', profile.displayName.trim());
      setSaving(false);
      setIsDirty(false);
      toast.success('Profile saved successfully! ✨');
    }, 800);
  };

  // ── Avatar display logic ───────────────────────────────────
  const avatarInitials = profile.displayName?.slice(0, 2).toUpperCase() || 'ME';

  return (
    <div className="profile-page">

      {/* ── Header bar ──────────────────────────────────────── */}
      <header className="profile-header">
        {/* Logo / back */}
        <div className="profile-header-left">
          <Link to="/dashboard" className="profile-back-btn" aria-label="Back to dashboard">
            <ArrowLeft size={16} />
          </Link>
          <div className="profile-logo">
            <div className="profile-logo-icon">
              <Brush size={14} className="text-white" />
            </div>
            <span>StudioSquad</span>
          </div>
        </div>

        {/* Nav title */}
        <h1 className="profile-header-title">Edit Profile</h1>

        {/* Save button */}
        <div className="profile-header-right">
          {isDirty && (
            <span className="profile-unsaved-badge">Unsaved changes</span>
          )}
          <button
            className={`profile-save-btn ${saving ? 'saving' : ''}`}
            onClick={handleSave}
            disabled={saving || !isDirty}
          >
            {saving ? (
              <span className="profile-save-spinner" />
            ) : (
              <Save size={14} />
            )}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </header>

      {/* ── Page body ────────────────────────────────────────── */}
      <div className="profile-body">

        {/* ── Left panel: Avatar + quick stats ─────────────── */}
        <aside className="profile-left-panel">

          {/* Avatar */}
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrap">
              {/* Photo or gradient initials */}
              <div
                className="profile-avatar"
                style={{
                  background: previewUrl ? 'transparent' : profile.selectedGradient,
                }}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile" className="profile-avatar-img" />
                ) : (
                  <span className="profile-avatar-initials">{avatarInitials}</span>
                )}
              </div>

              {/* Camera button overlay */}
              <button
                className="profile-avatar-camera"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change profile photo"
              >
                <Camera size={14} />
              </button>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>

            <p className="profile-avatar-hint">
              Click the camera to upload a photo<br />
              <span>PNG, JPG or WebP · Max 5 MB</span>
            </p>

            {/* Remove photo button */}
            {previewUrl && (
              <button
                className="profile-remove-photo"
                onClick={() => {
                  setPreviewUrl(null);
                  updateField('avatarImage', null);
                }}
              >
                Remove photo
              </button>
            )}
          </div>

          {/* Gradient picker */}
          <div className="profile-gradient-section">
            <p className="profile-section-label">Avatar Color</p>
            <p className="profile-section-hint">Used when no photo is uploaded</p>
            <div className="profile-gradient-grid">
              {avatarGradients.map(g => (
                <button
                  key={g.id}
                  className={`profile-gradient-swatch ${profile.selectedGradient === g.value ? 'selected' : ''}`}
                  style={{ background: g.value }}
                  onClick={() => updateField('selectedGradient', g.value)}
                  aria-label={g.label}
                  title={g.label}
                >
                  {profile.selectedGradient === g.value && (
                    <CheckCircle size={14} className="text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quick stats card */}
          <div className="profile-stats-card">
            <p className="profile-section-label" style={{ marginBottom: '0.75rem' }}>Profile Stats</p>
            {[
              { label: 'Projects', value: '6' },
              { label: 'Courses', value: '8' },
              { label: 'Followers', value: '1.2K' },
              { label: 'Following', value: '243' },
            ].map(s => (
              <div key={s.label} className="profile-stat-row">
                <span>{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Right panel: Editable fields ─────────────────── */}
        <main className="profile-main-panel">

          {/* ── Section: Basic Info ───────────────────────── */}
          <section className="profile-card">
            <div className="profile-card-header">
              <User size={16} />
              <h2>Basic Information</h2>
            </div>

            <div className="profile-form-grid">
              {/* Display Name */}
              <div className="profile-field">
                <label htmlFor="displayName">Display Name *</label>
                <input
                  id="displayName"
                  type="text"
                  value={profile.displayName}
                  onChange={e => updateField('displayName', e.target.value)}
                  placeholder="Your creative name"
                  maxLength={40}
                />
                <span className="profile-char-count">{profile.displayName.length}/40</span>
              </div>

              {/* Username */}
              <div className="profile-field">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={profile.username}
                  onChange={e => updateField('username', e.target.value)}
                  placeholder="@yourhandle"
                  maxLength={30}
                />
                <span className="profile-char-count">{profile.username.length}/30</span>
              </div>

              {/* Location */}
              <div className="profile-field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  value={profile.location}
                  onChange={e => updateField('location', e.target.value)}
                  placeholder="City, Country"
                  maxLength={50}
                />
              </div>

              {/* Skill Level */}
              <div className="profile-field">
                <label htmlFor="skillLevel">Skill Level</label>
                <select
                  id="skillLevel"
                  value={profile.skillLevel}
                  onChange={e => updateField('skillLevel', e.target.value)}
                >
                  {skillLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Bio — full width */}
              <div className="profile-field full-width">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={e => updateField('bio', e.target.value)}
                  placeholder="Tell the community a bit about yourself — your style, inspiration, or creative journey…"
                  maxLength={280}
                />
                <span className="profile-char-count">{profile.bio.length}/280</span>
              </div>
            </div>
          </section>

          {/* ── Section: Creative Domains ─────────────────── */}
          <section className="profile-card">
            <div className="profile-card-header">
              <Edit3 size={16} />
              <h2>Creative Domains</h2>
            </div>
            <p className="profile-card-desc">
              Select all that apply — this personalizes your recommendations.
            </p>
            <div className="profile-domain-grid">
              {domainOptions.map(domain => (
                <button
                  key={domain}
                  className={`profile-domain-chip ${profile.domains.includes(domain) ? 'selected' : ''}`}
                  onClick={() => toggleDomain(domain)}
                >
                  {profile.domains.includes(domain) && <CheckCircle size={12} />}
                  {domain}
                </button>
              ))}
            </div>
          </section>

          {/* ── Section: Social Links ─────────────────────── */}
          <section className="profile-card">
            <div className="profile-card-header">
              <Link2 size={16} />
              <h2>Links & Social</h2>
            </div>

            <div className="profile-social-list">
              {/* Website */}
              <div className="profile-social-field">
                <div className="profile-social-icon">
                  <Globe size={14} />
                </div>
                <input
                  type="url"
                  value={profile.website}
                  onChange={e => updateField('website', e.target.value)}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              {/* Instagram / Social handle */}
              <div className="profile-social-field">
                <div className="profile-social-icon instagram">
                  <AtSign size={14} />
                </div>
                <input
                  type="text"
                  value={profile.instagram}
                  onChange={e => updateField('instagram', e.target.value)}
                  placeholder="@instagramhandle"
                />
              </div>

              {/* Twitter / X handle */}
              <div className="profile-social-field">
                <div className="profile-social-icon twitter">
                  <Share2 size={14} />
                </div>
                <input
                  type="text"
                  value={profile.twitter}
                  onChange={e => updateField('twitter', e.target.value)}
                  placeholder="@twitterhandle"
                />
              </div>
            </div>
          </section>

          {/* ── Bottom save button (for convenience on mobile) ── */}
          <div className="profile-bottom-save">
            <button
              className={`profile-save-btn large ${saving ? 'saving' : ''}`}
              onClick={handleSave}
              disabled={saving || !isDirty}
            >
              {saving ? <span className="profile-save-spinner" /> : <Save size={16} />}
              {saving ? 'Saving…' : 'Save All Changes'}
            </button>
            <Link to="/dashboard" className="profile-cancel-link">
              ← Back to Dashboard
            </Link>
          </div>

        </main>
      </div>

      {/* Floating chatbot */}
      <Chatbot />
    </div>
  );
};

export default Profile;
