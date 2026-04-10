import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brush, Menu, X } from 'lucide-react';

const Navbar = ({ isHome }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-[#faf7f2]/95 backdrop-blur-md shadow-sm border-b border-[#4e342e]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${transparent ? 'bg-white/20' : 'bg-[#d35400]'}`}>
            <Brush size={16} className="text-white" />
          </div>
          <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${transparent ? 'text-white' : 'text-[#4e342e]'}`}>
            StudioSquad
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['For You', 'Explore', 'Artists', 'Community'].map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm font-medium transition-all duration-300 hover:opacity-100 ${
                transparent ? 'text-white/80 hover:text-white' : 'text-[#4e342e]/70 hover:text-[#4e342e]'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
              transparent
                ? 'text-white/90 hover:text-white hover:bg-white/10'
                : 'text-[#4e342e] hover:bg-[#4e342e]/10'
            }`}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className={`text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
              transparent
                ? 'bg-white text-[#4e342e] hover:bg-white/90'
                : 'bg-[#d35400] text-white hover:bg-[#c04e00]'
            }`}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${transparent ? 'text-white' : 'text-[#4e342e]'}`}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} bg-[#faf7f2] border-b border-[#4e342e]/10`}>
        <div className="px-6 py-4 flex flex-col gap-4">
          {['For You', 'Explore', 'Artists', 'Community'].map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-[#4e342e]/80 hover:text-[#4e342e]">{item}</a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-[#4e342e]/10">
            <Link to="/login" className="flex-1 text-center text-sm font-medium py-2 text-[#4e342e]">Log in</Link>
            <Link to="/signup" className="flex-1 text-center text-sm font-semibold py-2 rounded-full bg-[#d35400] text-white">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
