import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "./ui/card";
import {
  Building,
  MapPin,
  ExternalLink,
  Calendar,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { toast } from "sonner";
import { setSingleJob, setSearchedQuery } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";

const JobDescription = () => {
  const { singleJob, allJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobId = params.id;

  // Memoized functions
  const formatDate = useCallback((dateString) => {
    const todaysDate = new Date();
    const postingDate = new Date(dateString);
    const dateDiff = Math.abs(todaysDate - postingDate);
    const days = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (dateDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor((dateDiff % (60 * 60 * 1000)) / (60 * 1000));

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }, []);

  const findSimilarJobs = useCallback(() => {
    if (!singleJob || !allJobs) return [];

    return allJobs
      .filter((job) => {
        if (job._id === singleJob._id) return false;

        const currentTitleWords = new Set(
          singleJob.title
            .toLowerCase()
            .split(" ")
            .filter((word) => word.length > 3)
        );
        const otherTitleWords = job.title.toLowerCase().split(" ");

        const hasCommonWords = otherTitleWords.some((word) =>
          currentTitleWords.has(word)
        );
        const sameCompany = job.company?._id === singleJob.company?._id;
        const sameLocation =
          job.location?.toLowerCase() === singleJob.location?.toLowerCase();

        return hasCommonWords || sameCompany || sameLocation;
      })
      .slice(0, 3);
  }, [singleJob, allJobs]);

  const handleJobClick = useCallback(
    (jobId, title) => {
      const friendlyURL = title.toLowerCase().replace(/[^\w-]/g, "-");
      navigate(`/job/${friendlyURL}/${jobId}`);
    },
    [navigate]
  );

  // API calls
  const applyJobHandler = useCallback(async () => {
    if (isApplied) return;

    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...singleJob.applications, { applicant: user?._id }],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error applying to job");
    }
  }, [jobId, isApplied, singleJob, user?._id, dispatch]);

  // Effects
  useEffect(() => {
    const controller = new AbortController();

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
          signal: controller.signal,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          toast.error("Error fetching job details");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleJob();
    return () => controller.abort();
  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    if (singleJob && allJobs) {
      setSimilarJobs(findSimilarJobs());
    }
  }, [singleJob, allJobs, findSimilarJobs]);

  useEffect(() => {
    return () => dispatch(setSearchedQuery(""));
  }, [dispatch]);

  // Memoized components
  const SimilarJobCard = useMemo(
    () =>
      ({ job }) =>
        (
          <div
            className="cursor-pointer"
            onClick={() => handleJobClick(job?._id, job?.title)}
          >
            <div className="group relative mt-4 bg-white p-4 cursor-pointer rounded-xl border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              {/* Component content remains the same */}
            </div>
          </div>
        ),
    [handleJobClick]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Job not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto gap-6 p-4">
      {/* Main Job Details Section */}
      <div className="max-w-4xl p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold mb-5">{singleJob.title}</h1>

        {/* Company Header */}
        <div className="flex gap-4 mb-4">
          <Avatar>
            <AvatarImage
              src={singleJob.company?.logo}
              className="w-12 h-12 rounded-full"
              alt={singleJob.company?.name}
            />
          </Avatar>
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">{singleJob.company?.name}</h2>
            <p className="text-slate-500 text-sm">{singleJob.location}</p>
          </div>
        </div>

        {/* Post Date */}
        <p className="text-gray-500 mb-4">
          Posted: {formatDate(singleJob.createdAt)}
        </p>

        {/* Job Details */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Type:</strong> {singleJob.jobType || "Full-Time"}
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Experience:</strong>{" "}
            {singleJob?.experienceLevel == 0
              ? "Not Required"
              : singleJob?.experienceLevel + " years" || "Not specified"}
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Salary:</strong> {singleJob?.salary + " per hour"}
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Applicants:</strong> {singleJob.applications?.length || 0}
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Job Description:</h2>
          <p className="whitespace-pre-line">{singleJob.description}</p>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Job Requirements:</h2>
          <ul className="list-disc list-inside space-y-1">
            {singleJob.requirements?.map((requirement, index) => (
              <li key={index} className="text-gray-700">
                {requirement}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
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
          <Button
            variant="outline"
            className="px-4 py-2 border text-black rounded-md bg-gray-100 hover:text-black hover:bg-gray-200 transition"
          >
            Save for Later
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:max-w-md sm:max-w-full space-y-4 ">
        {/* Company Information */}
        <Card className="p-6 border-none">
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1 items-center text-sm">
                Company: {singleJob.company?.name}
                <BadgeCheck
                  className="h-5 w-5 fill-blue-500 text-white"
                  title="Company Verified"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Location: {singleJob.company?.location}
              </span>
            </div>
            {singleJob.company?.website && (
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Website:{" "}
                  <a
                    href={
                      singleJob.company.website.startsWith("http")
                        ? singleJob.company.website
                        : `https://${singleJob.company.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {singleJob.company.website}
                  </a>
                </span>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              {singleJob.company?.description}
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-white border-none shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Similar Jobs
          </h2>
          <div className="space-y-4">
            {similarJobs.map((job) => (
              <div
                key={job._id}
                className="cursor-pointer "
                onClick={() => handleJobClick(job?._id, job?.title)}
              >
                <div className="group relative mt-4 bg-white p-4 cursor-pointer rounded-xl border border-gray-100 hover:border-blue-100 shadow-md hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  {/* Top section with logo and company name */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 rounded-lg shadow-sm group-hover:shadow">
                        <AvatarImage
                          src={job.company?.logo}
                          alt={job.company?.name}
                          className="h-12 w-12 rounded-lg object-contain bg-gray-50 p-2"
                        />
                      </Avatar>
                    </div>

                    <div className="flex-1">
                      {/* Job title with hover effect */}
                      <h3 className="font-medium text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>

                      {/* Company name and location */}
                      <div className="flex flex-row items-center  mt-1 ">
                        <div className="flex items-center text-sm text-gray-600">
                          {/* <Building className="h-3.5 w-3.5 mr-1" /> */}
                          {job.company?.name}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="text-gray-300 px-2">|</span>
                          {/* <MapPin className="h-3.5 w-3.5 mr-1" /> */}
                          {job.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job details section */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.experience && (
                      <span className="px-2.5 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-full">
                        {job.experience} exp
                      </span>
                    )}
                  </div>

                  {/* Posted date and applicants count */}
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {formatDate(job.createdAt)}
                    </span>
                    <span>{job.applications?.length || 0} applicants</span>
                  </div>

                  {/* Arrow indicator for hover */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>
            ))}
            {similarJobs.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <SearchX className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No similar jobs found</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(JobDescription);
