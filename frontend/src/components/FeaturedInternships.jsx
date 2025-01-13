import { useEffect } from "react";
import { Building2 } from "lucide-react";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function FeaturedInternships() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const featuredJobs = allJobs.slice(0, 5);

  const handleJobClick = (jobId, title) => {
    const friendlyURL = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    navigate(`/job/${friendlyURL}/${jobId}`);
  };

  if (!featuredJobs.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-zinc-800 mb-8">
          Featured Internships
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredJobs.map((job) => (
              <CarouselItem
                key={job?._id}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className="rounded-xl p-6 bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                  onClick={() => handleJobClick(job?._id, job?.title)}
                >
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-11 h-11">
                      <AvatarImage
                        src={job?.company?.logo}
                        alt={job?.company?.name}
                      />
                      <AvatarFallback>
                        <Building2 className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-zinc-900">
                        {job?.company?.name}
                      </h3>
                      <p className="text-sm text-zinc-500">{job?.location}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-bold text-lg text-zinc-900">
                      {job?.title}
                    </h4>
                    <p className="mt-2 text-sm text-zinc-600 line-clamp-2">
                      {job?.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {[
                        job?.jobType,
                        `$${job?.salary} Per Hour`,
                        `${job?.position} Positions`,
                      ].map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium rounded-full text-blue-600 bg-blue-50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
