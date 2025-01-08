import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery, setFilters, resetFilters } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Job from "./Job";
import JobSearch from "@/components/JobSearch";

const filterAndSortJobs = (jobs, filters) => {
  if (!Array.isArray(jobs)) return [];

  let filteredJobs = [...jobs];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower)
    );
  }

  if (filters.location) {
    const locationLower = filters.location.toLowerCase();
    filteredJobs = filteredJobs.filter((job) =>
      job.location.toLowerCase().includes(locationLower)
    );
  }

  if (filters.jobType !== "All" && filters.jobType !== "") {
    filteredJobs = filteredJobs.filter(
      (job) => job.jobType === filters.jobType
    );
  }

  if (filters.salaryRange) {
    const [min, max] = filters.salaryRange.split("-").map(Number);
    filteredJobs = filteredJobs.filter((job) => {
      const hourlyRate =
        typeof job.salary === "number"
          ? job.salary
          : parseFloat(job.salary?.match(/\d+/)?.[0] || 0);

      if (!max) return hourlyRate >= min;
      return hourlyRate >= min && hourlyRate <= max;
    });
  }

  return filteredJobs.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return filters.sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });
};

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [jobsToShow, setJobsToShow] = useState(9);
  const [filters, setLocalFilters] = useState({
    search: "",
    location: "",
    jobType: "All",
    salaryRange: "",
    sortOrder: "latest",
  });

  useEffect(() => {
    const filtered = filterAndSortJobs(allJobs, filters);
    setFilteredJobs(filtered);
  }, [allJobs, filters]);

  useEffect(() => {
    setVisibleJobs(filteredJobs.slice(0, jobsToShow));
  }, [filteredJobs, jobsToShow]);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
      dispatch(resetFilters());
    };
  }, [dispatch]);

  const handleSearch = (searchQuery) => {
    setLocalFilters((prev) => ({ ...prev, search: searchQuery }));
    dispatch(setSearchedQuery(searchQuery));
  };

  const handleLocationChange = (location) => {
    setLocalFilters((prev) => ({ ...prev, location }));
    dispatch(setFilters({ location }));
  };

  const handleJobTypeChange = (jobType) => {
    setLocalFilters((prev) => ({ ...prev, jobType }));
    dispatch(setFilters({ jobType }));
  };

  const handleSalaryChange = (salaryRange) => {
    setLocalFilters((prev) => ({ ...prev, salaryRange }));
    dispatch(setFilters({ salaryRange }));
  };

  const handleSortChange = (sortOrder) => {
    setLocalFilters((prev) => ({ ...prev, sortOrder }));
    dispatch(setFilters({ sortOrder }));
  };

  const handleClearFilters = () => {
    setLocalFilters({
      search: "",
      location: "",
      jobType: "All",
      salaryRange: "",
      sortOrder: "latest",
    });
    dispatch(resetFilters());
    dispatch(setSearchedQuery(""));
  };

  const handleLoadMore = () => {
    setJobsToShow(jobsToShow + 10);
  };

  return (
    <div>
      <div className="max-w-7xl lg:max-w-6xl flex flex-col justify-center mx-auto items-center align-baseline my-10">
        <div className="w-full mb-6">
          <JobSearch
            onSearch={handleSearch}
            onLocationChange={handleLocationChange}
            onJobTypeChange={handleJobTypeChange}
            onSalaryChange={handleSalaryChange}
            filters={filters}
            onClearFilters={handleClearFilters}
          />

          <div className="flex mb-6 justify-between mx-3">
            <div className="flex items-center">
              <h1 className="font-bold text-xl">
                Search Results ({filteredJobs.length})
              </h1>
            </div>

            <div className="flex justify-end items-center gap-2">
              <span className="text-slate-500">Sort by:</span>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-2 border border-gray-200 rounded-lg w-22 text-slate-500"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>

          {visibleJobs.length < filteredJobs.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadMore}
                className="border border-blue-500 text-blue-500 font-semibold hover:bg-blue-700 hover:text-white py-2 px-4 rounded-lg"
              >
                View More
              </button>
            </div>
          )}

          {filteredJobs.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No jobs found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
