import React, { useMemo } from "react";
import Attachment, { ROUNDING } from "./Attachment";
import { useDropzone } from "react-dropzone";
import { FilePlus as FilePlusIcon } from "react-feather";

const Attachments = ({ attachments = [], onDrop }) => {
  const dropOptions = useMemo(
    () => ({
      onDrop,

      multiple: true,
      accept: {
        // "image/*": [],
        // "application/pdf": [],
      },
    }),
    [onDrop]
  );

  const CHILD_SIZE = "w-full aspect-dina4";
  return (
    <Dropzone dropOptions={dropOptions}>
      <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {attachments.map((attachment, index) => (
          <li key={index} className={CHILD_SIZE}>
            <Attachment {...attachment} />
          </li>
        ))}

        <li className={CHILD_SIZE}>
          <UploadImage dropOptions={dropOptions} />
        </li>
      </ul>
    </Dropzone>
  );
};
export default Attachments;

const TRANSITION = "transition-all duration-300";

const Dropzone = ({ children, dropOptions }) => {
  const { getRootProps } = useDropzone({
    ...dropOptions,

    noClick: true,
    noKeyboard: true,
  });

  return (
    <div {...getRootProps({})}>
      <div>{children}</div>
    </div>
  );
};

const getBorderColor = (state) => {
  if (state.isDragReject) {
    return "border-red-300";
  } else if (state.isDragAccept) {
    return "border-green-300";
  } else if (state.isDragActive) {
    return "border-blue-300";
  } else if (state.isFocused) {
    return "border-blue-300";
  }

  return "border-gray-300";
};

const UploadImage = ({ dropOptions }) => {
  const { getRootProps, getInputProps, ...state } = useDropzone({
    ...dropOptions,
    noDragEventsBubbling: true,
  });

  const borderColor = getBorderColor(state);
  return (
    <div
      {...getRootProps({
        className: `${TRANSITION} h-full w-full bg-gray-50 hover:bg-blue-50 ${ROUNDING} border border-dashed ${borderColor} group hover:border-blue-500 cursor-pointer`,
      })}
    >
      <input {...getInputProps()} />
      <div className="w-full h-full flex items-center justify-center">
        <div
          className={`flex flex-col items-center ${
            state.isDragActive ? "animate-bounce" : ""
          }`}
        >
          <FilePlusIcon
            className={`text-gray-500 ${TRANSITION} group-hover:text-blue-500`}
          />
          <p
            className={`pt-1 text-gray-500 ${TRANSITION} group-hover:text-blue-500`}
          >
            Hinzufügen
          </p>
        </div>
      </div>
    </div>
  );
};
