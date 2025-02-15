import { useState } from "react";

const UserActivityTable = ({users}) => {
    // Dummy user activity data
    
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
  
    // Calculate the total number of pages
    const totalPages = Math.ceil(users.length / itemsPerPage);
  
    // Get the current page's users
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  
    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    return (
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4">User vs Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 font-medium text-gray-600">User</th>
                <th className="text-left p-2 font-medium text-gray-600">Activity</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-2 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.status} | Registered: {user.registered}
                      </p>
                    </div>
                  </td>
                  <td className="p-2 text-gray-700 font-semibold">
                    Last login <span className="text-gray-800">{user.activity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between p-4">
            <button
              className="bg-slate-500 text-white px-2 py-1 rounded-lg"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-lg"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserActivityTable;
  