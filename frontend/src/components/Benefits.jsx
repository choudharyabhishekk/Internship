import { Target, Users, Trophy, Lightbulb } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Find Your Perfect Match",
    description:
      "Browse through carefully curated internships that align with your career goals and interests.",
  },
  {
    icon: Users,
    title: "Connect with Mentors",
    description:
      "Learn from industry professionals who are passionate about helping you grow.",
  },
  {
    icon: Trophy,
    title: "Gain Real Experience",
    description:
      "Work on meaningful projects and build a strong foundation for your career.",
  },
];

export default function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-zinc-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
