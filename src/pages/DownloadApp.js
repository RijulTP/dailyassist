import React from "react";
import { useState } from "react";

const DownloadPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Create a temporary link to initiate the download
    const link = document.createElement("a");
    link.href = "https://github.com/RijulTP/LifeNavigatorApp/raw/main/LifeNavigator.apk";
    link.download = "LifeNavigatorApp.apk";
    document.body.appendChild(link);
    link.click();
    setIsDownloading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <h1 className="text-3xl font-bold mb-4">Life Navigator App</h1>
        <p className="text-gray-600 mb-8">
          Life Navigator helps you organize your life and stay on track with
          your goals.
        </p>
        <button
          onClick={handleDownload}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none ${
            isDownloading && "cursor-not-allowed"
          }`}
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download Now"}
        </button>
      </div>
    </div>
  );
};

export default DownloadPage;
