const companies = [
  { name: "Notion" },
  { name: "Netflix" },
  { name: "Microsoft" },
  { name: "Adobe" },
  { name: "Google" },
];

export default function FeaturedCompanies() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-zinc-800 mb-12">
          Trusted by Industry Leaders
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 items-center justify-center h-full mb-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-12 w-12 rounded-lg"
            >
              <img
                title={company.name}
                src={`https://logo.clearbit.com/${company.name
                  .toLowerCase()
                  .replace(/\s+/g, "")}.com`}
                alt={company.name}
                className="h-full w-full rounded object-contain cursor-pointer hover:scale-110 transition-all duration-300"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
