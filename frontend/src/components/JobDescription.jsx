import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Helps real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const formatDate = (dateString) => {
    const todaysDate = new Date();
    const postingDate = new Date(dateString);
    const dateDiff = Math.abs(todaysDate - postingDate);

    const days = Math.floor(dateDiff / (24 * 60 * 60 * 1000)); // Difference in days
    const hours = Math.floor(
      (dateDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    ); // Remaining hours
    const minutes = Math.floor((dateDiff % (60 * 60 * 1000)) / (60 * 1000)); // Remaining minutes

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  if (!singleJob) return <div>Loading...</div>;
  console.log(singleJob);

  return (
    <>
      <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-5">{singleJob?.title}</h1>
        <div className="flex gap-4 mb-4">
          <div className="company-icon">
            <Avatar>
              <AvatarImage
                src={singleJob?.company?.logo || "/default-icon.png"}
                className=" w-12 h-12 rounded-full"
              />
            </Avatar>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">{singleJob?.companyName}</h2>
            <div className="flex flex-col ">
              <h1 className="font-bold text-xl">{singleJob?.company?.name}</h1>
              <p className="text-slate-500 text-sm">{singleJob?.location}</p>
            </div>
          </div>
        </div>
        <p className="text-gray-500">
          Posted: {formatDate(singleJob?.createdAt)}
        </p>
        <div class="details mt-4 flex flex-wrap gap-3">
          <div class="p-2 text-sm rounded bg-gray-100">
            <strong>Type:</strong> Full-Time
          </div>
          <div class="p-2 text-sm rounded bg-gray-100">
            <strong>Experience:</strong> 1 years
          </div>
          <div class="p-2 text-sm rounded bg-gray-100">
            <strong>Pay:</strong> $22 Per Hour
          </div>
          <div class="p-2 text-sm rounded bg-gray-100">
            <strong>Applicants:</strong> 1
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Job Description:</h2>
          <p className="mt-2">{singleJob?.description}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Job Requirements:</h2>
          <ul className="mt-2 list-disc list-inside">
            {singleJob?.requirements?.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        {/* <div className="details mt-4 flex flex-wrap gap-3">
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Employment Type:</strong> {singleJob?.jobType}
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Experience:</strong>{" "}
            {singleJob?.experienceLevel == 0
              ? "None"
              : singleJob?.experienceLevel + " years"}
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Pay:</strong> ${singleJob?.salary} Per Hour
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Applicants:</strong> {singleJob?.applications?.length}
          </div>
        </div> */}
        <div className="btns mt-6 flex gap-3">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-primary hover:bg-blue-700"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
          <Button className="px-4 py-2 border text-black rounded-md bg-gray-100 hover:bg-gray-200 transition">
            Save for Later
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
