"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { removeLogo, uploadLogo } from "@/server/actions/settings";
import { Loader2, TrashIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const LogoUploader = ({ logo }: { logo: string | null }) => {
  // uploadedFile will be used for actual file upload later

  const [_, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      startTransition(async () => {
        const url = await uploadLogo(file);
        if (url) {
          setPreviewUrl(url);
          toast.success("Logo uploaded successfully");
        } else {
          toast.error("Failed to upload logo");
        }
      });
    }
  };

  const triggerFileInput = () => {
    fileRef.current?.click();
  };

  const handleRemove = async () => {
    setUploadedFile(null);
    const result = await removeLogo();
    if (result.success) {
      setPreviewUrl(null);
    }
  };

  // Show preview if file uploaded, otherwise show existing logo
  const imageSrc = previewUrl || logo;

  return (
    <div className="space-y-2">
      <div
        className="flex items-center justify-between gap-2 border-1 border-dashed
       border-gray-300/30 p-4 rounded-md"
      >
        {imageSrc && !isPending ? (
          <>
            <Image
              src={imageSrc}
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={handleRemove}
              className="!bg-transparent !border-none"
            >
              <TrashIcon className="size-4" />
              Remove
            </Button>
          </>
        ) : (
          <>
            {!isPending ? (
              <>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileRef}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={triggerFileInput}
                  className="w-full !bg-transparent !border-none"
                >
                  <UploadIcon className="size-4" />
                  Upload Logo
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span
                  aria-live="polite"
                  aria-label="Uploading logo"
                  className="text-sm"
                >
                  Uploading...
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LogoUploader;
