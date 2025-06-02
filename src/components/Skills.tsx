import { Code, Server, Database, Wrench, Palette, Globe } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-8 h-8" />,
      color: "bg-blue-100 border-blue-200 text-blue-800",
      iconColor: "text-blue-600",
      skills: [
        { name: "React.js" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "JavaScript" },
      ],
    },
    {
      title: "Backend & APIs",
      icon: <Server className="w-8 h-8" />,
      color: "bg-green-100 border-green-200 text-green-800",
      iconColor: "text-green-600",
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "RESTful APIs" },
        { name: "WebSockets" },
      ],
    },
    {
      title: "Database & ORM",
      icon: <Database className="w-8 h-8" />,
      color: "bg-purple-100 border-purple-200 text-purple-800",
      iconColor: "text-purple-600",
      skills: [
        { name: "PostgreSQL" },
        { name: "Prisma" },
        { name: "MongoDB" },
        { name: "Mongoose" },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: <Wrench className="w-8 h-8" />,
      color: "bg-yellow-100 border-yellow-200 text-yellow-800",
      iconColor: "text-yellow-600",
      skills: [
        { name: "Git & GitHub" },
        { name: "Postman" },
        { name: "Vercel" },
        { name: "VSCode" },
      ],
    },
    {
      title: "UI/UX & Design",
      icon: <Palette className="w-8 h-8" />,
      color: "bg-pink-100 border-pink-200 text-pink-800",
      iconColor: "text-pink-600",
      skills: [
        { name: "Tailwind CSS" },
        { name: "Shadcn UI" },
        { name: "Bootstrap" },
      ],
    },
    {
      title: "State Management",
      icon: <Globe className="w-8 h-8" />,
      color: "bg-indigo-100 border-indigo-200 text-indigo-800",
      iconColor: "text-indigo-600",
      skills: [
        { name: "Zustand" },
        { name: "TanStack Query" },
        { name: "React Router" },
        { name: "TanStack Router" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Technical Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto rounded"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, organized by domain
            and experience level
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`${category.color} rounded-2xl p-6 border-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`${category.iconColor}`}>{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
