const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm a passionate full-stack engineer who believes in building
              software that makes a difference. With over 1.5 years of
              professional experience, I've had the privilege of working on
              diverse projects ranging from booking platforms to digital card
              systems.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              My journey into framework development began with a vision to
              create something simple yet powerful. This led to the birth of{" "}
              <span className="text-blue-600 font-semibold">
                Reiatsu Framework
              </span>{" "}
              - a production-ready TypeScript web framework that has gained
              traction in the developer community.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not coding, you can find me watching movies or exploring
              the world around me with my gf. I believe that diverse interests
              fuel creativity in problem-solving.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 backdrop-blur-sm border border-blue-200">
            <h3 className="text-xl font-semibold mb-6 text-blue-700">
              Quick Facts
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-gray-700">
                  1.5+ years professional experience
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="text-gray-700">
                  Framework author & maintainer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-gray-700">
                  Full-stack MERN specialist
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-gray-700">Open source contributor</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span className="text-gray-700">Team leader & mentor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
