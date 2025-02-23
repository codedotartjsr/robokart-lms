" use client";
import { Fragment, useState } from "react";
import { Icon } from "@iconify/react";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";
import toast from 'react-hot-toast';

const FileUploaderMultiple = ({ onAdded }) => {
  const [files, setFiles] = useState([]);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       setFiles(acceptedFiles.map((file) => Object.assign(file)));
//     },
//   });

const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    accept: '.xlsx',  // Ensure only Excel files are accepted
    multiple: false   // Ensure only one file can be uploaded
  });

  // Upload file to the server
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);  // Append the file under the key 'file'

    try {
      const response = await fetch('https://xcxd.online:8080/api/v1/school/upload', {
        method: 'POST',
        body: formData,  // Send formData
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('File uploaded successfully!');
        onAdded();
      } else {
        throw new Error(result.message || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleUploadClick = () => {
    if (files.length > 0) {
      uploadFile(files[0]);  // Upload the first (and only) file
    }
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <Image
          width={48}
          height={48}
          alt={file.name}
          src={URL.createObjectURL(file)}
          className=" rounded border p-0.5"
        />
      );
    } else {
      return <Icon icon="tabler:file-description" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const fileList = files.map((file) => (
    <div
      key={file.name}
      className=" flex justify-between border px-3.5 py-3 my-6 rounded-md"
    >
      <div className="flex gap-3 items-center">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <div className=" text-sm  text-card-foreground">{file.name}</div>
          <div className=" text-xs font-light text-muted-foreground">
            {Math.round(file.size / 100) / 10 > 1000 ? (
              <>{(Math.round(file.size / 100) / 10000).toFixed(1)}</>
            ) : (
              <>{(Math.round(file.size / 100) / 10).toFixed(1)}</>
            )}
            {" kb"}
          </div>
        </div>
      </div>

      <Button
        size="icon"
        color="destructive"
        variant="outline"
        className=" border-none rounded-full"
        onClick={() => handleRemoveFile(file)}
      >
        <Icon icon="tabler:x" className=" h-5 w-5" />
      </Button>
    </div>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Fragment>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className=" w-full text-center border-dashed border  rounded-md py-[52px] flex  items-center flex-col">
          <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
            <Upload className="h-6 w-6 text-default-500" />
          </div>
          <h4 className=" text-2xl font-medium mb-1 text-card-foreground/80">
            Drop files here or click to upload.
          </h4>
          <div className=" text-xs text-muted-foreground">
            ( Drop a file here or click to select one. The selected file will be prepared for upload. )
          </div>
        </div>
      </div>
      {files.length ? (
        <Fragment>
          <div>{fileList}</div>
          <div className=" flex justify-end gap-2">
            <Button color="destructive" onClick={handleRemoveAllFiles}>
              {/* Remove All */}
              Remove
            </Button>
            <Button onClick={handleUploadClick}>Upload File</Button>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default FileUploaderMultiple;
