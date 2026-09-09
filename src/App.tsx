import { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { 
  FiGithub, FiLinkedin, FiYoutube, 
  FiMail, FiPhone, FiMapPin, FiExternalLink, FiDownload,
  FiSun, FiMoon, FiArrowUp, FiMenu, FiX, FiCheck, FiCode,
  FiSmartphone, FiShield, FiCloud, FiCpu, FiLayers,
  FiZap, FiTarget, FiAward, FiGlobe, FiLock, FiSettings, FiPackage, FiGitBranch
} from 'react-icons/fi';
import { 
  FaSlack, FaRedditAlien, FaTumblr, FaGithub, FaRocket, FaStar, FaGem, FaCrown, FaFire
} from 'react-icons/fa';
import { 
  SiKotlin, SiFirebase, SiTensorflow, SiDocker, SiKubernetes
} from 'react-icons/si';

/* ══════════════════════════════════════════════════════════════
   GLASS MORPHISM COMPONENTS
   ══════════════════════════════════════════════════════════════ */

const GlassCard = ({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <div className={`bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.1] rounded-3xl ${
    hover ? 'hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500' : ''
  } ${className}`}>
    {children}
  </div>
);

const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

/* ══════════════════════════════════════════════════════════════
   ANIMATED BACKGROUND - LUXURY STYLE
   ══════════════════════════════════════════════════════════════ */

const LuxuryBackground = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const animate = () => {
      time += 0.005;
      ctx.fillStyle = isDark ? 'rgba(10, 15, 30, 0.05)' : 'rgba(250, 245, 235, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animated gradient orbs
      const orbs = [
        { x: Math.sin(time * 0.7) * 200 + canvas.width * 0.3, y: Math.cos(time * 0.5) * 150 + canvas.height * 0.4, r: 300, color: 'rgba(217, 164, 58, 0.03)' },
        { x: Math.cos(time * 0.6) * 250 + canvas.width * 0.7, y: Math.sin(time * 0.8) * 200 + canvas.height * 0.6, r: 350, color: 'rgba(15, 23, 42, 0.05)' },
        { x: Math.sin(time * 0.4) * 180 + canvas.width * 0.5, y: Math.cos(time * 0.3) * 180 + canvas.height * 0.3, r: 280, color: 'rgba(184, 134, 11, 0.02)' },
      ];
      
      orbs.forEach(orb => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      // Floating particles
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time + i * 0.1) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.7 + i * 0.15) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(time * 2 + i) * 1.5 + 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 164, 58, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    resize();
    animate();
    window.addEventListener('resize', resize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);
  
  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80 pointer-events-none z-[1]" />
    </>
  );
};

/* ══════════════════════════════════════════════════════════════
   CUSTOM CURSOR - GOLDEN RING
   ══════════════════════════════════════════════════════════════ */

const GoldenCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClick(true);
    const up = () => setClick(false);
    const enter = () => setHover(true);
    const leave = () => setHover(false);
    
    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    
    const els = document.querySelectorAll('a, button, [data-hover]');
    els.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      els.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);
  
  return (
    <>
      {/* Inner dot */}
      <div 
        className="fixed w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-[9999] hidden lg:block transition-transform duration-100"
        style={{ left: pos.x - 4, top: pos.y - 4, transform: click ? 'scale(0.5)' : 'scale(1)' }}
      />
      {/* Outer ring */}
      <div 
        className="fixed border-2 border-amber-400/50 rounded-full pointer-events-none z-[9998] hidden lg:block transition-all duration-200"
        style={{ 
          left: pos.x - (hover ? 30 : 20), 
          top: pos.y - (hover ? 30 : 20), 
          width: hover ? 60 : 40, 
          height: hover ? 60 : 40,
          borderColor: hover ? 'rgba(217, 164, 58, 0.8)' : 'rgba(217, 164, 58, 0.3)',
          boxShadow: hover ? '0 0 20px rgba(217, 164, 58, 0.3)' : 'none'
        }}
      />
    </>
  );
};

/* ══════════════════════════════════════════════════════════════
   ANIMATED SECTION WRAPPER
   ══════════════════════════════════════════════════════════════ */

const FadeIn = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   NAVIGATION - FLOATING GLASS BAR
   ══════════════════════════════════════════════════════════════ */

const Navigation = ({ isDark, setIsDark }: { isDark: boolean; setIsDark: (v: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const links = [
    { href: '#hero', label: 'Home', icon: '◆' },
    { href: '#about', label: 'About', icon: '◇' },
    { href: '#expertise', label: 'Expertise', icon: '◈' },
    { href: '#apps', label: 'Portfolio', icon: '◉' },
    { href: '#startup', label: 'Startup', icon: '◎' },
    { href: '#connect', label: 'Connect', icon: '●' },
  ];
  
  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'w-[95%] max-w-4xl' : 'w-[90%] max-w-5xl'}`}>
      <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="#hero" className="flex items-center gap-3" data-hover>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-bold text-slate-900">
              M
            </div>
            <span className="font-bold text-lg hidden sm:block">MKA</span>
          </a>
          
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <a key={link.href} href={link.href} data-hover className="px-4 py-2 text-sm text-gray-300 hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5">
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} data-hover className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-amber-500/20 transition-all">
              {isDark ? <FiSun className="text-amber-400" /> : <FiMoon className="text-gray-400" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} data-hover className="md:hidden w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-amber-500/20 transition-all">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-4">
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block py-3 text-gray-300 hover:text-amber-400 transition-colors">
                <span className="mr-2 text-amber-400">{link.icon}</span> {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════ */

function App() {
  const [isDark, setIsDark] = useState(true);
  const [showTop, setShowTop] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);
  
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <LuxuryBackground isDark={isDark} />
      <GoldenCursor />
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      
      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION - PREMIUM INTRO
          ══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <FadeIn>
            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-3xl opacity-20 animate-pulse" />
              <img
                src="https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp"
                alt="Moe Kyaw Aung"
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-amber-400/50 shadow-2xl shadow-amber-500/20 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <FaCrown className="text-slate-900 text-xl" />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-amber-400">Available for Opportunities</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={400}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="text-gray-500 text-2xl md:text-3xl block mb-2">မိုးကျော်အောင်</span>
              <GradientText className="text-6xl md:text-8xl">Moe Kyaw Aung</GradientText>
            </h1>
          </FadeIn>
          
          <FadeIn delay={600}>
            <div className="text-xl md:text-3xl mb-8 h-12">
              <TypeAnimation
                sequence={[
                  'Senior Mobile Architect',
                  3000,
                  'Android Ecosystem Expert',
                  3000,
                  'Startup Founder',
                  3000,
                  'App Builder for Millions',
                  3000,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="text-gray-300"
              />
            </div>
          </FadeIn>
          
          <FadeIn delay={800}>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Tachileik, Myanmar 🇲🇲 <span className="text-amber-400 mx-2">⟷</span> Bangkok, Thailand 🇹🇭
            </p>
          </FadeIn>
          
          <FadeIn delay={1000}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['Burmese 🇲🇲', 'English 🌐', 'Kotlin ☕'].map(lang => (
                <span key={lang} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:border-amber-400/50 transition-all" data-hover>
                  {lang}
                </span>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn delay={1200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
              {[
                { icon: <FiSmartphone />, title: 'Mobile', sub: 'Kotlin · Compose · MVVM', color: 'amber' },
                { icon: <FiCloud />, title: 'Backend', sub: 'Firebase · REST APIs', color: 'blue' },
                { icon: <FiShield />, title: 'Security', sub: 'Ethical Hacking', color: 'red' },
                { icon: <FiCpu />, title: 'AI / ML', sub: 'Claude · TFLite', color: 'purple' },
              ].map((item, i) => (
                <GlassCard key={i} className="p-5 text-center group">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </GlassCard>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn delay={1400}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <a href="#apps" data-hover className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 rounded-2xl font-bold transition-all hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 flex items-center justify-center gap-3">
                <FiSmartphone className="group-hover:rotate-12 transition-transform" /> View My Apps
              </a>
              <a href="#connect" data-hover className="group px-8 py-4 bg-white/5 border border-amber-400/30 rounded-2xl font-bold transition-all hover:bg-amber-400/10 hover:border-amber-400/50 flex items-center justify-center gap-3">
                <FiMail className="group-hover:rotate-12 transition-transform" /> Contact Me
              </a>
              <a href="#" data-hover className="group px-8 py-4 bg-green-500/20 border border-green-500/30 rounded-2xl font-bold transition-all hover:bg-green-500/30 flex items-center justify-center gap-3">
                <FiDownload className="group-hover:translate-y-1 transition-transform" /> Resume
              </a>
            </div>
          </FadeIn>
          
          <FadeIn delay={1600}>
            <div className="flex justify-center gap-4">
              {[
                { icon: <FiGithub />, url: 'https://github.com/Dev-moe-kyawaung/', color: 'hover:text-white' },
                { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', color: 'hover:text-blue-400' },
                { icon: <FiYoutube />, url: 'https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG', color: 'hover:text-red-400' },
                { icon: <FaTumblr />, url: 'https://www.tumblr.com/moekyawaung', color: 'hover:text-indigo-400' },
                { icon: <FaRedditAlien />, url: 'https://bsky.app/profile/moekyawaung96.bsky.social', color: 'hover:text-sky-400' },
              ].map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" data-hover className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all hover:bg-white/10`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" data-hover className="text-amber-400/50 hover:text-amber-400 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="about" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">About Me</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Code with <GradientText>Culture</GradientText>.
                <br />Build with <GradientText>Purpose</GradientText>.
              </h2>
            </div>
          </FadeIn>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl blur-2xl opacity-10" />
                <img
                  src="https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_12_iv8kpm.webp"
                  alt="Moe Kyaw Aung"
                  className="relative rounded-3xl w-full border border-white/10"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 px-8 py-4 rounded-2xl font-bold shadow-xl">
                  <span className="text-3xl">82+</span>
                  <span className="text-sm block">Certificates</span>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Senior Mobile Architect & Startup Builder</h3>
                
                <p className="text-gray-400 leading-relaxed">
                  Passionate and self-motivated developer focused on building responsive, modern, and user-friendly mobile experiences. 
                  With expertise spanning from web development to mobile apps, databases to AI, I consistently expand my skill set across 
                  the full technology spectrum.
                </p>
                
                <p className="text-gray-400 leading-relaxed">
                  Currently building apps used by millions. From clean architecture decisions to modularization strategies, 
                  I design systems that scale. Whether it's setting up CI/CD pipelines or implementing security best practices, 
                  I ensure every app is production-ready.
                </p>
                
                <div className="grid grid-cols-2 gap-4 py-6">
                  {[
                    { num: '40+', label: 'Projects', color: 'amber' },
                    { num: '1M+', label: 'Downloads', color: 'emerald' },
                    { num: '3+', label: 'Years Exp', color: 'blue' },
                    { num: '16+', label: 'Live Apps', color: 'purple' },
                  ].map((stat, i) => (
                    <GlassCard key={i} className="p-5 text-center" hover={false}>
                      <p className={`text-3xl font-bold text-${stat.color}-400`}>{stat.num}</p>
                      <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                    </GlassCard>
                  ))}
                </div>
                
                <div className="space-y-3">
                  {[
                    'Currently Building: MoekyawTranslator — AI Translation App',
                    'Certifications: 40+ certs · Google Developers Launchpad',
                    'Open to Opportunities 🟢',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <FiCheck className="text-amber-400" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EXPERTISE SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="expertise" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Technical <GradientText>Mastery</GradientText>
              </h2>
            </div>
          </FadeIn>
          
          {/* Architecture Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <FiLayers />, title: 'Modularization Strategy', desc: 'Feature-based module separation with clean boundaries. Domain, data, and presentation layers properly isolated.', gradient: 'from-amber-500/20 to-orange-500/20' },
              { icon: <FiPackage />, title: 'Multi-Module Projects', desc: 'Scalable project structure with shared core modules, feature modules, and test modules for maximum reusability.', gradient: 'from-blue-500/20 to-cyan-500/20' },
              { icon: <FiSettings />, title: 'Dependency Injection', desc: 'Hilt/Dagger implementation with proper scoping, component hierarchy, and module organization.', gradient: 'from-purple-500/20 to-pink-500/20' },
              { icon: <FiGitBranch />, title: 'CI/CD Pipelines', desc: 'Automated build, test, and deployment pipelines with GitHub Actions and Azure DevOps.', gradient: 'from-green-500/20 to-emerald-500/20' },
              { icon: <FiTarget />, title: 'Testing Strategy', desc: 'Comprehensive testing with unit, integration, and UI tests. 90%+ coverage with MockK and Espresso.', gradient: 'from-red-500/20 to-rose-500/20' },
              { icon: <FiZap />, title: 'App Scalability', desc: 'Performance optimization, memory management, and architecture patterns for apps serving millions.', gradient: 'from-yellow-500/20 to-amber-500/20' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <GlassCard className="p-8 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-amber-400 mb-6`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
          
          {/* Tech Stack */}
          <FadeIn>
            <GlassCard className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-8 text-center">Tech Stack & <GradientText>Technologies</GradientText></h3>
              
              <div className="space-y-8">
                {[
                  { title: 'Android / Mobile', skills: ['Kotlin', 'Jetpack Compose', 'Android', 'MVVM', 'Clean Architecture', 'Coroutines', 'Flow', 'Room'], color: 'amber' },
                  { title: 'Backend & Cloud', skills: ['Firebase', 'REST APIs', 'Retrofit', 'Python', 'Node.js', 'GraphQL'], color: 'blue' },
                  { title: 'AI / ML', skills: ['Claude API', 'TensorFlow Lite', 'On-Device ML', 'Python ML', 'OpenAI'], color: 'purple' },
                  { title: 'Security', skills: ['Ethical Hacking', 'Cybersecurity', 'Kali Linux', 'Pen Testing', 'Network Security'], color: 'red' },
                  { title: 'DevOps & CI/CD', skills: ['GitHub Actions', 'Azure DevOps', 'Jenkins', 'Fastlane', 'Docker', 'Git'], color: 'green' },
                ].map((category, i) => (
                  <div key={i}>
                    <h4 className={`text-${category.color}-400 font-medium mb-3 text-sm uppercase tracking-wider`}>{category.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => (
                        <span key={skill} className={`px-4 py-2 bg-${category.color}-500/10 border border-${category.color}-500/20 rounded-xl text-sm hover:bg-${category.color}-500/20 transition-all`} data-hover>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-amber-400 font-medium mb-4 text-sm uppercase tracking-wider text-center">Architecture Patterns</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Clean Architecture', 'MVVM', 'MVI', 'Multi-module', 'Repository Pattern', 'SOLID', 'Domain-Driven Design'].map(pattern => (
                    <span key={pattern} className="px-5 py-2 bg-white/5 border border-amber-400/20 rounded-full text-sm hover:border-amber-400/50 transition-all" data-hover>
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </FadeIn>
          
          {/* Security */}
          <FadeIn>
            <div className="mt-8">
              <GlassCard className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-8 text-center">Security <GradientText>Implementation</GradientText></h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: <FiShield />, title: 'Data Encryption', desc: 'AES-256 encryption for sensitive data, secure key storage with Android Keystore' },
                    { icon: <FiLock />, title: 'Network Security', desc: 'Certificate pinning, TLS 1.3, network security config for all API calls' },
                    { icon: <FiCheck />, title: 'Authentication', desc: 'Biometric auth, OAuth 2.0, Firebase Auth with proper session management' },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 text-2xl mb-4">
                        {item.icon}
                      </div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          APP PORTFOLIO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="apps" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                App <GradientText>Collection</GradientText>
              </h2>
              <p className="text-gray-400 mt-4">16+ Production Apps • Used by Thousands</p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: 1, name: 'Social Dashboard', icon: '📱', gradient: 'from-cyan-500 to-blue-500', url: 'https://github.com/moekyawaung-tech/social-dashboard' },
              { num: 2, name: 'PWA App', icon: '🌐', gradient: 'from-purple-500 to-pink-500', url: 'https://github.com/moekyawaung-tech/pwa-app' },
              { num: 3, name: 'Game Collection', icon: '🎮', gradient: 'from-green-500 to-emerald-500', url: 'https://github.com/moekyawaung-tech/game-collection' },
              { num: 4, name: 'Video Player', icon: '🎯', gradient: 'from-red-500 to-orange-500', url: 'https://github.com/moekyawaung-tech/video-player' },
              { num: 5, name: 'E-commerce', icon: '🛒', gradient: 'from-yellow-500 to-orange-500', url: '#' },
              { num: 6, name: 'Weather App', icon: '🌤️', gradient: 'from-sky-500 to-blue-500', url: 'https://github.com/moekyawaung-tech/Weather-app' },
              { num: 7, name: 'Todo App', icon: '📝', gradient: 'from-indigo-500 to-purple-500', url: 'https://github.com/moekyawaung-tech/javascript-todo' },
              { num: 8, name: 'Job Portal', icon: '💼', gradient: 'from-teal-500 to-cyan-500', url: 'https://github.com/moekyawaung-tech/Job-Portal-App' },
              { num: 9, name: 'POS Full Version', icon: '💰', gradient: 'from-green-500 to-teal-500', url: 'https://github.com/moekyawaung-tech/POS-Full-Version' },
              { num: 10, name: 'Advance POS', icon: '📊', gradient: 'from-violet-500 to-purple-500', url: 'https://github.com/moekyawaung-tech/Advance-POS-Version' },
              { num: 11, name: 'POS Ultimate', icon: '🚀', gradient: 'from-pink-500 to-rose-500', url: 'https://github.com/moekyawaung-tech/POS-Ultimate-Version' },
              { num: 12, name: 'POS Pro Max', icon: '👑', gradient: 'from-amber-500 to-yellow-500', url: 'https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max' },
              { num: 13, name: 'Snake Game', icon: '🐍', gradient: 'from-lime-500 to-green-500', url: 'https://github.com/moekyawaung-tech/Snake-Game-App' },
              { num: 14, name: 'Casino App', icon: '🎰', gradient: 'from-red-500 to-pink-500', url: 'https://github.com/moekyawaung-tech/casino-app' },
              { num: 15, name: 'Daily Planner', icon: '📋', gradient: 'from-cyan-500 to-blue-500', url: 'https://github.com/moekyawaung-tech/Daily-planner-app' },
              { num: 16, name: 'Lens Lite', icon: '📷', gradient: 'from-fuchsia-500 to-pink-500', url: 'https://github.com/moekyawaung-tech/Lens-lite' },
            ].map((app) => (
              <FadeIn key={app.num} delay={app.num * 50}>
                <a href={app.url} target="_blank" rel="noopener noreferrer" data-hover className="block group">
                  <GlassCard className="p-6 h-full">
                    <div className={`w-14 h-14 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      {app.icon}
                    </div>
                    <h3 className="font-bold mb-1">{app.name}</h3>
                    <p className="text-sm text-gray-400">App #{app.num}</p>
                    <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      View Project <FiExternalLink />
                    </div>
                  </GlassCard>
                </a>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn>
            <div className="mt-12 text-center">
              <GlassCard className="inline-flex items-center gap-6 px-8 py-6" hover={false}>
                <FaFire className="text-4xl text-amber-400 animate-pulse" />
                <div className="text-left">
                  <p className="text-2xl font-bold"><GradientText>LEGEND!</GradientText> 🔥</p>
                  <p className="text-gray-400">Building apps that make a difference</p>
                </div>
                <FaRocket className="text-4xl text-amber-400" />
              </GlassCard>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STARTUP SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="startup" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">Startup Journey</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Technical <GradientText>Founder</GradientText>
              </h2>
              <p className="text-gray-400 mt-4">From MVP to Scale</p>
            </div>
          </FadeIn>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn>
              <GlassCard className="p-8 h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaGem className="text-amber-400" /> Products Launched
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'MoekyawTranslator', desc: 'AI Translation App with on-device ML', status: 'Active' },
                    { name: 'POS System Suite', desc: 'Complete retail management solution', status: 'Active' },
                    { name: 'Job Portal', desc: 'Job matching platform with smart filters', status: 'Active' },
                    { name: 'Video Player Pro', desc: 'Advanced media player with gestures', status: 'Active' },
                    { name: 'Social Dashboard', desc: 'Unified social media analytics', status: 'Beta' },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-bold text-slate-900">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-400">{product.desc}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${product.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {product.status}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>
            
            <FadeIn delay={200}>
              <GlassCard className="p-8 h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaStar className="text-amber-400" /> Growth Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { num: '1M+', label: 'Downloads', color: 'amber' },
                    { num: '50K+', label: 'Monthly Active', color: 'emerald' },
                    { num: '4.5★', label: 'Avg Rating', color: 'blue' },
                    { num: '99.9%', label: 'Uptime', color: 'purple' },
                  ].map((stat, i) => (
                    <div key={i} className={`p-5 bg-${stat.color}-500/10 rounded-2xl text-center`}>
                      <p className={`text-3xl font-bold text-${stat.color}-400`}>{stat.num}</p>
                      <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <h4 className="font-bold mb-4 text-amber-400">Product Decisions</h4>
                <ul className="space-y-3">
                  {[
                    'Offline-first architecture for reliability in Myanmar',
                    'On-device AI for privacy and speed',
                    'Multi-language support (Burmese, English, Thai)',
                    'Progressive enhancement for low-end devices',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <FiCheck className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          GITHUB & WEB PROJECTS
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">Web Presence</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                GitHub <GradientText>Accounts</GradientText>
              </h2>
              <p className="text-gray-400 mt-4">43 Developer Profiles</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              'Dev-moe-kyawaung', 'moekyawaung-tech', 'moekyawaung-china', 'moekyawaung-developer',
              'moekyaw-aung-mm', 'moekyawaung-mk', 'moekyawaung-microsoft', 'moekyawaung-cyber',
              'moekyawaung-bangkok', 'moekyawaung-micro', 'moekyawaung-dev-mm', 'moekyaw-developer',
              'moekyawaung.github.io', 'Moekyawaung-mm', 'moekyawaung-hack', 'moekyawaung-graduate',
              'Moekyawaung-Linux', 'Moekyawaung-coder', 'moekyawaung-designer', 'Moekyawaung2026',
              'moekyawaung-web', 'MoeKyawAung-code', 'moekyawaung-creator', 'moekyawaung-webdeveloper',
              'Moekyawaung-co', 'moekyawaung-edu', 'moekyawaung-senior', 'Moekyawaung-Development',
              'moekyawaung-google', 'Moe-KyawAung', 'moekyawaungmka2032-boop', 'moekyawaungvivov30pro-design',
            ].map((account, i) => (
              <FadeIn key={i} delay={i * 30}>
                <a href={`https://github.com/${account}`} target="_blank" rel="noopener noreferrer" data-hover className="block">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center hover:border-amber-400/30 transition-all group">
                    <FaGithub className="text-2xl text-gray-500 group-hover:text-amber-400 mx-auto mb-2 transition-colors" />
                    <p className="text-xs text-gray-400 group-hover:text-white truncate transition-colors">{account}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LOVABLE APPS & GALLERY
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">Live Applications</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Lovable <GradientText>Apps</GradientText>
              </h2>
              <p className="text-gray-400 mt-4">38+ Deployed Web Applications</p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {[
              { name: 'CV Creator', url: 'https://happy-cv-creator.lovable.app' },
              { name: 'My Profile', url: 'https://moekyawaung.lovable.app' },
              { name: 'CV Palette', url: 'https://the-cv-palette.lovable.app' },
              { name: 'URL Shortener', url: 'https://moekyaw-url.lovable.app' },
              { name: 'Dev Profile', url: 'https://moekyawaung-dev.lovable.app' },
              { name: 'My Bio', url: 'https://moekyawaungmybio.lovable.app/' },
              { name: 'CV Beacon', url: 'https://cv-beacon.lovable.app/' },
              { name: 'Profile Hub', url: 'https://profile-persuasion-hub.lovable.app' },
              { name: 'Skill Gallery', url: 'https://app-skill-gallery.lovable.app' },
              { name: 'Code Life', url: 'https://joy-codify-life.lovable.app/' },
              { name: 'GitHub Profile', url: 'https://moekyawaung-github.lovable.app' },
              { name: 'Spark Coach', url: 'https://spark-coach-create.lovable.app' },
            ].map((app, i) => (
              <FadeIn key={i} delay={i * 50}>
                <a href={app.url} target="_blank" rel="noopener noreferrer" data-hover className="block">
                  <div className="p-5 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10 rounded-2xl hover:border-pink-400/30 transition-all group">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{app.name}</span>
                      <FiExternalLink className="text-gray-500 group-hover:text-pink-400 transition-colors" />
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
          
          {/* Gallery */}
          <FadeIn>
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Behind The <GradientText>Scenes</GradientText>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795799/2024119_20_b94fen.jpg',
                  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795800/2024119_18_syk2ou.jpg',
                  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795800/2024119_12_sqhcat.jpg',
                  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795801/MKA_22_felevo.webp',
                  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_11_jbijtv.webp',
                  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_13_i4bao3.webp',
                  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763536/preview_ls5ptn.webp',
                  'https://res.cloudinary.com/dye5qpwii/image/upload/v1779031816/Content_65_oayzj3.jpg',
                ].map((img, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <a href={img} target="_blank" rel="noopener noreferrer" data-hover className="block overflow-hidden rounded-2xl group">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795825/cloud-icon-poster-1_2_opl7sy.png',
              'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795675037_heh9xk.png',
              'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778794626112_ega7kk.png',
              'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795859/copilot_image_1778794430377_n7xlmz.png',
              'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795000722_eo96gj.png',
              'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795829/copilot_image_1778795000722_okryxj.png',
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 100}>
                <a href={img} target="_blank" rel="noopener noreferrer" data-hover className="block overflow-hidden rounded-2xl group">
                  <img src={img} alt={`Artwork ${i + 1}`} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONNECT SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="connect" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">Contact</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Let's <GradientText>Connect</GradientText>
              </h2>
            </div>
          </FadeIn>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn>
              <div className="space-y-8">
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  
                  <div className="space-y-4">
                    <a href="mailto:moekyawaung@programmer.net" data-hover className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-amber-500/10 transition-all group">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <FiMail />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="font-medium">moekyawaung@programmer.net</p>
                      </div>
                    </a>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                        <FiPhone />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="font-medium">+95 9 889 000 889</p>
                        <p className="text-sm text-gray-400">+959 666 000 050</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                        <FiMapPin />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="font-medium">Tachileik ↔ Bangkok</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
                
                {/* Social Media Grid */}
                <GlassCard className="p-8">
                  <h3 className="text-xl font-bold mb-6">Follow Me</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: <FaGithub />, url: 'https://github.com/Dev-moe-kyawaung/', name: 'GitHub' },
                      { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', name: 'LinkedIn' },
                      { icon: <FiYoutube />, url: 'https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG', name: 'YouTube' },
                      { icon: <FaTumblr />, url: 'https://www.tumblr.com/moekyawaung', name: 'Tumblr' },
                      { icon: <FaRedditAlien />, url: 'https://bsky.app/profile/moekyawaung96.bsky.social', name: 'Bluesky' },
                      { icon: <FiGlobe />, url: 'https://www.flickr.com/people/204037451@N06', name: 'Flickr' },
                      { icon: <FiYoutube />, url: 'https://vimeo.com/user252414232', name: 'Vimeo' },
                      { icon: <FaSlack />, url: 'https://moekyawaung.slack.com/', name: 'Slack' },
                    ].map((social, i) => (
                      <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" data-hover className="p-4 bg-white/5 rounded-xl flex flex-col items-center gap-2 hover:bg-amber-500/10 transition-all group">
                        <span className="text-2xl text-gray-400 group-hover:text-amber-400 transition-colors">{social.icon}</span>
                        <span className="text-xs text-gray-500 group-hover:text-white transition-colors">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Message sent! (Demo)'); }}>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-amber-400 focus:outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-amber-400 focus:outline-none transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                    <textarea rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-amber-400 focus:outline-none transition-colors resize-none" placeholder="Tell me about your project..." />
                  </div>
                  <button type="submit" data-hover className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] flex items-center justify-center gap-3">
                    <FiMail /> Send Message
                  </button>
                </form>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CERTIFICATIONS
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">Credentials</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                82+ <GradientText>Certificates</GradientText>
              </h2>
              <p className="text-gray-400 mt-4">Programming Hub Certified Developer</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              'C Programming', 'Python', 'Java', 'JavaScript',
              'React', 'Node.js', 'Angular', 'Vue.js',
              'Flutter', 'Kotlin', 'Swift', 'TypeScript',
              'MongoDB', 'PostgreSQL', 'Firebase', 'AWS',
              'Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow',
              'Blockchain', 'Cyber Security', 'Docker', 'Git',
              'HTML5', 'CSS3', 'SQL', 'Redis',
              'OOP', 'Design Patterns', 'Data Structures', 'Algorithms',
              'Kotlin Coroutines', 'Jetpack Compose', 'Flutter Advanced', 'React Native',
              'GraphQL', 'REST APIs', 'Microservices', 'Agile',
              'Jira', 'Figma', 'VS Code', 'Android Studio',
            ].map((cert, i) => (
              <FadeIn key={i} delay={Math.min(i * 20, 500)}>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 hover:border-amber-400/30 transition-all group">
                  <FiAward className="text-amber-400 text-sm flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors truncate">{cert}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════ */}
      <footer className="relative py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-bold text-slate-900">M</div>
                <span className="text-2xl font-bold">Moe Kyaw Aung</span>
              </div>
              <p className="text-gray-400">Senior Mobile Architect & Startup Founder</p>
            </div>
            
            <div className="flex items-center gap-4">
              {[
                { icon: <FiGithub />, url: 'https://github.com/Dev-moe-kyawaung/' },
                { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1' },
                { icon: <FiYoutube />, url: 'https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG' },
                { icon: <FiMail />, url: 'mailto:moekyawaung@programmer.net' },
              ].map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" data-hover className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-400 transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 Moe Kyaw Aung. All rights reserved.</p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              Code with <FiLock className="text-amber-400" /> culture. Build with purpose. 🇲🇲
            </p>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-hover className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 transition-all hover:scale-110 z-50">
          <FiArrowUp />
        </button>
      )}
    </div>
  );
}

export default App;
