import { Users, Building, Award, Globe } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Students", value: "50,000+" },
  { icon: Building, label: "Partner Companies", value: "1,000+" },
  { icon: Award, label: "Successful Placements", value: "25,000+" },
  { icon: Globe, label: "Countries", value: "30+" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
