// `src/components/Education.jsx`

const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "JSPM's Jayawant Institute of Management Studies, Pune",
    duration: "Sept 2023 – May 2025 (Expected)",
    cgpa: "CGPA: 7.04 (Current)",
  },
  {
    degree: "Bachelor of Science in Computer Science (B.Sc. CS)",
    institution: "Dr. D. Y. Patil Arts, Commerce & Science College, Pune",
    duration: "Oct 2020 – June 2023",
    cgpa: "CGPA: 8.34",
  },
];

const EducationItem = ({ item }) => (
  <div className="bg-primary p-6 rounded-lg shadow-xl hover:shadow-secondary/30 transition-shadow duration-300 relative pl-10">
    {/* <FaGraduationCap className="text-secondary text-3xl absolute left-4 top-7 transform -translate-y-1/2" /> */}
    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary rounded-l-lg"></div>
    <h3 className="text-xl font-semibold text-secondary mb-1">{item.degree}</h3>
    <p className="text-light-text font-medium">{item.institution}</p>
    <p className="text-sm text-dark-text mt-1">{item.duration}</p>
    <p className="text-sm text-dark-text">{item.cgpa}</p>
  </div>
);

const Education = () => {
  return (
    <section id="education" className="py-20 px-6 bg-primary">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
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

export default Education;
