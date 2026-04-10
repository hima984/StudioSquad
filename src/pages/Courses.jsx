import React, { useState, useMemo } from 'react';
import {
  Search, Star, Clock, Play, Bookmark,
  ChevronRight, Plus, TrendingUp
} from 'lucide-react';
import Chatbot from '../components/Chatbot';
import DashboardNav from '../components/DashboardNav';
import { mockCourses } from '../data/mockData';
import './Courses.css';

// ─────────────────────────────────────────────────────────────────
//  Courses.jsx  –  Browse all available courses
// ─────────────────────────────────────────────────────────────────

const categoryFilters = [
  'All', 'Digital Art', 'Illustration', 'Character Design',
  'UI/UX Design', 'Animation', 'Concept Art', 'Photography', 'Graphic Design',
];

const levelFilters = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

/* ── Large course card for the Courses page ────────────────── */
const CourseBigCard = ({ course }) => {
  const [saved, setSaved] = useState(course.isSaved);

  const progressLabel = () => {
    if (course.progress === 100) return '✅ Completed';
    if (course.progress > 0) return `${course.progress}% done`;
    return 'Not started';
  };

  const progressColor =
    course.progress === 100 ? 'text-emerald-600' :
    course.progress > 0 ? 'text-amber-600' :
    'text-gray-400';

  return (
    <div className="course-big-card">
      {/* Left: thumbnail */}
      <div className={`course-big-thumb bg-gradient-to-br ${course.coverColor}`}>
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} loading="lazy" />
        ) : null}
        <div className="course-big-thumb-overlay" />
        <span className="course-big-emoji">{course.emoji}</span>

        {/* Bookmark */}
        <button
          className="course-big-bookmark"
          onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark course'}
        >
          <Bookmark
            size={14}
            className={saved ? 'fill-[#d35400] text-[#d35400]' : 'text-[#4e342e]/50'}
          />
        </button>
      </div>

      {/* Right: info */}
      <div className="course-big-body">
        <div className="course-big-top">
          <span className="course-big-category">{course.category}</span>
          <span className="course-big-level">{course.level}</span>
        </div>

        <h3 className="course-big-title">{course.title}</h3>
        <p className="course-big-desc">{course.description}</p>

        <div className="course-big-instructor">
          <div className={`course-instructor-avatar bg-gradient-to-br ${course.instructorColor}`}>
            {course.instructorAvatar}
          </div>
          <span>by <strong>{course.instructor}</strong></span>
        </div>

        <div className="course-big-meta">
          <div className="course-big-meta-item">
            <Clock size={12} />
            <span>{course.duration}</span>
          </div>
          <div className="course-big-meta-item">
            <Play size={12} />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="course-big-meta-item">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>{course.rating} · {course.students.toLocaleString()} students</span>
          </div>
        </div>

        {/* Progress bar if started */}
        {course.progress > 0 && (
          <div className="course-big-progress">
            <div className="course-big-progress-bar">
              <div
                className="course-big-progress-fill"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className={`course-big-progress-label ${progressColor}`}>
              {progressLabel()}
            </span>
          </div>
        )}

        <div className="course-big-footer">
          <span className="course-big-price">{course.price}</span>
          <button className="course-big-cta">
            {course.progress > 0 ? 'Continue →' : 'Start Course →'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Stats banner ────────────────────────────────────────────── */
const StatsBanner = () => (
  <div className="courses-stats-banner">
    {[
      { emoji: '🎓', value: '120+', label: 'Courses Available' },
      { emoji: '⭐', value: '4.8', label: 'Average Rating' },
      { emoji: '👩‍🎨', value: '48K', label: 'Enrolled Students' },
      { emoji: '🏆', value: '100%', label: 'Creator-Led Teaching' },
    ].map(s => (
      <div key={s.label} className="stat-banner-item">
        <span className="stat-banner-emoji">{s.emoji}</span>
        <span className="stat-banner-value">{s.value}</span>
        <span className="stat-banner-label">{s.label}</span>
      </div>
    ))}
  </div>
);

/* ══════════════════════════════════════════════════════════════
   MAIN COURSES PAGE
═══════════════════════════════════════════════════════════════ */
const Courses = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All Levels');

  const filtered = useMemo(() => {
    return mockCourses.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
        || c.instructor.toLowerCase().includes(search.toLowerCase())
        || c.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === 'All' || c.category === activeCategory;
      const matchLevel = activeLevel === 'All Levels' || c.level === activeLevel;
      return matchSearch && matchCategory && matchLevel;
    });
  }, [search, activeCategory, activeLevel]);

  return (
    <div className="courses-page">
      <DashboardNav activePage="courses" />

      <div className="courses-main">

        {/* Top bar */}
        <header className="courses-topbar">
          <div>
            <h1 className="courses-topbar-title">Courses</h1>
            <p className="courses-topbar-sub">Learn from the best creators in the community</p>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="courses-body">
          {/* Stats */}
          <StatsBanner />

          {/* Search + filters */}
          <div className="courses-filter-area">
            {/* Search */}
            <div className="courses-search-wrap">
              <Search size={14} className="courses-search-icon" />
              <input
                type="text"
                placeholder="Search courses, instructors…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="courses-search-input"
              />
            </div>

            {/* Category pills */}
            <div className="courses-filter-row">
              <span className="courses-filter-label">Category:</span>
              <div className="courses-filter-tabs">
                {categoryFilters.map(f => (
                  <button
                    key={f}
                    className={`courses-filter-tab ${activeCategory === f ? 'active' : ''}`}
                    onClick={() => setActiveCategory(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Level pills */}
            <div className="courses-filter-row">
              <span className="courses-filter-label">Level:</span>
              <div className="courses-filter-tabs">
                {levelFilters.map(f => (
                  <button
                    key={f}
                    className={`courses-filter-tab ${activeLevel === f ? 'active' : ''}`}
                    onClick={() => setActiveLevel(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Count */}
          <div className="courses-count-row">
            <span className="courses-count-label">
              {filtered.length} {filtered.length === 1 ? 'course' : 'courses'} found
            </span>
            <button className="courses-sort-btn">
              <TrendingUp size={12} />
              Most Popular
            </button>
          </div>

          {/* Course list */}
          {filtered.length > 0 ? (
            <div className="course-list">
              {filtered.map(c => (
                <CourseBigCard key={c.id} course={c} />
              ))}
            </div>
          ) : (
            <div className="courses-empty">
              <span>📚</span>
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); setActiveLevel('All Levels'); }} className="courses-clear-btn">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Courses;
