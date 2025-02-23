"use client";

import Card from "@/components/ui/card-snippet";
import FileUploaderMultiple from "./file-uploader-multiple";

const FileUploaderPage = ({ onAdded }) => {
  return (
    <div className="space-y-5">
      <div className="col-span-2">
        {/* <Card title="Upload Multiple Files" > */}
          <p className="text-sm text-default-400 dark:text-default-600  mb-4 max-w-2xl">
            {/* Upload multiple files and images here. They will display
            individually, and you can remove or delete them one by one or all at
            once. */}
            Upload a file containing the list of students. Ensure the file includes essential details such as teacher names, 
            state. district, role, email addresses, passwords, phone numbers, and school IDs.
          </p>
          <FileUploaderMultiple onAdded={onAdded} />
        {/* </Card> */}
      </div>
    </div>
  );
};

export default FileUploaderPage;
