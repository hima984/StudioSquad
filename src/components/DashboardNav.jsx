import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, MessageSquare,
  User, Settings, LogOut, Brush, Menu, X
} from 'lucide-react';
import './DashboardNav.css';

// ─────────────────────────────────────────────────────────────────
//  DashboardNav.jsx  –  Shared sidebar navigation for all
//  app-internal pages (Dashboard, Courses, Communities, Feed, Profile)
// ─────────────────────────────────────────────────────────────────

/* ── Navigation items with routes ───────────────────────────── */
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'overview',   route: '/dashboard'    },
  { icon: BookOpen,        label: 'Courses',   id: 'courses',    route: '/courses'      },
  { icon: Users,           label: 'Community', id: 'community',  route: '/communities'  },
  { icon: MessageSquare,   label: 'Feed',      id: 'feed',       route: '/feed'         },
  { icon: User,            label: 'Profile',   id: 'profile',    route: '/profile'      },
];

const DashboardNav = ({ activePage }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Read username from localStorage
  const displayName = localStorage.getItem('userName') || 'Creator';
  const initials = displayName.slice(0, 2).toUpperCase();

  const closeMobile = () => setMobileOpen(false);

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="dash-nav-logo">
        <div className="dash-nav-logo-icon">
          <Brush size={14} className="text-white" />
        </div>
        <span>StudioSquad</span>
      </div>

      {/* User card */}
      <Link to="/profile" className="dash-nav-user" title="Edit profile" onClick={closeMobile}>
        <div className="dash-nav-avatar">{initials}</div>
        <div>
          <p className="dash-nav-user-name">{displayName}</p>
          <p className="dash-nav-user-sub">View profile →</p>
        </div>
      </Link>

      {/* Nav items */}
      <nav className="dash-nav-links">
        {navItems.map(({ icon: Icon, label, id, route }) => (
          <Link
            key={id}
            to={route}
            className={`dash-nav-item ${activePage === id ? 'active' : ''}`}
            onClick={closeMobile}
          >
            <Icon
              size={15}
              style={{ color: activePage === id ? '#f6ad55' : 'rgba(255,255,255,0.45)' }}
            />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="dash-nav-footer">
        <Link to="/dashboard" className="dash-nav-footer-btn" onClick={closeMobile}>
          <Settings size={13} /> Settings
        </Link>
        <button
          className="dash-nav-footer-btn danger"
          onClick={() => { closeMobile(); navigate('/login'); }}
        >
          <LogOut size={13} /> Log out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop Sidebar ──────────────────────────── */}
      <aside className="dash-nav">
        <NavContent />
      </aside>

      {/* ── Mobile Top Bar ───────────────────────────── */}
      <div className="dash-mobile-bar">
        <div className="dash-nav-logo">
          <div className="dash-nav-logo-icon">
            <Brush size={14} className="text-white" />
          </div>
          <span>StudioSquad</span>
        </div>
        <button
          className="dash-hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile Drawer Overlay ─────────────────────── */}
      {mobileOpen && (
        <div className="dash-mobile-overlay" onClick={closeMobile}>
          <aside
            className="dash-mobile-drawer"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="dash-drawer-close"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <NavContent />
          </aside>
        </div>
      )}
    </>
  );
};

export default DashboardNav;
