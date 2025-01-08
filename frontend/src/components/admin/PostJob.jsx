import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      requirements: [],
      salary: "",
      location: "",
      jobType: "",
      experience: "",
      position: 0,
      companyId: "",
    },
  });

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setValue("companyId", selectedCompany._id);
  };

  const requirementsHandler = (e) => {
    const value = e.target.value;
    const requirementsArray = value
      .split(/[.\n]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => (item.endsWith(".") ? item : `${item}.`));
    setValue("requirements", requirementsArray);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Post New Job</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="mb-2 block">
                  Job Title
                </Label>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Job title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters",
                    },
                  })}
                  className="w-full"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">
                  Job Description
                </Label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 50,
                      message: "Description must be at least 50 characters",
                    },
                  })}
                  className="w-full h-32 px-4 py-2 border rounded-md resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="requirements" className="mb-2 block">
                  Requirements
                </Label>
                <textarea
                  id="requirements"
                  value={watch("requirements").join("\n")}
                  onChange={requirementsHandler}
                  className="w-full h-32 px-4 py-2 border rounded-md resize-none"
                  placeholder="Enter requirements (separate by periods or new lines)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Tip: Separate requirements using periods or new lines
                </p>
              </div>

              <div>
                <Label htmlFor="salary" className="mb-2 block">
                  Salary Range
                </Label>
                <Input
                  id="salary"
                  {...register("salary", {
                    required: "Salary range is required",
                    pattern: {
                      value: /^[\d\s-,$k]+$/i,
                      message:
                        "Please enter a valid salary range (e.g., $50k-$80k)",
                    },
                  })}
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salary.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="location" className="mb-2 block">
                  Location
                </Label>
                <Input
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="jobType" className="mb-2 block">
                  Job Type
                </Label>
                <Select onValueChange={(value) => setValue("jobType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Full-Time">Full Time</SelectItem>
                      <SelectItem value="Part-Time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jobType.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="experience" className="mb-2 block">
                  Experience (in years)
                </Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  {...register("experience", {
                    required: "Experience is required",
                    min: { value: 0, message: "Experience cannot be negative" },
                    validate: (value) =>
                      !isNaN(value) || "Please enter a valid number",
                  })}
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="position" className="mb-2 block">
                  Number of Positions
                </Label>
                <Input
                  id="position"
                  type="number"
                  min="1"
                  max="100"
                  value="1"
                  {...register("position", {
                    required: "Number of positions is required",
                    min: { value: 1, message: "Must be at least 1 position" },
                  })}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.position.message}
                  </p>
                )}
              </div>

              {companies.length > 0 && (
                <div>
                  <Label className="mb-2 block">Select Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.companyId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyId.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {companies.length === 0 && (
              <p className="text-red-600 text-sm font-medium text-center">
                Please register a company first before posting jobs
              </p>
            )}

            <Button
              type="submit"
              className="w-full rounded-lg"
              disabled={loading || companies.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Post New Job"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
