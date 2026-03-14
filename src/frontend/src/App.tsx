import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ChevronDown,
  Code2,
  ExternalLink,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Typewriter Hook ────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

// ─── Animated Section Wrapper ───────────────────────────────────────────────
function FadeSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "#hero", ocid: "nav.home.link" },
  { label: "About", href: "#about", ocid: "nav.about.link" },
  { label: "Education", href: "#education", ocid: "nav.education.link" },
  { label: "Skills", href: "#skills", ocid: "nav.skills.link" },
  { label: "Projects", href: "#projects", ocid: "nav.projects.link" },
  { label: "Contact", href: "#contact", ocid: "nav.contact.link" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgb(8,10,16)]/90 backdrop-blur-xl border-b border-[rgb(30,40,65)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.ocid}>
              <a
                href={link.href}
                data-ocid={link.ocid}
                onClick={() => setActive(link.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[oklch(0.82_0.18_196)] ${
                  active === link.href
                    ? "text-[oklch(0.82_0.18_196)]"
                    : "text-[rgb(120,135,170)]"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden ml-auto text-[rgb(120,135,170)] hover:text-[oklch(0.82_0.18_196)] transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[rgb(8,10,16)]/95 backdrop-blur-xl border-b border-[rgb(30,40,65)] px-6 py-4"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.ocid}>
                  <a
                    href={link.href}
                    data-ocid={link.ocid}
                    onClick={() => {
                      setActive(link.href);
                      setMenuOpen(false);
                    }}
                    className="block text-sm font-medium text-[rgb(120,135,170)] hover:text-[oklch(0.82_0.18_196)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const subtitle = useTypewriter(
    [
      "BSc IT Graduate",
      "Fake News Detector",
      "Java Developer",
      "Python Enthusiast",
      "Problem Solver",
    ],
    75,
    2000,
  );

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1200x600.jpg')`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(8,10,16)]/60 via-[rgb(8,10,16)]/40 to-[rgb(8,10,16)]" />

      {/* Geometric decorations */}
      <div
        className="absolute top-1/4 left-10 w-48 h-48 rounded-full opacity-10 animate-float"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.18 196), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-16 w-64 h-64 rounded-full opacity-8"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.16 180), transparent 70%)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.78 0.18 196) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.18 196) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Profile photo */}
          <div className="flex justify-center mb-8">
            <div
              className="w-28 h-28 rounded-full overflow-hidden animate-pulse-glow"
              style={{
                border: "2px solid oklch(0.78 0.18 196 / 0.6)",
                boxShadow: "0 0 30px oklch(0.78 0.18 196 / 0.3)",
              }}
            >
              <img
                src="/assets/uploads/IMG_20250915_113111-1.jpg"
                alt="Sanjay Kumar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.78_0.18_196/0.3)] bg-[oklch(0.78_0.18_196/0.08)] mb-8">
            <Sparkles size={13} className="text-[oklch(0.82_0.18_196)]" />
            <span className="text-xs font-mono text-[oklch(0.82_0.18_196)] tracking-widest uppercase">
              Available for Opportunities
            </span>
          </div>

          {/* Name — single line, full width, fluid scale */}
          <h1
            className="font-display font-bold whitespace-nowrap leading-none mb-5 tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 10vw, 7rem)" }}
          >
            <span className="gradient-text">SANJAY</span>{" "}
            <span className="text-[rgb(210,225,255)]">KUMAR</span>
          </h1>

          {/* Typewriter subtitle */}
          <div className="h-10 flex items-center justify-center mb-8">
            <span className="font-mono text-lg md:text-xl text-[oklch(0.72_0.14_196)]">
              {subtitle}
              <span className="animate-blink text-[oklch(0.82_0.18_196)]">
                _
              </span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-[rgb(120,135,170)] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            BSc IT graduate passionate about building intelligent systems that
            make the digital world more trustworthy.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#projects"
              data-ocid="hero.primary_button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[oklch(0.78_0.18_196)] text-[rgb(8,10,16)] font-semibold text-sm hover:bg-[oklch(0.85_0.20_196)] transition-all duration-200 shadow-glow-md hover:shadow-glow-lg"
            >
              <Layers size={16} />
              View Projects
            </a>
            <a
              href="#contact"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[oklch(0.78_0.18_196/0.4)] text-[oklch(0.82_0.18_196)] font-semibold text-sm hover:border-[oklch(0.78_0.18_196/0.8)] hover:bg-[oklch(0.78_0.18_196/0.08)] transition-all duration-200"
            >
              <Mail size={16} />
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-[rgb(120,135,170)] tracking-widest uppercase font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown size={18} className="text-[oklch(0.78_0.18_196)]" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ──────────────────────────────────────────────────────────────────
function AboutSection() {
  const stats = [
    { value: "2025", label: "Graduate" },
    { value: "4+", label: "Languages" },
    { value: "1", label: "Major Project" },
    { value: "3", label: "Spoken Languages" },
  ];

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="section-padding max-w-6xl mx-auto"
    >
      <FadeSection>
        <div className="flex items-center gap-3 mb-12">
          <Terminal size={20} className="text-[oklch(0.78_0.18_196)]" />
          <span className="font-mono text-sm text-[oklch(0.78_0.18_196)] tracking-widest uppercase">
            ./about_me
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.78_0.18_196/0.4)] to-transparent" />
        </div>
      </FadeSection>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Avatar and stats */}
        <FadeSection delay={0.1}>
          <div className="relative">
            {/* Avatar card */}
            <div className="glow-border rounded-2xl p-8 bg-[rgb(14,18,30)] relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, oklch(0.78 0.18 196 / 0.15), transparent 60%)",
                }}
              />
              {/* Profile photo */}
              <div className="relative z-10">
                <div
                  className="w-24 h-24 rounded-2xl overflow-hidden mb-6 animate-pulse-glow"
                  style={{
                    border: "1px solid oklch(0.78 0.18 196 / 0.4)",
                  }}
                >
                  <img
                    src="/assets/uploads/IMG_20250915_113111-1.jpg"
                    alt="Sanjay Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="font-display font-bold text-2xl text-[rgb(210,225,255)] mb-1">
                  Sanjay Kumar
                </h2>
                <p className="text-sm text-[oklch(0.78_0.18_196)] font-mono mb-4">
                  BSc IT · 2025
                </p>
                <p className="text-[rgb(120,135,170)] text-sm leading-relaxed">
                  Sankara College of Science and Commerce, Coimbatore
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {stats.map((stat, i) => (
                <FadeSection key={stat.label} delay={0.2 + i * 0.08}>
                  <div className="glow-border rounded-xl p-3 bg-[rgb(14,18,30)] text-center">
                    <div className="font-display font-bold text-xl gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-[rgb(120,135,170)] mt-0.5 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* Right: bio */}
        <FadeSection delay={0.2}>
          <div className="space-y-6">
            <h3 className="font-display font-bold text-3xl text-[rgb(210,225,255)] leading-tight">
              Building Intelligence,
              <br />
              <span className="gradient-text">One Line at a Time</span>
            </h3>
            <p className="text-[rgb(140,160,200)] leading-relaxed">
              I&apos;m Sanjay Kumar, a BSc IT graduate from{" "}
              <span className="text-[oklch(0.82_0.18_196)]">
                Sankara College of Science and Commerce, Coimbatore
              </span>
              . My academic journey has been defined by a passion for solving
              real-world problems through code.
            </p>
            <p className="text-[rgb(140,160,200)] leading-relaxed">
              My flagship project,{" "}
              <span className="text-[oklch(0.82_0.18_196)] font-semibold">
                Fake News Detection
              </span>
              , demonstrates my ability to combine machine learning techniques
              with practical application — ensuring information integrity in an
              era of digital misinformation.
            </p>
            <p className="text-[rgb(140,160,200)] leading-relaxed">
              A multilingual communicator fluent in English, Tamil, and
              Malayalam, I believe technology is most powerful when it bridges
              communities.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Machine Learning",
                "NLP",
                "Software Dev",
                "Problem Solving",
                "Multilingual",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[oklch(0.78_0.18_196/0.1)] border border-[oklch(0.78_0.18_196/0.2)] text-[oklch(0.78_0.18_196)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── Education ───────────────────────────────────────────────────────────────
const educationData = [
  {
    degree: "Bachelor of Science in Information Technology",
    short: "BSc IT",
    institution: "Sankara College of Science and Commerce",
    year: "2022 – 2025",
    location: "Coimbatore, Tamil Nadu",
    icon: "🎓",
    highlight: "Undergraduate Degree",
    color: "oklch(0.78 0.18 196)",
  },
  {
    degree: "Higher Secondary Certificate (12th)",
    short: "HSC",
    institution: "Sri Saraswathi Giri Higher Matriculation School",
    year: "2024 – 2025",
    location: "Tirupur, Tamil Nadu",
    icon: "📚",
    highlight: "Higher Secondary",
    color: "oklch(0.82 0.20 160)",
  },
];

function EducationSection() {
  return (
    <section
      id="education"
      data-ocid="education.section"
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, rgb(8,10,16), rgb(10,14,22), rgb(8,10,16))",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeSection>
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap size={20} className="text-[oklch(0.78_0.18_196)]" />
            <span className="font-mono text-sm text-[oklch(0.78_0.18_196)] tracking-widest uppercase">
              ./education
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.78_0.18_196/0.4)] to-transparent" />
          </div>
        </FadeSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.78 0.18 196 / 0.6), oklch(0.82 0.20 160 / 0.3), transparent)",
            }}
          />

          <div className="space-y-8">
            {educationData.map((edu, i) => (
              <FadeSection key={edu.institution} delay={i * 0.15}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-6 w-12 h-12 rounded-xl items-center justify-center text-2xl hidden sm:flex"
                    style={{
                      background: `linear-gradient(135deg, ${edu.color} / 0.15, transparent)`,
                      border: `1px solid ${edu.color} / 0.4`,
                      boxShadow: `0 0 20px ${edu.color} / 0.15`,
                    }}
                  >
                    {edu.icon}
                  </div>

                  {/* Card */}
                  <div className="glow-border rounded-2xl p-6 bg-[rgb(14,18,30)] relative overflow-hidden group">
                    {/* Ambient glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(ellipse at top left, ${edu.color} / 0.06, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl sm:hidden">
                              {edu.icon}
                            </span>
                            <Badge
                              className="font-mono text-xs"
                              style={{
                                background: `oklch(from ${edu.color} l c h / 0.12)`,
                                color: edu.color,
                                borderColor: `oklch(from ${edu.color} l c h / 0.3)`,
                              }}
                            >
                              {edu.highlight}
                            </Badge>
                          </div>
                          <h3 className="font-display font-bold text-xl text-[rgb(210,225,255)] leading-tight">
                            {edu.degree}
                          </h3>
                          <p
                            className="font-mono text-sm mt-1"
                            style={{ color: edu.color }}
                          >
                            {edu.short}
                          </p>
                        </div>

                        {/* Year badge */}
                        <div
                          className="px-4 py-2 rounded-xl font-mono text-sm font-bold flex-shrink-0"
                          style={{
                            background: `oklch(from ${edu.color} l c h / 0.1)`,
                            border: `1px solid oklch(from ${edu.color} l c h / 0.25)`,
                            color: edu.color,
                          }}
                        >
                          {edu.year}
                        </div>
                      </div>

                      {/* Institution & location */}
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap
                            size={14}
                            className="text-[rgb(100,120,160)] flex-shrink-0"
                          />
                          <span className="text-sm text-[rgb(160,180,220)] font-medium">
                            {edu.institution}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={14}
                            className="text-[rgb(100,120,160)] flex-shrink-0"
                          />
                          <span className="text-sm text-[rgb(120,140,180)]">
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ─────────────────────────────────────────────────────────────────
const skills = [
  { name: "Java", icon: "☕", level: 85, color: "oklch(0.78 0.18 196)" },
  { name: "Python", icon: "🐍", level: 80, color: "oklch(0.82 0.20 160)" },
  { name: "C", icon: "⚙️", level: 75, color: "oklch(0.72 0.16 230)" },
  { name: "C++", icon: "⚡", level: 72, color: "oklch(0.75 0.18 210)" },
  {
    name: "Machine Learning",
    icon: "🧠",
    level: 70,
    color: "oklch(0.78 0.18 196)",
  },
  { name: "NLP", icon: "📝", level: 68, color: "oklch(0.82 0.20 160)" },
  {
    name: "Data Structures",
    icon: "🌲",
    level: 78,
    color: "oklch(0.72 0.16 230)",
  },
  { name: "Algorithms", icon: "🔢", level: 74, color: "oklch(0.75 0.18 210)" },
];

function SkillBar({
  skill,
  delay,
}: { skill: (typeof skills)[0]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-mono text-sm text-[rgb(200,215,255)] font-medium">
            {skill.name}
          </span>
        </div>
        <span className="font-mono text-xs text-[rgb(120,135,170)]">
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-[rgb(22,28,44)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, oklch(0.85 0.20 160))`,
          }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  const coreSkills = [
    "Java",
    "Python",
    "C",
    "C++",
    "OOP",
    "DSA",
    "Git",
    "Linux",
    "SQL",
    "Debugging",
    "REST APIs",
    "Unit Testing",
  ];

  return (
    <section
      id="skills"
      data-ocid="skills.section"
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, rgb(8,10,16), rgb(10,14,22), rgb(8,10,16))",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeSection>
          <div className="flex items-center gap-3 mb-12">
            <Code2 size={20} className="text-[oklch(0.78_0.18_196)]" />
            <span className="font-mono text-sm text-[oklch(0.78_0.18_196)] tracking-widest uppercase">
              ./skills
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.78_0.18_196/0.4)] to-transparent" />
          </div>
        </FadeSection>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Progress bars */}
          <FadeSection delay={0.1}>
            <div className="space-y-6">
              <h3 className="font-display font-bold text-2xl text-[rgb(210,225,255)] mb-8">
                Proficiency Levels
              </h3>
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
              ))}
            </div>
          </FadeSection>

          {/* Pill badges */}
          <FadeSection delay={0.2}>
            <h3 className="font-display font-bold text-2xl text-[rgb(210,225,255)] mb-8">
              Tech Stack & Tools
            </h3>
            <div className="flex flex-wrap gap-3">
              {coreSkills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="skill-pill"
                >
                  {s}
                </motion.span>
              ))}
            </div>

            {/* Decorative code block */}
            <div className="mt-10 p-5 rounded-xl bg-[rgb(10,14,22)] border border-[rgb(30,40,65)] font-mono text-xs">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[rgb(30,40,65)]">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-[rgb(80,100,130)] ml-2 text-[10px]">
                  sanjay.java
                </span>
              </div>
              <div className="space-y-1 leading-relaxed">
                <div>
                  <span className="text-[oklch(0.72_0.16_230)]">
                    public class{" "}
                  </span>
                  <span className="text-[oklch(0.85_0.20_160)]">
                    SanjayKumar{" "}
                  </span>
                  <span className="text-[rgb(150,170,210)]">{"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-[oklch(0.72_0.16_230)]"> String </span>
                  <span className="text-[oklch(0.78_0.18_196)]">passion</span>
                  <span className="text-[rgb(150,170,210)]"> = </span>
                  <span className="text-[oklch(0.82_0.20_160)]">
                    &quot;Fake News Detection&quot;
                  </span>
                  <span className="text-[rgb(150,170,210)]">;</span>
                </div>
                <div className="pl-4">
                  <span className="text-[oklch(0.72_0.16_230)]"> int </span>
                  <span className="text-[oklch(0.78_0.18_196)]">gradYear</span>
                  <span className="text-[rgb(150,170,210)]"> = </span>
                  <span className="text-[oklch(0.85_0.22_60)]">2025</span>
                  <span className="text-[rgb(150,170,210)]">;</span>
                </div>
                <div>
                  <span className="text-[rgb(150,170,210)]">{"}"}</span>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section
      id="projects"
      data-ocid="projects.section"
      className="section-padding max-w-6xl mx-auto"
    >
      <FadeSection>
        <div className="flex items-center gap-3 mb-12">
          <Brain size={20} className="text-[oklch(0.78_0.18_196)]" />
          <span className="font-mono text-sm text-[oklch(0.78_0.18_196)] tracking-widest uppercase">
            ./projects
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.78_0.18_196/0.4)] to-transparent" />
        </div>
      </FadeSection>

      <FadeSection delay={0.15}>
        <div
          data-ocid="project.card.1"
          className="glow-border rounded-2xl bg-[rgb(14,18,30)] overflow-hidden group cursor-pointer"
        >
          {/* Card header banner */}
          <div
            className="relative h-48 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgb(10,14,24), rgb(14,22,40), rgb(8,18,30))",
            }}
          >
            {/* Animated grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.78 0.18 196) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.18 196) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Central graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 196 / 0.2), oklch(0.72 0.16 180 / 0.2))",
                    border: "1px solid oklch(0.78 0.18 196 / 0.5)",
                    boxShadow: "0 0 40px oklch(0.78 0.18 196 / 0.3)",
                  }}
                >
                  🔍
                </div>
                {/* Orbiting dots */}
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
                  style={{
                    background: "oklch(0.85 0.20 160)",
                    boxShadow: "0 0 10px oklch(0.85 0.20 160)",
                    animation: "float 3s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full"
                  style={{
                    background: "oklch(0.78 0.18 196)",
                    boxShadow: "0 0 8px oklch(0.78 0.18 196)",
                    animation: "float 4s ease-in-out infinite reverse",
                  }}
                />
              </motion.div>
            </div>

            {/* Tag */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-[oklch(0.78_0.18_196/0.2)] text-[oklch(0.82_0.18_196)] border-[oklch(0.78_0.18_196/0.3)] font-mono text-xs">
                ML · NLP
              </Badge>
            </div>
          </div>

          {/* Card body */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-[rgb(210,225,255)] mb-1">
                  Fake News Detection
                </h3>
                <p className="text-sm font-mono text-[oklch(0.78_0.18_196)]">
                  Final Year Project · 2025
                </p>
              </div>
              <ExternalLink
                size={18}
                className="text-[rgb(80,100,130)] group-hover:text-[oklch(0.78_0.18_196)] transition-colors mt-1"
              />
            </div>

            <p className="text-[rgb(140,160,200)] leading-relaxed mb-6">
              An intelligent system designed to classify news articles as real
              or fake using Natural Language Processing (NLP) and Machine
              Learning classification models. The system analyzes linguistic
              patterns, semantic features, and source credibility to flag
              misinformation with high accuracy.
            </p>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: "🧠",
                  title: "ML Classification",
                  desc: "Naive Bayes, SVM, and ensemble methods for accurate detection",
                },
                {
                  icon: "📊",
                  title: "NLP Pipeline",
                  desc: "TF-IDF vectorization, tokenization, and text preprocessing",
                },
                {
                  icon: "📰",
                  title: "News Corpus",
                  desc: "Trained on labeled datasets of verified and fake news articles",
                },
                {
                  icon: "🎯",
                  title: "High Accuracy",
                  desc: "Optimized feature extraction for reliable misinformation detection",
                },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className="p-4 rounded-xl bg-[rgb(10,14,22)] border border-[rgb(30,40,65)] hover:border-[oklch(0.78_0.18_196/0.3)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{feat.icon}</span>
                    <span className="font-semibold text-sm text-[rgb(200,215,255)]">
                      {feat.title}
                    </span>
                  </div>
                  <p className="text-xs text-[rgb(100,120,160)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "Scikit-learn",
                "NLTK",
                "Pandas",
                "NumPy",
                "Jupyter",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-[oklch(0.78_0.18_196/0.08)] border border-[oklch(0.78_0.18_196/0.2)] text-[oklch(0.78_0.18_196)] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>
    </section>
  );
}

// ─── Languages ───────────────────────────────────────────────────────────────
const languages = [
  {
    name: "English",
    flag: "🇬🇧",
    level: "Professional",
    desc: "Academic & professional communication",
    proficiency: 90,
  },
  {
    name: "Tamil",
    flag: "🇮🇳",
    level: "Native",
    desc: "Mother tongue — fluent & cultural",
    proficiency: 100,
  },
  {
    name: "Malayalam",
    flag: "🇮🇳",
    level: "Fluent",
    desc: "South Indian regional language",
    proficiency: 85,
  },
];

function LanguagesSection() {
  return (
    <section
      id="languages"
      data-ocid="languages.section"
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, rgb(8,10,16), rgb(10,14,22), rgb(8,10,16))",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeSection>
          <div className="flex items-center gap-3 mb-12">
            <Globe size={20} className="text-[oklch(0.78_0.18_196)]" />
            <span className="font-mono text-sm text-[oklch(0.78_0.18_196)] tracking-widest uppercase">
              ./languages
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.78_0.18_196/0.4)] to-transparent" />
          </div>
        </FadeSection>

        <div className="grid sm:grid-cols-3 gap-6">
          {languages.map((lang, i) => (
            <FadeSection key={lang.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glow-border rounded-2xl p-6 bg-[rgb(14,18,30)] text-center relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(ellipse at top, oklch(0.78 0.18 196 / 0.08), transparent 70%)",
                  }}
                />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{lang.flag}</div>
                  <h3 className="font-display font-bold text-xl text-[rgb(210,225,255)] mb-1">
                    {lang.name}
                  </h3>
                  <Badge className="mb-3 bg-[oklch(0.78_0.18_196/0.15)] text-[oklch(0.82_0.18_196)] border-[oklch(0.78_0.18_196/0.3)] text-xs">
                    {lang.level}
                  </Badge>
                  <p className="text-xs text-[rgb(100,120,160)] mb-4">
                    {lang.desc}
                  </p>
                  {/* Mini progress */}
                  <div className="h-1 bg-[rgb(22,28,44)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.78 0.18 196), oklch(0.85 0.20 160))",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="section-padding max-w-6xl mx-auto"
    >
      <FadeSection>
        <div className="flex items-center gap-3 mb-12">
          <Mail size={20} className="text-[oklch(0.78_0.18_196)]" />
          <span className="font-mono text-sm text-[oklch(0.78_0.18_196)] tracking-widest uppercase">
            ./contact
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[oklch(0.78_0.18_196/0.4)] to-transparent" />
        </div>
      </FadeSection>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: CTA text */}
        <FadeSection delay={0.1}>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[rgb(210,225,255)] leading-tight mb-6">
            Let&apos;s Build
            <br />
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-[rgb(120,135,170)] leading-relaxed mb-8">
            I&apos;m open to full-time roles, internships, and collaborative
            projects. If you have a problem worth solving with technology,
            let&apos;s connect.
          </p>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-px"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.78 0.18 196), transparent)",
              }}
            />
            <span className="text-sm text-[rgb(100,120,160)] font-mono">
              Based in Coimbatore, India
            </span>
          </div>
        </FadeSection>

        {/* Right: Contact cards */}
        <FadeSection delay={0.2}>
          <div className="space-y-4">
            {/* Email card */}
            <motion.a
              href="mailto:sanjaykumarsbscit2025@sankara.ac.in"
              data-ocid="contact.email.link"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-5 p-5 rounded-xl glow-border bg-[rgb(14,18,30)] group block"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 196 / 0.2), oklch(0.72 0.16 180 / 0.2))",
                  border: "1px solid oklch(0.78 0.18 196 / 0.3)",
                }}
              >
                <Mail size={20} className="text-[oklch(0.82_0.18_196)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[rgb(100,120,160)] font-mono mb-0.5 uppercase tracking-wider">
                  Email
                </div>
                <div className="text-sm text-[rgb(200,215,255)] font-medium truncate group-hover:text-[oklch(0.82_0.18_196)] transition-colors">
                  sanjaykumarsbscit2025@sankara.ac.in
                </div>
              </div>
              <ExternalLink
                size={16}
                className="text-[rgb(60,80,110)] group-hover:text-[oklch(0.78_0.18_196)] transition-colors flex-shrink-0"
              />
            </motion.a>

            {/* Phone card */}
            <motion.a
              href="tel:+917012043721"
              data-ocid="contact.phone.link"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-5 p-5 rounded-xl glow-border bg-[rgb(14,18,30)] group block"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.82 0.20 160 / 0.2), oklch(0.75 0.18 180 / 0.2))",
                  border: "1px solid oklch(0.82 0.20 160 / 0.3)",
                }}
              >
                <Phone size={20} className="text-[oklch(0.85_0.20_160)]" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-[rgb(100,120,160)] font-mono mb-0.5 uppercase tracking-wider">
                  Mobile
                </div>
                <div className="text-sm text-[rgb(200,215,255)] font-medium group-hover:text-[oklch(0.85_0.20_160)] transition-colors">
                  +91 7012043721
                </div>
              </div>
              <ExternalLink
                size={16}
                className="text-[rgb(60,80,110)] group-hover:text-[oklch(0.82_0.20_160)] transition-colors flex-shrink-0"
              />
            </motion.a>

            {/* Location card */}
            <div className="flex items-center gap-5 p-5 rounded-xl border border-[rgb(30,40,65)] bg-[rgb(14,18,30)]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.16 230 / 0.2), oklch(0.68 0.14 250 / 0.2))",
                  border: "1px solid oklch(0.72 0.16 230 / 0.3)",
                }}
              >
                <span className="text-xl">📍</span>
              </div>
              <div>
                <div className="text-xs text-[rgb(100,120,160)] font-mono mb-0.5 uppercase tracking-wider">
                  Location
                </div>
                <div className="text-sm text-[rgb(200,215,255)] font-medium">
                  Coimbatore, Tamil Nadu, India
                </div>
              </div>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[rgb(20,28,44)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-[rgb(80,100,130)]">
          <span className="gradient-text font-bold">SANJAY KUMAR</span>
          {" · "}
          <span>BSc IT · 2025</span>
        </div>
        <div className="text-xs text-[rgb(80,100,130)]">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[oklch(0.78_0.18_196)] hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background noise-bg">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <LanguagesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
