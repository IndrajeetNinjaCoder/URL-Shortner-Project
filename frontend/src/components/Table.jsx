import React, { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export const Table = () => {
  const [url, setUrl] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/url/all");
        setUrl(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(deviceData);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Pagination logic
  const totalPages = Math.ceil(url.length / itemsPerPage);
  const paginatedData = url.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-10">
      <h1 className="text-lg text-bold">URL Statistics</h1>
      {/* URL Table */}
      <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-200 p-4 bg-white">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              <th className="px-5 py-3">Original URL</th>
              <th className="px-5 py-3">Short URL</th>
              <th className="px-5 py-3">Total Clicks</th>
              <th className="px-5 py-3">Created Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedData.map((item, index) => {
              const shortUrl = `http://localhost:8000/${item.shortID}`;
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <td className="px-5 py-3 max-w-xs truncate text-left">
                    {item.redirectURL}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-between items-center">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 transition-colors truncate"
                      >
                        {shortUrl}
                      </a>
                      <button
                        onClick={() => handleCopy(shortUrl)}
                        className="ml-2 text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3">{item.clicks || 10}</td>
                  <td className="px-5 py-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    {new Date(item.expirationDate).getTime() > Date.now() ? (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Expired
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>      
    </div>
  );
};
