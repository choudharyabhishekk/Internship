import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Building2, MapPin, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

export default function FeaturedInternships() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  const featuredJobs = allJobs.slice(0, 3);

  const handleJobClick = (jobId, title) => {
    const friendlyURL = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^\w\-]/g, ""); // Generate friendly URL

    navigate(`/job/${friendlyURL}/${jobId}`); // Navigate to the new route
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-zinc-800 mb-8">
          Featured Internships
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredJobs.map((job) => (
            <div
              key={job?._id}
              className="rounded-xl p-4 m-3 bg-white cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow-lg  duration-300"
              onClick={() => handleJobClick(job?._id, job?.title)}
            >
              {/* Header Section */}
              <div className="header flex items-center  ">
                <div className="company-icon">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      className="w-10 h-10 rounded-full"
                      src={job?.company?.logo || "/default-icon.png"}
                    />
                  </Avatar>
                </div>
                <div className="flex flex-col mx-3">
                  <h1 className="font-bold text-md">{job?.company?.name}</h1>
                  <p className="text-gray-500 text-sm">{job?.location}</p>
                </div>
              </div>
              {/* Job Content */}
              <div
                className="job-content mt-3 cursor-pointer"
                onClick={() => handleJobClick(job?._id, job?.title)}
              >
                <h1 className="font-bold text-lg">{job?.title}</h1>
                <p className="text-sm my-2 text-zinc-500">
                  {job?.description?.split(" ").length > 20
                    ? `${job?.description.split(" ").slice(0, 18).join(" ")}...`
                    : job?.description}
                </p>
                <div className="tags flex gap-2 mt-3">
                  <span className="px-2 py-1 text-sm rounded  text-blue-600 bg-indigo-100">
                    {job?.jobType}
                  </span>
                  <span className="px-2 py-1 text-sm rounded text-blue-600 bg-indigo-100">
                    ${job?.salary} Per Hour
                  </span>
                  <span className="px-2 py-1 text-sm rounded text-blue-600 bg-indigo-100">
                    {job?.position} Positions
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
