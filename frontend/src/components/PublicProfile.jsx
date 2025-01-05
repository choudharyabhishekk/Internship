import React, { useEffect, useState } from "react";
import { ChevronRight, Mail, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import ProfilePhoto from "../assets/image.png";
import { useSearchParams } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";

const PublicProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${USER_API_END_POINT}/fetchuser?id=${id}`
        );
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setError(data.message || "User not found.");
        }
      } catch (error) {
        setError("Error fetching user data. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    if (id) {
      fetchUser();
    } else {
      setError("Invalid ID."); // Set error if ID is missing
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen text-center font-medium my-12">
        <span className="text-xl bg-red-500 rounded-lg text-white p-3">
          Error: User Not Found
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto py-14 sm:px-6 lg:px-8">
        {/* Header + Profile Details Combined Section */}
        <div className="bg-white border border-gray-100 rounded-2xl mx-auto p-6 mb-6">
          <div className="flex items-center justify-center">
            {/* Header Section */}
            <div className="flex flex-col justify-center items-center my-2 gap-2 space-x-4">
              <Avatar className="cursor-pointer w-32 h-32 rounded-full overflow-hidden">
                <AvatarImage
                  src={user?.profile?.profilePhoto || ProfilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </Avatar>

              <div>
                <h2 className="text-2xl font-bold text-center text-gray-800">
                  {user?.fullname || "User Name"}
                </h2>
                <p className="text-md text-gray-500 text-center">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
          </div>
          {/* Profile Details Section */}
          <div className="mt-2 flex flex-col max-w-lg mx-auto">
            <div className="my-2 flex items-center justify-between gap-3 flex-row">
              <div>
                <div className="flex items-center align-middle gap-3 my-3">
                  <Mail className="text-gray-400 w-6" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center align-middle gap-3 my-3">
                  <Phone className="text-gray-400 w-6" />
                  <span>{user?.phoneNumber || "NA"}</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h1 className="font-bold">Skills</h1>
              <div className="flex mt-2 items-center gap-1">
                {user?.profile?.skills?.length ? (
                  user.profile.skills.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))
                ) : (
                  <span>No skills added</span>
                )}
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
              <Label className="text-md font-bold">Resume</Label>
              {user?.profile?.resume ? (
                <a
                  target="blank"
                  title="Download Resume"
                  href={user?.profile?.resume}
                  className="text-blue-500 border border-gray-200 rounded-lg p-4 w-full hover:underline cursor-pointer"
                >
                  {user?.profile?.resumeOriginalName || "Resume"}
                </a>
              ) : (
                <button className="text-left border p-4 rounded-md text-sm">
                  Resume not uploaded
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
