'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GLBViewer from './components/GLBViewer';
import { themes, ThemeName } from './themes';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Review {
  author: string;
  rating: number;
  text: string;
}

interface Config {
  lead_id: number;
  name: string;
  business_name?: string;
  primary_color: string;
  secondary_color: string;
  typography: string;
  hero_text: string;
  hero_subtext: string;
  gsap_stagger: number;
  spline_scene_id: string;
  reviews?: Review[];
}

export default function Home() {
  const [config, setConfig] = useState<Config | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  // Fetch config
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const b64Data = params.get('d');
    const leadId = params.get('lead');

    if (b64Data) {
      try {
        // Décodage Base64 avec support UTF-8 (pour les accents)
        const binaryStr = atob(b64Data.replace(/-/g, '+').replace(/_/g, '/'));
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
            bytes[i] = binaryStr.charCodeAt(i);
        }
        const jsonStr = new TextDecoder('utf-8').decode(bytes);
        setConfig(JSON.parse(jsonStr));
      } catch (err) {
        console.error("Erreur décodage de la configuration Base64:", err);
      }
    } else if (leadId) {
      // Pour le développement local (Dashboard)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      // L'API locale n'a pas encore de route GET /api/config/{lead_id}, 
      // Mais on peut faire une route, ou charger config.json local par défaut.
      fetch(`/config.json`)
        .then(res => res.json())
        .then((data) => setConfig(data))
        .catch((err) => console.error("Erreur chargement config:", err));
    } else {
      fetch('/config.json')
        .then(res => res.json())
        .then((data) => setConfig(data))
        .catch((err) => console.error("Erreur chargement config:", err));
    }
  }, []);

  // Dynamic Google Font Injection & Base Styles
  useEffect(() => {
    if (config) {
      document.body.style.backgroundColor = config.secondary_color;
      document.body.style.color = '#ffffff';
      
      const fontName = config.typography.replace(/\s+/g, '+');
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;600;800&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      document.body.style.fontFamily = `"${config.typography}", sans-serif`;
    }
  }, [config]);

  // Custom Cursor Logic
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out"
        });
        gsap.set(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY
        });
      }
    };
    
    // Hover effects on links/buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button') || target.classList.contains('bento-item')) {
        gsap.to(cursorRef.current, { scale: 1.5, borderColor: config?.primary_color || '#fff', backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
      }
    };
    const handleMouseOut = () => {
      gsap.to(cursorRef.current, { scale: 1, borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'transparent', duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [config]);

  // GSAP Animations (Hero & Bento)
  useEffect(() => {
    if (config) {
      // Hero text stagger animation
      const chars = document.querySelectorAll('.hero-char');
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: config.gsap_stagger || 0.05,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );

      // Scroll animations for Bento Box
      const bentoItems = document.querySelectorAll('.bento-item');
      bentoItems.forEach((item, i) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 100 },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out"
          }
        );
      });
    }
  }, [config]);

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-light tracking-widest animate-pulse uppercase">Chargement de l'expérience...</p>
      </div>
    );
  }

  // Spline Mapping (C'est ici que tu peux brancher les vrais modèles 3D de ton agence !)
  const splineUrls: Record<string, string> = {
    'abstract': 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
    'architecture': 'https://prod.spline.design/qKHY3bT6rF605jD2/scene.splinecode',
    'nature': 'https://prod.spline.design/9E7G-Y7J6X6C5xK7/scene.splinecode',
    'tech': 'https://prod.spline.design/9a2G9Vl4R4f2P3G2/scene.splinecode',
    // J'ajoute la catégorie "food" pour les boulangeries/restaurants
    'food': 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode', // <- Remplace ce lien abstrait par le lien Spline de ton modèle de pain/croissant !
  };
  const sceneUrl = splineUrls[config.spline_scene_id] || splineUrls['abstract'];

  // Split text helper for GSAP (Word by word to prevent breaking mid-word)
  const splitText = (text: string) => {
    return text.split(' ').map((word, wordIndex, array) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} className="hero-char inline-block whitespace-pre" style={{ transformOrigin: "0% 50% -50px" }}>
            {char}
          </span>
        ))}
        {wordIndex < array.length - 1 && (
          <span className="hero-char inline-block whitespace-pre" style={{ transformOrigin: "0% 50% -50px" }}> </span>
        )}
      </span>
    ));
  };

  const activeTheme = themes[config.spline_scene_id as ThemeName] || themes.abstract;

  return (
    <main ref={containerRef} className="relative min-h-[200vh] w-full overflow-x-hidden selection:bg-white selection:text-black md:cursor-none">
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed top-0 left-0 w-10 h-10 rounded-full border border-white/50 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 backdrop-blur-sm"
      ></div>
      <div 
        ref={cursorDotRef} 
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      ></div>

      {/* Navbar Glassmorphism */}
      <nav className="fixed top-0 w-full p-6 z-40 flex justify-between items-center mix-blend-difference">
        <div className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 z-10">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.primary_color }}></span>
          {config.business_name ? config.business_name.toUpperCase() : "AGENCE DÉMO"}
        </div>
        <div className="hidden md:flex gap-8 text-sm font-light">
          <a href="#" className="hover:opacity-50 transition-opacity">Accueil</a>
          <a href="#services" className="hover:opacity-50 transition-opacity">Savoir-Faire</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
        <button className="md:hidden px-4 py-2 border border-white/20 rounded-full text-xs">Menu</button>
      </nav>

      {/* 3D or Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden w-screen h-screen bg-black">
        {['agriculture', 'garage'].includes(config.spline_scene_id) ? (
          <video 
            src={`/videos/${config.spline_scene_id}.mp4`} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        ) : (
          <GLBViewer modelId={config.spline_scene_id} />
        )}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `linear-gradient(to bottom, ${config.secondary_color}00 0%, ${config.secondary_color} 100%)`
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-4 text-center z-10 relative pointer-events-none">
        <div 
          className="hero-char px-5 py-2 mb-8 rounded-full border border-white/10 backdrop-blur-md text-xs font-semibold tracking-[0.2em] uppercase shadow-2xl"
          style={{ color: config.primary_color, backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          Expérience Digitale
        </div>
        
        <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-extrabold mb-6 max-w-[95vw] leading-[0.9] tracking-tighter" style={{ perspective: "1000px" }}>
          {splitText(config.hero_text)}
        </h1>
        
        <p className="text-lg md:text-2xl opacity-60 max-w-2xl font-light mt-6 hero-char leading-relaxed">
          {config.hero_subtext}
        </p>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-3 opacity-50 hero-char">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Services / Bento Grid Section */}
      <section id="services" className="min-h-screen relative z-10 bg-black/40 backdrop-blur-2xl border-t border-white/5 py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl md:text-6xl font-light leading-tight">
              L'excellence de notre <br/>
              <span style={{ color: config.primary_color, fontWeight: 'bold' }}>Savoir-Faire</span>.
            </h2>
            <p className="max-w-sm opacity-50 text-sm md:text-base">
              Nous repoussons les limites du digital pour concevoir des expériences sur-mesure qui transforment votre vision en réalité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bento-item group relative md:col-span-2 border border-white/10 p-8 md:p-10 rounded-3xl flex flex-col justify-end overflow-hidden min-h-[400px] md:min-h-[450px]">
              <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105`} style={{ backgroundImage: `url('${activeTheme.cards[0].image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
              <div className="relative z-10 mt-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20">{activeTheme.cards[0].icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{activeTheme.cards[0].title}</h3>
                <p className="text-white/80 text-lg md:text-xl max-w-md leading-relaxed">
                  {activeTheme.cards[0].description}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bento-item group relative md:col-span-1 border border-white/10 p-8 md:p-10 rounded-3xl flex flex-col justify-end overflow-hidden min-h-[400px] md:min-h-[450px]">
              <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105`} style={{ backgroundImage: `url('${activeTheme.cards[1].image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
              <div className="relative z-10 mt-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20">{activeTheme.cards[1].icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{activeTheme.cards[1].title}</h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  {activeTheme.cards[1].description}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bento-item group relative md:col-span-1 border border-white/10 p-8 md:p-10 rounded-3xl flex flex-col justify-end overflow-hidden min-h-[400px] md:min-h-[450px]">
              <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105`} style={{ backgroundImage: `url('${activeTheme.cards[2].image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
              <div className="relative z-10 mt-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20">{activeTheme.cards[2].icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{activeTheme.cards[2].title}</h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  {activeTheme.cards[2].description}
                </p>
              </div>
            </div>

            {/* Call To Action Card */}
            <div className="bento-item md:col-span-2 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl flex flex-col items-center justify-center text-center hover:border-white/40 transition-colors duration-500 min-h-[400px] md:min-h-[450px]">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">{activeTheme.cta.title}</h3>
              <p className="text-white/70 text-lg md:text-xl mb-10 max-w-lg">{activeTheme.cta.subtitle}</p>
              <button 
                className="px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-black text-lg md:text-xl hover:scale-105 transition-all flex items-center gap-3"
                style={{ backgroundColor: config.primary_color }}
              >
                Démarrer le projet <span>→</span>
              </button>
            </div>
            
          </div>

          {/* Section Avis Google */}
          {config.reviews && config.reviews.length > 0 && (
            <div className="mt-16 md:mt-24">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-10 text-center flex items-center justify-center gap-4">
                <span className="text-yellow-400 text-2xl md:text-3xl">★</span> 
                Ce que disent vos clients
                <span className="text-yellow-400 text-2xl md:text-3xl">★</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {config.reviews.map((review, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col backdrop-blur-md hover:bg-white/10 transition-colors duration-500">
                    <div className="flex text-yellow-400 text-lg md:text-xl mb-4 gap-1">
                      {Array(review.rating).fill("★").join("")}
                    </div>
                    <p className="text-white/80 italic mb-6 md:mb-8 text-base md:text-lg leading-relaxed flex-grow">"{review.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white uppercase">
                        {review.author.charAt(0)}
                      </div>
                      <div className="text-white font-bold">{review.author}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-xs opacity-30 bg-black">
        © 2026 {config.name}. Tous droits réservés.
      </footer>
    </main>
  );
}
