import React, { useState, useEffect, useCallback } from "react";
import { Search, MapPin, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery, resetFilters, setFilters } from "@/redux/jobSlice";

const JobSearch = ({
  onSearch,
  onLocationChange,
  onJobTypeChange,
  onSalaryChange,
  filters, // Add this prop to receive current filters
}) => {
  const dispatch = useDispatch();

  // Initialize local state from props
  const [searchInput, setSearchInput] = useState(filters?.search || "");
  const [location, setLocation] = useState(filters?.location || "");
  const [jobType, setJobType] = useState(filters?.jobType || "");
  const [salaryRange, setSalaryRange] = useState(filters?.salaryRange || "");

  // Debounced search handler
  const handleSearchChange = useCallback(
    (value) => {
      setSearchInput(value);
      // Update parent component
      onSearch?.(value);
      // Update Redux store
      dispatch(setSearchedQuery(value));
    },
    [dispatch, onSearch]
  );

  const handleClearFilters = () => {
    setSearchInput("");
    setLocation("");
    setJobType("");
    setSalaryRange("");
    dispatch(resetFilters());

    // Notify parent components
    onSearch?.("");
    onLocationChange?.("");
    onJobTypeChange?.("All");
    onSalaryChange?.("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-6">
      <div className="flex flex-wrap items-center gap-3 mx-3">
        {/* Keywords Search */}
        <div className="relative flex-1">
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Product Designer"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1 outline-none border-none bg-transparent"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div className="relative w-60">
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => {
                const value = e.target.value;
                setLocation(value);
                onLocationChange?.(value);
              }}
              className="flex-1 outline-none border-none bg-transparent"
            />
          </div>
        </div>

        {/* Job Type Filter */}
        <div className="relative w-40">
          <select
            value={jobType}
            onChange={(e) => {
              const value = e.target.value;
              setJobType(value);
              onJobTypeChange?.(value);
            }}
            className="w-full p-2 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer"
          >
            <option value="">Job Type</option>
            <option value="Full-Time">Full Time</option>
            <option value="Part-Time">Part Time</option>
          </select>
        </div>

        {/* Salary Range Filter */}
        <div className="relative w-40">
          <select
            value={salaryRange}
            onChange={(e) => {
              const value = e.target.value;
              setSalaryRange(value);
              onSalaryChange?.(value);
            }}
            className="w-full p-2 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer"
          >
            <option value="">Salary Range</option>
            <option value="0-20">Up to $20/hr</option>
            <option value="20-40">$20 - $40/hr</option>
            <option value="40-60">$40 - $60/hr</option>
            <option value="60-999">$60+/hr</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          type="button"
          onClick={handleClearFilters}
          className="px-6 py-2 bg-gray-100  text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default JobSearch;
