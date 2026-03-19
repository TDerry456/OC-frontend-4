import { Link } from "wouter";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D174A] text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#14967F] mb-4">
            Built for Companies. Powered by Experts.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to connect?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/expert/sign-up/cv-upload"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0077B6] text-white font-semibold rounded-lg hover:bg-[#0066a0] transition-all duration-200"
            >
              Find Your Expert
            </a>
            <a
              href="/company/sign-up/company-details"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#14967F] text-white font-semibold rounded-lg hover:bg-[#117a65] transition-all duration-200"
            >
              Join as an Expert
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663452370282/ViHDgSg2fjbgz8DVXExzGf/OrbionLogoWhite_902b9bb3.png"
                alt="Orbion Connect"
                className="h-12 w-auto mb-4"
              />
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Connecting Medtech and HealthTech companies with verified clinicians and health experts.
              </p>
              <div className="flex gap-3 mt-6">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/company/login" className="text-sm text-white/70 hover:text-white transition-colors">
                    Company Login
                  </a>
                </li>
                <li>
                  <a href="/expert/login" className="text-sm text-white/70 hover:text-white transition-colors">
                    Expert Login
                  </a>
                </li>
                <li>
                  <a href="/company/sign-up/company-details" className="text-sm text-white/70 hover:text-white transition-colors">
                    Join as a Company
                  </a>
                </li>
                <li>
                  <a href="/expert/sign-up/cv-upload" className="text-sm text-white/70 hover:text-white transition-colors">
                    Join as an Expert
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about-us">
                    <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies">
                    <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">Our Work</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us">
                    <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer">Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {year} Orbion Connect. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Legal", "Cookies", "Terms and conditions"].map((item) => (
                <a key={item} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
