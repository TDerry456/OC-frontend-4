import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Our Work", href: "/case-studies" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663452370282/ViHDgSg2fjbgz8DVXExzGf/OrbionLogoblack_abdd6c43.jpg"
              alt="Orbion Connect"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-[#0077B6] ${
                    isActive(link.href)
                      ? "text-[#0077B6]"
                      : scrolled
                      ? "text-gray-700"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Login dropdown */}
            <div className="relative">
              <button
                onClick={() => setLoginOpen(!loginOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#0077B6] transition-colors"
              >
                Login
                <ChevronDown
                  size={14}
                  className={`transition-transform ${loginOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {loginOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                    onMouseLeave={() => setLoginOpen(false)}
                  >
                    <a
                      href="/company/login"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-[#0077B6]/5 hover:text-[#0077B6] transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#0077B6]" />
                      Company
                    </a>
                    <a
                      href="/expert/login"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-[#14967F]/5 hover:text-[#14967F] transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#14967F]" />
                      Expert
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/company/sign-up/company-details"
              className="px-4 py-2 text-sm font-semibold bg-[#0077B6] text-white rounded-lg hover:bg-[#0066a0] transition-all duration-200"
            >
              Join as a <strong>Company</strong>
            </a>
            <a
              href="/expert/sign-up/cv-upload"
              className="px-4 py-2 text-sm font-semibold bg-[#14967F] text-white rounded-lg hover:bg-[#117a65] transition-all duration-200"
            >
              Join as an <strong>Expert</strong>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-[#0077B6]/10 text-[#0077B6]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}

              <div className="pt-2 border-t border-gray-100">
                <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Login
                </p>
                <a
                  href="/company/login"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span className="w-2 h-2 rounded-full bg-[#0077B6]" />
                  Company Login
                </a>
                <a
                  href="/expert/login"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span className="w-2 h-2 rounded-full bg-[#14967F]" />
                  Expert Login
                </a>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href="/company/sign-up/company-details"
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold bg-[#0D174A] text-white rounded-lg"
                >
                  Join as a Company
                </a>
                <a
                  href="/expert/sign-up/cv-upload"
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold bg-[#14967F] text-white rounded-lg"
                >
                  Join as an Expert
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
