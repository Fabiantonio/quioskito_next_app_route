"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { getImagePath } from "@/src/utils";

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <CldUploadWidget
        onSuccess={(result, { widget }) => {
          if (result.event === "success") {
            widget.close();
            // @ts-expect-error - next-cloudinary types are not accurate
            setImageUrl(result.info.secure_url);
          }
        }}
        uploadPreset="kisquito"
        options={{
          maxFiles: 1,
        }}
        onUpload={(result) => console.log(result)}
      >
        {({ open }) => (
          <div className="">
            <label className="text-slate-800">Imagen:</label>
            <div className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-600 bg-slate-100 flex items-center justify-center">
              <button type="button" onClick={() => open()} className="">
                <TbPhotoPlus size={50} />
              </button>
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={imageUrl}
                    style={{ objectFit: "contain" }}
                    alt="product"
                    fill
                  />
                </div>
              )}
            </div>
            {image && !imageUrl && (
              <div className="space-y-2">
                <label>Imagen Actual:</label>
                <div className="relative w-64 h-64">
                  <Image
                    src={getImagePath(image)}
                    style={{ objectFit: "contain" }}
                    alt="product"
                    fill
                  />
                </div>
              </div>
            )}
            <input type="hidden" name="image" defaultValue={image} />
          </div>
        )}
      </CldUploadWidget>
    </>
  );
}
