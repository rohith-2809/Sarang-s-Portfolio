import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/solid";
// import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const portfolioUrl = "your-portfolio-link.com"; // Replace
  const githubUrl = "https://github.com/yourusername"; // Replace
  const linkedinUrl = "https://linkedin.com/in/yourusername"; // Replace

  return (
    <section id="contact" className="py-20 px-6 bg-slate-800">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12">
          Get In Touch
        </h2>
        <p className="text-lg text-light-text mb-10 max-w-xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-primary p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:scale-105 transition-transform">
            <MailIcon className="h-8 w-8 text-secondary" />
            <div>
              <h3 className="text-lg font-semibold text-light-text">Email</h3>
              <a
                href="mailto:akhadesarang1036@gmail.com"
                className="text-secondary hover:underline"
              >
                akhadesarang1036@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-primary p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:scale-105 transition-transform">
            <PhoneIcon className="h-8 w-8 text-secondary" />
            <div>
              <h3 className="text-lg font-semibold text-light-text">Phone</h3>
              <a
                href="tel:+918208796008"
                className="text-secondary hover:underline"
              >
                +91 82087 96008
              </a>
            </div>
          </div>

          <div className="bg-primary p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:scale-105 transition-transform">
            <LocationMarkerIcon className="h-8 w-8 text-secondary" />
            <div>
              <h3 className="text-lg font-semibold text-light-text">
                Location
              </h3>
              <p className="text-dark-text">Pune, Maharashtra, India</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-sky-300 transition-colors text-3xl"
          >
            {/* <FaLinkedin /> LinkedIn */} LinkedIn
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-sky-300 transition-colors text-3xl"
          >
            {/* <FaGithub /> GitHub */} GitHub
          </a>
          <a
            href={`http://${portfolioUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-sky-300 transition-colors text-3xl"
          >
            Portfolio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
