import React, { useMemo } from "react";
import Attachment, {
  DEFAULT_IMG_SIZE,
  DIN_A4_RATIO,
  ROUNDING,
} from "./Attachment";
import { useDropzone } from "react-dropzone";
import { FilePlus as FilePlusIcon } from "react-feather";

const Attachments = ({ attachments = [], onDrop }) => {
  const dropOptions = useMemo(
    () => ({
      onDrop,

      multiple: true,
      accept: {
        "image/*": [],
        "application/pdf": [],
      },
    }),
    [onDrop]
  );

  return (
    <Dropzone dropOptions={dropOptions}>
      <ul className="flex gap-4 flex-wrap">
        {attachments.map((attachment, index) => (
          <li key={index}>
            <Attachment {...attachment} />
          </li>
        ))}

        <li>
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

const UploadImage = ({ size = DEFAULT_IMG_SIZE, dropOptions }) => {
  const { getRootProps, getInputProps, ...state } = useDropzone({
    ...dropOptions,
    noDragEventsBubbling: true,
  });

  const borderColor = getBorderColor(state);
  return (
    <div
      {...getRootProps({
        style: {
          width: size,
          height: size * DIN_A4_RATIO,
        },
        className: `${TRANSITION} bg-gray-50 hover:bg-blue-50 ${ROUNDING} border border-dashed ${borderColor} group hover:border-blue-500 cursor-pointer`,
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
