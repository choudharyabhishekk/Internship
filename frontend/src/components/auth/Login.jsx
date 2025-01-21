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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
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
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="max-w-md w-full space-y-6 bg-white p-10 rounded-xl shadow-sm"
        >
          <h1 className="text-3xl font-semibold text-center text-gray-900">
            Login
          </h1>
          <div className="mb-6">
            <Label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email
            </Label>
            <div className="relative mt-1">
              <Input
                id="email"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="example@gmail.com"
                className="block w-full py-2 pl-4 border rounded-lg bg-gray-100 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-6">
            <Label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
                className="block w-full py-2 pl-4 border rounded-lg bg-gray-100 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="h-4 w-4 text-sky-500 border-gray-300 focus:ring-sky-500"
              />
              <Label htmlFor="r1" className="text-md text-gray-800">
                Student
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="h-4 w-4 text-sky-500 border-gray-300 focus:ring-sky-500 "
              />
              <Label htmlFor="r2" className="text-md text-gray-800">
                Recruiter
              </Label>
            </div>
          </RadioGroup>
          {loading ? (
            <Button className="w-full py-2 text-center bg-secondary text-white rounded-lg hover:bg-primary-dark">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Login
            </Button>
          )}
          <p className="mt-4 text-center text-md text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
