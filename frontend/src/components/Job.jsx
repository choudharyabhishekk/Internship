import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const handleJobClick = (jobId, title) => {
    const friendlyURL = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^\w\-]/g, ""); // Generate friendly URL

    navigate(`/job/${friendlyURL}/${jobId}`); // Navigate to the new route
  };

  return (
    <div className="rounded-xl p-4 m-3 bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:shadow-lg  duration-300 shadow-sm">
      {/* Header Section */}
      <div
        className="header flex items-center  cursor-pointer"
        onClick={() => handleJobClick(job?._id, job?.title, navigate)}
      >
        <div className="company-icon">
          <Avatar className="w-10 h-10">
            <AvatarImage src={job?.company?.logo || "/default-icon.png"} />
          </Avatar>
        </div>
        <div className="flex flex-col mx-3">
          <h1 className="font-bold text-md">{job?.company?.name}</h1>
          <p className="text-gray-500 text-sm">{job?.location}</p>
        </div>
      </div>

      {/* Job Content */}
      <div
        className="job-content mt-3  cursor-pointer"
        onClick={() => handleJobClick(job?._id, job?.title, navigate)}
      >
        <h1 className="font-bold text-lg">{job?.title}</h1>
        <p className="text-sm my-2 text-zinc-500">
          {job?.description?.split(" ").length > 20
            ? `${job?.description.split(" ").slice(0, 12).join(" ")}...`
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

      {/* Footer Buttons */}
      <div className="btns mt-5 flex gap-2 items-center">
        <button
          onClick={() => handleJobClick(job?._id, job?.title)}
          // onClick={isApplied ? null : applyJobHandler}
          className="px-[10px] py-[8px] bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 hover:text-white"
        >
          View Details
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-gray-100 text-gray-700  text-sm rounded-lg hover:bg-gray-200 transition-colors "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Job;
