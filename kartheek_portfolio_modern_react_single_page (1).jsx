import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  GraduationCap,
  Cpu,
  Code2,
  FileDown,
  ArrowRight,
  Sparkles,
  Globe,
  Music2,
  Menu,
  X,
  Filter,
  Search
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ---------- Config (edit these) ----------
const CONTACT_EMAIL = "kartheekreddy@outlook.in";
const CONTACT_PHONE = "+44-7554809914";
const GITHUB_URL = "https://github.com/KartheekReddy100";
const LINKEDIN_URL = "https://www.linkedin.com/in/kartheek-nallamilli/";
const CV_URL = "/cv/Nallamilli_Satya_Sai_Kartheek_Reddy.pdf";

// ---------- Styles / helpers ----------
const glass = "backdrop-blur-xl bg-background/60 border border-white/10 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]";
const glassSoft = "backdrop-blur-xl bg-background/40 border border-white/10 dark:border-white/5";

const Section: React.FC<{ id: string; title: string; subtitle?: string; children: React.ReactNode }>
 = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-24 scroll-mt-24">
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-10">
        <div className={`${glassSoft} inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3`}>
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-foreground/80">Section</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-foreground/80 mt-2 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  </section>
);

const Chip: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLSpanElement>> = ({ children, className = "", ...rest }) => (
  <Badge className={`rounded-full px-3 py-1 text-sm font-medium ${className}`} {...rest}>{children}</Badge>
);

// ---------- Main Component ----------
export default function Portfolio() {
  const skills = {
    Security: [
      "Penetration Testing",
      "Digital Forensics",
      "Threat Modeling",
      "Network Security",
      "SIEM (Splunk/ELK)",
      "Incident Response",
      "OSINT",
      "Risk Management & Threat Analysis",
      "Ethical Hacking (TryHackMe/HTB)",
    ],
    "Crypto & PQ": [
      "AES/RSA/EC",
      "Hashing/Salting",
      "Steganography",
      "Post-Quantum (QKD/QKG)",
      "Encryption/Decryption Tools",
    ],
    Engineering: [
      "Python (Intermediate)",
      "C/C++ (Advanced)",
      "Dart, C# (Advanced)",
      "Java (Novice)",
      "JavaScript/TypeScript",
      "React",
      "SQL",
      "Linux",
      "Git/GitHub",
      "Docker",
      "Cloud Computing (IBM Cloud)",
    ],
  } as const;

  type Project = {
    title: string;
    blurb: string;
    tags: string[];
    category: string;
    link: string;
    icon: React.ReactNode;
    image: string;
  };

  const projects: Project[] = [
    {
      title: "Stegocrypt (Work in Progress)",
      blurb: "Python tool combining encryption (AES/RSA) with LSB steganography to secure sensitive data.",
      tags: ["Python", "Cryptography", "Steganography"],
      category: "Security Research",
      link: "#",
      icon: <Cpu className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1581091012184-5c2f8c8e91a1?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Is My File Safe?",
      blurb: "Python app leveraging VirusTotal API to scan files and report on potential threats in real time.",
      tags: ["Python", "API", "Cybersecurity"],
      category: "Forensics Tools",
      link: "#",
      icon: <ShieldCheck className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d6?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Hashkitten – Hashing Toolkit",
      blurb: "Open-source Python toolkit to compute and verify file hashes fast (MD5/SHA families).",
      tags: ["Python", "Hashing", "CLI"],
      category: "Forensics Tools",
      link: "https://github.com/KartheekReddy100/Hashkitten",
      icon: <Cpu className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Centralized Quantum Key Generation (QKG) System",
      blurb: "MSc dissertation: designed and evaluated a QKG system for secure communications in the post‑quantum era.",
      tags: ["Post-Quantum", "Cryptography", "Systems"],
      category: "Security Research",
      link: "#",
      icon: <Cpu className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Email Header Forensics Toolkit",
      blurb: "Automated parsing, tracing, and reporting of email headers with chain of custody support.",
      tags: ["Forensics", "Python", "Reports"],
      category: "Forensics Tools",
      link: "#",
      icon: <ShieldCheck className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "GeoGuessr‑style OSINT Game",
      blurb: "Web + Android game built with Unity/Java & Open Maps API to develop visual intel skills.",
      tags: ["OSINT", "Unity", "Android"],
      category: "OSINT & Games",
      link: "#",
      icon: <Globe className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "EDM Project: Feel It",
      blurb: "Club‑dance track & music video; contributed to production workflow and secure media handling.",
      tags: ["Creative", "DAW", "Video"],
      category: "Creative",
      link: "#",
      icon: <Music2 className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const experience = [
    {
      when: "Sep 2024 – Present",
      title: "MSc Advanced Cyber Security",
      where: "Cardiff Metropolitan University, UK",
      bullets: [
        "Hands-on penetration testing & forensic investigations",
        "Designed policies aligned with GDPR, ISO 27701",
        "QKG dissertation in progress",
      ],
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      when: "Sep 2020 – May 2024",
      title: "BTech Computer Science & Engineering",
      where: "Lovely Professional University, India",
      bullets: [
        "Explored decentralized systems & smart contracts",
        "Cyber threat detection, response, and secure data transmission",
      ],
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      when: "Sep 2023 – Dec 2023",
      title: "Software Tester (Freelance, Remote)",
      where: "Candywriter LLC",
      bullets: [
        "Tested BitLife mobile game for critical bugs & gameplay stability",
        "Collaborated with developers & designers to resolve issues",
      ],
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      when: "Sep 2020 – Nov 2023",
      title: "Curriculum Planner & Game Designer (Remote)",
      where: "Team Everest",
      bullets: [
        "Planned story structures & puzzles for children (ages 9–12)",
        "Developed Unity C# mini-games for education",
      ],
      icon: <Globe className="w-5 h-5" />,
    },
    {
      when: "Sep 2023 – Present",
      title: "Kitchen Helper (Part-time)",
      where: "Lazeez Foods, Cardiff",
      bullets: [
        "Maintained kitchen cleanliness & sanitation per health codes",
        "Assisted with utensils & cookware management",
      ],
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  const certifications = [
    {
      title: "IBM Cloud Essentials (CC0103EN)",
      provider: "edX",
      date: "Jun 2023",
      image: "https://images.unsplash.com/photo-1581090700227-4c4d6e98e8e7?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Introduction to Cybersecurity Essentials",
      provider: "Coursera & IBM",
      date: "Mar 2023",
      image: "https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "TryHackMe / HTB Labs",
      provider: "Self‑study",
      date: "Ongoing",
      image: "https://images.unsplash.com/photo-1614064643269-4c22fcf04dc3?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="relative min-h-screen scroll-smooth">
      {/* Hero updated with contact info */}
      <Section id="home" title="">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight"
            >
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Satya Sai Kartheek</span>
            </motion.h1>
            <p className="mt-4 text-lg text-foreground/85 max-w-xl">
              MSc Cyber Security student with hands‑on penetration testing, digital forensics, cryptography, and cloud security experience. Open to roles in security engineering, testing, or research.
            </p>
            <div className="mt-4 text-sm text-foreground/70 space-y-1">
              <p><strong>Email:</strong> {CONTACT_EMAIL}</p>
              <p><strong>Phone:</strong> {CONTACT_PHONE}</p>
              <p><strong>Location:</strong> Cardiff, UK</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="default" className="gap-2">
                <a href="#projects"><Sparkles className="w-4 h-4" />See my work</a>
              </Button>
              <Button asChild variant="outline" className="gap-2 border-foreground/20 text-foreground">
                <a href={`mailto:${CONTACT_EMAIL}`}><Mail className="w-4 h-4" />Contact</a>
              </Button>
              <Button asChild variant="ghost" className="gap-2 text-foreground">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github className="w-4 h-4" />GitHub</a>
              </Button>
              <Button asChild variant="ghost" className="gap-2 text-foreground">
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4" />LinkedIn</a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Featured Projects" subtitle="From research to practical security tools and creative work.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card key={p.title} className={`group h-full overflow-hidden ${glass} text-foreground`}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute left-3 top-3">
                  <Chip className={`${glass} text-foreground`}>{p.category}</Chip>
                </div>
              </div>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {p.icon} {p.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/85">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t} className={`${glass} text-foreground`}>{t}</Chip>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <a href={p.link} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">View project</a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tools">
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([group, items]) => (
            <Card key={group} className={`overflow-hidden ${glass} text-foreground`}>
              <CardHeader><CardTitle>{group}</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Chip key={s} className={`${glass} text-foreground`}>{s}</Chip>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience / Education */}
      <Section id="experience" title="Experience & Education">
        <div className="space-y-6">
          {experience.map((t) => (
            <Card key={t.title} className={`${glass} text-foreground`}>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="
