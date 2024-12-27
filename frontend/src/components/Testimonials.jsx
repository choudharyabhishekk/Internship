import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Former Marketing Intern",
    company: "Tech Giants Inc",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop",
    quote:
      "My internship through InternHub kickstarted my career in marketing. The mentorship and hands-on experience were invaluable.",
  },
  {
    name: "James Rodriguez",
    role: "Software Engineer",
    company: "StartUp Co",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop",
    quote:
      "Found my dream internship that turned into a full-time role. The platform made it easy to connect with the right companies.",
  },
  {
    name: "Emily Parker",
    role: "UX Designer",
    company: "Design Studio",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop",
    quote:
      "The quality of opportunities on InternHub is unmatched. I gained real-world experience that shaped my design career.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-zinc-800 mb-8">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 relative cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:shadow-lg  duration-300"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-blue-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
