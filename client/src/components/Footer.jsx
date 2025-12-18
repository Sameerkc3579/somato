import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle
} from "lucide-react";

/*
  ✔ Defensive default
  ✔ Icons defined here
  ✔ No dependency on parent correctness
*/
const Footer = ({ socialMedia = DEFAULT_SOCIALS }) => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* LOGO */}
          <div className="md:col-span-1">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl italic text-red-500 mb-4 font-bold"
            >
              somato
            </motion.h3>
          </div>

          {/* LINK SECTIONS */}
          {[
            {
              title: "About Somato",
              links: [
                "Who We Are",
                "Blog",
                "Work With Us",
                "Investor Relations",
                "Report Fraud"
              ]
            },
            {
              title: "Zomaverse",
              links: [
                "Somato",
                "Quickbuy",
                "FoodRescue India",
                "HyperFresh"
              ]
            },
            {
              title: "For Restaurants",
              links: ["Partner With Us", "Apps For You"]
            },
            {
              title: "Learn More",
              links: ["Privacy", "Security", "Terms", "Sitemap"]
            }
          ].map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-slate-300 font-semibold">
                {section.title}
              </h4>
              <ul className="space-y-2 text-slate-400">
                {section.links.map((link) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5, color: "#ef4444" }}
                    className="cursor-pointer"
                  >
                    {link}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* SOCIAL ICONS */}
          <div>
            <h4 className="mb-4 text-slate-300 font-semibold">
              Social Links
            </h4>
            <div className="flex gap-3 mb-6">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400 text-sm">
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies.
          <br />
          2024 © Somato Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

/* ✅ DEFAULT ICONS (THIS IS THE KEY FIX) */
const DEFAULT_SOCIALS = [
  { icon: Facebook, link: "https://facebook.com" },
  { icon: Twitter, link: "https://twitter.com" },
  { icon: Linkedin, link: "https://linkedin.com" },
  { icon: MessageCircle, link: "https://wa.me/" }
];

export default Footer;
