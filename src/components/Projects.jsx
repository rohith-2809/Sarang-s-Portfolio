const projectsData = [
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
    imageUrl: "/plant-disease-app.png", // Place in public folder
    liveLink: "#", // Replace with actual link
    repoLink: "#", // Replace with actual link
    duration: "June 20XX – September 20XX",
  },
];

const ProjectCard = ({ project }) => (
  <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
    <img
      src={
        project.imageUrl ||
        "https://via.placeholder.com/600x400.png?text=Project+Screenshot"
      }
      alt={project.title}
      className="w-full h-56 object-cover"
    />
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-secondary mb-3">
        {project.title}
      </h3>
      <p className="text-sm text-dark-text mb-1 italic">{project.duration}</p>
      <p className="text-light-text mb-4 text-sm leading-relaxed">
        {project.description}
      </p>

      <h4 className="text-md font-semibold text-light-text mb-2">
        Key Features & Development:
      </h4>
      <ul className="list-disc list-inside text-light-text text-sm space-y-1 mb-4">
        {project.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>

      <div className="mb-4">
        <h4 className="text-md font-semibold text-light-text mb-2">
          Technologies Used:
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-primary text-secondary text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-start space-x-4 mt-6">
        {project.liveLink && project.liveLink !== "#" && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-primary font-medium py-2 px-4 rounded-lg hover:bg-sky-300 transition-colors"
          >
            Live Demo
          </a>
        )}
        {project.repoLink && project.repoLink !== "#" && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-secondary text-secondary font-medium py-2 px-4 rounded-lg hover:bg-secondary hover:text-primary transition-colors"
          >
            View Code
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-primary">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          My Projects
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-10">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
