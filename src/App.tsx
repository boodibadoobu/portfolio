import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Mail, Cloud, ArrowRight, ArrowUpRight, MapPin, Calendar, Briefcase } from 'lucide-react';
import heroPhoto from './assets/hero.png';

const portfolioData = {
  personalInfo: {
    name: "Muhammad Alvin Zufar Saputra",
    shortName: "Alvin",
    title: "Software Engineer",
    subtitle: "Cloud Engineer & Developer",
    tagline: "Building resilient applications at the intersection of modern web development and cloud architecture.",
    about: "I am an Information Systems student at Telkom University with a passion for software optimization and cloud computing architectures (AWS, Google Cloud, Azure). I specialize in ensuring robust, high-performing software solutions. Alongside my studies, I serve as a practicum assistant, where I mentor peers and solidify my own technical foundations. I am driven by a continuous desire to understand how systems work under the hood and how to make them more secure and efficient.",
    location: "Bandung, ID",
    issue: "06",
    year: "2026",
    email: "nailvinz@gmail.com",
    whatsapp: "https://wa.me/6287796912824",
    github: "https://github.com/boodibadoobu",
    linkedin: "https://www.linkedin.com/in/muhammad-alvin-zuf/",
    focusAreas: ["Cloud Architecture", "Web Development", "System Design"],
    tags: ["Full Stack", "Cloud", "DevOps"],
  },
  skills: [
    { category: "Cloud Platforms", items: ["AWS", "Google Cloud", "Azure"] },
    { category: "Languages & Frameworks", items: ["React", "Next.js", "TypeScript", "Node.js"] },
    { category: "Databases & Tools", items: ["MySQL", "Supabase", "Prisma ORM", "Socket.io"] },
  ],
  projects: [
    {
      id: 1,
      title: "WeCareU",
      bgWord: "RESILIENT",
      kicker: "Feature Project",
      heading: "Mental Health Platform",
      description: "A mental health platform built to dismantle the stigma and hesitation university students face when seeking psychological help. Connects students with professionals securely and discreetly, with a real-time chat module I built on Socket.io.",
      challenge: "Delivering secure, low-latency real-time messaging while keeping the experience calm and approachable for vulnerable users.",
      role: "Full Stack & QA",
      year: "2025",
      metrics: ["Real-time chat module via Socket.io", "End-to-end test coverage across all flows"],
      tags: ["React 19", "Node.js", "Socket.io", "Prisma ORM", "MySQL", "Tailwind CSS"],
      link: "https://github.com/boodibadoobu/WeCareU",
      comingSoon: false,
    },
    {
      id: 2,
      title: "SinergiLaut",
      bgWord: "OCEAN",
      kicker: "Case Study 02",
      heading: "Marine Conservation Crowdfunding",
      description: "A crowdfunding platform supporting UN SDG 14 (Life Below Water). Centralizes volunteer recruitment, project funding, and fulfillment tracking for marine conservation.",
      challenge: "Centralizing fragmented conservation data and building a trustworthy donation flow from user input through to processing.",
      role: "Full Stack & QA",
      year: "2025",
      metrics: ["Supports UN Sustainable Development Goal 14", "Full donation module from input to processing"],
      tags: ["Next.js 16", "TypeScript", "Supabase", "ShadcnUI", "Prisma", "Tailwind CSS"],
      link: "https://github.com/PPL-SI4701-F/SinergiLaut-PPL",
      comingSoon: false,
    },
    {
      id: 3,
      title: "Gamified Practicum LMS",
      bgWord: "LEVEL UP",
      kicker: "Project 03",
      heading: "Pixel-Art Learning System",
      description: "A pixel art-themed Learning Management System designed to optimize university practicum engagement and administrative efficiency. Built fullstack end-to-end with real-time and auth features.",
      challenge: "Turning a dry administrative workflow into an engaging, game-like experience without sacrificing reliability.",
      role: "Full Stack Developer",
      year: "2025",
      metrics: ["Pixel art UI boosts practicum engagement", "Full-stack coverage with real-time & auth features"],
      tags: ["Next.js 14", "TypeScript", "Supabase", "NextAuth.js", "Prisma ORM", "Zod"],
      link: "https://github.com/ezaarp/EISD-Hackathon",
      comingSoon: false,
    },
    {
      id: 4,
      title: "FacilityRent",
      bgWord: "BOOKING",
      kicker: "Case Study 04",
      heading: "Sports Field Rental System",
      description: "A Laravel-based web application for managing sports field rentals — handling venue listings, booking schedules, and reservation management. Built as a team final project.",
      challenge: "Coordinating real-time availability across multiple venues while keeping the booking flow simple and conflict-free.",
      role: "Web Developer",
      year: "2025",
      metrics: ["Court booking & schedule management", "Server-rendered with Laravel & Blade"],
      tags: ["Laravel", "PHP", "Blade", "MySQL"],
      link: "https://github.com/ezaarp/WEB-SEWA-LAPANGAN_TIM-TUBES-5_SI4701",
      comingSoon: false,
    },
    {
      id: 5,
      title: "GyroSteer",
      description: "A gyroscope-driven steering project. Repository link coming soon.",
      tags: [],
      link: "#",
      comingSoon: true,
    },
    {
      id: 6,
      title: "OwnScreen",
      description: "Currently in the pipeline. Repository link coming soon.",
      tags: [],
      link: "#",
      comingSoon: true,
    },
  ],
  experience: [
    {
      id: 1,
      role: "Practicum Assistant",
      company: "Telkom University",
      duration: "2024 – Present",
      achievements: [
        "Mentors peers on technical concepts and programming fundamentals.",
        "Solidifies own technical foundations through hands-on teaching.",
        "Conducts and supervises practicum sessions for Information Systems students.",
      ],
    },
    {
      id: 2,
      role: "Information Systems Student",
      company: "Telkom University",
      duration: "2022 – Present",
      achievements: [
        "Specializing in software optimization and cloud computing architectures.",
        "Built multiple full-stack projects spanning web, real-time, and LMS domains.",
        "Exploring secure, efficient system design and cloud-native solutions.",
      ],
    },
  ],
};

const ACCENT = '#3b638c';

const projectThemes = [
  '#3b638c',
  '#2f5d57',
  '#5a4a7a',
  '#9a5b34',
  '#6b6b6b',
  '#6b6b6b',
];

// Fixed architectural drafting-line background
const DraftingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let scrollY = window.scrollY;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(59, 99, 140, 0.1)';
      ctx.lineWidth = 1;
      const offset = (scrollY * 0.1) % 100;

      ctx.beginPath();
      for (let x = offset; x < width; x += 100) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offset; y < height; y += 100) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.moveTo(0, offset);
      ctx.lineTo(width, height + offset);
      ctx.moveTo(width, offset);
      ctx.lineTo(0, height + offset);
      ctx.stroke();

      ctx.fillStyle = 'rgba(59, 99, 140, 0.2)';
      for (let x = offset; x < width; x += 100) {
        for (let y = offset; y < height; y += 100) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      draw();
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      draw();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', opacity: 0.4 }}
    />
  );
};

// Scroll-reveal wrapper
const Reveal = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

const Header = () => (
  <nav className="w-full border-b border-editorial px-6 py-4 flex justify-between items-center sticky top-0 z-50" style={{ background: 'rgba(246,245,241,0.8)', backdropFilter: 'blur(12px)' }}>
    <a href="#" className="text-2xl font-serif-custom font-semibold tracking-tight">{portfolioData.personalInfo.shortName}.</a>
    <div className="hidden md:flex space-x-12 text-[11px] font-medium tracking-[0.2em] uppercase">
      <a href="#about" className="hover:text-[#3b638c] transition-colors">About</a>
      <a href="#projects" className="hover:text-[#3b638c] transition-colors">Projects</a>
      <a href="#experience" className="hover:text-[#3b638c] transition-colors">Experience</a>
    </div>
    <a href="#contact" className="border border-black rounded-full px-6 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors flex items-center gap-2">
      Get In Touch <ArrowRight className="w-3 h-3" />
    </a>
  </nav>
);

const Hero = () => {
  const info = portfolioData.personalInfo;
  return (
    <section className="relative w-full min-h-[calc(100vh-65px)] border-b border-editorial flex">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row">

        {/* Left sidebar */}
        <aside className="fade-up hidden lg:flex flex-col justify-between border-r border-editorial py-12 px-8 w-[200px] shrink-0" style={{ animationDelay: '0.05s' }}>
          <div>
            <p className="text-5xl font-serif-custom leading-none">{info.issue}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mt-1">Issue</p>
            <div className="w-8 h-px bg-black/20 my-6" />
          </div>

          <div className="space-y-7 text-[11px] uppercase tracking-[0.18em]">
            <div>
              <MapPin className="w-3.5 h-3.5 text-gray-400 mb-2" strokeWidth={1.5} />
              <p>{info.location}</p>
            </div>
            <div>
              <Calendar className="w-3.5 h-3.5 text-gray-400 mb-2" strokeWidth={1.5} />
              <p>{info.year}</p>
            </div>
            <div>
              <Briefcase className="w-3.5 h-3.5 text-gray-400 mb-2" strokeWidth={1.5} />
              <p>Open To Work</p>
            </div>
            <div className="pt-2 space-y-1 text-gray-500">
              {info.tags.map((t) => <p key={t}>{t}</p>)}
            </div>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 leading-relaxed">
            <p>© {info.year}</p>
            <p>{info.name.split(' ')[0]} {info.name.split(' ')[2]}</p>
          </div>
        </aside>

        {/* Center content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-16">
          <p className="fade-up text-[11px] uppercase tracking-[0.3em] text-[#3b638c] mb-8 flex items-center gap-3" style={{ animationDelay: '0.15s' }}>
            <span className="w-6 h-px bg-[#3b638c]" /> {info.title}
          </p>
          <h1 className="fade-up font-serif-custom leading-[0.95] mb-8" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', animationDelay: '0.25s' }}>
            Hi,<br />I'm <span style={{ color: ACCENT }}>{info.shortName}.</span>
          </h1>
          <p className="fade-up font-serif-custom text-xl md:text-2xl mb-8" style={{ color: ACCENT, animationDelay: '0.4s' }}>{info.subtitle}</p>
          <p className="fade-up text-sm md:text-base text-gray-600 leading-relaxed font-light max-w-md mb-12" style={{ animationDelay: '0.5s' }}>
            {info.tagline}
          </p>
          <div className="fade-up flex items-center gap-8 flex-wrap" style={{ animationDelay: '0.6s' }}>
            <a href="#projects" className="bg-black text-white px-8 py-4 text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#3b638c] transition-colors">
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="text-xs uppercase tracking-widest flex items-center gap-3 hover:text-[#3b638c] transition-colors border-b border-black pb-1">
              Contact Me <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right photo panel */}
        <div className="fade-up relative lg:w-[44%] min-h-[60vh] lg:min-h-0 overflow-hidden" style={{ background: ACCENT, animationDelay: '0.35s' }}>
          {/* Soft radial glow behind the figure */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)' }} />
          <img src={heroPhoto} alt={info.name} draggable={false} className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[94%] w-auto max-w-none object-contain select-none" style={{ objectPosition: 'bottom', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(26,26,26,0.4) 100%)' }} />

          {/* Vertical accent text */}
          <div className="absolute top-10 right-6 hidden lg:block">
            <p className="vertical-text font-serif-custom text-white/70 tracking-[0.4em] text-3xl">PORTFOLIO</p>
          </div>

          {/* Focus area card */}
          <div className="absolute bottom-8 right-8 left-8 lg:left-auto lg:w-64 p-5 rounded-lg" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="flex items-center gap-2 mb-4 text-white/80">
              <Cloud className="w-4 h-4" strokeWidth={1.5} />
              <p className="text-[10px] uppercase tracking-[0.25em]">Focus Area</p>
            </div>
            <div className="space-y-1.5">
              {info.focusAreas.map((area) => (
                <p key={area} className="text-white text-sm font-light">{area}</p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="w-full py-32 border-b border-editorial">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

        <div className="md:col-span-4">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#3b638c] mb-4">About Me</p>
            <h2 className="font-serif-custom text-4xl md:text-5xl leading-tight">
              Engineering reliable solutions.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              {portfolioData.personalInfo.about}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-3">
          <Reveal>
            <div className="space-y-8">
              {portfolioData.skills.map((group) => (
                <div key={group.category} className="border-t border-editorial pt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">{group.category}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="text-sm font-medium">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  </section>
);

// Layout A — magazine cover
const ProjectCover = ({ project, color }: { project: typeof portfolioData.projects[0]; color: string }) => (
  <section className="relative w-full min-h-[90vh] flex items-center justify-center border-b border-editorial overflow-hidden pt-20 pb-32">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif-custom text-black/5 whitespace-nowrap pointer-events-none select-none z-0" style={{ fontSize: '18vw' }}>
      {project.bgWord}
    </div>

    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
      <Reveal><p className="text-[10px] uppercase tracking-[0.3em] mb-8">{project.kicker}</p></Reveal>

      <Reveal>
        <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden shadow-2xl flex flex-col justify-end p-8" style={{ background: color }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
          <p className="relative text-white/70 text-[10px] uppercase tracking-[0.3em] mb-3">{project.heading}</p>
          <h3 className="relative font-serif-custom text-white text-4xl">{project.title}</h3>
        </div>
      </Reveal>

      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:block text-left">
        <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">Design By Alvin</p>
        <div className="text-lg tracking-[0.2rem]">***</div>
      </div>
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:block text-right">
        <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">Project No.1</p>
        <div className="text-lg tracking-[0.2rem]">***</div>
      </div>

      <Reveal className="mt-12 text-center max-w-lg">
        <h2 className="font-serif-custom text-4xl md:text-6xl mb-6" style={{ color }}>{project.heading}</h2>
        <p className="text-sm text-gray-600 leading-relaxed font-light mb-6">{project.description}</p>
        <div className="flex justify-center flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full border border-gray-300 text-[10px] uppercase tracking-wider">{tag}</span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-8 font-serif-custom italic text-lg hover:text-[#3b638c] transition-colors">
          View on GitHub <span className="not-italic text-sm">→</span>
        </a>
      </Reveal>
    </div>
  </section>
);

// Layout B — arched
const ProjectArched = ({ project, color }: { project: typeof portfolioData.projects[0]; color: string }) => (
  <section className="w-full py-32 border-b border-editorial bg-white/40">
    <div className="max-w-7xl mx-auto px-6">
      <Reveal className="text-center mb-24">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#3b638c] mb-4">{project.kicker}</p>
        <h2 className="font-serif-custom text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">{project.heading}</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <Reveal className="order-2 md:order-1 text-center md:text-right">
          <h3 className="font-serif-custom text-2xl mb-4">The Challenge</h3>
          <p className="text-xs text-gray-500 leading-loose">{project.challenge}</p>
        </Reveal>

        <Reveal className="order-1 md:order-2 flex justify-center">
          <div className="w-full max-w-[300px] aspect-[2/3] rounded-t-[1000px] overflow-hidden shadow-lg flex flex-col justify-end items-center p-8 relative" style={{ background: color }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
            <h3 className="relative font-serif-custom text-white text-3xl text-center">{project.title}</h3>
          </div>
        </Reveal>

        <Reveal className="order-3 md:order-3 text-center md:text-left">
          <div className="flex justify-center md:justify-start flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={tag} className={`px-4 py-1 rounded-full text-[10px] uppercase tracking-wider ${i === 0 ? 'text-white' : 'border border-gray-300'}`} style={i === 0 ? { background: color } : {}}>{tag}</span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-serif-custom italic text-lg hover:text-[#3b638c] transition-colors">
            View on GitHub <span className="not-italic text-sm">→</span>
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

// Layout C — structured grid
const ProjectGrid = ({ project, color }: { project: typeof portfolioData.projects[0]; color: string }) => (
  <section className="w-full py-32 border-b border-editorial">
    <div className="max-w-7xl mx-auto px-6">
      <div className="w-full h-px bg-black/20 mb-16 transform -skew-y-1" />
      <div className="flex flex-col md:flex-row gap-16">
        <Reveal className="hidden md:flex flex-col justify-between border-r border-editorial pr-8">
          <h2 className="vertical-text text-5xl font-serif-custom tracking-widest" style={{ color }}>{project.title}</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] mt-8 text-gray-400">{project.kicker}</p>
        </Reveal>

        <div className="flex-grow">
          <h2 className="md:hidden text-4xl font-serif-custom mb-8" style={{ color }}>{project.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal>
              <div className="aspect-video overflow-hidden flex items-center justify-center p-8 relative" style={{ background: color }}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
                <p className="relative font-serif-custom text-white text-2xl text-center">{project.heading}</p>
              </div>
            </Reveal>
            <Reveal className="flex flex-col justify-center">
              <h3 className="font-serif-custom text-3xl mb-6">{project.heading}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-8 font-light">{project.description}</p>
              <div className="grid grid-cols-2 gap-4 border-t border-editorial pt-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Role</p>
                  <p className="text-sm font-medium">{project.role}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Year</p>
                  <p className="text-sm font-medium">{project.year}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-gray-300 text-[10px] uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-8 font-serif-custom italic text-lg hover:text-[#3b638c] transition-colors">
                View on GitHub <span className="not-italic text-sm">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Projects = () => {
  const real = portfolioData.projects.filter((p) => !p.comingSoon);
  const upcoming = portfolioData.projects.filter((p) => p.comingSoon);
  const layouts = [ProjectCover, ProjectArched, ProjectGrid];

  return (
    <div id="projects">
      {real.map((project, i) => {
        const Layout = layouts[i % layouts.length];
        return <Layout key={project.id} project={project} color={projectThemes[i]} />;
      })}

      {/* Coming soon teaser row */}
      <section className="w-full py-24 border-b border-editorial">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-12 text-center">More On The Way</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcoming.map((project) => (
                <div key={project.id} className="border border-editorial p-8 flex items-start justify-between gap-6 opacity-70 hover:opacity-100 transition-opacity">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">In Progress</p>
                    <h3 className="font-serif-custom text-2xl mb-2">{project.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-sm">{project.description}</p>
                  </div>
                  <span className="text-lg tracking-[0.2rem] text-gray-300 shrink-0">***</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

const Experience = () => (
  <section id="experience" className="w-full py-32 border-b border-editorial">
    <div className="max-w-7xl mx-auto px-6">
      <Reveal className="mb-20">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#3b638c] mb-4">Career</p>
        <h2 className="font-serif-custom text-4xl md:text-5xl">Professional Experience</h2>
      </Reveal>

      <div className="space-y-px">
        {portfolioData.experience.map((job, i) => (
          <Reveal key={job.id}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 border-t border-editorial group hover:bg-white/40 transition-colors px-2">
              <div className="md:col-span-1">
                <p className="font-serif-custom text-3xl text-gray-300">{String(i + 1).padStart(2, '0')}</p>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif-custom text-2xl mb-2 group-hover:text-[#3b638c] transition-colors">{job.role}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
                <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-3 font-medium">{job.duration}</p>
              </div>
              <div className="md:col-span-7">
                <ul className="space-y-3">
                  {job.achievements.map((a, idx) => (
                    <li key={idx} className="text-sm text-gray-600 leading-relaxed flex items-start gap-3">
                      <span className="text-[#3b638c] mt-1.5 text-[8px]">●</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <footer id="contact" className="w-full py-32 text-center">
    <div className="max-w-3xl mx-auto px-6">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#3b638c] mb-8">What's Next?</p>
        <h2 className="font-serif-custom text-5xl md:text-7xl mb-10 leading-tight">Let's build something beautiful.</h2>
        <a href={`mailto:${portfolioData.personalInfo.email}`} className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-xs uppercase tracking-widest hover:bg-[#3b638c] transition-colors mb-16">
          <Mail className="w-4 h-4" /> Say Hello
        </a>
        <div className="flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-12">
          <a href={portfolioData.personalInfo.github} className="hover:text-black transition-colors flex items-center gap-1.5" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href={portfolioData.personalInfo.linkedin} className="hover:text-black transition-colors flex items-center gap-1.5" target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href={portfolioData.personalInfo.whatsapp} className="hover:text-black transition-colors flex items-center gap-1.5" target="_blank" rel="noreferrer">
            WhatsApp <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href={`mailto:${portfolioData.personalInfo.email}`} className="hover:text-black transition-colors flex items-center gap-1.5">
            Email <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 border-t border-editorial pt-8">
          © {portfolioData.personalInfo.year} {portfolioData.personalInfo.shortName}. All rights reserved.
        </p>
      </Reveal>
    </div>
  </footer>
);

export default function PortfolioApp() {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: '#f6f5f1' }}>
      <DraftingCanvas />
      <Header />
      <main className="w-full">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
