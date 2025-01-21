import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null, // This is still included if you need it for other purposes
  });

  const [errors, setErrors] = useState({});

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0] || null;
    setInput({ ...input, file });
    setErrors({ ...errors, file: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!input.fullname.trim()) {
      newErrors.fullname = "Full name is required.";
    } else if (input.fullname.length < 3) {
      newErrors.fullname = "Full name must be at least 3 characters long.";
    }

    if (!input.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!input.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(input.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!input.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!input.role) {
      newErrors.role = "Please select a role.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("file", input.file); // Optional, remove if you don't need this anymore

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm">
          <div>
            <h1 className="text-3xl font-semibold text-center text-gray-900">
              Sign up
            </h1>
          </div>
          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div>
                <Label className="text-gray-700 text-md">Full name</Label>
                <Input
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="Jon Snow"
                  className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  ${errors.fullname ? "border-red-500" : ""}`}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-700 text-md">Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="your@email.com"
                  className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-700 text-md">Phone Number</Label>
                <Input
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="8080808080"
                  className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  ${errors.phoneNumber ? "border-red-500" : ""}`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-gray-700 text-md">Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••"
                  className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  ${errors.password ? "border-red-500" : ""}`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-700 text-md block mb-2">Role</Label>
                <RadioGroup className="flex gap-6">
                  <div className="flex items-center">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      id="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="h-4 w-4 text-sky-500 border-gray-300 focus:ring-sky-500"
                    />
                    <Label
                      htmlFor="student"
                      className="ml-2 text-gray-700 text-md"
                    >
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      id="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="h-4 w-4 text-sky-500 border-gray-300 focus:ring-sky-500"
                    />
                    <Label
                      htmlFor="recruiter"
                      className="ml-2 text-gray-700 text-md"
                    >
                      Recruiter
                    </Label>
                  </div>
                </RadioGroup>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
            </div>

            {loading ? (
              <Button
                disabled
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white "
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white"
              >
                Sign up
              </Button>
            )}

            <div className="mt-4 text-center">
              <div className="text-md text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className=" text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
