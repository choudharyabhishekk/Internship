import axios from "axios";
import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
const AdminDashboard = () => {
  const [employerData, setEmployerData] = useState([]);
  const fetchEmployers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/getAllEmployer"
      );
      setEmployerData(response.data.allEmployer);
      console.log(response.data.allEmployer, "><");
    } catch (error) {
      console.error("Error fetching employer data:", error);
    }
  };
  useEffect(() => {
    fetchEmployers();
  }, []);
  const handleApprove = async (employerId) => {
    console.log(employerId);

    try {
      const response = await fetch(
        `http://localhost:3000/admin/approveEmployer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employerId: employerId }),

          // body: `employerId:${employerId}`,
        }
      );

      if (response.ok) {
        toast.success("Employer approved successfully!");
        // Optionally, update the UI or refresh data
      } else {
        toast.error("Failed to approve employer.");
      }
    } catch (error) {
      console.error("Error approving employer:", error);
    }
  };

  // Function to handle API call for rejecting an employer
  const handleReject = async (employerId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/rejectEmployer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employerId }),
        }
      );

      if (response.ok) {
        toast.success("Employer rejected successfully!");
        fetchEmployers();
      } else {
        toast.error("Failed to reject employer.");
      }
    } catch (error) {
      console.error("Error rejecting employer:", error);
    }
  };

  return (
    <div className="p-4 overflow-x-auto m-10">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Company Name
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Company Email
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Address
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Website
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Industry
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Phone Number
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Company Size
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Created At
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">
              Status
            </th>
            <th className="px-4 py-2 text-center text-gray-700 font-semibold border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employerData.map((employer) => (
            <tr
              key={employer._id}
              className="even:bg-gray-50 hover:bg-gray-100"
            >
              <td className="px-4 py-2 border-b text-gray-800">
                {employer.companyName}
              </td>
              <td className="px-4 py-2 border-b text-gray-800">
                {employer.email}
              </td>
              <td className="px-4 py-2 border-b text-gray-800">
                {employer.address}
              </td>
              <td className="px-4 py-2 border-b text-blue-600 hover:underline">
                <a
                  href={employer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {employer.website}
                </a>
              </td>
              <td className="px-4 py-2 border-b text-gray-800">
                {employer.industry}
              </td>
              <td className="px-4 py-2 border-b text-gray-800">
                {employer.phoneNumber}
              </td>
              <td className="px-4 py-2 border-b text-gray-800">
                {employer.companySize}
              </td>
              <td className="px-4 py-2 border-b text-gray-800">
                {employer.createdAt}
              </td>
              <td className="px-4 py-2 border-b text-gray-800">
                {employer.Status == "Approve" ? "Approved" : "Rejected"}
              </td>
              <td className="px-4 py-2  text-center flex ">
                {employer.Status == "Approve" ? (
                  <></>
                ) : (
                  <button
                    onClick={() => handleApprove(employer._id)}
                    className="px-1 py-1 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleReject(employer._id)}
                  className="px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminDashboard;
