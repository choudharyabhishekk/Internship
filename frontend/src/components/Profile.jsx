import React, { useState } from "react";
import { ChevronRight, Mail, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import ProfilePhoto from "../assets/image.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const handlePublicProfile = () => {
    const username = user.email.split("@")[0];
    const id = user._id;
    navigate(`/profile/${username}?id=${id}`);
  };
  return (
    <div>
      <div className="max-w-2xl mx-auto py-14 sm:px-6 lg:px-8">
        {!user?.profile?.resume && (
          <div
            className="bg-red-100 border border-red-400 text-center text-red-700 px-4 py-3 rounded-lg relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">Please update your profile.</span>
          </div>
        )}

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

              {/* <FaUserCircle className="h-16 w-16 text-gray-500" /> */}
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
              <div>
                <button
                  title="Edit Profile"
                  onClick={() => setOpen(true)}
                  className="text-right border border-zinc-100 px-4 py-4  rounded-md text-sm hover:bg-zinc-50"
                >
                  <ChevronRight />
                </button>
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
                <button
                  onClick={() => setOpen(true)}
                  className="text-left border p-4 rounded-md text-sm"
                >
                  Resume not uploaded
                </button>
              )}
            </div>
            <div
              className=" border border-gray-200 rounded-lg p-4 w-full hover:underline cursor-pointer"
              onClick={handlePublicProfile}
            >
              View Public Profile
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="w-full mx-auto border border-gray-100 bg-white rounded-2xl mt-6">
          <h1 className="font-bold text-lg my-5 px-6">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
