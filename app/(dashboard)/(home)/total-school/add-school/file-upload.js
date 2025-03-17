"use client";

import FileUploaderMultiple from "./file-uploader-multiple";

const FileUploaderPage = ({ onAdded }) => {
  return (
    <div className="space-y-5">
      <div className="col-span-2">
          <p className="text-sm text-default-400 dark:text-default-600  mb-4 max-w-2xl">
            Upload a file containing the list of schools. Ensure the file includes essential details such as school names, 
            udise, state, district, email addresses, passwords and phone numbers.
          </p>
          <FileUploaderMultiple onAdded={onAdded} />
      </div>
    </div>
  );
};

export default FileUploaderPage;
