// import profilePic from '../assets/sarang-profile.jpg'; // Create an assets folder in src

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-slate-800">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/*
          <div className="md:w-1/3 flex justify-center">
            <img
              src={profilePic} // Replace with your actual photo path, e.g. '/sarang-profile.jpg' if in public
              alt="Sarang Akhade"
              className="rounded-full w-60 h-60 md:w-72 md:h-72 object-cover shadow-xl border-4 border-secondary"
            />
          </div>
          */}
          <div className="md:w-2/3 text-center md:text-left">
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
              system for diagnosing plant diseases. My in-depth knowledge of
              TensorFlow and other Machine Learning/Deep Learning frameworks is
              instrumental in creating effective and efficient models.
            </p>
            <p className="text-lg text-light-text leading-relaxed">
              I thrive in environments where I can continuously learn and
              contribute to impactful solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
