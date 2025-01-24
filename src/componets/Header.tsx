import { Upload } from "lucide-react";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
const Header = ({ setfile, setfileid }) => {
  const [filename, setfilename] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setfile(file);

      // Create FormData object
      const formData = new FormData();
      formData.append("file", file); // Append the file with 'file' parameter name

      try {
        // Make POST request using axios
        setIsUploading(true);
        const response = await axios.post(
          "http://127.0.0.1:8000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Let Axios set the correct boundary automatically
            },
          }
        );

        setfileid(response.data.id);
        console.log("fileid set to:", response.data.id);
        setfilename(file.name);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <header className="flex justify-between items-center p-4 border-b">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/blacklogo.svg"
          alt="Planet Logo"
          className="w-[104.93px] h-[41px]"
        />
      </div>

      {/* Upload Button */}
      <div className="flex flex-row justify-center items-center">
        {filename ? (
          <div className="flex mr-12 flex-row justify-center items-center">
            <div className="p-2 border flex justify-center items-center border-[#0FA958] rounded-lg">
              <svg
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.13647 0.771973V4.04511C8.13647 4.26213 8.22269 4.47027 8.37614 4.62373C8.5296 4.77718 8.73774 4.8634 8.95476 4.8634H12.2279"
                  stroke="#0FA958"
                  stroke-width="1.0158"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5914 15.5011H2.40854C1.9745 15.5011 1.55823 15.3287 1.25131 15.0218C0.944396 14.7148 0.771973 14.2986 0.771973 13.8645V2.40854C0.771973 1.9745 0.944396 1.55823 1.25131 1.25131C1.55823 0.944396 1.9745 0.771973 2.40854 0.771973H8.13653L12.228 4.8634V13.8645C12.228 14.2986 12.0555 14.7148 11.7486 15.0218C11.4417 15.3287 11.0254 15.5011 10.5914 15.5011Z"
                  stroke="#0FA958"
                  stroke-width="1.0158"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <p className=" ml-2 text-red-400 ">{filename}</p>
          </div>
        ) : (
          ""
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />
        <button
          onClick={handleButtonClick}
          className="flex items-center gap-2 mr-12 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={18} />
              <span>Upload PDF</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
