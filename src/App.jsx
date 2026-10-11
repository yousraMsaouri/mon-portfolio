import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { 
  Code2, 
  Briefcase, 
  User, 
  Sparkles,
  CheckCircle2,
  Loader2,
  Send,
  Mail,
  Sun,
  Moon,
  FileText,
  Brain,
  GraduationCap,
  Award,
  Layers,
  MapPin,
  Phone,
  ArrowUpRight,
  Monitor,
  Download
} from 'lucide-react';

// Composant pour générer différentes formes géométriques 3D

function WireframeShape({ position = [0, 0, 0], scale = 1.5, wireframeColor = "#f472b6", type = "icosahedron", speed = 0.2 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.7;
      meshRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === "torus" && <torusGeometry args={[2, 0.4, 16, 50]} />}
      {type === "icosahedron" && <icosahedronGeometry args={[1.8, 1]} />}
      {type === "dodecahedron" && <dodecahedronGeometry args={[1.8, 0]} />}
      {type === "octahedron" && <octahedronGeometry args={[2, 0]} />}
      {type === "sphere" && <icosahedronGeometry args={[2, 3]} />}
      {type === "torusKnot" && <torusKnotGeometry args={[1.3, 0.3, 100, 16]} />}
      
      <meshBasicMaterial 
        wireframe 
        color={wireframeColor} 
        transparent 
        opacity={0.35} 
      />
    </mesh>
  );
}

// Groupe d'étoiles avec double mouvement de rotation (horizontal + dispersé)
function MovingStars() {
  const starsGroupRef = useRef();

  useFrame((state, delta) => {
    if (starsGroupRef.current) {
      starsGroupRef.current.rotation.y += delta * 0.05; // Rotation horizontale
      starsGroupRef.current.rotation.x += delta * 0.02; // Mouvement dispersé
    }
  });

  return (
    <group ref={starsGroupRef}>
      <Stars radius={60} depth={60} count={1800} factor={4} saturation={0} fade speed={2} />
    </group>
  );
}

function ScrollCamera() {
  useFrame((state, delta) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const targetY = -scrollProgress * 34;
    state.camera.position.y += (targetY - state.camera.position.y) * Math.min(1, delta * 3);
  });

  return null;
}

// Scène 3D étalée sur toute la hauteur réelle du document
function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ScrollCamera />
        
        {/* Étoiles animées */}
        <MovingStars />

        {/* 1. HERO SECTION (Haut de page) */}
        <WireframeShape type="sphere" position={[3.8, 2, -1]} scale={1.1} wireframeColor="#ec4899" speed={0.2} />
        <WireframeShape type="torus" position={[-4, 0, -2]} scale={0.9} wireframeColor="#c084fc" speed={0.15} />

        {/* 2. SECTION À PROPOS & PROJETS */}
        <WireframeShape type="torusKnot" position={[4, -6, -1.5]} scale={1.0} wireframeColor="#f472b6" speed={0.25} />
        <WireframeShape type="dodecahedron" position={[-3.8, -10, -2]} scale={1.2} wireframeColor="#e879f9" speed={0.18} />

        {/* 3. SECTION EXPÉRIENCES (Nouveaux objets en descendant) */}
        <WireframeShape type="octahedron" position={[3.6, -15, -1]} scale={1.3} wireframeColor="#c084fc" speed={0.22} />
        <WireframeShape type="icosahedron" position={[-4.2, -19, -1.5]} scale={1.1} wireframeColor="#f472b6" speed={0.16} />

        {/* 4. SECTION ÉDUCATION / FORMATIONS */}
        <WireframeShape type="torus" position={[3.8, -24, -1.5]} scale={1.2} wireframeColor="#ec4899" speed={0.2} />
        <WireframeShape type="dodecahedron" position={[-3.9, -27, -1]} scale={1.0} wireframeColor="#c084fc" speed={0.24} />

        {/* 5. SECTION CONTACT (Bas de page) */}
        <WireframeShape type="sphere" position={[0, -32, -1]} scale={1.4} wireframeColor="#e879f9" speed={0.15} />
      </Canvas>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Liste des technologies pour le défilement horizontal
  const techStack = [
    "Python", "LLM & RAG", "Gemini API", "FastAPI", "Django", "Power BI",
    "React.js", "Vue.js", "Angular", "Next.js", "Tailwind CSS", "JavaScript",
    "Docker", "Azure", "Kubernetes", "Ansible", "Redis", "Jenkins", "AWS EC2", "PostgreSQL", "MongoDB", "MySQL"
  ];

  // Expériences professionnelles
  const experiences = [
    {
      title: "Stage PFE - Ingénieure Data Science & IA",
      company: "Jacob Delafon",
      period: "03/2026 - 08/2026",
      description: "Développement d'une solution d'analyse et de prédiction basée sur les données métier.",
      tasks: [
        "Power Bi",
        "Machine Learning",
        "Skit-learn",
        "Pandas",
        "Grandient Boosting",
        "Forcasting",
        "Python"
      ]
    },
    {
      title: "Stage PFA - Développement & IA (RAG & LLM)",
      company: "Smart Automation Technologie",
      period: "06/2025 - 08/2025",
      description: "Système automatisé de génération de documents structurés basé sur la méthode RAG.",
      tasks: [
        "Angular",
        "FastAPI",
        "Gemini API",
        "RagPipeline",
        "Celery",
        "Redis",
        "SendGrid",
        "Twilio"
      ]
    },
    {
      title: "Développement Web Freelance",
      company: "HbAfrica & Projets Clients",
      period: "02/2023 - 03/2023",
      description: "Conception, développement d'une solutions web et gestion de projets clients avec intégration de fonctionnalités avancées.",
      tasks: [
        "React.js",
        "JavaScript",
        "Tailwind CSS"
      ]
    },
    {
      title: "Stage PFE Développement Web (Licence)",
      company: "Black Concept",
      period: "04/2022 - 06/2022",
      description: "Développement et réalisation d'une application web de menu digital pour les restaurants.",
      tasks: [
        "Laravel",
        "React.js",
        "Tailwind CSS",
        "MySQL",
      ]
    }
  ];

  // Projets avec visuels d'interfaces (style cartes UI de l'image de référence)
  const projects = [
    {
      title: "RAG Document Generator & Chatbot",
      subtitle: "Génération de rapports • IA",
      tag: "LLM & RAG",
      description: "Un système intelligent d'assistance à la rédaction automatique de rapports structurés avec pipeline RAG et rappels proactifs.",
      tags: ["FastAPI", "Angular", "Gemini 1.5", "RAG", "Celery", "Redis"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Automated DevOps Pipeline",
      subtitle: "CI/CD & Cloud Infrastructure",
      tag: "DevOps",
      description: "Pipeline DevOps complet automatisant les étapes de build, de test et de déploiement continu d'applications web conteneurisées.",
      tags: ["Jenkins", "Docker", "Ansible", "AWS EC2", "CI/CD"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Sales Forecasting & Analytics Dashboard",
      subtitle: "Machine Learning & BI",
      tag: "Data Science",
      description: "Solution d'analyse prospective et de prédiction des ventes couplée à un tableau de bord interactif Streamlit et Power BI.",
      tags: ["Python", "Scikit-Learn", "Streamlit", "Power BI", "Pandas"],
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "TE-Academy HSE Platform",
      subtitle: "Plateforme de Formation • TE Connectivity",
      tag: "Fullstack",
      description: "Plateforme web d'apprentissage en ligne conçue pour sensibiliser et former les collaborateurs aux règles HSE.",
      tags: ["Vue.js", "JavaScript", "Tailwind CSS", "UX/UI"],
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
    }
  ];

  // Formations
  const education = [
    {
      year: "2026",
      degree: "Ingénieur d'Etat en Génie Informatique (Big Data, Data Science & IA)",
      school: "ENSI Tanger – École des Nouvelles Sciences et de l'Ingénierie",
      icon: GraduationCap
    },
    {
      year: "2022",
      degree: "Licence Sciences et Techniques",
      school: "Faculté des Sciences et Techniques (FST) Tanger",
      icon: GraduationCap
    },
    {
      year: "2019",
      degree: "Baccalaureat Sciences Physics & Chimie",
      school: "Lycée Bir Anzaran Tanger",
      icon: GraduationCap
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/yousramsaouri13@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Nouveau message portfolio — ${formData.name}`,
          _template: 'table',
          _captcha: false,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.success === false || data.success === 'false') {
        throw new Error(data.message || "L'envoi du message a échoué.");
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(error.message || "Impossible d'envoyer le message. Réessaie dans un instant.");
    } finally {
      setSending(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cvYousra.pdf';
    link.download = 'cvYousra.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const accentText = 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400';
  const gradientBtn = 'bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/30 hover:from-sky-400 hover:via-violet-400 hover:to-pink-400';
  const cvButtonClasses = 'bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 text-white border border-white/20 shadow-[0_12px_30px_rgba(168,85,247,0.35)] hover:shadow-[0_16px_35px_rgba(244,114,182,0.4)] hover:-translate-y-0.5';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-fuchsia-500 selection:text-white ${
      darkMode ? 'bg-[#070b19] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* 1. ARRIÈRE-PLAN 3D INTERACTIF */}
      <Background3D />
      {/* Dynamic Keyframes for smooth auto scrolling */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl ${
          darkMode ? 'bg-sky-500/15' : 'bg-sky-300/25'
        }`}></div>
        <div className={`absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full blur-3xl ${
          darkMode ? 'bg-violet-600/15' : 'bg-violet-300/25'
        }`}></div>
        <div className={`absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full blur-3xl ${
          darkMode ? 'bg-pink-500/10' : 'bg-pink-300/20'
        }`}></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <header className={`sticky top-4 z-50 flex w-full flex-wrap items-center justify-between p-4 rounded-2xl border backdrop-blur-md shadow-xl mb-12 transition-colors ${
          darkMode 
            ? 'bg-slate-900/80 border-slate-800/80 text-white' 
            : 'bg-white/80 border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="p-2 rounded-xl border border-violet-400/30 bg-gradient-to-br from-sky-500/20 via-violet-500/20 to-pink-500/20 text-fuchsia-300">
              <Brain size={22} />
            </div>
            <span className="text-xl font-bold tracking-tight">YMC.</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => scrollToSection('about')} className="hover:text-fuchsia-300 transition-colors">À propos</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-fuchsia-300 transition-colors">Projets</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-fuchsia-300 transition-colors">Expériences</button>
            <button onClick={() => scrollToSection('education')} className="hover:text-fuchsia-300 transition-colors">Education</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-fuchsia-300 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => scrollToSection('contact')}
              className={`px-5 py-2.5 font-medium text-sm rounded-xl transition-all ${gradientBtn}`}
            >
              Me contacter
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="w-full py-8 md:py-16 grid lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
              darkMode 
                ? 'bg-gradient-to-r from-sky-950/50 via-violet-950/50 to-pink-950/50 border-violet-500/40 text-fuchsia-200' 
                : 'bg-gradient-to-r from-sky-50 via-violet-50 to-pink-50 border-violet-200 text-violet-600'
            }`}>
              <Sparkles size={14} /> Ingénieure d'État en Génie Informatique
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Yousra Msaouri Charroud
              <span className={`block text-2xl md:text-3xl mt-2 ${accentText}`}>
                Data Science, Big Data & Intelligence Artificielle
              </span>
            </h1>

            <p className={`text-base md:text-lg max-w-xl leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Spécialisée en Machine Learning, solutions IA (LLM/RAG), analyse de données et développement fullstack. Passionnée par l'optimisation de modèles et la recherche appliquée.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('projects')}
                className={`flex items-center gap-2 px-6 py-3 font-medium text-sm rounded-xl transition-all ${gradientBtn}`}
              >
                <Briefcase size={18} /> Découvrir mes projets
              </button>

              <button
                onClick={handleDownloadCV}
                className="group relative inline-flex items-center justify-center p-[2px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {/* Anneau dégradé en rotation au hover */}
                <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#00d2ff_0%,#ff007f_50%,#00d2ff_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-500" />

                {/* Bordure fixe au repos */}
                <span className="absolute inset-0 rounded-2xl border border-blue-500/30 group-hover:border-transparent transition-colors duration-300" />

                {/* Contenu interne ajusté (px-8 py-3.5 et rounded-2xl) */}
                <span className="relative z-10 inline-flex items-center gap-2.5 rounded-[14px] bg-[#0a0f1d] group-hover:bg-[#131b2e] px-8 py-3.5 text-base font-semibold text-white transition-colors duration-300 shadow-lg">
                  <Download size={20} className="transition-transform duration-300 group-hover:translate-y-0.5 text-cyan-400 group-hover:text-pink-400" />
                  <span>Télécharger CV</span>
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/yousra-msaouri-b7a519200/?isSelfProfile=true"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
                    darkMode
                      ? 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-fuchsia-400 hover:text-fuchsia-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600'
                  }`}
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.38a1.56 1.56 0 0 1 .01 3.12ZM5.5 10.06h2.9v8.44H5.5v-8.44Zm4.92 0h2.78v1.15h.04c.39-.73 1.34-1.5 2.76-1.5 2.95 0 3.49 1.94 3.49 4.46v6.33h-2.89v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.52-2.26 3.09v5.99H10.42v-8.44Z"/>
                  </svg>
                </a>

                <a
                  href="mailto:yousramsaouri13@gmail.com"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
                    darkMode
                      ? 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-fuchsia-400 hover:text-fuchsia-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600'
                  }`}
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
                    darkMode
                      ? 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-fuchsia-400 hover:text-fuchsia-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600'
                  }`}
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.57 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.5v-1.88c-2.78.62-3.37-1.35-3.37-1.35-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.06 1.56 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.75 0 0 .85-.28 2.78 1.05A9.5 9.5 0 0 1 12 6.9c.86 0 1.73.12 2.54.35 1.92-1.33 2.77-1.05 2.77-1.05.55 1.43.2 2.49.1 2.75.64.72 1.02 1.64 1.02 2.76 0 3.95-2.35 4.81-4.58 5.07.36.32.68.97.68 1.96v2.9c0 .28.18.6.69.5A10.2 10.2 0 0 0 22 12.2C22 6.57 17.52 2 12 2Z"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative p-1.5 rounded-3xl bg-gradient-to-tr from-sky-400 via-violet-500 to-pink-500 shadow-2xl shadow-fuchsia-500/25 max-w-[320px] w-full">
              <img 
                src="/mypic.jpg"
                alt="Yousra Msaouri Charroud" 
                className="w-full h-[380px] object-cover object-top rounded-[22px]"
              />
            </div>
          </div>
        </section>

        {/* Section À Propos & Bandeau Technologies */}
        <div className="space-y-12 py-8">

          {/* À Propos */}
          <section id="about" className={`scroll-mt-28 p-8 rounded-3xl border transition-colors ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <User className="text-fuchsia-400" size={22} /> À propos de moi
            </h2>
            <p className={`leading-relaxed text-base ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Ingénieure d'État en Génie Informatique, spécialisée en Data Science, Big Data et Intelligence Artificielle. J'ai acquis une solide expérience pratique en Machine Learning, analyse exploratoire de données, prévision de séries temporelles (forecasting) ainsi que dans la création de solutions intelligentes basées sur les LLM et le RAG. Curieuse et rigoureuse, j'allie mes compétences en développement logiciel et en IA pour concevoir des applications performantes et à forte valeur ajoutée.
            </p>
          </section>

          {/* BANDEAU DÉFILANT DES TECHNOLOGIES */}
          <div className="space-y-3">
            <p className={`text-center text-xs font-semibold tracking-wider uppercase ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Technologies & Outils que j'utilise
            </p>
            
            <div className="overflow-hidden relative w-full py-2 group">
              <div className={`absolute top-0 bottom-0 left-0 w-16 z-10 pointer-events-none bg-gradient-to-r ${
                darkMode ? 'from-[#070b19]' : 'from-slate-50'
              } to-transparent`}></div>
              <div className={`absolute top-0 bottom-0 right-0 w-16 z-10 pointer-events-none bg-gradient-to-l ${
                darkMode ? 'from-[#070b19]' : 'from-slate-50'
              } to-transparent`}></div>

              <div className="animate-scroll flex items-center gap-6">
                {[...techStack, ...techStack].map((tech, i) => (
                  <div 
                    key={i} 
                    className={`px-5 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
                      darkMode 
                        ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-fuchsia-400/50 hover:text-white' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-violet-400'
                    }`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION PROJETS (Cartes UI type App / Dashboard) */}
          <section id="projects" className="scroll-mt-28 pt-8 w-full">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Layers className="text-fuchsia-400" size={22} /> Projets & Réalisations
            </h2>
            <p className={`text-xs mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Sélection de projets développés en IA, Data Science et architectures Fullstack.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${
                    darkMode ? 'bg-slate-900/80 border-slate-800/90 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200'
                  }`}
                >
                  <div>
                    {/* Mockup d'interface applicative (Header de carte) */}
                    <div className={`p-3 border-b flex items-center justify-between px-4 ${
                      darkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                        </div>
                        <span className="text-[10px] font-mono ml-2 text-slate-400 flex items-center gap-1">
                          <Monitor size={10} /> {p.subtitle}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-violet-950 text-fuchsia-200 border border-violet-500/40">
                        {p.tag}
                      </span>
                    </div>

                    {/* Image / Visuel Dashboard */}
                    <div className="relative h-48 overflow-hidden group">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        darkMode ? 'from-slate-900 via-transparent to-transparent' : 'from-white via-transparent to-transparent'
                      }`}></div>
                    </div>

                    {/* Contenu de la carte */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold group-hover:text-fuchsia-300 transition-colors">
                          {p.title}
                        </h3>
                        <ArrowUpRight size={18} className="text-slate-400 group-hover:text-fuchsia-300 transition-colors shrink-0" />
                      </div>
                      <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {p.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags technologies en bas de carte */}
                  <div className="p-6 pt-0 flex flex-wrap gap-1.5">
                    {p.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className={`px-2.5 py-1 text-[10px] rounded-lg font-medium border ${
                          darkMode 
                            ? 'bg-slate-950/60 border-violet-500/30 text-fuchsia-200' 
                            : 'bg-violet-50/80 border-violet-100 text-violet-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* Expériences Professionnelles */}
<section id="experience" className="scroll-mt-28 pt-8 pb-10 w-full">
  <div className="mb-10">
    <p className={`mb-4 uppercase tracking-[0.25em] text-[0.72rem] font-semibold ${accentText}`}>
      PARCOURS PROFESSIONNEL
    </p>
    <h2 className="text-4xl md:text-6xl font-bold leading-none tracking-tight text-white">
      Expérience qui <span className={`italic font-light ${accentText}`}>parle d'elle-même.</span>
    </h2>
    <p className={`mt-5 max-w-3xl text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
      Expérience pratique de la mise en œuvre de solutions web, d'IA et d'automatisation pour des équipes industrielles.
    </p>
  </div>

  <div className="relative mx-auto max-w-6xl">
    {/* Ligne verticale de la timeline */}
    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-sky-400 via-violet-400 to-pink-500 lg:block"></div>

    <div className="space-y-10 lg:space-y-12">
      {experiences.map((exp, idx) => {
        const isLeft = idx % 2 === 0;

        return (
          <div key={idx} className={`relative flex ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
            {/* Puce sur la timeline */}
            <span className="absolute left-1/2 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-pink-500 bg-[#0d1726] transition-all duration-300 lg:block"></span>

            <div className={`w-full lg:w-[48%] ${isLeft ? 'lg:pr-10' : 'lg:pl-10'}`}>
              {/* CADRE EXPÉRIENCE - SHADOW UNIQUEMENT EN INSET (INTÉRIEUR) */}
              <div className="group relative rounded-[1.6rem] border border-white/10 bg-[#0b1322] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/80 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.12)]">
                
                {/* Date alignée à droite */}
                <div className="mb-2 flex justify-end">
                  <span className="text-xs font-semibold tracking-wide text-pink-400">
                    {exp.period}
                  </span>
                </div>

                {/* Titre & Entreprise */}
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-pink-50">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-base font-medium text-slate-400">{exp.company}</p>
                </div>

                {/* Description */}
                <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {exp.description}
                </p>

                {/* Badges de technologies */}
                {exp.tasks && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.tasks.map((task, tIdx) => {
                      const tag = task.split(' ').slice(0, 2).join(' ');
                      return (
                        <span
                          key={tIdx}
                          className="rounded-full border border-white/10 bg-[#111c30] px-3 py-1 text-[11px] font-medium text-slate-300 transition-colors duration-300 group-hover:border-pink-500/30 group-hover:bg-[#16223a]"
                        >
                          {tag.length > 15 ? tag.slice(0, 15) + '...' : tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


          {/* SECTION FORMATIONS */}
          <section id="education" className="relative scroll-mt-28 pt-16 pb-8 w-full">
            <div className="pointer-events-none absolute right-0 top-4 hidden xl:block">
              <div className="relative w-52 h-52 rounded-full border border-violet-400/60 opacity-80">
                <div className="absolute inset-4 rounded-full border border-fuchsia-400/50 opacity-80"></div>
                <div className="absolute inset-8 rounded-full border border-sky-400/40 opacity-80"></div>
                <div className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage:
                      'linear-gradient(120deg, transparent 0 44%, rgba(56,189,248,0.7) 44% 46%, transparent 46% 100%), linear-gradient(60deg, transparent 0 44%, rgba(192,132,252,0.7) 44% 46%, transparent 46% 100%), linear-gradient(0deg, transparent 0 44%, rgba(244,114,182,0.7) 44% 46%, transparent 46% 100%)',
                    maskImage: 'radial-gradient(circle at center, transparent 0 70%, black 71% 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 0 70%, black 71% 100%)'
                  }}
                ></div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <p className={`uppercase tracking-[0.25em] text-[0.72rem] font-semibold mb-4 ${accentText}`}>
                  ACADEMIC BACKGROUND
                </p>
                <h2 className="text-5xl md:text-6xl font-bold leading-none tracking-tight text-white">
                  Education <span className={`italic font-light ${accentText}`}>& languages.</span>
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {education.map((edu, idx) => {
                  const Icon = edu.icon;
                  return (
                    <div
                      key={idx}
                      className="group rounded-[1.7rem] border border-white/10 bg-[#0d1726]/90 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-fuchsia-400/40 hover:bg-gradient-to-br hover:from-[#0c1a2e] hover:via-[#1a1535] hover:to-[#2a1233] hover:shadow-[0_18px_40px_rgba(168,85,247,0.2)]"
                    >
                      <div className="mb-8 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/50 bg-[#0f1a2d] text-fuchsia-300 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-sky-400 group-hover:via-violet-400 group-hover:to-pink-400 group-hover:text-white group-hover:border-pink-300/80">
                          <Icon size={22} />
                        </div>
                        <span className={`text-xl font-semibold ${accentText}`}>{edu.year}</span>
                      </div>

                      <h3 className="text-[1.05rem] md:text-[1.2rem] font-semibold leading-snug text-white mb-5 max-w-[18ch] transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:via-violet-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent">
                        {edu.degree}
                      </h3>

                      <p className="text-[0.96rem] leading-relaxed text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                        {edu.school}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="group mt-12 mx-auto max-w-4xl rounded-[1.5rem] border border-white/10 bg-[#0d1726]/90 px-8 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-gradient-to-r hover:from-[#0c1a2e] hover:via-[#1a1535] hover:to-[#2a1233] hover:shadow-[0_18px_40px_rgba(168,85,247,0.16)]">
                <div className="flex flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/50 bg-[#0f1a2d] text-fuchsia-300 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-sky-400 group-hover:via-violet-400 group-hover:to-pink-400 group-hover:text-white group-hover:border-pink-300/80">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:via-violet-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent">Languages</h3>
                    <p className="text-lg text-slate-300 transition-colors duration-300 group-hover:text-slate-100">Arabe • Français • Anglais</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Formulaire de Contact */}
          <section id="contact" className="scroll-mt-28 pt-8 w-full">
            <div className="mb-10">
              <h2 className="text-4xl md:text-6xl font-bold leading-none tracking-tight text-white">
                Contactez <span className={`italic font-light ${accentText}`}>moi</span>
              </h2>
              <p className={`mt-5 max-w-3xl text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Vous avez un projet, une idée ou souhaitez simplement échanger ? N'hésitez pas à me contacter via le formulaire ci-dessous. Je vous répondrai dans les plus brefs délais.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
                <div className={`h-full flex flex-col rounded-[28px] border p-6 md:p-8 transition-colors ${
                  darkMode ? 'bg-[#0d1726]/80 border-violet-400/30 shadow-[0_0_0_1px_rgba(168,85,247,0.12)]' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  {submitted ? (
                    <div className="flex items-center gap-3 p-4 bg-emerald-950/50 border border-emerald-800 text-emerald-300 rounded-xl text-sm">
                      <CheckCircle2 size={18} />
                      <span>Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-5">
                      {submitError && (
                        <div className="p-3 rounded-xl border border-red-800/70 bg-red-950/40 text-red-300 text-sm">
                          {submitError}
                        </div>
                      )}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-fuchsia-400 ${
                            darkMode ? 'bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
                          }`}
                          placeholder="Your name..."
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-fuchsia-400 ${
                            darkMode ? 'bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="flex flex-col flex-1">
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Message</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`flex-1 min-h-[8rem] w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-fuchsia-400 resize-none ${
                            darkMode ? 'bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
                          }`}
                          placeholder="Your message..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={sending}
                        className={`w-full py-3.5 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed font-bold text-sm flex items-center justify-center gap-2 transition-all ${gradientBtn}`}
                      >
                        {sending ? (
                          <>
                            Envoi... <Loader2 size={16} className="animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Message <Send size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                <div className="space-y-6">
  {/* CARTE 1 : CONTACT INFORMATION */}
  <div className={`rounded-[28px] border p-6 transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/80 ${
    darkMode 
      ? 'bg-[#0d1726]/80 border-violet-400/30 hover:bg-gradient-to-br hover:from-[#1a102f] hover:to-[#0a182e] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.08)]' 
      : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
  }`}>
    <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
      Contact Information
    </h3>

    <div className="space-y-5 text-sm">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${darkMode ? 'border-violet-400/40 bg-[#12182d] text-fuchsia-300' : 'border-slate-200 bg-slate-50 text-violet-600'}`}>
          <Mail size={16} />
        </div>
        <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>yousramsaouri13@gmail.com</span>
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${darkMode ? 'border-violet-400/40 bg-[#12182d] text-fuchsia-300' : 'border-slate-200 bg-slate-50 text-violet-600'}`}>
          <Phone size={16} />
        </div>
        <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>+212 665603800</span>
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${darkMode ? 'border-violet-400/40 bg-[#12182d] text-fuchsia-300' : 'border-slate-200 bg-slate-50 text-violet-600'}`}>
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.57 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.5v-1.88c-2.78.62-3.37-1.35-3.37-1.35-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.06 1.56 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.75 0 0 .85-.28 2.78 1.05A9.5 9.5 0 0 1 12 6.9c.86 0 1.73.12 2.54.35 1.92-1.33 2.77-1.05 2.77-1.05.55 1.43.2 2.49.1 2.75.64.72 1.02 1.64 1.02 2.76 0 3.95-2.35 4.81-4.58 5.07.36.32.68.97.68 1.96v2.9c0 .28.18.6.69.5A10.2 10.2 0 0 0 22 12.2C22 6.57 17.52 2 12 2Z"/>
          </svg>
        </div>
        <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>github.com/yousra-msaouri</span>
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${darkMode ? 'border-violet-400/40 bg-[#12182d] text-fuchsia-300' : 'border-slate-200 bg-slate-50 text-violet-600'}`}>
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.38a1.56 1.56 0 0 1 .01 3.12ZM5.5 10.06h2.9v8.44H5.5v-8.44Zm4.92 0h2.78v1.15h.04c.39-.73 1.34-1.5 2.76-1.5 2.95 0 3.49 1.94 3.49 4.46v6.33h-2.89v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.52-2.26 3.09v5.99H10.42v-8.44Z"/>
          </svg>
        </div>
        <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>Yousra Msaouri</span>
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${darkMode ? 'border-violet-400/40 bg-[#12182d] text-fuchsia-300' : 'border-slate-200 bg-slate-50 text-violet-600'}`}>
          <MapPin size={16} />
        </div>
        <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>Tanger, Maroc</span>
      </div>
    </div>
  </div>

  {/* CARTE 2 : ACTUELLEMENT DISPONIBLE */}
  <div className={`rounded-[28px] border p-6 transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/80 ${
    darkMode 
      ? 'bg-[#0d1726]/80 border-violet-400/30 hover:bg-gradient-to-br hover:from-[#1a102f] hover:to-[#0a182e] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.08)]' 
      : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
  }`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]"></span>
      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Actuellement disponible</h3>
    </div>
    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
      Passionnée par la transformation des données brutes en solutions décisionnelles et prédictives, je suis à la recherche de défis professionnels en Ingénierie Data & IA. Qu'il s'agisse de concevoir des architectures Big Data, d'entraîner des modèles de Deep Learning ou d'intégrer des solutions d'IA au cœur de pipelines DevOps/MLOps.
    </p>
  </div>
</div>
              </div>
            </div>
          </section>

        </div>

        <footer className={`pt-8 mt-12 border-t text-center text-xs transition-colors ${
          darkMode ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-400'
        }`}>
          © {new Date().getFullYear()} Yousra Msaouri Charroud. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}