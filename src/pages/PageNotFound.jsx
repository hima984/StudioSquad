import React from 'react';
import { Link } from 'react-router-dom';
import { Brush, ArrowLeft } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   PageNotFound.jsx  –  404 page for StudioSquad
   Warm, artistic style matching the rest of the app
───────────────────────────────────────────────────────────────── */

const PageNotFound = () => {
  return (
    <div style={styles.root}>
      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Content card */}
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>
            <Brush size={16} color="white" />
          </div>
          <span style={styles.logoText}>StudioSquad</span>
        </div>

        {/* Big 404 */}
        <div style={styles.number}>404</div>

        {/* Emoji */}
        <div style={styles.emoji}>🎨</div>

        {/* Message */}
        <h1 style={styles.heading}>Page not found</h1>
        <p style={styles.subtext}>
          Looks like this canvas is blank. The page you're looking for doesn't exist or was moved.
        </p>

        {/* Action buttons */}
        <div style={styles.buttons}>
          <Link to="/" style={styles.primaryBtn}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link to="/dashboard" style={styles.secondaryBtn}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ── Inline styles (no external deps needed) ─────────────────── */
const styles = {
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #5c2e0e, #8b4513, #6b3410)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  blob1: {
    position: 'absolute',
    top: '-10rem',
    right: '-10rem',
    width: '28rem',
    height: '28rem',
    borderRadius: '9999px',
    background: 'rgba(211, 84, 0, 0.12)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    bottom: '-10rem',
    left: '-10rem',
    width: '28rem',
    height: '28rem',
    borderRadius: '9999px',
    background: 'rgba(78, 52, 46, 0.2)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1.75rem',
    padding: '3rem 2.5rem',
    textAlign: 'center',
    maxWidth: '26rem',
    width: '100%',
    color: 'white',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  logoIcon: {
    width: '2rem',
    height: '2rem',
    borderRadius: '0.5rem',
    background: '#d35400',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: '700',
    fontSize: '1rem',
    color: 'white',
  },
  number: {
    fontSize: '6rem',
    fontWeight: '900',
    lineHeight: 1,
    background: 'linear-gradient(135deg, #d35400, #f4a261)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    letterSpacing: '-0.03em',
  },
  emoji: {
    fontSize: '3rem',
    marginBottom: '1rem',
    lineHeight: 1,
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#f4ede4',
    marginBottom: '0.75rem',
  },
  subtext: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.55)',
    lineHeight: 1.65,
    marginBottom: '2rem',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    background: '#f4ede4',
    color: '#4e342e',
    fontWeight: '700',
    fontSize: '0.9rem',
    textDecoration: 'none',
    transition: 'background 0.2s',
  },
  secondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
    fontSize: '0.9rem',
    textDecoration: 'none',
    transition: 'background 0.2s',
  },
};

export default PageNotFound;
