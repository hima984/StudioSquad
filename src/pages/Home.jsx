import React from 'react';
import { ArrowRight, Sparkles, Users, BookOpen, MessageSquare, Heart, Shield, Compass, Palette, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 lg:px-12 bg-earth-beige">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-cream border border-earth-brown/10 text-earth-brown text-sm font-medium w-fit">
              <Sparkles className="w-4 h-4 text-earth-orange" />
              <span>Welcome to StudioSquad</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-earth-brown leading-tight">
              Where Creative Minds <span className="text-earth-orange">Unite & Grow</span>
            </h1>
            <p className="text-lg text-earth-brown/80 max-w-xl">
              Connect with fellow artists, share your creative journey, collaborate on inspiring projects, and elevate your skills in a warm community built for creators.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/signup"
                className="bg-earth-orange hover:bg-earth-brown text-earth-cream px-8 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="bg-earth-cream hover:bg-earth-beige text-earth-brown border border-earth-brown/20 px-8 py-3.5 rounded-xl font-medium transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-earth-cream bg-earth-brown/5 flex items-center justify-center">
              <img
                src="/src/assets/images/artist-desk.png"
                alt="Artist Desk"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-brown/40 via-transparent to-transparent flex items-end p-8">
                <div className="text-earth-cream font-medium text-lg">
                  ✨ Join thousands of creators today
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-12 bg-earth-cream border-t border-earth-brown/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-earth-brown mb-4">
              Everything you need to thrive
            </h2>
            <p className="text-earth-brown/70">
              Designed specifically for creators, designers, writers, and makers looking for a supportive ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-earth-beige border border-earth-brown/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-earth-orange/10 flex items-center justify-center text-earth-orange">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-earth-brown">Creative Communities</h3>
              <p className="text-earth-brown/70">
                Find your niche group, discuss ideas, and collaborate on exciting multi-disciplinary projects.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-earth-beige border border-earth-brown/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-earth-orange/10 flex items-center justify-center text-earth-orange">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-earth-brown">Masterclass Courses</h3>
              <p className="text-earth-brown/70">
                Learn advanced techniques from seasoned industry experts through curated video courses and guides.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-earth-beige border border-earth-brown/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-earth-orange/10 flex items-center justify-center text-earth-orange">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-earth-brown">Inspirational Feed</h3>
              <p className="text-earth-brown/70">
                Share your daily works-in-progress, receive constructive feedback, and celebrate milestones together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-dark text-earth-cream py-12 px-6 lg:px-12 border-t border-earth-brown/20 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-earth-orange flex items-center justify-center text-earth-cream font-bold text-lg shadow">
              S
            </div>
            <span className="text-lg font-bold tracking-tight text-earth-cream">StudioSquad</span>
          </div>
          <div className="text-sm text-earth-cream/70 flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span>&copy; {new Date().getFullYear()} StudioSquad. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Made with ❤️ by StudioSquad</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
