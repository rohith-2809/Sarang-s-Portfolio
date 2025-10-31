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
} from "react-icons/fa";
// REMOVE THIS DUPLICATE LINE: import { MdWork } from "react-icons/md";
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

// --- Data ---
const projectsData = [
  {
    title: "DocuAgent: AI-Powered Documentation Automation",
    description:
      "An intelligent agent that automates software documentation by generating UML diagrams and providing code explanations directly from a given codebase, streamlining the development workflow.",
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
    duration: "May 2025 - June 2025",
  },
  {
    title: "Employee Management System",
    description:
      "A comprehensive MERN stack web application built to streamline employee management processes. It provides administrators with tools to efficiently handle employee data, track attendance, and manage leave requests.",
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
    duration: "April 2025 - May 2025",
  },
  {
    title: "AI-Powered Plant Disease Detection",
    description:
      "An intelligent web application designed to analyze plant health and detect diseases through image classification. This system helps farmers, gardeners, and agricultural experts to identify plant diseases early and take corrective actions, ensuring crop health and maximum yield.",
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
    imageUrl: "/project.jpg", // Make sure this image exists in your public folder
    liveLink: "https://mern-test-client.onrender.com/",
    repoLink: "https://github.com/rohith-2809/mern-test",
    duration: "Jan 2025 - April 2025",
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
    duration: "Sept 2023 – May 2025 (Expected)",
    cgpa: "CGPA: 7.04 (Current)",
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
  email: "akhadesarang1036@gmail.com",
  phone: "+91 82087 96008",
  location: "Pune, Maharashtra, India",
  portfolioUrl: "sarangakhade.netlify.app",
  githubUrl: "https://github.com/Akhadesarang1",
  linkedinUrl: "https://www.linkedin.com/in/sarang-akhade-72a846272/",
};

// --- Custom Cursor Component (with magnetic effect) ---
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

// --- Animated Section Title ---
const AnimatedSectionHeader = ({ icon: Icon, title }) => {
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
        <Icon
          className="w-16 h-16 text-secondary mx-auto mb-4"
          aria-hidden="true"
        />
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-secondary">{title}</h2>
    </motion.div>
  );
};

// --- Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuId = "mobile-menu-nav";
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
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
            Sarang Akhade
          </motion.a>
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-light-text hover:text-secondary transition-colors px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                whileHover={{
                  scale: 1.1,
                  color: "var(--color-secondary-hex, #38bdf8)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                data-magnetic
              >
                {link.label}
              </motion.a>
            ))}
          </div>
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-text hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm p-1"
              whileTap={{ scale: 0.9 }}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls={mobileMenuId}
              data-magnetic
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
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
            className="md:hidden bg-primary shadow-lg"
            role="menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-light-text hover:text-secondary block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  role="menuitem"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero Component ---
const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const opacityFg = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  const handleScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-20 md:pt-0 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')", y: yBg, zIndex: 0 }} // Make sure /hero-bg.jpg exists in public folder
      />
      <motion.div
        className="bg-primary/70 backdrop-blur-md p-8 md:p-16 rounded-xl text-center max-w-4xl mx-auto shadow-2xl relative"
        style={{ y: yFg, opacity: opacityFg, zIndex: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 80,
        }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4, ease: "circOut" }}
        >
          Sarang Rayaji Akhade
        </motion.h1>
        <motion.div
          className="text-2xl md:text-3xl text-secondary mb-8 h-20 md:h-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6, ease: "circOut" }}
        >
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "Machine Learning Enthusiast",
              2000,
              "MERN Stack Specialist",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="inline-block"
          />
        </motion.div>
        <motion.p
          className="text-lg text-light-text mb-10 max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.8, ease: "circOut" }}
        >
          Passionate about building innovative solutions with MERN stack and
          leveraging Machine Learning for impactful applications.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.0, ease: "circOut" }}
        >
          <motion.button
            data-magnetic
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto bg-secondary text-primary font-semibold py-3 px-8 rounded-lg hover:bg-sky-300 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:ring-secondary"
            whileHover={{ ...buttonHoverEffect, backgroundColor: "#38bdf8" }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          <motion.button
            data-magnetic
            onClick={() => handleScrollTo("contact")}
            className="w-full sm:w-auto border-2 border-secondary text-secondary font-semibold py-3 px-8 rounded-lg hover:bg-secondary hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:ring-secondary"
            whileHover={{
              ...buttonHoverEffect,
              backgroundColor: "var(--color-secondary-hex, #38bdf8)",
              color: "var(--color-primary-hex, #0f172a)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
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
  const x = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  return (
    <section id="about" className="py-20 px-6 bg-slate-800 overflow-hidden">
      <div className="container mx-auto">
        <AnimatedSectionHeader icon={MdWork} title="About Me" />
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
          <motion.div
            ref={contentRef}
            style={{ x, opacity }}
            className="md:w-full text-center md:text-left bg-primary p-8 rounded-xl shadow-xl relative"
          >
            <p className="text-lg text-light-text leading-relaxed mb-4">
              Hi, I'm Sarang Akhade, a Full Stack Developer with a strong
              passion for Machine Learning and crafting complex, user-centric
              projects.
            </p>
            <p className="text-lg text-light-text leading-relaxed mb-4">
              I possess high problem-solving skills and proficiency in UX
              Design, enabling me to build applications that are not only
              functional but also intuitive and accessible to a wide audience.
            </p>
            <p className="text-lg text-light-text leading-relaxed mb-4">
              One of my key achievements includes developing a highly scalable
              system for diagnosing plant diseases using the MERN stack and
              advanced Machine Learning models. My in-depth knowledge of
              TensorFlow and other ML/DL frameworks is instrumental in creating
              effective and efficient models.
            </p>
            <p className="text-lg text-light-text leading-relaxed mb-8">
              I thrive in environments where I can continuously learn and
              contribute to impactful solutions.
            </p>
            
            {/* Resume Button */}
            <div className="flex justify-center md:justify-start">
              <a
                href="https://drive.google.com/file/d/1WdgysfcQuLH5vGTv9M-InixkmJgUtq7N/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 rounded-lg font-semibold hover:bg-slate-100 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform"
              >
                <MdDescription className="text-xl" />
                View My Resume
              </a>
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
    className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-pulse"
    aria-busy="true"
    aria-live="polite"
  >
    <div className="w-full h-60 bg-slate-700"></div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-8 w-3/4 bg-slate-700 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-slate-700 rounded mb-3"></div>
      <div className="h-4 w-full bg-slate-700 rounded mb-1"></div>
      <div className="h-4 w-full bg-slate-700 rounded mb-1"></div>
      <div className="h-4 w-3/4 bg-slate-700 rounded mb-4"></div>
      <div className="h-6 w-1/3 bg-slate-700 rounded mb-2 mt-4"></div>
      <div className="flex flex-wrap gap-2 mb-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-6 w-20 bg-slate-700 rounded-full"></div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-start mt-auto pt-4 border-t border-slate-700">
        <div className="h-10 w-32 bg-slate-700 rounded-lg"></div>
        <div className="h-10 w-32 bg-slate-700 rounded-lg"></div>
      </div>
    </div>
  </div>
);

// --- Projects Component (with Loading State) ---
const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="projects"
      className="py-20 px-6 bg-primary"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto">
        <AnimatedSectionHeader icon={FaDesktop} title="My Projects" />
        <h2 id="projects-heading" className="sr-only">
          My Projects
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12 max-w-3xl mx-auto">
          {isLoading ? (
            <>
              {[...Array(projectsData.length)].map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </>
          ) : (
            projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

// --- ProjectCard Component (refined tilt) ---
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { stiffness: 100, damping: 20, mass: 0.1 };
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springMouseY, [-150, 150], [-5, 5]);
  const rotateY = useTransform(springMouseX, [-200, 200], [5, -5]);
  const projectTitleId = `project-title-${project.title
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  return (
    <motion.div
      ref={cardRef}
      className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col group cursor-pointer relative focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:ring-offset-primary"
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={projectCardHoverEffect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      tabIndex={0}
      aria-labelledby={projectTitleId}
    >
      {project.imageUrl && (
        <div
          className="overflow-hidden rounded-t-xl"
          style={{ transform: "translateZ(20px)" }}
        >
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-60 object-cover"
            transition={{ duration: 0.2 }}
          />
        </div>
      )}
      <div
        className="p-6 flex flex-col flex-grow"
        style={{ transform: "translateZ(10px)" }}
      >
        <h3
          id={projectTitleId}
          className="text-2xl font-semibold text-secondary mb-2 group-hover:text-sky-300 transition-colors duration-300"
        >
          {project.title}
        </h3>
        <p className="text-sm text-dark-text mb-3 italic">{project.duration}</p>
        <p className="text-light-text text-sm leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>
        <div className="mb-4">
          <h4 className="text-md font-semibold text-light-text mb-2">
            Key Features & Development:
          </h4>
          <ul className="list-disc list-inside text-light-text text-sm space-y-1 mb-4">
            {project.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
        <div className="mb-5">
          <h4 className="text-md font-semibold text-light-text mb-2">
            Technologies Used:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <motion.span
                key={tech}
                className="bg-primary text-secondary text-xs font-semibold px-3 py-1 rounded-full shadow-md"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "var(--color-secondary-hex, #38bdf8)",
                  color: "var(--color-primary-hex, #1e293b)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-start mt-auto pt-4 border-t border-slate-700">
          {project.liveLink && project.liveLink !== "#" && (
            <motion.a
              data-magnetic
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-secondary text-primary font-medium py-2 px-4 rounded-lg hover:bg-sky-300 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:ring-secondary"
              whileHover={{
                ...buttonHoverEffect,
                y: -2,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View live demo of ${project.title}`}
            >
              <FaExternalLinkAlt className="w-5 h-5 mr-2" aria-hidden="true" />
              Live Demo
            </motion.a>
          )}
          {project.repoLink && project.repoLink !== "#" && (
            <motion.a
              data-magnetic
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-secondary text-secondary font-medium py-2 px-4 rounded-lg hover:bg-secondary hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:ring-secondary"
              whileHover={{
                ...buttonHoverEffect,
                y: -2,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View source code of ${project.title}`}
            >
              <FaCode className="w-5 h-5 mr-2" aria-hidden="true" /> View Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Skills Component ---
const SkillCategory = ({ title, skills, categoryIcon }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
    once: true,
  });
  const y = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="bg-slate-800 p-6 rounded-lg shadow-xl relative"
    >
      <div className="flex items-center mb-4">
        {categoryIcon && (
          <span
            className="mr-3 text-secondary flex-shrink-0"
            aria-hidden="true"
          >
            {categoryIcon}
          </span>
        )}
        <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <motion.span
            key={skill.name}
            className="flex items-center bg-primary text-light-text text-sm px-4 py-2 rounded-full shadow-md hover:bg-secondary hover:text-primary transition-colors cursor-default"
            whileHover={{
              scale: 1.1,
              backgroundColor: "var(--color-secondary-hex, #38bdf8)",
              color: "var(--color-primary-hex, #1e293b)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {skill.icon &&
              React.cloneElement(skill.icon, { "aria-hidden": "true" })}
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 px-6 bg-slate-800 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto">
        <AnimatedSectionHeader
          icon={RiSparklingLine}
          title="Skills & Expertise"
        />
        <h2 id="skills-heading" className="sr-only">
          Skills and Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <SkillCategory
            title="MERN Stack & Web Development"
            skills={skillsData.mernStack}
            categoryIcon={<RiCodeSSlashLine className="w-8 h-8" />}
          />
          <SkillCategory
            title="Machine Learning & Data Science"
            skills={skillsData.machineLearning}
            categoryIcon={<RiSparklingLine className="w-8 h-8" />}
          />
          <SkillCategory
            title="Tools & Platforms"
            skills={skillsData.toolsAndPlatforms}
            categoryIcon={<FaDesktop className="w-8 h-8" />}
          />
          <SkillCategory
            title="Core Competencies"
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
    <section
      id="education"
      className="py-20 px-6 bg-primary overflow-hidden"
      aria-labelledby="education-heading"
    >
      <div className="container mx-auto">
        <AnimatedSectionHeader icon={FaGraduationCap} title="Education" />
        <h2 id="education-heading" className="sr-only">
          Education
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {educationData.map((edu, index) => (
            <EducationItem key={index} item={edu} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact Component ---
const ContactInfoItem = ({ href, icon: Icon, title, text, isDiv = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
    once: true,
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const titleId = `contact-item-title-${title
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  const cardContent = (
    <>
      <Icon
        className="h-8 w-8 text-secondary flex-shrink-0"
        aria-hidden="true"
      />
      <div>
        <h3
          id={titleId}
          className="text-lg font-semibold text-light-text text-left"
        >
          {title}
        </h3>
        <p
          className={`${
            isDiv ? "text-dark-text" : "text-secondary hover:underline"
          } text-left break-all`}
        >
          {text}
        </p>
      </div>
    </>
  );

  const commonClasses =
    "bg-primary p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:shadow-secondary/40 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 focus-visible:ring-secondary";

  if (isDiv) {
    return (
      <motion.div
        ref={ref}
        style={{ scale, opacity }}
        className={commonClasses}
        tabIndex={0}
        aria-labelledby={titleId}
      >
        {cardContent}
      </motion.div>
    );
  }
  return (
    <motion.a
      data-magnetic
      ref={ref}
      style={{ scale, opacity }}
      href={href}
      className={commonClasses}
      aria-label={`${title}: ${text}`}
    >
      {cardContent}
    </motion.a>
  );
};

const Contact = () => {
  const socialIconsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: socialIconsRef,
    offset: ["start end", "center center"],
    once: true,
  });
  const ySocial = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const opacitySocial = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-slate-800 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto text-center">
        <AnimatedSectionHeader icon={FaEnvelope} title="Get In Touch" />
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
    <motion.footer
      className="bg-primary py-8 text-center border-t border-slate-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "anticipate" }}
    >
      <p className="text-dark-text text-sm">
        © {currentYear} Sarang Rayaji Akhade. All rights reserved.
      </p>
    </motion.footer>
  );
};

// --- Main Landing Page Component ---
const LandingPage = () => {
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
    <div className="font-sans bg-primary text-light-text overflow-x-hidden selection:bg-secondary selection:text-primary">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
