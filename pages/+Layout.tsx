import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { CustomCursor } from "../components/CustomCursor";
import "./tailwind.css";
import "./Layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "About me", href: "/about-me" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-accent selection:text-background relative">
      {/* Dynamic Trail Cursor */}
      <CustomCursor />

      {/* Header / Navbar */}
      <nav className="fixed top-0 left-0 w-full h-20 px-8 lg:px-16 flex justify-between items-center z-[100] backdrop-blur-md border-b border-border-color bg-background/70">
        <div className="flex items-center">
          <a
            href="/"
            className="font-title font-bold text-2xl uppercase tracking-tighter hover:text-accent transition-colors duration-300"
          >
            RS
          </a>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="flex flex-col justify-between w-8 h-4 bg-none border-none cursor-pointer focus:outline-none z-[101]"
            aria-label="Toggle navigation menu"
          >
            <motion.span
              animate={
                isDrawerOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
              className="block w-full h-[2px] bg-foreground origin-center"
            />
            <motion.span
              animate={
                isDrawerOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
              className="block w-full h-[2px] bg-foreground origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Drawer Overlay Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full h-screen bg-background z-[99] pt-28 pb-12 px-8 lg:px-16 flex flex-col justify-between overflow-y-auto"
          >
            <div className="border-b border-border-color pb-4">
              <span className="font-title text-xs uppercase tracking-widest text-text-secondary">
                Design First Developer
              </span>
            </div>

            <div className="my-auto py-8">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link, idx) => {
                  const isActive =
                    link.href === "/"
                      ? urlPathname === link.href
                      : urlPathname.startsWith(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <a
                        href={link.href}
                        className={`font-title text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase inline-block transition-transform duration-300 hover:translate-x-4 ${
                          isActive
                            ? "text-accent"
                            : "text-foreground hover:text-accent"
                        }`}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-top border-border-color pt-8 items-end">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-text-secondary opacity-60">
                  Quick Connect
                </span>
                <a
                  href="mailto:hello.roshansahu@gmail.com"
                  className="text-text-secondary hover:text-foreground transition-colors duration-300"
                >
                  hello.roshansahu@gmail.com
                </a>
                <a
                  href="https://wa.me/918770649985"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-foreground transition-colors duration-300 flex items-center gap-2"
                >
                  <i className="fab fa-whatsapp text-green-500"></i> Chat on
                  WhatsApp
                </a>
              </div>
              <div className="flex gap-6 justify-start md:justify-end text-lg text-text-secondary">
                <span className="hover:text-accent transition-colors duration-300 cursor-not-allowed opacity-50">
                  <i className="fab fa-linkedin-in"></i>
                </span>
                <span className="hover:text-accent transition-colors duration-300 cursor-not-allowed opacity-50">
                  <i className="fab fa-instagram"></i>
                </span>
                <span className="hover:text-accent transition-colors duration-300 cursor-not-allowed opacity-50">
                  <i className="fab fa-github"></i>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content Wrapper */}
      <main id="page-content" className="flex-grow pt-20">
        {children}
      </main>

      {/* Global Footer Banner */}
      <footer className="w-full flex flex-col">
        <a
          href="/contact"
          className="group block w-full py-16 px-8 lg:px-16 bg-card border-b border-border-color hover:bg-card-hover transition-colors duration-400"
        >
          <div className="max-w-[1400px] m-auto flex justify-between items-center">
            <span className="font-title text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-none transition-all duration-300 flex justify-between w-full items-center">
              Let&apos;s work together
              <i className="fa-solid fa-arrow-right-long transition-transform duration-400 group-hover:translate-x-6 text-2xl md:text-4xl lg:text-5xl group-hover:text-accent"></i>
            </span>
          </div>
        </a>

        {/* Footer Bottom Row */}
        <div className="max-w-[1400px] w-full m-auto py-8 px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xs text-text-secondary opacity-60">
            &copy; 2026 Creative Developer. All rights reserved.
          </span>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            <div className="flex gap-4 items-center text-xs text-text-secondary">
              <a
                href="mailto:hello.roshansahu@gmail.com"
                className="hover:text-foreground transition-colors duration-300"
              >
                hello.roshansahu@gmail.com
              </a>
              <span className="opacity-40">|</span>
              <a
                href="https://wa.me/918770649985"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors duration-300"
              >
                Quick Chat
              </a>
            </div>
            <div className="flex gap-6 text-sm text-text-secondary">
              <span className="hover:text-accent transition-colors duration-300 cursor-not-allowed opacity-50">
                <i className="fab fa-linkedin-in"></i>
              </span>
              <span className="hover:text-accent transition-colors duration-300 cursor-not-allowed opacity-50">
                <i className="fab fa-instagram"></i>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
