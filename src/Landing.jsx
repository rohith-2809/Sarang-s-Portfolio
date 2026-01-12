import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// React Icons Imports
import { MdWork, MdDescription } from 'react-icons/md';
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
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPuzzlePiece,
  FaTimes,
  FaUsers,
  FaCloud,
  FaDatabase,
  FaRobot,
  FaChartLine,
  FaServer,
  FaTools,
  FaCogs,
  FaLayerGroup,
  FaCalendarAlt,
  FaProjectDiagram,
} from "react-icons/fa";
import {
  RiChatQuoteLine,
  RiCodeSSlashLine,
  RiPuzzleLine,
  RiSparklingLine,
  RiTeamLine,
} from "react-icons/ri";

import { TypeAnimation } from "react-type-animation";

// --- Framer Motion Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1 
    } 
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.1
    } 
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

const slideInFromLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

const slideInFromRight = {
  initial: { opacity: 0, x: 60 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

const projectCardHoverEffect = {
  scale: 1.03,
  boxShadow: "0px 20px 40px -15px rgba(0, 191, 255, 0.4)",
  transition: { 
    duration: 0.4, 
    type: "spring", 
    stiffness: 200, 
    damping: 15 
  },
};

const buttonHoverEffect = {
  scale: 1.05,
  transition: { duration: 0.2, type: "spring", stiffness: 300 },
};

const iconHoverEffect = {
  scale: 1.2,
  rotate: [0, -5, 5, 0],
  transition: { 
    duration: 0.4,
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

const floatAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

// --- Unified Tech Stack Data ---
const unifiedTechStack = [
  { name: "React", image: "React.webp", category: "frontend" },
  { name: "Tailwind CSS", image: "Tailwind_CSS_Logo.webp", category: "frontend" },
  { name: "PreviewUX", image: "PreviewUX.webp", category: "frontend" },
  { name: "Node.js", image: "Node.js_logo.svg.webp", category: "backend" },
  { name: "Express.js", image: "express-js.webp", category: "backend" },
  { name: "MongoDB", image: "Mongodb.webp", category: "database" },
  { name: "Docker", image: "Docker.webp", category: "devops" },
  { name: "Grafana", image: "Grafana.webp", category: "devops" },
  { name: "Google Cloud", image: "gcp.webp", category: "cloud" },
  { name: "Python", image: "Python.webp", category: "language" },
  { name: "Google Python", image: "Google Python.webp", category: "language" },
  { name: "Deep Learning", image: "DeepLearning.webp", category: "ai-ml" },
  { name: "Machine Learning", image: "MachineLearningPreview.webp", category: "ai-ml" },
  { name: "Hugging Face", image: "HuggingFace.webp", category: "ai-ml" },
  { name: "AI/ML", image: "AiPreview.webp", category: "ai-ml" },
  { name: "Data Analytics", image: "Google Advanced Data Analytics Capstone.webp", category: "analytics" },
];

// --- Data ---
const projectsData = [
  {
    title: "DocuAgent: AI-Powered Documentation Automation",
    description: "An intelligent agent that automates software documentation by generating UML diagrams and providing code explanations directly from a given codebase, streamlining the development workflow.",
    details: [
      "Developed a full-stack MERN application with a focus on AI integration.",
      "Engineered a backend system to analyze code and generate documentation.",
      "Integrated a powerful AI model to create UML diagrams and code summaries.",
      "Designed a user-friendly React interface for code submission and viewing generated documents.",
      "Deployed on Render for continuous availability and scalability.",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI/LLM APIs",
      "Render",
    ],
    liveLink: "https://docuagent-2vp4.onrender.com",
    repoLink: "https://github.com/Akhadesarang1/DocuAgent",
  },
  {
    title: "Employee Management System",
    description: "A comprehensive MERN stack web application built to streamline employee management processes. It provides administrators with tools to efficiently handle employee data, track attendance, and manage leave requests.",
    details: [
      "Full CRUD (Create, Read, Update, Delete) functionality for employee records.",
      "Implemented secure user authentication and role-based access control (Admin vs. Employee).",
      "Developed modules for leave application and attendance tracking.",
      "Built a responsive and intuitive user interface using React.js.",
      "Ensured seamless data flow with a robust Node.js/Express.js backend and MongoDB.",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT (for Auth)",
      "Render",
    ],
    liveLink: "https://employee-management-system-jdxe.onrender.com/",
    repoLink: "https://github.com/Akhadesarang1/ems",
  },
  {
    title: "AI-Powered Plant Disease Detection",
    description: "An intelligent web application designed to analyze plant health and detect diseases through image classification. This system helps farmers, gardeners, and agricultural experts to identify plant diseases early and take corrective actions, ensuring crop health and maximum yield.",
    details: [
      "Designed and developed a full-stack MERN application.",
      "Built an interactive React.js frontend with image upload and camera capture capabilities.",
      "Engineered Node.js/Express.js APIs for data flow.",
      "Integrated a TensorFlow-based CNN model for disease classification.",
      "Incorporated Google Gemini AI for personalized plant care tips.",
      "Deployed the solution on Render for high availability.",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TensorFlow",
      "Google Gemini",
      "Render",
    ],
    imageUrl: "/project.jpg",
    liveLink: "https://mern-test-client.onrender.com/",
    repoLink: "https://github.com/rohith-2809/mern-test",
  },
];

const expertiseData = {
  development: [
    { name: "Full Stack Development", description: "End-to-end web applications with modern frameworks", icon: <RiCodeSSlashLine className="w-6 h-6" /> },
    { name: "RESTful APIs", description: "Design and implementation of scalable APIs", icon: <RiChatQuoteLine className="w-6 h-6" /> },
    { name: "UI/UX Implementation", description: "Building intuitive and responsive interfaces", icon: <FaDesktop className="w-6 h-6" /> },
    { name: "System Architecture", description: "Scalable and maintainable system design", icon: <FaLayerGroup className="w-6 h-6" /> },
  ],
  machineLearning: [
    { name: "Machine Learning", description: "Developing predictive models and algorithms", icon: <FaRobot className="w-6 h-6" /> },
    { name: "Deep Learning", description: "Neural networks and advanced AI models", icon: <BiBrain className="w-6 h-6" /> },
    { name: "Data Analysis", description: "Extracting insights from complex datasets", icon: <FaChartLine className="w-6 h-6" /> },
    { name: "AI Integration", description: "Integrating AI capabilities into applications", icon: <FaPuzzlePiece className="w-6 h-6" /> },
  ],
  tools: [
    { name: "Version Control", description: "Git workflow and collaboration", icon: <FaCode className="w-6 h-6" /> },
    { name: "DevOps", description: "CI/CD and deployment automation", icon: <FaTools className="w-6 h-6" /> },
    { name: "Cloud Services", description: "Cloud deployment and management", icon: <FaCloud className="w-6 h-6" /> },
    { name: "Database Management", description: "Database design and optimization", icon: <FaDatabase className="w-6 h-6" /> },
  ],
  softSkills: [
    { name: "Problem Solving", description: "Analytical approach to complex challenges", icon: <RiPuzzleLine className="w-6 h-6" /> },
    { name: "Team Collaboration", description: "Effective communication and teamwork", icon: <RiTeamLine className="w-6 h-6" /> },
    { name: "Adaptability", description: "Quick learning and adaptation to new technologies", icon: <RiSparklingLine className="w-6 h-6" /> },
    { name: "Project Management", description: "Planning and execution of development projects", icon: <FaProjectDiagram className="w-6 h-6" /> },
  ],
};

const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "JSPM's Jayawant Institute of Management Studies, Pune",
    duration: "Sept 2023 – May 2025",
    cgpa: "CGPA: 7.38",
    icon: <FaGraduationCap className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />,
  },
  {
    degree: "Bachelor of Science in Computer Science (B.Sc. CS)",
    institution: "Dr. D. Y. Patil Arts, Commerce & Science College, Pune",
    duration: "Oct 2020 – June 2023",
    cgpa: "CGPA: 8.34",
    icon: <FaGraduationCap className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />,
  },
];

const contactInfo = {
  email: "akhadesarang1036@gmail.com",
  phone: "+91 82087 96008",
  location: "Pune, Maharashtra, India",
  portfolioUrl: "sarangakhade.netlify.app",
  githubUrl: "https://github.com/Akhadesarang1",
  linkedinUrl: "https://www.linkedin.com/in/sarang-akhade-72a846272/",
};

// --- Custom Cursor Component ---
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
        const targetCenterX = magneticTargetRect.left + magneticTargetRect.width / 2;
        const targetCenterY = magneticTargetRect.top + magneticTargetRect.height / 2;
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
      const relatedTargetIsMagnetic = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest("[data-magnetic]");
      if (isMagnetic && !relatedTargetIsMagnetic) {
        setIsMagnetic(false);
        setMagneticTargetRect(null);
      }
      if (
        !e.relatedTarget ||
        (e.relatedTarget && !e.relatedTarget.closest("[data-magnetic], a, button, input, textarea"))
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
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
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

// --- Animated Background Pattern ---
const AnimatedBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <motion.div
        ref={ref}
        style={{ rotate }}
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-blue-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,191,255,0.1),transparent_50%)]" />
      </motion.div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// --- Animated Section Header ---
const AnimatedSectionHeader = ({ icon: Icon, title, subtitle }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
    once: true,
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="text-center mb-12 md:mb-16 relative"
    >
      {Icon && (
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <motion.div 
        className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
};

// --- Tech Stack Component ---
const TechStack = () => {
  return (
    <section id="tech-stack" className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <AnimatedSectionHeader 
          icon={RiCodeSSlashLine}
          title="Technology Stack"
          subtitle="Tools and technologies I use to bring ideas to life"
        />
        
        {/* Unified Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-16">
          {unifiedTechStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.03,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{
                scale: 1.15,
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group flex flex-col items-center"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-slate-900/80 rounded-xl flex items-center justify-center p-4 border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                  <img
                    src={`/${tech.image}`}
                    alt={tech.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain filter group-hover:brightness-125 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
              <motion.p 
                className="mt-4 text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center"
                whileHover={{ scale: 1.05 }}
              >
                {tech.name}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Expertise Section */}
        <div className="max-w-6xl mx-auto">
          <AnimatedSectionHeader 
            icon={FaCogs}
            title="Areas of Expertise"
            subtitle="Technical capabilities and specialized skills"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(expertiseData).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
              >
                <h3 className="text-xl font-bold text-white mb-6 capitalize">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </h3>
                
                <div className="space-y-4">
                  {items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.05 + categoryIndex * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="text-cyan-400">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#tech-stack", label: "Tech Stack" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const id = targetId.substring(1);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-[1000] top-0 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-900/90 backdrop-blur-md shadow-2xl py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            data-magnetic
          >
            Sarang Akhade
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                data-magnetic
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            whileTap={{ scale: 0.9 }}
            data-magnetic
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-slate-900/95 backdrop-blur-lg rounded-xl overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// --- Hero Component ---
const Hero = () => {
  const textRef = useRef(null);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 md:pt-0 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
              <span className="text-sm text-cyan-400">Available for opportunities</span>
            </div>
          </motion.div>

          <motion.h1
            ref={textRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="block text-white">Sarang</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
              Rayaji Akhade
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-8 h-20 md:h-16"
          >
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "Machine Learning Specialist",
                2000,
                "MERN Stack Expert",
                2000,
                "AI/ML Engineer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting innovative digital solutions with modern technologies. 
            Specializing in full-stack development and AI/ML integration to build 
            scalable, intelligent applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <motion.a
              href="#projects"
              data-magnetic
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="#contact"
              data-magnetic
              className="group px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Contact Me
                <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-6 mt-12"
          >
            {[
              { icon: FaGithub, href: contactInfo.githubUrl, label: "GitHub" },
              { icon: FaLinkedin, href: contactInfo.linkedinUrl, label: "LinkedIn" },
              { icon: FaEnvelope, href: `mailto:${contactInfo.email}`, label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                data-magnetic
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

// --- About Component ---
const About = () => {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="container mx-auto">
        <AnimatedSectionHeader 
          icon={MdWork}
          title="About Me"
          subtitle="Passionate developer creating innovative solutions"
        />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Professional Journey
                  </span>
                </h3>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    I'm a passionate Full Stack Developer with specialized expertise in 
                    Machine Learning and AI integration. My approach combines technical 
                    excellence with creative problem-solving to build applications that 
                    are both powerful and user-friendly.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed">
                    With a strong foundation in the MERN stack and advanced knowledge of 
                    TensorFlow and AI frameworks, I create intelligent solutions that 
                    bridge the gap between cutting-edge technology and practical 
                    application.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed">
                    My experience includes developing scalable plant disease detection 
                    systems, AI-powered documentation tools, and enterprise management 
                    solutions—each demonstrating my ability to integrate AI with 
                    full-stack development for maximum impact.
                  </p>
                  
                  <div className="pt-6 border-t border-slate-700/50">
                    <div className="flex flex-wrap gap-4">
                      {[
                        "Full Stack Architecture",
                        "Machine Learning",
                        "AI Integration",
                        "Cloud Deployment",
                        "System Design",
                        "Technical Leadership"
                      ].map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="px-4 py-2 bg-slate-900/50 rounded-full text-sm text-cyan-400 border border-cyan-500/20"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Professional Highlights */}
            {[
              {
                title: "Full Stack Development",
                description: "End-to-end application development with modern frameworks and best practices.",
                icon: <RiCodeSSlashLine className="w-6 h-6" />,
                color: "from-cyan-500 to-blue-500"
              },
              {
                title: "AI/ML Integration",
                description: "Developing and deploying intelligent models for real-world applications.",
                icon: <FaRobot className="w-6 h-6" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Cloud & Infrastructure",
                description: "Deploying scalable applications with optimized cloud infrastructure.",
                icon: <FaCloud className="w-6 h-6" />,
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Resume Button */}
            <motion.a
              href="https://drive.google.com/file/d/1WdgysfcQuLH5vGTv9M-InixkmJgUtq7N/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <MdDescription className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">View Resume</h4>
                      <p className="text-gray-400">Download my comprehensive portfolio</p>
                    </div>
                  </div>
                  <FaExternalLinkAlt className="text-cyan-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Project Card Skeleton ---
const ProjectCardSkeleton = () => (
  <div className="bg-slate-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-pulse">
    <div className="w-full h-60 bg-slate-700/50" />
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-8 w-3/4 bg-slate-700/50 rounded mb-2" />
      <div className="h-4 w-1/2 bg-slate-700/50 rounded mb-3" />
      <div className="h-4 w-full bg-slate-700/50 rounded mb-1" />
      <div className="h-4 w-full bg-slate-700/50 rounded mb-1" />
      <div className="h-4 w-3/4 bg-slate-700/50 rounded mb-4" />
      <div className="h-6 w-1/3 bg-slate-700/50 rounded mb-2 mt-4" />
      <div className="flex flex-wrap gap-2 mb-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-6 w-20 bg-slate-700/50 rounded-full" />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-start mt-auto pt-4 border-t border-slate-700/50">
        <div className="h-10 w-32 bg-slate-700/50 rounded-lg" />
        <div className="h-10 w-32 bg-slate-700/50 rounded-lg" />
      </div>
    </div>
  </div>
);

// --- Projects Component ---
const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="container mx-auto">
        <AnimatedSectionHeader 
          icon={FaDesktop}
          title="Featured Projects"
          subtitle="Showcasing innovative solutions and technical excellence"
        />
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href={contactInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="group-hover:scale-110 transition-transform" />
            View All Projects on GitHub
            <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// --- ProjectCard Component ---
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {project.imageUrl ? (
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <FaDesktop className="w-16 h-16 text-cyan-400/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-400">
            Featured
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaExternalLinkAlt className="w-5 h-5 text-gray-500" />
          </motion.div>
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-slate-900/70 rounded-full text-xs text-cyan-400 border border-cyan-500/20"
              >
                {tech}
              </motion.span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-3 py-1 bg-slate-900/70 rounded-full text-xs text-gray-400">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-slate-700/50">
          {project.liveLink && (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-lg hover:from-cyan-500/30 hover:to-blue-500/30 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Live Demo</span>
            </motion.a>
          )}
          {project.repoLink && (
            <motion.a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/50 text-gray-300 rounded-lg hover:bg-slate-800 hover:text-white transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">View Code</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Education Component ---
const Education = () => {
  return (
    <section id="education" className="py-20 px-6 relative">
      <div className="container mx-auto">
        <AnimatedSectionHeader 
          icon={FaGraduationCap}
          title="Education & Qualifications"
          subtitle="Academic foundation and continuous learning"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent" />
            
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-0 pl-12' : 'md:pl-1/2 md:pr-0 pl-12'} md:pl-0 md:pr-0`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full border-4 border-slate-900 z-10" />
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      {React.cloneElement(edu.icon, { className: "w-8 h-8 text-cyan-400" })}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-cyan-400 mb-3">
                        {edu.institution}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="w-4 h-4 text-cyan-400" />
                          <span className="text-gray-300">{edu.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaGraduationCap className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">{edu.cgpa}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-700/50">
                        <p className="text-gray-400">
                          {index === 0 
                            ? "Advanced studies in computer applications, software engineering methodologies, and modern development practices with focus on scalable system design."
                            : "Comprehensive foundation in computer science principles, algorithms, data structures, and programming fundamentals."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Contact Component ---
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="container mx-auto">
        <AnimatedSectionHeader 
          icon={FaEnvelope}
          title="Get In Touch"
          subtitle="Let's discuss opportunities or collaborate on innovative projects"
        />
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Contact Information
            </h3>
            
            {[
              {
                icon: FaEnvelope,
                title: "Email",
                value: contactInfo.email,
                href: `mailto:${contactInfo.email}`,
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: FaPhoneAlt,
                title: "Phone",
                value: contactInfo.phone,
                href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: FaMapMarkerAlt,
                title: "Location",
                value: contactInfo.location,
                color: "from-purple-500 to-pink-500"
              }
            ].map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {info.title}
                  </h4>
                  <p className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <div className="pt-8 border-t border-slate-700/50">
              <h4 className="text-lg font-semibold text-white mb-4">Connect with me</h4>
              <div className="flex gap-4">
                {[
                  { icon: FaGithub, href: contactInfo.githubUrl, label: "GitHub" },
                  { icon: FaLinkedin, href: contactInfo.linkedinUrl, label: "LinkedIn" },
                  { icon: FaExternalLinkAlt, href: `https://${contactInfo.portfolioUrl}`, label: "Portfolio" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                  placeholder="Hello, I'd like to discuss a project..."
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 border-t border-slate-800/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <motion.a
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Sarang Akhade
            </motion.a>
            <p className="text-gray-400 text-sm mt-2">
              Full Stack Developer & ML Specialist
            </p>
          </div>
          
          <div className="flex gap-6">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" }
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8 pt-8 border-t border-slate-800/30">
          <p className="text-gray-500 text-sm">
            © {currentYear} Sarang Rayaji Akhade. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main Landing Page Component ---
const LandingPage = () => {
  useEffect(() => {
    document.body.style.cursor = "none";
    
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
    
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Education />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
