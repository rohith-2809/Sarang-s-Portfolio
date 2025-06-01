const skillsData = {
  mernStack: [
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "RESTful APIs",
  ],
  machineLearning: [
    "Python",
    "TensorFlow",
    "Keras",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "CNNs",
    "Data Preprocessing",
    "Model Evaluation",
  ],
  toolsAndPlatforms: [
    "Git & GitHub",
    "VS Code",
    "Render",
    "Postman",
    "Jupyter Notebooks",
  ],
  softSkills: [
    "Analytical Thinking",
    "Problem Solving",
    "Collaboration",
    "Adaptability",
    "Empathy",
    "UX/UI Design Principles",
  ],
};
const SkillCategory = ({ title, skills }) => (
  <div className="bg-slate-800 p-6 rounded-lg shadow-xl hover:shadow-secondary/30 transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-secondary mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <span
          key={skill}
          className="bg-primary text-light-text text-sm px-4 py-2 rounded-full shadow-md hover:bg-secondary hover:text-primary transition-colors cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);
const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-slate-800">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <SkillCategory
            title="MERN Stack & Web Development"
            skills={skillsData.mernStack}
          />
          <SkillCategory
            title="Machine Learning & Data Science"
            skills={skillsData.machineLearning}
          />
          <SkillCategory
            title="Tools & Platforms"
            skills={skillsData.toolsAndPlatforms}
          />
          <SkillCategory
            title="Core Competencies"
            skills={skillsData.softSkills}
          />
        </div>
      </div>
    </section>
  );
};
export default Skills;
