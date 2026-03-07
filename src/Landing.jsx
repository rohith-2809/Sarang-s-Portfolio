import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// React Icons Imports - FIXED: Remove duplicate imports
import { BiBrain } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";
import {
  FaBars,
  FaCode,
  FaComments,
  FaDesktop,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPuzzlePiece,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { MdDescription, MdWork } from 'react-icons/md';
import {
  RiChatQuoteLine,
  RiCodeSSlashLine,
  RiPuzzleLine,
  RiSparklingLine,
  RiTeamLine,
} from "react-icons/ri";

import { TypeAnimation } from "react-type-animation";
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeIn" } },
};

const projectCardHoverEffect = {
  scale: 1.03,
  boxShadow: "0px 14px 30px -10px rgba(0, 191, 255, 0.3)",
  transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 15 },
};

const buttonHoverEffect = {
  scale: 1.05,
  transition: { duration: 0.2, type: "spring", stiffness: 300 },
};

const projectsData = [
  {
    title: "ORION",
    description: "A sovereign, offline‑first cognitive agent for secure, system‑aware execution. Features kernel‑level defense and autonomous task orchestration.",
    details: [
      "Developed a sovereign cognitive agent architecture.",
      "Implemented kernel-level defense mechanisms.",
      "Engineered autonomous task orchestration logic.",
    ],
    techStack: ["Python", "LLM", "Kernel Dev", "Cognitive AI"],
    liveLink: "#",
    repoLink: "https://github.com/Akhadesarang1/ORION",
    videoUrl: "/WhatsApp Video 2026-03-07 at 10.07.48 AM.mp4",
  },
  {
    title: "ORION‑USB",
    description: "Run the entire ORION agent directly from a USB drive – no installation, no trace left on the host machine.",
    details: [
      "Optimized ORION for portable USB execution.",
      "Ensured zero-trace operation on host machines.",
      "Developed secure booting and storage protocols for USB environments.",
    ],
    techStack: ["C++", "Embedded Systems", "Security"],
    liveLink: "#",
    repoLink: "https://github.com/Akhadesarang1/ORION_USB",
  },
  {
    title: "Plant Disease Detection",
    description: "AI‑powered web app that identifies plant diseases from images using CNN models. Provides detailed analysis and preventive measures.",
    details: [
      "Built an AI platform for agricultural image analysis.",
      "Trained CNN models to classify various plant diseases.",
      "Designed a user interface to display analysis and preventive measures.",
    ],
    techStack: ["Python", "TensorFlow", "React", "CNN"],
    liveLink: "https://mern-test-client.onrender.com/",
    repoLink: "https://github.com/Akhadesarang1/LeafGuard",
    videoUrl: "/project-demo.webm",
  },
  {
    title: "DocuAgent AI",
    description: "An intelligent agent that automates software documentation by generating UML diagrams and code explanations directly from a given codebase.",
    details: [
      "Developed an agentic system to parse and analyze repositories.",
      "Integrated LLMs to generate contextual code explanations.",
      "Automated the creation of UML diagrams from source code.",
    ],
    techStack: ["React.js", "Node.js", "LLM APIs", "Python"],
    liveLink: "https://docuagent-2vp4.onrender.com/",
    repoLink: "https://github.com/Akhadesarang1/DocuAgent",
    videoUrl: "/DocuAgent-demo.webm",
  },
  {
    title: "Employee Management",
    description: "Fast, responsive app built with React, Tailwind, and Vite to manage employee data using local storage — no backend needed.",
    details: [
      "Built a highly responsive frontend application using Vite and React.",
      "Implemented state management leveraging local storage.",
      "Designed clean UI components utilizing Tailwind CSS.",
    ],
    techStack: ["React", "Tailwind CSS", "Vite", "Local Storage"],
    liveLink: "https://employee-management-system-jdxe.onrender.com/",
    repoLink: "https://github.com/Akhadesarang1/financial-sentiment-trainer",
    videoUrl: "/EMS.webm",
  },
  {
    title: "Financial Sentiment Classifier",
    description: "XLM‑R model fine‑tuned on 14k financial sentences for market news analytics, stock tweet sentiment, and trading signal enrichment.",
    details: [
      "Fine-tuned XLM-R models on 14k+ financial domain sentences.",
      "Implemented sentiment analysis for market news and stock tweets.",
      "Developed trading signal pipelines based on sentiment scores.",
    ],
    techStack: ["Python", "XLM-R", "NLP", "PyTorch"],
    liveLink: "#",
    repoLink: "#",
  },
  {
    title: "Mediscope",
    description: "AI‑powered platform for instant X‑ray analysis, lab report simplification, and a health assistant chat. Secure, JWT‑authenticated, real‑time updates.",
    details: [
      "Built an AI platform for medical image (X-ray) analysis.",
      "Implemented NLP-based lab report simplification.",
      "Developed a real-time health assistant chatbot.",
      "Ensured secure user authentication using JWT.",
    ],
    techStack: ["React", "Python", "TensorFlow", "JWT", "Node.js"],
    liveLink: "https://mediscope-frontend-lxwd.onrender.com/",
    repoLink: "https://github.com/Akhadesarang1/MediScope",
  },
];

const experienceData = [
  {
    role: "Software Intern",
    company: "Prism Technologies",
    duration: "Jan 2026 – Present",
    details: [
      "Currently working on software development projects using modern tech stacks.",
      "Collaborating with senior developers to implement new features and fix bugs.",
      "Gaining hands-on experience with real-world software engineering practices.",
    ],
    icon: <MdWork className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />,
  },
];

const skillsData = {
  mernStack: [
    {
      name: "JavaScript (ES6+)",
      icon: <FaCode className="w-5 h-5 mr-2 inline" />,
    },
    {
      name: "React.js",
      icon: <FaCode className="w-5 h-5 mr-2 inline text-blue-400" />,
    },
    {
      name: "Node.js",
      icon: <FaCode className="w-5 h-5 mr-2 inline text-green-400" />,
    },
    { name: "Express.js", icon: <FaCode className="w-5 h-5 mr-2 inline" /> },
    {
      name: "MongoDB",
      icon: <DiMongodb className="w-5 h-5 mr-2 inline text-green-500" />,
    },
    {
      name: "RESTful APIs",
      icon: <RiChatQuoteLine className="w-5 h-5 mr-2 inline" />,
    },
  ],
  machineLearning: [
    {
      name: "Python",
      icon: <FaCode className="w-5 h-5 mr-2 inline text-yellow-400" />,
    },
    {
      name: "TensorFlow",
      icon: <RiSparklingLine className="w-5 h-5 mr-2 inline text-orange-400" />,
    },
    {
      name: "Keras",
      icon: <RiSparklingLine className="w-5 h-5 mr-2 inline text-red-500" />,
    },
    {
      name: "Scikit-learn",
      icon: <FaPuzzlePiece className="w-5 h-5 mr-2 inline text-blue-500" />,
    },
    {
      name: "Pandas & NumPy",
      icon: <FaFileAlt className="w-5 h-5 mr-2 inline" />,
    },
    { name: "CNNs", icon: <FaDesktop className="w-5 h-5 mr-2 inline" /> },
  ],
  toolsAndPlatforms: [
    { name: "Git & GitHub", icon: <FaCode className="w-5 h-5 mr-2 inline" /> },
    { name: "VS Code", icon: <FaDesktop className="w-5 h-5 mr-2 inline" /> },
    { name: "Render", icon: <FaDesktop className="w-5 h-5 mr-2 inline" /> },
    { name: "Postman", icon: <FaComments className="w-5 h-5 mr-2 inline" /> },
  ],
  softSkills: [
    {
      name: "Analytical Thinking",
      icon: <BiBrain className="w-5 h-5 mr-2 inline text-yellow-400" />,
    },
    {
      name: "Problem Solving",
      icon: <RiPuzzleLine className="w-5 h-5 mr-2 inline text-blue-400" />,
    },
    {
      name: "Collaboration",
      icon: <FaUsers className="w-5 h-5 mr-2 inline text-green-400" />,
    },
    {
      name: "Adaptability",
      icon: <RiSparklingLine className="w-5 h-5 mr-2 inline text-purple-400" />,
    },
  ],
};

const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "JSPM's Jayawant Institute of Management Studies, Pune",
    duration: "Sept 2023 – May 2025 ",
    cgpa: "CGPA: 7.38 ",
    icon: (
      <FaGraduationCap className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />
    ),
  },
  {
    degree: "Bachelor of Science in Computer Science (B.Sc. CS)",
    institution: "Dr. D. Y. Patil Arts, Commerce & Science College, Pune",
    duration: "Oct 2020 – June 2023",
    cgpa: "CGPA: 8.34",
    icon: (
      <FaGraduationCap className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />
    ),
  },
];

const contactInfo = {
  email: "sarangakhade1@gmail.com",
  phone: "+91 82087 96008",
  location: "Pune, Maharashtra, India",
  portfolioUrl: "sarangakhade.netlify.app",
  githubUrl: "https://github.com/Akhadesarang1",
  linkedinUrl: "https://www.linkedin.com/in/sarang-akhade-72a846272/",
};

// --- Loading Screen Component ---
// --- Loading Screen Component ---
const LoadingScreen = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const techStack = [
    { name: "React", src: "/React.webp" },
    { name: "Node.js", src: "/Node.js_logo.svg.webp" },
    { name: "MongoDB", src: "/Mongodb.webp" },
    { name: "Express", src: "/express-js.webp" },
    { name: "Python", src: "/Python.webp" },
    { name: "TensorFlow", src: "/DeepLearning.webp" },
    { name: "Docker", src: "/Docker.webp" },
    { name: "Tailwind", src: "/Tailwind_CSS_Logo.webp" },
    { name: "GCP", src: "/gcp.webp" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        const nextPercent = prev + 1;
        const techIndex = Math.floor((nextPercent / 100) * techStack.length);
        if (techIndex < techStack.length) {
          setCurrentIndex(techIndex);
        }
        return nextPercent;
      });
    }, 25); // Total duration approx 2.5s
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-primary flex flex-col items-center justify-center p-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="max-w-md w-full text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={techStack[currentIndex].name}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8 flex flex-col items-center justify-center"
          >
            <img
              src={techStack[currentIndex].src}
              alt={techStack[currentIndex].name}
              className="h-24 md:h-32 mb-4 object-contain"
            />
            <div className="text-2xl font-bold text-secondary">{techStack[currentIndex].name}</div>
          </motion.div>
        </AnimatePresence>

        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
          <motion.div
            className="h-full bg-secondary shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-dark-text text-sm font-mono mt-2">
          <span>SYSTEM_BOOT...</span>
          <span>{percent}%</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Global Noise Overlay ---
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [magneticTargetRect, setMagneticTargetRect] = useState(null);

  const springConfig = { damping: 28, stiffness: 550, mass: 0.12 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      if (magneticTargetRect && isMagnetic) {
        const targetCenterX =
          magneticTargetRect.left + magneticTargetRect.width / 2;
        const targetCenterY =
          magneticTargetRect.top + magneticTargetRect.height / 2;
        cursorX.set(e.clientX * 0.2 + targetCenterX * 0.8);
        cursorY.set(e.clientY * 0.2 + targetCenterY * 0.8);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const magneticElement = target.closest("[data-magnetic]");

      if (magneticElement) {
        setIsMagnetic(true);
        setMagneticTargetRect(magneticElement.getBoundingClientRect());
        setIsPointer(true);
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsPointer(true);
        setIsMagnetic(false);
        setMagneticTargetRect(null);
      } else if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        window.getComputedStyle(target).cursor === "text"
      ) {
        setIsText(true);
        setIsPointer(false);
        setIsMagnetic(false);
        setMagneticTargetRect(null);
      } else {
        setIsPointer(false);
        setIsText(false);
        setIsMagnetic(false);
        setMagneticTargetRect(null);
      }
    };

    const handleMouseOut = (e) => {
      const relatedTargetIsMagnetic =
        e.relatedTarget &&
        e.relatedTarget.closest &&
        e.relatedTarget.closest("[data-magnetic]");
      if (isMagnetic && !relatedTargetIsMagnetic) {
        setIsMagnetic(false);
        setMagneticTargetRect(null);
      }
      if (
        !e.relatedTarget ||
        (e.relatedTarget &&
          !e.relatedTarget.closest(
            "[data-magnetic], a, button, input, textarea"
          ))
      ) {
        setIsPointer(false);
        setIsText(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, isMagnetic, magneticTargetRect]);

  const cursorSize = isMagnetic ? 40 : isPointer ? 30 : isText ? 30 : 10;
  const cursorBg = isMagnetic
    ? "rgba(0, 191, 255, 0.25)"
    : isPointer
    ? "rgba(0, 191, 255, 0.2)"
    : isText
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 191, 255, 0.6)";
  const cursorBorder = isMagnetic
    ? "2px solid rgba(0, 191, 255, 0.7)"
    : isPointer
    ? "2px solid rgba(0, 191, 255, 0.6)"
    : isText
    ? "2px solid rgba(255, 255, 255, 0.6)"
    : "none";
  const cursorBorderRadius = isText ? "3px" : "9999px";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
        backgroundColor: cursorBg,
        border: cursorBorder,
        borderRadius: cursorBorderRadius,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.1 }}
    />
  );
};

const AnimatedSectionHeader = ({ icon: Icon, title }) => {
  return (
    <div className="flex flex-col items-center mb-16 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="mb-4 relative"
      >
        <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full animate-pulse" />
        <Icon className="w-12 h-12 text-secondary relative z-10" />
      </motion.div>

      <div className="overflow-hidden p-2">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase text-center"
        >
          {title}
        </motion.h2>
      </div>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "80px", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-1 bg-secondary mt-4 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
      />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuId = "mobile-menu-nav";
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#publications", label: "Publications" },
    { href: "#contact", label: "Contact" },
  ];

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const id = targetId.substring(1);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <nav
      className="bg-primary/80 backdrop-blur-md shadow-lg fixed w-full z-[1000] top-0"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="text-2xl font-bold text-secondary hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
            whileHover={{ scale: 1.05 }}
            data-magnetic
          >
            Sarang Rayaji Akhade
          </motion.a>

          <div>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-text hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm p-1 relative z-[1001]"
              whileTap={{
                scale: 0.8,
                opacity: [1, 0, 1, 0.5, 1], // Flicker effect
                transition: { duration: 0.2 }
              }}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls={mobileMenuId}
              data-magnetic
            >
              {isOpen ? (
                <FaTimes className="h-7 w-7 text-secondary" />
              ) : (
                <FaBars className="h-7 w-7" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={mobileMenuId}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-16 left-0 w-full bg-[#020617]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-white/5 py-4 z-[999]"
            role="menu"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="text-xl font-medium text-light-text hover:text-secondary hover:tracking-widest transition-all duration-300 uppercase tracking-wider"
                  role="menuitem"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const TechStackGrid = () => {
  const logos = [
    { name: "React", src: "/React.webp" },
    { name: "Node.js", src: "/Node.js_logo.svg.webp" },
    { name: "MongoDB", src: "/Mongodb.webp" },
    { name: "Tailwind", src: "/Tailwind_CSS_Logo.webp" },
    { name: "Docker", src: "/Docker.webp" },
    { name: "Python", src: "/Python.webp" },
    { name: "GCP", src: "/gcp.webp" },
    { name: "HuggingFace", src: "/HuggingFace.webp" },
    { name: "Express", src: "/express-js.webp" },
    { name: "Grafana", src: "/Grafana.webp" },
  ];

  return (
    <div className="bg-primary/50 py-16 px-6 relative border-y border-slate-800/50">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.img
                src={logo.src}
                alt={logo.name}
                className="h-10 md:h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                whileHover={{ scale: 1.15 }}
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


const Hero = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden bg-[#020617]"
    >
      {/* Background Media/Image */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/hero-bg.webp')", y: yBg }}
      />

      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondary/20 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        className="container mx-auto text-center relative z-10"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-secondary text-xs font-mono tracking-widest uppercase backdrop-blur-sm">
            MERN Stack & AI Specialist
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            className="text-5xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            SARANG <span className="text-secondary tracking-[-0.1em]">AKHADE</span>
          </motion.h1>
        </div>

        <motion.div
          className="text-xl md:text-3xl font-medium text-light-text/60 mb-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <TypeAnimation
            sequence={[
              "MERN Stack Developer",
              2000,
              "AI Integration Specialist",
              2000,
              "Full Stack Engineer",
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-light-text/40 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Building highly scalable, responsive web applications at the intersection of the <span className="text-white border-b border-white/20">MERN stack</span> and <span className="text-white border-b border-white/20">Artificial Intelligence</span>.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.button
            data-magnetic
            onClick={() => handleScrollTo("projects")}
            className="group relative px-10 py-5 bg-secondary text-primary font-black rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-shadow hover:shadow-secondary/60"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              EXPLORE PROJECTS <FaExternalLinkAlt className="text-xs" />
            </span>
          </motion.button>

          <motion.button
            data-magnetic
            onClick={() => handleScrollTo("contact")}
            className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white font-black rounded-2xl backdrop-blur-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            INITIATE CONTACT
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-secondary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
// About
const About = () => {
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "center center"],
    once: true,
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <section id="about" className="py-24 px-6 bg-[#020617] overflow-hidden relative border-t border-slate-800/20">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto">
        <AnimatedSectionHeader icon={MdWork} title="Strategic Profile" />
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
          <motion.div
            ref={contentRef}
            style={{ y, opacity }}
            className="md:w-full text-center md:text-left bg-white/5 backdrop-blur-3xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />

            <p className="text-xl text-light-text/70 leading-relaxed mb-8 font-light">
              Hi, I'm <span className="text-white font-bold tracking-tight">Sarang Akhade</span>, a Full Stack Developer specialized in architecting <span className="text-secondary font-medium italic">Sovereign Intelligence</span>.
              My expertise lies in crafting complex, user-centric systems that bridge the gap between AI and core security.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="space-y-4">
                <h4 className="text-secondary font-mono text-xs uppercase tracking-widest">Cognitive Architecture</h4>
                <p className="text-sm text-light-text/50">Designing autonomous agents with system-aware execution and recursive reasoning capabilities.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-secondary font-mono text-xs uppercase tracking-widest">Full-Stack Resilience</h4>
                <p className="text-sm text-light-text/50">Building robust, end-to-end applications using MERN stack with a focus on kernel-level auditing.</p>
              </div>
            </div>

            <p className="text-lg text-light-text/60 leading-relaxed mb-12 font-light">
              I thrive in environments where performance and security are paramount. My journey involves translating theoretical research into production-ready, autonomous defense mechanisms.
            </p>

            <div className="flex justify-center md:justify-start">
              <motion.a
                data-magnetic
                href="https://drive.google.com/file/d/1WdgysfcQuLH5vGTv9M-InixkmJgUtq7N/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-secondary hover:text-primary transition-all duration-500 shadow-xl group/btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdDescription className="text-xl group-hover/btn:rotate-12 transition-transform" />
                EXAMINE DOSSIER / RESUME
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
// --- Project Card Skeleton ---
const ProjectCardSkeleton = () => (
  <div
    className="bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col animate-pulse"
    aria-busy="true"
    aria-live="polite"
  >
    <div className="w-full h-56 bg-white/5"></div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-8 w-3/4 bg-white/5 rounded-xl mb-4"></div>
      <div className="h-4 w-1/2 bg-white/5 rounded-xl mb-5"></div>
      <div className="h-4 w-full bg-white/5 rounded-xl mb-2"></div>
      <div className="h-4 w-full bg-white/5 rounded-xl mb-4"></div>
      <div className="h-16 w-full bg-white/5 rounded-2xl mb-5"></div>
      <div className="flex flex-wrap gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-16 bg-white/5 rounded-full"></div>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="projects" className="py-24 px-6 bg-[#020617] relative overflow-hidden border-t border-slate-800/20">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="container mx-auto relative z-10">
        <AnimatedSectionHeader icon={FaLaptopCode} title="Selected Works" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array(projectsData.length)
                .fill(0)
                .map((_, i) => <ProjectCardSkeleton key={i} />)
            : projectsData.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
};

// --- ProjectCard Component (Refined 90px UX - No 3D Tilt for Performance) ---
const ProjectCard = ({ project, index }) => {
  const projectTitleId = `project-title-${project.title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-3xl rounded-2xl shadow-xl border border-white/10 overflow-hidden flex flex-col group relative transition-all duration-500 hover:border-secondary/30 hover:shadow-2xl focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:ring-offset-slate-900"
      variants={fadeInUp}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      tabIndex={0}
      aria-labelledby={projectTitleId}
    >
      {/* Media Section */}
      <div className="overflow-hidden h-56 relative bg-slate-900/50 group-hover:shadow-[inset_0_-30px_50px_-15px_rgba(0,0,0,0.8)] transition-all duration-500">
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-secondary/30">
            <RiCodeSSlashLine className="w-16 h-16 mb-2 opacity-50" />
            <span className="font-mono text-xs uppercase tracking-widest">System Executable</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-[#020617] to-transparent">
        <h3
          id={projectTitleId}
          className="text-xl font-black text-white mb-2 group-hover:text-secondary transition-colors duration-300 tracking-tight"
        >
          {project.title}
        </h3>

        <p className="text-light-text/70 text-sm leading-relaxed mb-5 flex-grow font-light">
          {project.description}
        </p>

        <div className="mb-5 space-y-1.5 border-l-[1.5px] border-secondary/20 pl-4 py-1">
          {project.details.slice(0, 2).map((detail, idx) => (
            <p key={idx} className="text-light-text/50 text-xs leading-snug">
              • {detail}
            </p>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-white/5 text-secondary text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-md border border-white/10 group-hover:border-secondary/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {/* Live Link Button */}
            {project.liveLink && project.liveLink !== "#" ? (
              <a
                data-magnetic
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center bg-secondary/10 hover:bg-secondary text-secondary hover:text-primary font-bold text-xs py-2.5 px-3 rounded-lg border border-secondary/20 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              >
                <FaExternalLinkAlt className="w-3 h-3 mr-2" /> Live
              </a>
            ) : (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex-1 flex items-center justify-center bg-secondary/10 hover:bg-secondary text-secondary hover:text-primary font-bold text-xs py-2.5 px-3 rounded-lg border border-secondary/20 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              >
                <FaExternalLinkAlt className="w-3 h-3 mr-2" /> Live
              </a>
            )}

            {/* Source Code Button */}
            {project.repoLink && project.repoLink !== "#" ? (
              <a
                data-magnetic
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-2.5 px-3 rounded-lg border border-white/10 transition-all duration-300"
              >
                <FaCode className="w-3.5 h-3.5 mr-2" /> Source
              </a>
            ) : (
              <a
                 href="#"
                 onClick={(e) => e.preventDefault()}
                className="flex-1 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-2.5 px-3 rounded-lg border border-white/10 transition-all duration-300"
              >
                <FaCode className="w-3.5 h-3.5 mr-2" /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Experience Component ---
const ExperienceItem = ({ item }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
    once: true,
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="bg-white/5 backdrop-blur-3xl p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 relative group overflow-hidden hover:border-secondary/20 transition-all duration-500"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />

      <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20 shadow-inner group-hover:bg-secondary/20 transition-colors">
        {item.icon}
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
          <h3 className="text-xl font-black text-white group-hover:text-secondary transition-colors uppercase tracking-tight">{item.role}</h3>
          <span className="text-xs font-mono text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 h-fit w-fit mx-auto md:mx-0">
            {item.duration}
          </span>
        </div>

        <p className="text-lg font-bold text-light-text/60 mb-6">{item.company}</p>

        <ul className="space-y-3">
          {item.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-light-text/40 font-light">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-[#020617] relative overflow-hidden border-t border-slate-800/20">
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <AnimatedSectionHeader icon={MdWork} title="Experience" />
        <div className="max-w-4xl mx-auto">
          {experienceData.map((exp, index) => (
            <ExperienceItem key={index} item={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Publications Component ---
const Publications = () => {
  const publications = [
    {
      title: "ORION Whitepaper",
      subtitle: "ORION: A Framework for Cognitive Intelligence in Autonomous Agents",
      year: "2026",
      link: "https://zenodo.org/records/18831625?token=eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjU3MmJmYzkwLTY5M2YtNDY1Ni1iOGE3LWJkZDU3MmMwZjZjOSIsImRhdGEiOnt9LCJyYW5kb20iOiJhNmZkMTJhOGQ1MzM1NjBkYzQ5NTA4MTExYjY4ZGZkMiJ9.BXtsgAUU-isnmL3pMrfIc832aVObiG515pWwZE1IhWJ2doCYe7SMmnR8gSVp3BZVOgYDa5bKt1gNsjjloHyOqA",
      image: "/orion-whitepaper.webp",
      description: "This research introduces ORION, a novel architecture for building sovereign cognitive agents capable of system‑aware execution, kernel‑level defense, and autonomous task orchestration. The whitepaper explores the theoretical foundations of cognitive intelligence in AI systems and presents empirical results from deployment in secure environments.",
    },
  ];

  return (
    <section id="publications" className="py-24 px-6 bg-[#020617] overflow-hidden relative border-t border-slate-800/50">
      {/* Cinematic Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <AnimatedSectionHeader icon={MdDescription} title="Strategic Research" />

        <div className="max-w-6xl mx-auto">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              className="bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden flex flex-col lg:flex-row group transition-all duration-700 hover:border-secondary/30 hover:shadow-secondary/5"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="lg:w-1/2 h-[400px] lg:h-auto relative overflow-hidden">
                <motion.img
                  src={pub.image}
                  alt={pub.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] lg:bg-gradient-to-r lg:from-transparent lg:to-[#020617]/40" />

                <div className="absolute top-6 left-6">
                  <span className="bg-secondary/20 backdrop-blur-md border border-secondary/40 text-secondary text-[11px] font-mono px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Classified Architecture
                  </span>
                </div>
              </div>

              <div className="p-12 lg:w-1/2 flex flex-col justify-center bg-gradient-to-br from-slate-900/60 to-transparent">
                <div className="flex items-center gap-5 mb-8">
                  <div className="h-[2px] w-16 bg-secondary/40" />
                  <span className="text-secondary/80 text-sm font-mono tracking-widest">{pub.year}</span>
                </div>

                <h3 className="text-4xl font-black text-white mb-4 leading-tight group-hover:text-secondary transition-colors duration-500">
                  {pub.title}
                </h3>

                <p className="text-secondary/70 font-semibold text-base mb-8 border-l-2 border-secondary/20 pl-6 py-2">
                  {pub.subtitle}
                </p>

                <p className="text-light-text/60 text-lg leading-relaxed mb-10 font-light">
                  {pub.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mt-auto">
                  <motion.a
                    href={pub.link}
                    className="px-8 py-4 bg-secondary text-primary rounded-2xl text-sm font-bold inline-flex items-center gap-3 transition-transform shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                    whileHover={{ scale: 1.05, boxShadow: "0_0_30px_rgba(56,189,248,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Examine Whitepaper
                    <FaExternalLinkAlt className="text-xs" />
                  </motion.a>

                  <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <span className="text-[10px] text-dark-text uppercase tracking-widest font-bold">Protocol:</span>
                    <span className="text-xs text-secondary font-mono">Cognitive intelligence</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Skills Component ---
const SkillCategory = ({ title, skills, categoryIcon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-3xl p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col gap-5 group hover:border-secondary/20 transition-all duration-700"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20 text-secondary">
          {categoryIcon}
        </div>
        <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-secondary transition-colors">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <motion.span
            key={skill.name}
            className="flex items-center gap-2 bg-white/5 text-light-text/70 text-xs font-mono px-3 py-1.5 rounded-full border border-white/5 hover:border-secondary/40 hover:text-white transition-all cursor-default"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(56,189,248,0.1)" }}
          >
            {skill.icon && React.cloneElement(skill.icon, { className: "w-3.5 h-3.5" })}
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-[#020617] relative overflow-hidden border-t border-slate-800/20">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <AnimatedSectionHeader icon={RiSparklingLine} title="Expertise Map" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <SkillCategory
            title="Sovereign Architectures"
            skills={skillsData.mernStack}
            categoryIcon={<RiCodeSSlashLine className="w-8 h-8" />}
          />
          <SkillCategory
            title="Cognitive Intelligence"
            skills={skillsData.machineLearning}
            categoryIcon={<RiSparklingLine className="w-8 h-8" />}
          />
          <SkillCategory
            title="Strategic Infrastructure"
            skills={skillsData.toolsAndPlatforms}
            categoryIcon={<FaDesktop className="w-8 h-8" />}
          />
          <SkillCategory
            title="Adaptive Leadership"
            skills={skillsData.softSkills}
            categoryIcon={<RiTeamLine className="w-8 h-8" />}
          />
        </div>
      </div>
    </section>
  );
};

// --- Education Component ---
const EducationItem = ({ item }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
    once: true,
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [item.degree.includes("Master") ? -25 : 25, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity, scale }}
      className="bg-primary p-6 rounded-lg shadow-xl flex items-start relative"
    >
      {item.icon && React.cloneElement(item.icon, { "aria-hidden": "true" })}
      <div>
        <h3 className="text-xl font-semibold text-secondary mb-1">
          {item.degree}
        </h3>
        <p className="text-light-text font-medium">{item.institution}</p>
        <p className="text-sm text-dark-text mt-1">{item.duration}</p>
        <p className="text-sm text-dark-text">{item.cgpa}</p>
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-24 px-6 bg-[#020617] relative overflow-hidden border-t border-slate-800/20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <AnimatedSectionHeader icon={FaGraduationCap} title="Intellectual Path" />
        <div className="max-w-4xl mx-auto space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-3xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-6 group hover:border-secondary/20 transition-all duration-500"
            >
              <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 text-secondary group-hover:bg-secondary/20 transition-colors">
                <FaGraduationCap className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className="text-xl font-black text-white group-hover:text-secondary transition-colors tracking-tight uppercase">{edu.degree}</h3>
                  <span className="text-xs font-mono text-secondary bg-secondary/10 px-4 py-1 rounded-full border border-secondary/20 w-fit mx-auto md:mx-0">
                    {edu.duration}
                  </span>
                </div>
                <p className="text-lg font-bold text-light-text/60 mb-2">{edu.institution}</p>
                <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-secondary font-mono tracking-tighter">
                  Status: {edu.cgpa}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact Info Item Component ---
const ContactInfoItem = ({ href, icon: Icon, title, text, isDiv = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-3xl p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col items-center gap-4 group hover:border-secondary/30 transition-all duration-500"
    >
      <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20 text-secondary group-hover:bg-secondary/20 transition-colors">
        <Icon className="w-6 h-6" />
      </div>

      <div className="text-center">
        <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">{title}</h3>
        {isDiv ? (
          <p className="text-sm text-light-text/40 font-light">{text}</p>
        ) : (
          <motion.a
            data-magnetic
            href={href}
            className="text-sm text-secondary font-mono tracking-tighter hover:text-white transition-colors"
          >
            {text}
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const socialIconsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: socialIconsRef,
    offset: ["start end", "center center"],
    once: true,
  });
  const ySocial = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacitySocial = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-[#020617] relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        <AnimatedSectionHeader icon={FaEnvelope} title="Initiate Contact" />
        <h2 id="contact-heading" className="sr-only">
          Contact Information
        </h2>
        <motion.p
          className="text-lg text-light-text mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
        >
          I'm actively seeking new opportunities and collaborations. Feel free
          to reach out if you'd like to discuss projects, ideas, or just
          connect!
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          <ContactInfoItem
            href={`mailto:${contactInfo.email}`}
            icon={FaEnvelope}
            title="Email"
            text={contactInfo.email}
          />
          <ContactInfoItem
            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} // Remove spaces for tel link
            icon={FaPhoneAlt}
            title="Phone"
            text={contactInfo.phone}
          />
          <ContactInfoItem
            icon={FaMapMarkerAlt}
            title="Location"
            text={contactInfo.location}
            isDiv={true}
          />
        </div>
        <motion.div
          ref={socialIconsRef}
          style={{ y: ySocial, opacity: opacitySocial }}
          className="flex justify-center space-x-6 mb-12 relative"
        >
          {[
            {
              href: contactInfo.linkedinUrl,
              title: "LinkedIn",
              icon: FaLinkedin,
              label: "My LinkedIn Profile",
            },
            {
              href: contactInfo.githubUrl,
              title: "GitHub",
              icon: FaGithub,
              label: "My GitHub Profile",
            },
            {
              href: contactInfo.portfolioUrl.startsWith("http")
                ? contactInfo.portfolioUrl
                : `https://${contactInfo.portfolioUrl}`,
              title: "Portfolio",
              icon: FaExternalLinkAlt,
              label: "My Portfolio Website",
            },
          ].map((social) => (
            <motion.a
              data-magnetic
              key={social.title}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.title}
              className="text-secondary hover:text-sky-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 focus-visible:ring-secondary rounded-md p-1"
              whileHover={{ y: -5, scale: 1.1, color: "#0ea5e9" }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon className="h-10 w-10" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-12 bg-[#020617] text-center relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-black text-white tracking-tighter italic uppercase">
            SARANG <span className="text-secondary tracking-[-0.1em]">AKHADE</span>
          </h2>
        </motion.div>

        <p className="text-light-text/30 text-[10px] font-mono tracking-widest uppercase mb-4">
          © {currentYear} Sovereign Intelligence Protocol. Built with Precision.
        </p>

        <div className="flex justify-center items-center gap-6">
          <div className="h-[1px] w-12 bg-white/5" />
          <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
          <div className="h-[1px] w-12 bg-white/5" />
        </div>
      </div>
    </footer>
  );
};

// --- Main Landing Page Component ---
const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide system cursor
    document.body.style.cursor = "none";

    // Smooth scroll to hash if present
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Timeout to ensure layout is stable
        setTimeout(() => {
          const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
    // Cleanup: Restore system cursor on component unmount
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="font-sans bg-[#020617] text-light-text overflow-x-hidden selection:bg-secondary selection:text-primary">
      <NoiseOverlay />
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TechStackGrid />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
