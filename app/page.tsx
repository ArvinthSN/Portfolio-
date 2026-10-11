'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedBackground } from '@/components/Background/AnimatedBackground';
import { ChatbotPanel } from '@/components/Chatbot/ChatbotPanel';
import { SectionHeading } from '@/components/Sections/SectionHeading';
import { CustomCursor } from '@/components/UI/CustomCursor';
import { portfolioData } from '@/data/portfolio';
import { useRobotState } from '@/hooks/useRobotState';
import { useTripleTap } from '@/hooks/useTripleTap';

const RobotScene = dynamic(() => import('@/components/Robot/RobotScene'), { ssr: false, loading: () => <div className="robot-loading">INITIALIZING AI CORE…</div> });

const constellation = ['Python', 'React', 'FastAPI', 'LLMs', 'Docker', 'PostgreSQL', 'Java', 'Spring Boot', 'RAG', 'Data'];

export default function Home() {
  const { robotState, transition, reset } = useRobotState();
  const [chatOpen, setChatOpen] = useState(false);
  const [carVisible, setCarVisible] = useState(false);
  const transformTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollChatTriggered = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 38, filter: 'blur(9px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%' } });
      });
      gsap.to('.drive-car', { x: '115vw', ease: 'none', scrollTrigger: { trigger: '#journey', start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
      gsap.to('.timeline-progress', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 78%', end: 'bottom 68%', scrub: true } });
      ScrollTrigger.create({
        trigger: '#home', start: 'top top', end: 'bottom top',
        onUpdate: (self) => {
          if (!scrollChatTriggered.current && self.direction === 1 && self.progress > 0.48 && self.progress < 0.8) {
            scrollChatTriggered.current = true;
            transition('chatbot');
            setChatOpen(true);
          }
        },
      });
    });
    return () => context.revert();
  }, []);

  useEffect(() => () => { if (transformTimer.current) clearTimeout(transformTimer.current); }, []);
  const resetRobot = useCallback(() => { setChatOpen(false); setCarVisible(false); reset(); }, [reset]);
  const openChat = useCallback(() => { transition('chatbot'); setChatOpen(true); }, [transition]);
  const transform = useCallback(() => {
    if (robotState === 'transforming') return;
    setChatOpen(false); transition('transforming'); setCarVisible(true);
    transformTimer.current = setTimeout(() => {
      transition('car');
      window.setTimeout(() => { transition('driving'); setCarVisible(false); }, 320);
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1700);
  }, [robotState, transition]);
  const gesture = useTripleTap(resetRobot, openChat, transform);

  return <main>
    <AnimatedBackground /><CustomCursor />
    <nav className="nav-shell"><a href="#home" className="brand"><i />ARVINTH<span>.SN</span></a><div className="nav-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#journey">Experience</a></div><button className="talk-button" data-cursor="TALK TO AI" onClick={openChat}>Let&apos;s talk <b>↗</b></button></nav>
    <section className="hero" id="home" style={{ backgroundImage: 'url(/robot-hero.png)' }}>
      <div className="hero-copy"><motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>AI <span>✦</span> BACKEND <span>✦</span> DATA <span>✦</span> SYSTEMS</motion.p><h1>BUILDING<br /><em>INTELLIGENT</em><br />SYSTEMS<span>.</span></h1><p>I&apos;m Arvinth — a Software Engineer building the AI, data, and backend systems that make ambitious products useful.</p><div className="hero-actions"><a className="primary-button" data-cursor="EXPLORE" href="#projects">Explore my work <b>→</b></a><button className="ghost-button" onClick={openChat}>◉ Meet the assistant</button></div></div>
      <div className={`robot-stage state-${robotState}`} role="button" tabIndex={0} aria-label="AI assistant. Single click resets, double click opens chat, triple click transforms into a car." data-cursor="◎ TALK TO AI" onClick={gesture} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openChat(); } }}>
        <div className="platform"><i /><i /><i /></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /><RobotScene state={robotState} />
        <motion.div className="speech-bubble" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}><strong>Hi <span>👋</span></strong><br />I&apos;m Arvinth&apos;s AI assistant.<small className="typewriter">Double: chat · Triple: drive</small></motion.div>
        <div className="robot-status"><i /> {robotState === 'idle' ? 'AI ASSISTANT ONLINE' : robotState.toUpperCase()}</div>
      </div>
      <div className="hero-stats"><div><b>10<sup>+</sup></b><span>Projects</span></div><div><b>2<sup>+</sup></b><span>Years building</span></div><div><b>AI</b><span>Focus</span></div></div><a href="#about" className="scroll-note">SCROLL TO EXPLORE <span>↓</span></a>
    </section>
    <section id="about" className="content-section about-section"><SectionHeading index="01 / IDENTITY" title="WHO IS" accent="ARVINTH?">I design dependable digital systems where thoughtful engineering meets useful intelligence.</SectionHeading><div className="word-wall" data-reveal>{['AI', 'DATA', 'BACKEND', 'SYSTEMS'].map((word) => <span key={word}>{word}</span>)}</div><p className="section-lede" data-reveal>{portfolioData.about.summary}</p></section>
    <section id="projects" className="content-section projects-section"><SectionHeading index="02 / SELECTED WORK" title="MADE TO" accent="MOVE">The interface, intelligence, and infrastructure moving as one system.</SectionHeading><div className="project-rail">{portfolioData.projects.map((project, index) => <article className="project-frame" data-reveal key={project.name}><div className={`project-art art-${index}`}><div className="architecture">{['USER', 'REACT', 'FASTAPI', 'RAG + LLM', 'PGVECTOR'].map((node) => <span key={node}>{node}</span>)}</div></div><div><p className="eyebrow">0{index + 1} — {project.type}</p><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.stack.map((tag) => <b key={tag}>{tag}</b>)}</div><a href="#contact">View case study ↗</a></div></article>)}</div></section>
    <section id="skills" className="content-section"><SectionHeading index="03 / TECH CONSTELLATION" title="TOOLS WITH" accent="INTENTION">A connected stack for building things that last.</SectionHeading><div className="constellation" data-reveal><div className="core">ARVINTH</div>{constellation.map((skill, index) => <span key={skill} style={{ '--i': index } as React.CSSProperties}>{skill}</span>)}<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 50L14 22M50 50L36 12M50 50L72 18M50 50L90 50M50 50L70 84M50 50L33 87M50 50L9 58" /></svg></div></section>
    <section id="journey" className="content-section journey-section"><div className="drive-car" aria-hidden="true"><span /><i /><b /></div><SectionHeading index="04 / TRAJECTORY" title="ONWARD" accent="— ALWAYS">Learning fast, shipping thoughtfully, and looking for meaningful problems.</SectionHeading><div className="timeline" data-reveal><div className="timeline-progress" />{portfolioData.experience.map((item) => <article key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div></section>
    <section id="contact" className="content-section contact-section"><p className="eyebrow">05 / CONNECT</p><h2>HAVE A BOLD IDEA?<br /><em>LET&apos;S MAKE IT REAL.</em></h2><a href="mailto:hello@arvinth.dev" className="primary-button">Start a conversation <b>↗</b></a></section>
    <ChatbotPanel open={chatOpen} onClose={resetRobot} />
    {carVisible && <div className="transform-overlay" role="status" aria-live="polite"><div className="transform-copy"><p>TRANSFORMATION <em>INITIATED</em></p><small>ARMS RETRACT · CORE LOCKED · WHEELS DEPLOYED</small></div><div className="transform-car"><span /><i /><b /><b /></div><button onClick={resetRobot}>Skip animation</button></div>}
  </main>;
}
