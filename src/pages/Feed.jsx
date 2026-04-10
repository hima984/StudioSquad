import React, { useState, useMemo } from 'react';
import {
  Heart, MessageCircle, Share2, Search,
  Filter, TrendingUp, Plus, Bookmark
} from 'lucide-react';
import Chatbot from '../components/Chatbot';
import DashboardNav from '../components/DashboardNav';
import { mockPosts } from '../data/mockData';
import './Feed.css';

// ─────────────────────────────────────────────────────────────────
//  Feed.jsx  –  Community posts feed page
// ─────────────────────────────────────────────────────────────────

const categoryFilters = [
  'All', 'Digital Art', 'Illustration', 'Character Design',
  'UI/UX Design', 'Animation', 'Concept Art', 'Photography', 'Graphic Design',
];

/* ── Full post card (bigger than dashboard version) ──────────── */
const FeedPostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    setComments(prev => prev + 1);
    setCommentText('');
    setShowComment(false);
  };

  return (
    <article className="feed-card">
      {/* Author row */}
      <div className="feed-card-header">
        <div className={`feed-avatar bg-gradient-to-br ${post.author.avatarColor}`}>
          {post.author.initials}
        </div>
        <div className="feed-author-info">
          <span className="feed-author-name">{post.author.name}</span>
          <div className="feed-author-meta">
            <span className="feed-community-tag">{post.community}</span>
            <span className="feed-dot">·</span>
            <span className="feed-time">{post.timeAgo}</span>
          </div>
        </div>
        <button
          className={`feed-bookmark-btn ${bookmarked ? 'saved' : ''}`}
          onClick={() => setBookmarked(!bookmarked)}
          aria-label="Bookmark post"
        >
          <Bookmark size={14} className={bookmarked ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Post content */}
      <p className="feed-content">{post.content}</p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post media"
          className="feed-image"
          loading="lazy"
        />
      )}

      {/* Category + Tags */}
      <div className="feed-tags">
        <span className="feed-category-tag">{post.category}</span>
        {post.tags.slice(0, 4).map(tag => (
          <span key={tag} className="feed-tag">#{tag}</span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="feed-actions">
        <button
          className={`feed-action-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <Heart size={15} className={liked ? 'fill-[#d35400]' : ''} />
          <span>{likeCount.toLocaleString()}</span>
        </button>

        <button
          className="feed-action-btn"
          onClick={() => setShowComment(!showComment)}
          aria-label="Comment"
        >
          <MessageCircle size={15} />
          <span>{comments}</span>
        </button>

        <button className="feed-action-btn" aria-label="Share">
          <Share2 size={15} />
          <span>Share</span>
        </button>
      </div>

      {/* Inline comment box */}
      {showComment && (
        <div className="feed-comment-box">
          <input
            type="text"
            placeholder="Write a comment…"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleComment()}
            className="feed-comment-input"
            autoFocus
          />
          <button
            className="feed-comment-submit"
            onClick={handleComment}
            disabled={!commentText.trim()}
          >
            Post
          </button>
        </div>
      )}
    </article>
  );
};

/* ── Create Post CTA ─────────────────────────────────────────── */
const CreatePostCard = () => {
  const name = localStorage.getItem('userName') || 'Creator';
  const initials = name.slice(0, 2).toUpperCase();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handlePost = () => {
    if (!value.trim()) return;
    setValue('');
    setOpen(false);
    // In a real app, this would send to a backend
    window.dispatchEvent(new CustomEvent('post-created'));
  };

  return (
    <div className="feed-create-card">
      <div className={`feed-create-avatar`} style={{ background: 'linear-gradient(135deg, #f6ad55, #f6e05e)' }}>
        {initials}
      </div>
      {!open ? (
        <button className="feed-create-placeholder" onClick={() => setOpen(true)}>
          What are you working on, {name.split(' ')[0]}?
        </button>
      ) : (
        <div className="feed-create-form">
          <textarea
            autoFocus
            rows={3}
            placeholder="Share your work, progress, or thoughts with the community…"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="feed-create-textarea"
          />
          <div className="feed-create-actions">
            <button className="feed-create-cancel" onClick={() => setOpen(false)}>Cancel</button>
            <button
              className="feed-create-submit"
              onClick={handlePost}
              disabled={!value.trim()}
            >
              <Plus size={13} /> Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Trending sidebar ────────────────────────────────────────── */
const TrendingSidebar = () => (
  <aside className="feed-sidebar">
    <div className="feed-sidebar-card">
      <h3 className="feed-sidebar-title">
        <TrendingUp size={14} />
        Trending Tags
      </h3>
      {[
        { tag: '#digital-art', count: '2.4K posts' },
        { tag: '#illustration', count: '1.8K posts' },
        { tag: '#blender', count: '1.2K posts' },
        { tag: '#ui-design', count: '980 posts' },
        { tag: '#concept-art', count: '870 posts' },
        { tag: '#photography', count: '720 posts' },
        { tag: '#color-theory', count: '640 posts' },
      ].map(({ tag, count }) => (
        <div key={tag} className="feed-sidebar-tag-row">
          <span className="feed-sidebar-tag">{tag}</span>
          <span className="feed-sidebar-count">{count}</span>
        </div>
      ))}
    </div>

    <div className="feed-sidebar-card">
      <h3 className="feed-sidebar-title">Active Creators</h3>
      {[
        { name: 'Maya Chen',   handle: '@mayaDraws',    initials: 'MC', color: 'from-orange-300 to-amber-200' },
        { name: 'Priya Nair',  handle: '@priya.paints', initials: 'PN', color: 'from-fuchsia-300 to-pink-200' },
        { name: 'Alex Rivera', handle: '@alex_ux',      initials: 'AR', color: 'from-sky-300 to-blue-200' },
        { name: 'Ji-ho Park',  handle: '@ji_conceptart', initials: 'JP', color: 'from-amber-300 to-orange-200' },
      ].map(c => (
        <div key={c.handle} className="feed-creator-row">
          <div className={`feed-creator-avatar bg-gradient-to-br ${c.color}`}>{c.initials}</div>
          <div>
            <p className="feed-creator-name">{c.name}</p>
            <p className="feed-creator-handle">{c.handle}</p>
          </div>
          <button className="feed-follow-btn">Follow</button>
        </div>
      ))}
    </div>
  </aside>
);

/* ══════════════════════════════════════════════════════════════
   MAIN FEED PAGE
═══════════════════════════════════════════════════════════════ */
const Feed = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    return mockPosts.filter(p => {
      const matchSearch = p.content.toLowerCase().includes(search.toLowerCase())
        || p.author.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeFilter === 'All' || p.category === activeFilter;
      return matchSearch && matchCategory;
    });
  }, [search, activeFilter]);

  return (
    <div className="feed-page">
      <DashboardNav activePage="feed" />

      <div className="feed-main">
        {/* Top bar */}
        <header className="feed-topbar">
          <div>
            <h1 className="feed-topbar-title">Community Feed</h1>
            <p className="feed-topbar-sub">See what your community is creating today</p>
          </div>
        </header>

        {/* Body: centre + sidebar */}
        <div className="feed-body">

          {/* Centre column */}
          <div className="feed-centre">

            {/* Create post card */}
            <CreatePostCard />

            {/* Search + Category filter */}
            <div className="feed-filter-bar">
              <div className="feed-search-wrap">
                <Search size={14} className="feed-search-icon" />
                <input
                  type="text"
                  placeholder="Search posts…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="feed-search-input"
                />
              </div>
              <div className="feed-filter-tabs">
                {categoryFilters.map(f => (
                  <button
                    key={f}
                    className={`feed-filter-tab ${activeFilter === f ? 'active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Post feed */}
            {filtered.length > 0 ? (
              <div className="feed-list">
                {filtered.map(p => (
                  <FeedPostCard key={p.id} post={p} />
                ))}
              </div>
            ) : (
              <div className="feed-empty">
                <span>🎨</span>
                <h3>No posts found</h3>
                <p>Try a different search or category.</p>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <TrendingSidebar />
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Feed;
