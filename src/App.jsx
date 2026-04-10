import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

// ── Components ──────────────────────────────────────────────────
import Navbar from './components/Navbar';

// ── Pages ───────────────────────────────────────────────────────
import Home        from './pages/Home';
import Signup      from './pages/Signup';
import Login       from './pages/Login';
import Onboarding  from './pages/Onboarding';
import Dashboard   from './pages/Dashboard';
import Profile     from './pages/Profile';
import Communities from './pages/Communities';
import Courses     from './pages/Courses';
import Feed        from './pages/Feed';
import TestFirebase  from './pages/TestFirebase';
import PageNotFound  from './pages/PageNotFound';

// ─────────────────────────────────────────────────────────────────
//  App.jsx  –  Root routing configuration for StudioSquad
// ─────────────────────────────────────────────────────────────────

/* ── Layout: wraps public pages with the landing Navbar ──────── */
const PublicLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar isHome={isHome} />
      <main className={`${isHome ? '' : 'pt-24 mt-4'} min-h-screen transition-all duration-300`}>
        <Outlet />
      </main>
    </>
  );
};

/* ── Root App ─────────────────────────────────────────────────── */
const App = () => {
  return (
    <BrowserRouter>
      {/* Global toast notifications (warm earth theme) */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#faf7f2',
            color: '#4e342e',
            border: '1px solid rgba(78, 52, 46, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          },
        }}
      />

      <Routes>
        {/* ── Auth routes (no Navbar, full-screen) ── */}
        <Route path="/signup"  element={<Signup />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/onboard" element={<Onboarding />} />

        {/* ── App-internal routes (sidebar, no Navbar) ── */}
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/profile"     element={<Profile />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/courses"     element={<Courses />} />
        <Route path="/feed"        element={<Feed />} />

        {/* ── Public landing pages (with Navbar) ── */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* ── Dev/test route ── */}
        <Route path="/test" element={<TestFirebase />} />

        {/* ── 404 catch-all ── */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
