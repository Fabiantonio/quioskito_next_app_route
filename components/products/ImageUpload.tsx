"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { getImagePath } from "@/src/utils";

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="space-y-2">
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
            <label className="text-sm font-bold text-gray-700 mb-2 block">Imagen del Producto:</label>
            <div 
                onClick={() => open()}
                className="relative cursor-pointer hover:bg-gray-50 transition p-10 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center gap-2 group"
            >
              <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white transition-colors">
                 <TbPhotoPlus size={30} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-500 font-medium">Click para subir imagen</p>
              
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    style={{ objectFit: "contain" }}
                    alt="product"
                    fill
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </CldUploadWidget>

      {image && !imageUrl && (
        <div className="space-y-2 pt-2">
            <label className="text-sm font-bold text-gray-700 block">Imagen Actual:</label>
            <div className="relative w-full h-64 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                <Image
                src={getImagePath(image)}
                style={{ objectFit: "contain" }}
                alt="product"
                fill
                />
            </div>
        </div>
        )}
        <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
    </div>
  );
}
