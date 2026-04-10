import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Users, MessageSquare, TrendingUp,
  ArrowLeft, Filter, Plus
} from 'lucide-react';
import Chatbot from '../components/Chatbot';
import DashboardNav from '../components/DashboardNav';
import { mockCommunities } from '../data/mockData';
import './Communities.css';

// ─────────────────────────────────────────────────────────────────
//  Communities.jsx  –  Browse & join creative communities
// ─────────────────────────────────────────────────────────────────

const categoryFilters = [
  'All', 'Digital Art', 'Illustration', 'Character Design',
  'UI/UX Design', 'Animation', 'Concept Art', 'Photography', 'Graphic Design',
];

/* ── Community Card ───────────────────────────────────────────── */
const CommunityFullCard = ({ community }) => {
  const [joined, setJoined] = useState(community.isJoined);

  return (
    <div className="comm-full-card">
      {/* Cover banner */}
      <div className={`comm-card-cover bg-gradient-to-br ${community.coverColor}`}>
        {community.coverImage ? (
          <img src={community.coverImage} alt={community.name} loading="lazy" />
        ) : null}
        <div className="comm-card-cover-overlay" />
        {/* Big emoji */}
        <span className="comm-card-emoji">{community.emoji}</span>
      </div>

      {/* Card body */}
      <div className="comm-card-body">
        <div className="comm-card-top">
          <span className="comm-card-category">{community.category}</span>
          <button
            className={`comm-join-btn ${joined ? 'joined' : 'not-joined'}`}
            onClick={() => setJoined(!joined)}
          >
            {joined ? '✓ Joined' : '+ Join'}
          </button>
        </div>

        <h3 className="comm-card-name">{community.name}</h3>
        <p className="comm-card-desc">{community.description}</p>

        {/* Stats row */}
        <div className="comm-card-stats">
          <div className="comm-stat">
            <Users size={13} />
            <span>{community.members.toLocaleString()} members</span>
          </div>
          <div className="comm-stat">
            <MessageSquare size={13} />
            <span>{community.posts.toLocaleString()} posts</span>
          </div>
        </div>

        {/* Tags */}
        <div className="comm-tags">
          {community.tags.map(tag => (
            <span key={tag} className="comm-tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Featured / hero community card ──────────────────────────── */
const FeaturedCommunity = ({ community }) => {
  const [joined, setJoined] = useState(community.isJoined);

  return (
    <div className="comm-featured">
      {/* Background image */}
      {community.coverImage && (
        <img
          src={community.coverImage}
          alt={community.name}
          className="comm-featured-bg"
          loading="lazy"
        />
      )}
      <div className="comm-featured-overlay" />

      {/* Content */}
      <div className="comm-featured-content">
        <span className="comm-featured-pill">⭐ Community of the Week</span>
        <div className="comm-featured-emoji">{community.emoji}</div>
        <h2 className="comm-featured-name">{community.name}</h2>
        <p className="comm-featured-desc">{community.description}</p>
        <div className="comm-featured-meta">
          <span>👥 {community.members.toLocaleString()} members</span>
          <span>·</span>
          <span>💬 {community.posts.toLocaleString()} posts</span>
        </div>
        <button
          className={`comm-featured-join ${joined ? 'joined' : ''}`}
          onClick={() => setJoined(!joined)}
        >
          {joined ? '✓ You\'re a member' : 'Join Community →'}
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMMUNITIES PAGE
═══════════════════════════════════════════════════════════════ */
const Communities = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter communities by search + category
  const filtered = useMemo(() => {
    return mockCommunities.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
        || c.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeFilter === 'All' || c.category === activeFilter;
      return matchSearch && matchCategory;
    });
  }, [search, activeFilter]);

  // Featured = most members
  const featured = mockCommunities.reduce((max, c) =>
    c.members > max.members ? c : max, mockCommunities[0]
  );

  return (
    <div className="comm-page">
      {/* Sidebar navigation */}
      <DashboardNav activePage="community" />

      {/* Main content */}
      <div className="comm-main">

        {/* Top bar */}
        <header className="comm-topbar">
          <div>
            <h1 className="comm-topbar-title">Communities</h1>
            <p className="comm-topbar-sub">Find and join creative groups that match your interests</p>
          </div>
          <button className="comm-create-btn">
            <Plus size={15} />
            Create Community
          </button>
        </header>

        {/* Scrollable body */}
        <div className="comm-body">

          {/* Featured card */}
          <FeaturedCommunity community={featured} />

          {/* Search + filter bar */}
          <div className="comm-filter-bar">
            <div className="comm-search-wrap">
              <Search size={14} className="comm-search-icon" />
              <input
                type="text"
                placeholder="Search communities…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="comm-search-input"
              />
            </div>

            <div className="comm-filter-tabs">
              {categoryFilters.map(f => (
                <button
                  key={f}
                  className={`comm-filter-tab ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Results header */}
          <div className="comm-results-header">
            <span className="comm-results-count">
              {filtered.length} {filtered.length === 1 ? 'community' : 'communities'}
              {activeFilter !== 'All' ? ` in ${activeFilter}` : ''}
            </span>
            <button className="comm-sort-btn">
              <TrendingUp size={12} />
              Most Popular
            </button>
          </div>

          {/* Community grid */}
          {filtered.length > 0 ? (
            <div className="comm-grid">
              {filtered.map(c => (
                <CommunityFullCard key={c.id} community={c} />
              ))}
            </div>
          ) : (
            <div className="comm-empty">
              <span className="comm-empty-emoji">🔍</span>
              <h3>No communities found</h3>
              <p>Try a different search or category.</p>
              <button onClick={() => { setSearch(''); setActiveFilter('All'); }} className="comm-clear-btn">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Communities;
