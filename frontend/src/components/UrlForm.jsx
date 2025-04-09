import React, { useState } from "react";
import axios from "axios";

export const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      longUrl,
      ...(customAlias && { customAlias }),
      ...(expirationDate && { expirationDate }),
    };

    try {
      const response = await axios.post("http://localhost:8000/api/shorten", data);
      alert(`Short URL created: ${response.data.shortUrl}`);
      setLongUrl("");
      setCustomAlias("");
      setExpirationDate("");
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten the URL.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Shorten Your URL</h2>

        {/* Long URL */}
        <div className="flex flex-col align-item-left">
          <label className="text-sm font-medium text-gray-700 text-left mb-3">Long URL</label>
          <input
            type="url"
            required
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Custom Alias */}
        <div className="flex flex-col align-item-left">
          <label className="text-sm font-medium text-gray-700 text-left mb-3">
            Custom Alias <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="my-custom-alias"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Expiration Date */}
        <div className="flex flex-col align-item-left">
          <label className="text-sm font-medium text-gray-700 text-left mb-3">
            Expiration Date <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Shorten URL
          </button>
        </div>
      </form>
    </div>
  );
};
