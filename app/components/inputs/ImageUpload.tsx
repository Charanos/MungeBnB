"use client";

import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget } from "next-cloudinary";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      uploadPreset="lib1xiwm"
      onSuccess={handleUpload}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition flex flex-col items-center justify-center gap-4 text-textDark border-dashed border-2 p-20 border-betaColor"
          >
            <TbPhotoPlus size={50} />

            <div className="font-medium text-lg">Click to upload</div>

            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  src={value}
                  alt="upload"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
