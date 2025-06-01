import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const handleScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <div className="bg-primary/70 backdrop-blur-sm p-10 md:p-20 rounded-xl text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Sarang Rayaji Akhade
        </h1>
        <div className="text-2xl md:text-3xl text-secondary mb-8 h-20 md:h-16">
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
            className="inline-block" // Ensures proper layout for TypeAnimation
          />
        </div>
        <p className="text-lg text-light-text mb-10 max-w-2xl mx-auto">
          Passionate about building innovative solutions with MERN stack and
          leveraging Machine Learning for impactful applications.
        </p>
        <div>
          <button
            onClick={() => handleScrollTo("projects")}
            className="bg-secondary text-primary font-semibold py-3 px-8 rounded-lg hover:bg-sky-300 transition-all duration-300 transform hover:scale-105 mr-4 mb-4 md:mb-0"
          >
            View My Work
          </button>
          <button
            onClick={() => handleScrollTo("contact")}
            className="border-2 border-secondary text-secondary font-semibold py-3 px-8 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
