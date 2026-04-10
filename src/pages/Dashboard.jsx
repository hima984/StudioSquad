import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search, Bell, Play, Clock, Star,
  Bookmark, ChevronRight, Plus, Heart,
  MessageCircle, Eye, Edit3,
} from 'lucide-react';

import Chatbot from '../components/Chatbot';
import DashboardNav from '../components/DashboardNav';
import {
  mockCommunities, mockCourses, mockPosts, mockProjects, interestTagMap
} from '../data/mockData';
import './Dashboard.css';

/* ─────────────────────────────────────────────────────────────────
   Dashboard.jsx  –  Personalized main dashboard for StudioSquad
   Uses shared DashboardNav sidebar. Reads interests from localStorage.
───────────────────────────────────────────────────────────────── */

/* ── Filter tab labels ────────────────────────────────────────── */
const allFilters = [
  'All', 'Illustration', 'Character Design', 'UI/UX Design',
  'Digital Art', 'Animation', 'Concept Art', 'Photography',
];

/* ── Ongoing lesson fixture ───────────────────────────────────── */
const ongoingLesson = {
  title: 'Character Design Fundamentals',
  subtitle: 'Lesson 12 — Body Proportions',
  progress: 65,
  timeLeft: '1h 34m left',
  thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
};

/* ══════════════════════════════════════════════════════════════
   Hook: resolve interests from localStorage → tag set
═══════════════════════════════════════════════════════════════ */
const usePersonalization = () => {
  return useMemo(() => {
    try {
      const stored = localStorage.getItem('userInterests');
      if (!stored) return { interests: [], relevantTags: new Set() };
      const interests = JSON.parse(stored);
      const tags = new Set();
      interests.forEach(id => {
        (interestTagMap[id] || []).forEach(t => tags.add(t.toLowerCase()));
      });
      return { interests, relevantTags: tags };
    } catch {
      return { interests: [], relevantTags: new Set() };
    }
  }, []);
};

/* ── Filter content by user interests ──────────────────────── */
const filterByInterest = (items, tags) => {
  if (tags.size === 0) return items;
  return items.filter(item => {
    const itemTags = (item.tags || []).concat([item.category]).map(t => t.toLowerCase());
    return itemTags.some(t => tags.has(t));
  });
};

/* ══════════════════════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════════════════════ */

/* ── Course Card ────────────────────────────────────────────── */
const CourseCard = ({ course }) => {
  const [saved, setSaved] = useState(course.isSaved);

  const progressLabel = () => {
    if (course.progress === 100) return '✅ Done';
    if (course.progress > 0) return `${course.progress}%`;
    return 'Not started';
  };

  return (
    <div className="course-card">
      <div className={`course-thumbnail bg-gradient-to-br ${course.coverColor}`}>
        <span className="emoji">{course.emoji}</span>
        <button
          className="course-bookmark"
          onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark course'}
        >
          <Bookmark size={13} className={saved ? 'fill-[#d35400] text-[#d35400]' : 'text-[#4e342e]/50'} />
        </button>
        <span className="course-badge">{progressLabel()}</span>
      </div>

      <div className="course-body">
        <span className="course-category">{course.category}</span>
        <h3 className="course-title">{course.title}</h3>
        <p style={{ fontSize: '0.7rem', color: 'rgba(78,52,46,0.45)' }}>by {course.instructor}</p>

        <div className="course-meta">
          <Clock size={10} />
          <span>{course.duration}</span>
          <span className="meta-divider" />
          <Play size={10} />
          <span>{course.lessons} lessons</span>
        </div>

        {course.progress > 0 && (
          <div className="course-progress-bar">
            <div className="course-progress-fill" style={{ width: `${course.progress}%` }} />
          </div>
        )}

        <div className="course-footer">
          <div className="course-rating">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <strong>{course.rating}</strong>
            <span>· {course.students.toLocaleString()} students</span>
          </div>
          <Link to="/courses" aria-label="View course">
            <ChevronRight size={13} className="text-[#4e342e]/40" />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ── Community Card ─────────────────────────────────────────── */
const CommunityCard = ({ community }) => {
  const [joined, setJoined] = useState(community.isJoined);

  return (
    <div className="community-card">
      <div className={`community-icon bg-gradient-to-br ${community.coverColor}`}>
        {community.emoji}
      </div>
      <div className="community-info">
        <div className="community-name">{community.name}</div>
        <div className="community-desc">{community.description}</div>
        <div className="community-meta">
          <span className="community-stat">👥 {community.members.toLocaleString()} members</span>
          <button
            className={`community-join-btn ${joined ? 'joined' : 'not-joined'}`}
            onClick={() => setJoined(!joined)}
          >
            {joined ? '✓ Joined' : 'Join'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Post Card ──────────────────────────────────────────────── */
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className={`post-avatar bg-gradient-to-br ${post.author.avatarColor}`}>
          {post.author.initials}
        </div>
        <div>
          <div className="post-author-name">{post.author.name}</div>
          <div className="post-meta-row">
            <span className="post-community">{post.community}</span>
            <span> · {post.timeAgo}</span>
          </div>
        </div>
      </div>

      <p className="post-content">{post.content}</p>

      {post.image && (
        <img src={post.image} alt="Post attachment" className="post-image" loading="lazy" />
      )}

      {post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="post-tag">#{tag}</span>
          ))}
        </div>
      )}

      <div className="post-actions">
        <button className={`post-action-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
          <Heart size={14} className={liked ? 'fill-[#d35400]' : ''} />
          <span>{likeCount}</span>
        </button>
        <button className="post-action-btn">
          <MessageCircle size={14} />
          <span>{post.comments}</span>
        </button>
      </div>
    </div>
  );
};

/* ── Project Card ────────────────────────────────────────────── */
const ProjectCard = ({ project }) => (
  <div className="project-card">
    {/* Top: color band with emoji */}
    <div className={`project-thumb bg-gradient-to-br ${project.coverColor}`}>
      <span className="project-emoji">{project.emoji}</span>
      <span className={`project-status-badge ${project.statusColor}`}>
        {project.status}
      </span>
    </div>

    {/* Card body */}
    <div className="project-body">
      <span className="project-category">{project.category}</span>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="project-meta">
        <span className="project-time">✏️ {project.lastEdited}</span>
      </div>

      <div className="project-footer">
        <div className="project-stats">
          <span><Heart size={11} /> {project.likes}</span>
          <span><Eye size={11} /> {project.views}</span>
        </div>
        <button className="project-edit-btn">
          <Edit3 size={11} /> Edit
        </button>
      </div>
    </div>
  </div>
);

/* ── Right Panel: Ongoing lesson + stats + live ──────────────── */
const RightPanel = () => (
  <aside className="right-panel">

    {/* Ongoing lesson */}
    <div>
      <div className="section-heading">
        <h2>Ongoing</h2>
      </div>
      <div className="ongoing-card">
        <div className="ongoing-thumb">
          <img src={ongoingLesson.thumbnail} alt="Ongoing lesson" />
          <div className="ongoing-thumb-overlay">
            <button className="play-btn" aria-label="Resume lesson">
              <Play size={12} className="text-[#d35400] translate-x-0.5" fill="#d35400" />
            </button>
          </div>
        </div>
        <div className="ongoing-info">
          <span className="ongoing-label">In Progress</span>
          <p className="ongoing-title">{ongoingLesson.title}</p>
          <p className="ongoing-subtitle">{ongoingLesson.subtitle}</p>
          <div className="ongoing-progress">
            <div className="ongoing-bar">
              <div className="ongoing-bar-fill" style={{ width: `${ongoingLesson.progress}%` }} />
            </div>
            <span className="ongoing-pct">{ongoingLesson.progress}%</span>
          </div>
          <div className="course-meta" style={{ fontSize: '0.7rem', color: 'rgba(78,52,46,0.45)' }}>
            <Clock size={10} />
            <span>{ongoingLesson.timeLeft}</span>
          </div>
          <Link to="/courses" className="ongoing-continue-btn">Continue →</Link>
        </div>
      </div>
    </div>

    {/* Weekly stats */}
    <div className="stat-card">
      <p className="stat-card-title">This Week</p>
      {[
        { label: 'Hours Learned', value: '6.5h',    icon: '⏱' },
        { label: 'Lessons Done',  value: '9',        icon: '✅' },
        { label: 'Streak',        value: '5 days 🔥', icon: '' },
      ].map(s => (
        <div key={s.label} className="stat-row">
          <span className="stat-label">{s.icon} {s.label}</span>
          <span className="stat-value">{s.value}</span>
        </div>
      ))}
    </div>

    {/* Live session CTA */}
    <div className="live-card">
      <div className="live-badge">
        <span className="live-dot" />
        LIVE NOW
      </div>
      <h3>Critique Session</h3>
      <p>Today at 7:00 PM · 43 artists joining</p>
      <button className="live-join-btn">Join Session →</button>
    </div>
  </aside>
);

/* ══════════════════════════════════════════════════════════════
   MAIN DASHBOARD COMPONENT
═══════════════════════════════════════════════════════════════ */
const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Personalization — reads from localStorage
  const { interests, relevantTags } = usePersonalization();

  /* ── Display name ── */
  const displayName = useMemo(() => localStorage.getItem('userName') || 'Creator', []);

  /* ── Interest labels for welcome banner ── */
  const interestLabels = useMemo(() => {
    const allDomains = {
      'graphic-design': 'Graphic Design', 'illustration': 'Illustration',
      'digital-art': 'Digital Art',       'photography': 'Photography',
      'handmade-crafts': 'Handmade Crafts', 'animation': 'Animation',
      'uiux-design': 'UI/UX Design',       'writing': 'Writing',
      'content-creation': 'Content Creation', 'video-editing': 'Video Editing',
      'music-production': 'Music Production', 'web-dev': 'Web Dev',
      'marketing': 'Marketing',            'social-media': 'Social Media',
      'character-design': 'Character Design', 'concept-art': 'Concept Art',
    };
    return interests.map(id => allDomains[id] || id).slice(0, 5);
  }, [interests]);

  /* ── Personalized communities ── */
  const recommendedCommunities = useMemo(() => {
    const filtered = filterByInterest(mockCommunities, relevantTags);
    return filtered.length > 0 ? filtered : mockCommunities;
  }, [relevantTags]);

  /* ── Personalized + filtered courses ── */
  const suggestedCourses = useMemo(() => {
    const filtered = filterByInterest(mockCourses, relevantTags);
    return filtered.length > 0 ? filtered : mockCourses;
  }, [relevantTags]);

  const displayedCourses = useMemo(() => {
    return suggestedCourses.filter(c => {
      const matchFilter = activeFilter === 'All' || c.category === activeFilter;
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [suggestedCourses, activeFilter, search]);

  /* ── Personalized feed ── */
  const feedPosts = useMemo(() => {
    const filtered = filterByInterest(mockPosts, relevantTags);
    return filtered.length > 0 ? filtered : mockPosts;
  }, [relevantTags]);

  return (
    <div className="dashboard-root">

      {/* ── Sidebar (shared component) ─────────────────────── */}
      <DashboardNav activePage="overview" />

      {/* ── Main content ────────────────────────────────────── */}
      <div className="main-content">

        {/* ── Top bar ─────────────────────────────────────── */}
        <header className="topbar">
          <h1 className="topbar-title">Dashboard</h1>

          {/* Search */}
          <div className="topbar-search">
            <Search size={13} className="topbar-search-icon" />
            <input
              type="text"
              placeholder="Search courses, posts, communities…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Bell */}
          <button className="topbar-bell" aria-label="Notifications">
            <Bell size={15} />
            <span className="bell-dot" />
          </button>

          {/* Quick Create */}
          <Link to="/feed" className="topbar-quick-create">
            <Plus size={14} />
            Share Work
          </Link>
        </header>

        {/* ── Scrollable dashboard body ────────────────────── */}
        <div className="dashboard-body">

          {/* Centre column */}
          <div className="centre-col">

            {/* ── Welcome Banner ── */}
            <div className="welcome-banner">
              <div>
                <h1>Welcome back, {displayName}! 👋</h1>
                <p>Here's what's personalized just for you today.</p>

                {interestLabels.length > 0 && (
                  <div className="interest-tags">
                    {interestLabels.map(label => (
                      <span key={label} className="interest-tag">{label}</span>
                    ))}
                    {interests.length > 5 && (
                      <span className="interest-tag">+{interests.length - 5} more</span>
                    )}
                  </div>
                )}

                {interests.length === 0 && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>
                    <Link to="/onboard" style={{ color: '#f6ad55', fontWeight: 600 }}>
                      Set your interests →
                    </Link>
                    {' '}to get personalized recommendations
                  </div>
                )}
              </div>
              <span className="welcome-emoji">🎨</span>
            </div>

            {/* ── My Projects ─────────────────────────────────── */}
            <section>
              <div className="section-heading">
                <h2>My Projects</h2>
                <button
                  onClick={() => {/* open create project modal */}}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Plus size={12} /> New Project
                </button>
              </div>
              <div className="project-grid">
                {mockProjects.map(proj => (
                  <ProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            </section>

            {/* ── Recommended Communities ── */}
            <section>
              <div className="section-heading">
                <h2>Recommended Communities</h2>
                <Link to="/communities" style={{ fontSize: '0.78rem', fontWeight: 500, color: '#d35400', textDecoration: 'none' }}>
                  See all →
                </Link>
              </div>
              <div className="community-grid">
                {recommendedCommunities.slice(0, 4).map(c => (
                  <CommunityCard key={c.id} community={c} />
                ))}
              </div>
            </section>

            {/* ── Suggested Courses ── */}
            <section>
              <div className="section-heading">
                <h2>Suggested Courses</h2>
                <Link to="/courses" style={{ fontSize: '0.78rem', fontWeight: 500, color: '#d35400', textDecoration: 'none' }}>
                  Browse all →
                </Link>
              </div>

              {/* Filter tabs */}
              <div className="filter-tabs">
                {allFilters.map(f => (
                  <button
                    key={f}
                    className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {displayedCourses.length > 0 ? (
                <div className="course-grid">
                  {displayedCourses.slice(0, 6).map(c => (
                    <CourseCard key={c.id} course={c} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">No courses found for "{search}"</div>
              )}
            </section>

            {/* ── Trending Posts ── */}
            <section>
              <div className="section-heading">
                <h2>Trending in Your Feed</h2>
                <Link to="/feed" style={{ fontSize: '0.78rem', fontWeight: 500, color: '#d35400', textDecoration: 'none' }}>
                  View all posts →
                </Link>
              </div>
              <div className="post-feed">
                {feedPosts.slice(0, 4).map(p => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </section>

          </div>

          {/* ── Right panel ── */}
          <RightPanel />
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;
